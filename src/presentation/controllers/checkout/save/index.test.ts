import { mock, MockProxy } from 'jest-mock-extended'
import { SaveCheckoutPresentation } from '.'
import { StartCheckoutDomain } from '../../../../domain/features/checkout/start'
import { createsuccessfully } from '../../../handleHttpResponses/201createsuccessfully'
import { error400 } from '../../../handleHttpResponses/400Error'
import { error404 } from '../../../handleHttpResponses/404Error'
import { error500 } from '../../../handleHttpResponses/500Error'
import { ControllerProtocol } from '../../../protocols/controllerProtocols'

describe('SaveCheckoutPresentation tests', () => {
  let sut: ControllerProtocol
  let startCheckoutData: MockProxy<StartCheckoutDomain>

  beforeAll(() => {
    startCheckoutData = mock()
    startCheckoutData.perform.mockResolvedValue({
      checkoutReady: false,
      deliveryAddress: undefined,
      deliveryMethod: undefined,
      id: '123',
      paymentMethod: undefined,
      state: 'initial',
      cart: {
        id: 'any_id',
        produtosDisponiveis: [{
          id: '1',
          nome: 'produto1',
          quantidade: 2,
          valor: 20
        }],
        produtosIndisponiveis: [],
        total: 40
      }
    })
  })

  beforeEach(() => {
    sut = new SaveCheckoutPresentation(startCheckoutData)
  })
  it('Deve retornar erro 400 com mensagem correta se cartId não for enviado', async () => {
    const result = await sut.handle({
      body: {
      }
    })

    expect(result).toEqual(error400('Field cartId is required'))
  })

  it('Deve chamar createCheckout com parametros corretos', async () => {
    await sut.handle({
      body: {
        cartId: 'any_cartId'
      }
    })

    expect(startCheckoutData.perform).toHaveBeenCalledTimes(1)
    expect(startCheckoutData.perform).toHaveBeenCalledWith({
      cartId: 'any_cartId'
    })
  })

  it('Deve retornar erro 404 com mensagem correta se cart não for encontrado', async () => {
    startCheckoutData.perform.mockResolvedValueOnce(null)
    const result = await sut.handle({
      body: {
        cartId: 'any_cartId'
      }
    })

    expect(result).toEqual(error404('Cart not founded'))
  })

  it('Deve retornar erro 500 com mensagem correta createCheckout throws', async () => {
    startCheckoutData.perform.mockImplementationOnce(() => {
      throw new Error('Test Error')
    })
    const result = await sut.handle({
      body: {
        cartId: 'any_cartId'
      }
    })

    expect(result).toEqual(error500('Test Error'))
  })

  it('Deve retornar objeto correto se createCheckout retornar um checkoutObject', async () => {
    const result = await sut.handle({
      body: {
        cartId: 'any_cartId'
      }
    })

    expect(result).toEqual(createsuccessfully<StartCheckoutDomain.Result>({
      checkoutReady: false,
      deliveryAddress: undefined,
      deliveryMethod: undefined,
      id: '123',
      paymentMethod: undefined,
      state: 'initial',
      cart: {
        id: 'any_id',
        produtosDisponiveis: [{
          id: '1',
          nome: 'produto1',
          quantidade: 2,
          valor: 20
        }],
        produtosIndisponiveis: [],
        total: 40
      }
    }))
  })
})
