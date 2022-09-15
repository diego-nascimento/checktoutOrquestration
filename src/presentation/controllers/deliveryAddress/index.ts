import { error400 } from 'presentation/handleHttpResponses/400Error'
import { ControllerProtocol } from 'presentation/protocols/controllerProtocols'
import { httpRequest, httpResponse } from 'presentation/protocols/httpProtocols'
import { DeliveryAddressDomain } from 'domain/features/ address/deliveryAddress'
import { error500 } from 'presentation/handleHttpResponses/500Error'

import { createsuccessfully } from 'presentation/handleHttpResponses/201createsuccessfully'

export class DeliverAddressPresentation implements ControllerProtocol {
  private readonly fields = ['cartId', 'address']
  private readonly addressFields = ['street', 'number', 'neighborhood', 'postalCode', 'city', 'state']

  constructor (private readonly DeliveryAddress: DeliveryAddressDomain) {}

  async handle (request: httpRequest): Promise<httpResponse> {
    try {
      const { body } = request
      for (const key of this.fields) {
        if (!body[key]) return error400(`Field ${key} is required`)
      }
      for (const key of this.addressFields) {
        if (!body.address[key]) return error400(`Address field ${key} is required`)
      }
      const result = await this.DeliveryAddress.perform(body)
      return createsuccessfully<DeliveryAddressDomain.result>(result)
    } catch (error) {
      return error500((error as Error).message)
    }
  }
}
