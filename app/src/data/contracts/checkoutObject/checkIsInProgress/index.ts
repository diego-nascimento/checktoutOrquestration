import { checkoutObject } from 'domain/models/checkoutObject'

export namespace checkoutIsInProgressInfra {
  export type params = {
    cartId: string
  }
  export type result = checkoutObject | null
}

export interface checkoutIsInProgressInfra {
  perform(data: checkoutIsInProgressInfra.params):Promise<checkoutIsInProgressInfra.result>
}
