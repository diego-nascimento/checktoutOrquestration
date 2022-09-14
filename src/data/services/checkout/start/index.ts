import { findCartInfra } from '../../../contracts/cart/findCart'
import { StartCheckoutDomain } from '../../../../domain/features/checkout/start'
import { CheckoutObjectDTO } from '../../../../domain/entities/checkoutObject'
import { checkoutIsInProgressInfra } from '../../../contracts/checkoutObject/checkIsInProgress'
import { SaveCheckoutInfra } from '../../../contracts/checkoutObject/save'

export class StartCheckoutData implements StartCheckoutDomain {
  constructor (
    private readonly checkoutIsInProgress: checkoutIsInProgressInfra,
    private readonly findCartInfra: findCartInfra,
    private readonly saveCheckout: SaveCheckoutInfra
  ) {}

  async perform (data: StartCheckoutDomain.Params): Promise<StartCheckoutDomain.Result> {
    const checkoutIsInProgress = await this.checkoutIsInProgress.perform(data)
    if (checkoutIsInProgress) return new CheckoutObjectDTO(checkoutIsInProgress).getJSON()
    const cart = await this.findCartInfra.perform(data)
    if (!cart) return null
    const checkoutObject = new CheckoutObjectDTO({ cart })
    return this.saveCheckout.perform({ checkoutObject: checkoutObject.getJSON() })
  }
}
