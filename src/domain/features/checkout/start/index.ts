import { checkoutObject } from '../../../models/checkoutObject'

export namespace StartCheckoutDomain {
  export type Params = {
    cartId: string
  }

  export type Result = checkoutObject | null

}

export interface StartCheckoutDomain {
  perform(data: StartCheckoutDomain.Params):Promise<StartCheckoutDomain.Result>
}
