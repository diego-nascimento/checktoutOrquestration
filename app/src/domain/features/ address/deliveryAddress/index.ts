import { addressTypes } from 'domain/models/address'
import { checkoutObject } from 'domain/models/checkoutObject'
import { deliveryMethodsTypes } from 'domain/models/deliveryMethods'

export namespace DeliveryAddressDomain {
  export type params = {
    cartId: string
    address: addressTypes
  }

  export type result = {
    deliveryMethods: deliveryMethodsTypes[]
    checkoutObject: checkoutObject
  }
}

export interface DeliveryAddressDomain {
  perform(data: DeliveryAddressDomain.params):Promise<DeliveryAddressDomain.result>
}
