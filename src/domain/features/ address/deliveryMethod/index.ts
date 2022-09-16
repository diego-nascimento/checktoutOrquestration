import { checkoutObject } from 'domain/models/checkoutObject'
import { deliveryMethodsTypes } from 'domain/models/deliveryMethods'

export namespace DeliveryMethodDomain {
  export type params = {
    cartId: string
    deliveryMethod: deliveryMethodsTypes
  }

  export type result = checkoutObject
}

export interface DeliveryMethodDomain {
  perform(data: DeliveryMethodDomain.params):Promise<DeliveryMethodDomain.result>
}
