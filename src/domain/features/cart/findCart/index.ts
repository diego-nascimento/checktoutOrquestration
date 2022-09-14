import { cartTypes } from '../../../protocols/cartTypes'

export namespace findCartInfra {
  export type params = {
    cartId: string
  }

  export type result = cartTypes | null
}

export interface findCartInfra {
  perform(data: findCartInfra.params):Promise<findCartInfra.result>
}
