import { StartCheckoutData } from 'data/services/checkout/start'
import { FindCartInfra } from 'infra/mockedServices/cart/find'
import { CheckIsInProgress } from 'infra/mockedServices/checkoutObjects/checkIsInProgress'
import { SaveCheckoutObject } from 'infra/mockedServices/checkoutObjects/save'
import { SaveCheckoutPresentation } from 'presentation/controllers/checkout/save'

export const checkoutObjectStartFactory = () => {
  const checkoutIsInProgressInfra = new CheckIsInProgress()
  const findCartInfra = new FindCartInfra()
  const saveCheckoutInfra = new SaveCheckoutObject()
  const startCheckoutData = new StartCheckoutData(checkoutIsInProgressInfra, findCartInfra, saveCheckoutInfra)
  return new SaveCheckoutPresentation(startCheckoutData)
}
