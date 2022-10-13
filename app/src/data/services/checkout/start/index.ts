import { findCartInfra } from 'data/contracts/cart/findCart'
import { StartCheckoutDomain } from 'domain/features/checkout/start'

import { checkoutIsInProgressInfra } from 'data/contracts/checkoutObject/checkIsInProgress'
import { SaveCheckoutInfra } from 'data/contracts/checkoutObject/save'
import { CheckoutObjectDTO } from 'domain/entities/checkoutObject'

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
    return await this.saveCheckout.perform({ checkoutObject: checkoutObject.getJSON() })
  }
}
