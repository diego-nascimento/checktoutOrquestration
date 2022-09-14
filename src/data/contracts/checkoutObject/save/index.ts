import { checkoutObject } from '../../../../domain/protocols/checkoutObject'

export namespace SaveCheckoutInfra {
  export type params = {
    checkoutObject: checkoutObject
  }

  export type result = checkoutObject
}

export interface SaveCheckoutInfra {
  perform(data: SaveCheckoutInfra.params):Promise<SaveCheckoutInfra.result>
}
