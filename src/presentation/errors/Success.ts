import { httpResponse } from '../protocols/httpProtocols'

export function success<t> (data: t):httpResponse {
  return {
    statusCode: 201,
    body: data
  }
}
