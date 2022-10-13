import { NextFunction, Request, Response } from 'express'

export const handleBadJson = (error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof SyntaxError) {
    return response.status(400).send({ status: 400, message: error.message })
  }
  next()
}
