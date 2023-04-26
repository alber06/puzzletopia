import nc from 'next-connect'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../auth/[...nextauth]'
import onError from 'middlewares/errors'
import type { NextApiRequest, NextApiResponse } from 'next'
import cache from 'lib/cache'
import { getNthBiggestNumber } from 'lib/helpers'

import User from 'lib/db/models/User'
import { BadRequestError } from 'errors'


const handler = nc({ onError })


/**
 * Solve puzzle2 based on the numbers provided
 *
 */
export const handleSolvePuzzle2 = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions(req, res))

  if(!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  } 

  const puzzleNumbers = cache.get(`puzzle2${session?.user?.username}`)
  if (!puzzleNumbers) {
    throw new BadRequestError('User has not generated puzzle2 numbers')
  }
  
  const inputNumber = req.body.number
  const number = getNthBiggestNumber(puzzleNumbers, 300)
  const solved = number === inputNumber

  cache.delete(`puzzle2${session?.user?.username}`)

  if(solved) {
    await User.update(session?.user?.id, { puzzle2Complete: true })
  }
  
  return res.status(200).json({ ok: solved })
}

handler.post(handleSolvePuzzle2)

export default handler
