import { checkoutIsInProgressInfra } from 'data/contracts/checkoutObject/checkIsInProgress'

export class CheckIsInProgressDeliveryAddress implements checkoutIsInProgressInfra {
  async perform (data: checkoutIsInProgressInfra.params): Promise<checkoutIsInProgressInfra.result> {
    return Promise.resolve({
      cart: {
        id: '123',
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
      }
    })
  }
}
