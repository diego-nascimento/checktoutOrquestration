import { addressTypes } from '../../../../domain/models/address'
import { deliveryMethodsTypes } from '../../../../domain/models/deliveryMethods'

export namespace getDeliveryMethodsInfra {
  export type params = {
    address: addressTypes
  }

  export type result = {
    deliveryMethods: deliveryMethodsTypes[]
  }
}

export interface getDeliveryMethodsInfra {
  perform(data: getDeliveryMethodsInfra.params):Promise<getDeliveryMethodsInfra.result>
}
