import { addressTypes } from './address'
import { cartTypes } from './cartTypes'
import { deliveryMethodsTypes } from './deliveryMethods'
import { billingTypes, creditCardTypes } from './payments'

export type stateTypes = 'initial' |'delivery' | 'payment' | 'ready'

export type paymentMethodTypes = billingTypes | creditCardTypes | undefined

export type nextStep = {
  endPoint: string
  method: 'POST'
}

export interface checkoutObject {
  id?: string
  cart: cartTypes
  deliveryAddress?: addressTypes | undefined
  deliveryMethod?: deliveryMethodsTypes | undefined
  paymentMethod?: paymentMethodTypes
  state?: stateTypes
  checkoutReady?: boolean
  nextStep?:nextStep
}
