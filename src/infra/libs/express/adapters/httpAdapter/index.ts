import { ControllerProtocol } from '../../../../../presentation/protocols/controllerProtocols'
import { Request, Response } from 'express'
import { httpRequest } from '../../../../../presentation/protocols/httpProtocols'

export const httpAdapter = (controller: ControllerProtocol) => {
  return async (request: Request, response: Response) => {
    const controllerRequest: httpRequest = {} as httpRequest
    controllerRequest.body = request.body
    const controllerResponse = await controller.handle(controllerRequest)
    return response.status(controllerResponse.statusCode).json(controllerResponse.body)
  }
}
