import NextAuth from 'next-auth'
import { encode, decode, JWTDecodeParams, JWTEncodeParams } from 'next-auth/jwt'
import { DataTypes } from 'sequelize'
import SequelizeAdapter, { models } from '@next-auth/sequelize-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next/types'
import Cookies from 'cookies'
import { randomUUID } from 'crypto'

import db from 'lib/db'
import User from 'lib/db/models/User'
import Session from 'lib/db/models/Session'

const sequelizeAdapter = SequelizeAdapter(db, {
  models: {
    User: db.define('user', {
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      puzzle1Complete: DataTypes.BOOLEAN,
      puzzle2Complete: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    }, {
      scopes: {
        withoutPassword: {
          attributes: { exclude: ['password'] },
        }
      }
    }),
  },
})

// Calling sync() is not recommended in production
db.sync()

const getAdapter = (req: NextApiRequest, res: NextApiResponse) => ({
  ...sequelizeAdapter,
  async getSessionAndUser(sessionToken: string) {
    const userAndSession = await Session.findOne({ sessionToken }) as any

    console.log('SESSION USER :', sessionToken, userAndSession)
    if (!userAndSession) return null
    
    //insert session data whatever you like 
    const { userId, expires, ...session } = userAndSession
    const user = await User.findOne({ id: userId }) as any

    return { user: user, session : { expires: new Date(expires), ...session } }
  },
})

const session = {
  // strategy: 'database',
  maxAge: 30 * 24 * 60 * 60, // 30 days
  updateAge: 24 * 60 * 60, // 24 hours
}

export const authOptions = (req: NextApiRequest, res: NextApiResponse) => {
  const adapter = getAdapter(req, res)
  return {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
          password: { label: 'Password', type: 'password' }
        },
        async authorize(credentials, req) {
          const { username, password } = credentials as {
            username: string
            password: string
          }
          const user = await User.findOne({ username }) as any

          if (!user) {
            const newUser = await User.create({
              username,
              password: bcrypt.hashSync(password, 10),
              puzzle1Complete: false,
              puzzle2Complete: false
            }) as User

            return newUser
          }

          const isValid = bcrypt.compareSync(password, user.password)
          if (!isValid) {
            return null
          }

          return user
        }
      })
    ],
    callbacks: {
      session({ session, user }: any) {
        console.log('SESSION callback', session, user)
        if (session.user) {
          session.user = {
            ...user,
            puzzle1Complete: Boolean(user.puzzle1Complete),
            puzzle2Complete: Boolean(user.puzzle2Complete)
          }
          delete session.user.password
        }
        return session
      },
      async signIn({ user }: any) {
        if (
          req.query.nextauth?.includes('callback') &&
          req.query.nextauth?.includes('credentials') &&
          req.method === 'POST'
        ) {
          if (user && 'id' in user) {
            const sessionToken = randomUUID()
            const sessionExpiry = new Date(Date.now() + session.maxAge * 1000)
            await adapter.createSession({
              sessionToken : sessionToken,
              userId: user.id,
              expires: sessionExpiry,
            })
            const cookies = new Cookies(req, res)
            cookies.set('next-auth.session-token', sessionToken, {
              expires: sessionExpiry,
            })
          }
        }
        return true
      },
    },

    //needs to override default jwt behavior when using Credentials 
    jwt: {
      encode(params: JWTEncodeParams) {
        if (
          req.query.nextauth?.includes('callback') &&
          req.query.nextauth?.includes('credentials') &&
          req.method === 'POST'
        ) {
          const cookies = new Cookies(req, res)
          const cookie = cookies.get('next-auth.session-token')
          if (cookie) return cookie
          else return ''
        }
        // Revert to default behaviour when not in the credentials provider callback flow
        return encode(params)
      },
      async decode(params: JWTDecodeParams) {
        if (
          req.query.nextauth?.includes('callback') &&
          req.query.nextauth?.includes('credentials') &&
          req.method === 'POST'
        ) {
          return null
        }
        // Revert to default behaviour when not in the credentials provider callback flow
        return decode(params)
      },
    },
    session,
    adapter
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions(req, res))
}