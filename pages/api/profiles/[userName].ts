import nc from 'next-connect'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import onError from 'middlewares/errors'

import type { NextApiRequest, NextApiResponse } from 'next'
import { BadRequestError, NotFoundError } from 'errors'
import User from 'lib/db/models/User'


const handler = nc({ onError })

/**
 * Retrieve user profile by username
 *
 */
export const handleGeneratePuzzle1 = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions(req, res))
  if(!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  } 

  const username = req.query.userName as string
  if (!username) {
    throw new BadRequestError('Username is required')
  }

  const user = await  User.findOne({ username }, true)
  if (!user) {
    throw new NotFoundError('User not found')
  }

  return res.status(200).json({ ...user })
}

handler.get(handleGeneratePuzzle1)

export default handler
