
import { httpResponse } from '../protocols/httpProtocols'

export const error404 = (message: string):httpResponse => {
  return {
    statusCode: 404,
    body: {
      message
    }
  }
}
