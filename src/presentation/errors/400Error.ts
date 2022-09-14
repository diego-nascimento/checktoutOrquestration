import { httpResponse } from '../protocols/httpProtocols'

export const error400 = (message: string):httpResponse => {
  return {
    statusCode: 400,
    body: {
      message
    }
  }
}
