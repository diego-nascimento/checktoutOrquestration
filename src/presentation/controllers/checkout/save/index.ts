import { StartCheckoutDomain } from '../../../../domain/features/checkout/start'
import { error400 } from '../../../errors/400Error'
import { error404 } from '../../../errors/404Error'
import { error500 } from '../../../errors/500Error'
import { success } from '../../../errors/Success'
import { ControllerProtocol } from '../../../protocols/controllerProtocols'
import { httpRequest, httpResponse } from '../../../protocols/httpProtocols'

export class SaveCheckoutPresentation implements ControllerProtocol {
  private readonly fields: string[] = ['cartId']

  constructor (
    private readonly createCheckout: StartCheckoutDomain
  ) {}

  async handle (request: httpRequest): Promise<httpResponse> {
    try {
      const { body } = request
      for (const key of this.fields) {
        if (!body[key]) return error400(`Field ${key} is required`)
      }
      const result = await this.createCheckout.perform(body)
      if (!result) return error404('Cart not founded')
      return success<StartCheckoutDomain.Result>(result)
    } catch (error) {
      if (error instanceof Error) {
        return error500(error.message)
      }
      return error500('Something went wrong')
    }
  }
}
