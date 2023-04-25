import { GeneralError } from '../errors'

import type { NextApiRequest, NextApiResponse } from 'next'

const onError = (err: Error, req: NextApiRequest, res: NextApiResponse) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: 'error',
      message: err.message,
      name: err.name
    })
  }

  return res.status(500).json({
    status: 'error',
    message: err.message,
    name: err.name
  })
}

export default onError
