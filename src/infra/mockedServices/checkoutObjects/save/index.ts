import { SaveCheckoutInfra } from '../../../../data/contracts/checkoutObject/save'
import { checkoutObject } from '../../../../domain/protocols/checkoutObject'

export class SaveCheckoutObject implements SaveCheckoutInfra {
  async perform (data: SaveCheckoutInfra.params): Promise<checkoutObject> {
    return data.checkoutObject
  }
}
