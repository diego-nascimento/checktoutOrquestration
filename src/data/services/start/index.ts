import { findCartInfra } from '../../../domain/features/cart/findCart'
import { StartCheckoutDomain } from '../../../domain/features/start'
import { CheckoutObjectDTO } from '../../../domain/models/checkoutObject'
import { checkoutIsInProgressDomain } from '../../contracts/checkoutObject/checkIsInProgress'
import { SaveCheckoutInfra } from '../../contracts/checkoutObject/save'

export class StartCheckoutData implements StartCheckoutDomain {
  constructor (
    private readonly checkoutIsInProgress: checkoutIsInProgressDomain,
    private readonly findCartInfra: findCartInfra,
    private readonly saveCheckout: SaveCheckoutInfra
  ) {}

  async perform (data: StartCheckoutDomain.Params): Promise<StartCheckoutDomain.Result> {
    const checkoutIsInProgress = await this.checkoutIsInProgress.perform(data)

    if (checkoutIsInProgress) {
      const checkoutIsInProgressDTO = new CheckoutObjectDTO(checkoutIsInProgress)
      return checkoutIsInProgressDTO.getJSON()
    }
    const cart = await this.findCartInfra.perform(data)
    if (!cart) return null
    const checkoutObject = new CheckoutObjectDTO({
      cart
    })
    return this.saveCheckout.perform({
      checkoutObject: checkoutObject.getJSON()
    })
  }
}
