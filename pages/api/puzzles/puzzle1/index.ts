import nc from 'next-connect'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]'
import onError from 'middlewares/errors'

import type { NextApiRequest, NextApiResponse } from 'next'
import { generateRandomNumbers } from 'lib/helpers'
import cache from 'lib/cache'


const handler = nc({ onError })

/**
 * Generate puzzle1 data
 *
 */
export const handleGeneratePuzzle1 = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions(req, res))

  if(!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  } 

  const numbers = generateRandomNumbers(1000, 2)
  cache.set(`puzzle1${session?.user?.username}`, numbers)

  return res.status(200).json({ numbers })
}

handler.get(handleGeneratePuzzle1)

export default handler
