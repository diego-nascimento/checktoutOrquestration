
import { httpResponse } from '../protocols/httpProtocols'

export const error500 = (message: string):httpResponse => {
  return {
    statusCode: 500,
    body: {
      message
    }
  }
}
