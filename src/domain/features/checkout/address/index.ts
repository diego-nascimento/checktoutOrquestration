import { addressTypes } from '../../../models/address'
import { checkoutObject } from '../../../models/checkoutObject'
import { deliveryMethodsTypes } from '../../../models/deliveryMethods'

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
