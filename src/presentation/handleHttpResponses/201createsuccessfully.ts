import { httpResponse } from '../protocols/httpProtocols'

export function createsuccessfully<t> (data: t):httpResponse {
  return {
    statusCode: 201,
    body: data
  }
}
