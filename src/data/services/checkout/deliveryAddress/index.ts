import { CheckoutObjectDTO } from '../../../../domain/entities/checkoutObject'
import { DeliveryAddressDomain } from '../../../../domain/features/checkout/address'
import { addressTypes } from '../../../../domain/models/address'
import { checkoutObject } from '../../../../domain/models/checkoutObject'

import { checkoutIsInProgressInfra } from '../../../contracts/checkoutObject/checkIsInProgress'
import { SaveCheckoutInfra } from '../../../contracts/checkoutObject/save'
import { getDeliveryMethodsInfra } from '../../../contracts/deliveryMethods/getDeliveryMethods'

export class DeliveryAddressData implements DeliveryAddressDomain {
  constructor (
    private readonly checkoutIsInProgress: checkoutIsInProgressInfra,
    private readonly saveCheckout: SaveCheckoutInfra,
    private readonly getDeliveryMethods: getDeliveryMethodsInfra
  ) {}

  async perform (data: DeliveryAddressDomain.params): Promise<DeliveryAddressDomain.result> {
    const checkoutInProgress = await this.checkoutIsInProgress.perform({ cartId: data.cartId })
    if (!checkoutInProgress) throw new Error('Incorrect step, try /create')
    const checkoutObject = this.createCheckoutObject(checkoutInProgress, data.address)
    await this.saveCheckout.perform({ checkoutObject: checkoutObject.getJSON() })
    const { deliveryMethods } = await this.getDeliveryMethods.perform({ address: data.address })
    return { deliveryMethods, checkoutObject: checkoutObject.getJSON() }
  }

  private createCheckoutObject (checkoutInProgress: checkoutObject, deliveryAddress: addressTypes) {
    return new CheckoutObjectDTO(
      {
        ...checkoutInProgress,
        deliveryAddress,
        deliveryMethod: undefined,
        paymentMethod: undefined
      }
    )
  }
}
