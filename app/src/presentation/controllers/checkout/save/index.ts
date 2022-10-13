import { StartCheckoutDomain } from 'domain/features/checkout/start'
import { error400 } from 'presentation/handleHttpResponses/400Error'
import { error404 } from 'presentation/handleHttpResponses/404Error'
import { error500 } from 'presentation/handleHttpResponses/500Error'
import { createsuccessfully } from 'presentation/handleHttpResponses/201createsuccessfully'
import { ControllerProtocol } from 'presentation/protocols/controllerProtocols'
import { httpRequest, httpResponse } from 'presentation/protocols/httpProtocols'

export class SaveCheckoutPresentation implements ControllerProtocol {
  private readonly fields = ['cartId']

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
      return createsuccessfully<StartCheckoutDomain.Result>(result)
    } catch (error) {
      return error500((error as Error).message)
    }
  }
}
