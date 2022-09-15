import { DeliveryAddressData } from '../../../data/services/checkout/deliveryAddress'

import { CheckIsInProgress } from '../../../infra/mockedServices/checkoutObjects/checkIsInProgress'
import { SaveCheckoutObject } from '../../../infra/mockedServices/checkoutObjects/save'
import { GetDeliveryMethodsInfra } from '../../../infra/mockedServices/deliveryMethods/getDeliveryMethods'
import { DeliverAddressPresentation } from '../../../presentation/controllers/deliveryAddress'

export const deliveryAddressFactory = () => {
  const getDeliveryMethodsInfra = new GetDeliveryMethodsInfra()
  const checkoutIsInProgressInfra = new CheckIsInProgress()
  const saveCheckoutInfra = new SaveCheckoutObject()
  const deliveryAddressData = new DeliveryAddressData(checkoutIsInProgressInfra, saveCheckoutInfra, getDeliveryMethodsInfra)
  return new DeliverAddressPresentation(deliveryAddressData)
}
