import NextAuth from 'next-auth'
import config from 'config'
import { Sequelize, DataTypes } from 'sequelize'
import SequelizeAdapter, { models } from '@next-auth/sequelize-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

const dbString = config.get('database')

const sequelize = new Sequelize(dbString)
const adapter = SequelizeAdapter(sequelize, {
  models: {
    User: sequelize.define('user', {
      ...models.User,
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      puzzle1Complete: DataTypes.BOOLEAN,
      puzzle2Complete: DataTypes.BOOLEAN
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
sequelize.sync()

export const authOptions = {
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
        // Add logic here to look up the user from the credentials supplied
        const user = await sequelize.models.user.findOne({ where: { username }, raw: true }) as any

        // If no error and we have user data, return it
        if (!user) {
          const newUser = await sequelize.models.user.create({
            username,
            password: bcrypt.hashSync(password, 10),
            puzzle1Complete: false,
            puzzle2Complete: false
          }) as any

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
  adapter
}

export default NextAuth(authOptions)