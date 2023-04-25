/* eslint-disable no-use-before-define */
export class GeneralError extends Error {
  constructor(message?: string, name?: string) {
    super()
    this.message = message || ''
    this.name = name || ''
  }

  getCode() {
    if (this instanceof BadRequestError) {
      return 400
    } if (this instanceof NotFoundError) {
      return 404
    }
    return 500
  }
}

export class BadRequestError extends GeneralError { }
export class NotFoundError extends GeneralError { }
