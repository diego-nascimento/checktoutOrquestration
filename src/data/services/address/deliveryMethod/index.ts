import { checkoutIsInProgressInfra } from '@/data/contracts/checkoutObject/checkIsInProgress'
import { SaveCheckoutInfra } from '@/data/contracts/checkoutObject/save'
import { CheckoutObjectDTO } from '@/domain/entities/checkoutObject'
import { DeliveryMethodDomain } from '@/domain/features/ address/deliveryMethod'

export class DeliveryMethodData implements DeliveryMethodDomain {
  constructor (
    private readonly checkoutIsInProgress: checkoutIsInProgressInfra,
    private readonly saveCheckout: SaveCheckoutInfra
  ) {}

  async perform (data: DeliveryMethodDomain.params): Promise<DeliveryMethodDomain.result> {
    const checkoutInProgress = await this.checkoutIsInProgress.perform({ cartId: data.cartId })
    if (!checkoutInProgress) throw new Error('Incorrect step, try /create')
    const checkoutObject = new CheckoutObjectDTO({ ...checkoutInProgress, deliveryMethod: data.deliveryMethod })
    if (!checkoutObject.checkIsDeliveryMethod()) throw new Error('Incorrect step, try /delivery')
    return await this.saveCheckout.perform({ checkoutObject: checkoutObject.getJSON() })
  }
}
