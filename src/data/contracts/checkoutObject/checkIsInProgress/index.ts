import { checkoutObject } from '../../../../domain/protocols/checkoutObject'

export namespace checkoutIsInProgressDomain {
  export type params = {
    cartId: string
  }
  export type result = checkoutObject | null
}

export interface checkoutIsInProgressDomain {
  perform(data: checkoutIsInProgressDomain.params):Promise<checkoutIsInProgressDomain.result>
}
