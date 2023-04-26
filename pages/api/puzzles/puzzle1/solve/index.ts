import nc from 'next-connect'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../auth/[...nextauth]'
import onError from 'middlewares/errors'
import type { NextApiRequest, NextApiResponse } from 'next'
import cache from 'lib/cache'
import compareArrays from 'lib/helpers/compareArrays'

import db from 'lib/db'
import User from 'lib/db/models/User'


const handler = nc({ onError })

/**
 * Solve puzzle1 based on the numbers provided
 *
 */
export const handleSolvePuzzle1 = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions(req, res))

  if(!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  } 

  const inputNumbers = req.body.numbers
  const numbers = cache.get(`puzzle1${session?.user?.username}`)
  const areEqual = compareArrays(inputNumbers, numbers)

  cache.delete(`puzzle1${session?.user?.username}`)

  if(areEqual) {
    await User.update(session?.user?.id, { puzzle1Complete: true })
  }
  
  return res.status(200).json({ ok: areEqual })
}

handler.post(handleSolvePuzzle1)

export default handler
