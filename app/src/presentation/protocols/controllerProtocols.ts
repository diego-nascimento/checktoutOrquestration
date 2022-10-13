import { httpRequest, httpResponse } from './httpProtocols'

export interface ControllerProtocol {
  handle(request: httpRequest):Promise<httpResponse>
}
