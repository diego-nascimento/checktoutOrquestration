import { addressTypes } from 'domain/models/address'
import { cartTypes } from 'domain/models/cartTypes'
import { checkoutObject, nextStep, stateTypes } from 'domain/models/checkoutObject'
import { deliveryMethodsTypes } from 'domain/models/deliveryMethods'
import { billingTypes, creditCardTypes } from 'domain/models/payments'

type constructorParams = {
  cart: cartTypes
  deliveryAddress?: addressTypes
  deliveryMethod?: deliveryMethodsTypes
  paymentMethod?: billingTypes | creditCardTypes
}

export class CheckoutObjectDTO {
  private checkout: checkoutObject

  constructor (data: constructorParams) {
    const state = this.checkState(data)
    const nextStep = this.checkNextStep(state)
    this.checkout = {
      ...data,
      checkoutReady: this.checkoutIsReady(data),
      state,
      nextStep
    }
  }

  private checkState (data: constructorParams): stateTypes {
    if (this.isDeliveryAddressState(data)) return 'initial'
    if (this.isDeliveryMethodState(data)) return 'delivery'
    if (this.isPaymentState(data)) return 'payment'
    if (this.isReady(data)) return 'ready'
    return 'initial'
  }

  private checkNextStep (state: stateTypes): nextStep {
    if (state === 'initial') { return { endPoint: '/address', method: 'POST' } }
    if (state === 'delivery') { return { endPoint: '/delivery', method: 'POST' } }
    if (state === 'payment') return { endPoint: '/payment', method: 'POST' }
    return { endPoint: '/ready', method: 'POST' }
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
