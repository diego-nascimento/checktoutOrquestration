import { findCartInfra } from 'data/contracts/cart/findCart'

export class FindCartInfra implements findCartInfra {
  async perform (data: findCartInfra.params): Promise<findCartInfra.result> {
    return Promise.resolve({
      id: data.cartId,
      produtosDisponiveis: [
        {
          id: '123',
          nome: 'Bola',
          quantidade: 3,
          valor: 20
        }
      ],
      produtosIndisponiveis: [],
      total: 60
    })
  }
}
