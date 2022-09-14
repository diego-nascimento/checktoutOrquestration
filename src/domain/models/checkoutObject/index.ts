import { addressTypes } from '../../protocols/address'
import { cartTypes } from '../../protocols/cartTypes'
import { checkoutObject, stateTypes } from '../../protocols/checkoutObject'
import { deliveryMethodsTypes } from '../../protocols/deliveryMethods'
import { billingTypes, creditCardTypes } from '../../protocols/payments'

type constructorParams = {
  cart: cartTypes
  deliveryAddress?: addressTypes
  deliveryMethod?: deliveryMethodsTypes
  paymentMethod?: billingTypes | creditCardTypes
}

export class CheckoutObjectDTO {
  private checkout: checkoutObject

  constructor (data: constructorParams) {
    this.checkout = {
      ...data,
      checkoutReady: this.checkoutIsReady(data),
      state: this.checkState(data)
    }
  }

  private checkState (data: constructorParams): stateTypes {
    if (this.isDeliveryAddressState(data)) return 'initial'
    if (this.isDeliveryMethodState(data)) return 'delivery'
    if (this.isPaymentState(data)) return 'payment'
    if (this.isReady(data)) return 'ready'
    return 'initial'
  }

  private isReady (data: constructorParams) {
    return !!(data.deliveryAddress && data.cart && data.deliveryMethod && data.paymentMethod)
  }

  private isDeliveryAddressState (data: constructorParams) {
    return !data.deliveryAddress
  }

  private isDeliveryMethodState (data: constructorParams) {
    return !data.deliveryMethod
  }

  private isPaymentState (data: constructorParams) {
    return data.deliveryMethod && !data.paymentMethod
  }

  private checkoutIsReady (data: constructorParams):boolean {
    return !!(data.cart && data.deliveryAddress && data.deliveryMethod && data.paymentMethod)
  }

  getJSON () {
    return this.checkout
  }
}
