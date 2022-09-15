import { mock, MockProxy } from 'jest-mock-extended'
import { DeliverAddressPresentation } from '.'
import { DeliveryAddressDomain } from '../../../domain/features/ address/deliveryAddress'
import { cartTypes } from '../../../domain/models/cartTypes'
import { checkoutObject, stateTypes } from '../../../domain/models/checkoutObject'
import { error400 } from '../../handleHttpResponses/400Error'
import { error500 } from '../../handleHttpResponses/500Error'
import { ControllerProtocol } from '../../protocols/controllerProtocols'

describe('deliverAddressPresentation tests', () => {
  let sut: ControllerProtocol
  let DeliveryAddress: MockProxy<DeliveryAddressDomain>
  const checkoutInProgressMock: checkoutObject = {
    id: 'any_id',
    checkoutReady: false,
    deliveryAddress: undefined,
    deliveryMethod: undefined,
    paymentMethod: undefined,
    state: 'initial' as stateTypes,
    cart: {} as cartTypes,
    nextStep: {
      endPoint: '/address',
      method: 'POST'
    }
  }
  const deliveryMethod = { id: 'any_id', method: 'sedex', value: 123 }

  beforeAll(() => {
    DeliveryAddress = mock()
  })

  beforeEach(() => {
    sut = new DeliverAddressPresentation(DeliveryAddress)
  })
  it('Deve retornar erro 400 com mensagem correta se cartId não for enviado', async () => {
    const result = await sut.handle({
      body: {}
    })

    expect(result).toEqual(error400('Field cartId is required'))
  })

  it('Deve retornar erro 400 com mensagem correta se address não for enviado', async () => {
    const result = await sut.handle({
      body: {
        cartId: 'any_cardId'
      }
    })

    expect(result).toEqual(error400('Field address is required'))
  })

  it('Deve retornar erro 400 com mensagem correta se o campo street de address não for enviado', async () => {
    const result = await sut.handle({
      body: {
        cartId: 'any_cardId',
        address: {
          city: 'any_city',
          neighborhood: 'any_neighborhood',
          number: 123,
          postalCode: '36170000',
          state: 'any_state'

        }
      }
    })

    expect(result).toEqual(error400('Address field street is required'))
  })

  it('Deve retornar erro 400 com mensagem correta se o campo number de address não for enviado', async () => {
    const result = await sut.handle({
      body: {
        cartId: 'any_cardId',
        address: {
          city: 'any_city',
          neighborhood: 'any_neighborhood',
          postalCode: '36170000',
          state: 'any_state',
          street: 'any_street'
        }
      }
    })

    expect(result).toEqual(error400('Address field number is required'))
  })

  it('Deve retornar erro 400 com mensagem correta se o campo neighborhood de address não for enviado', async () => {
    const result = await sut.handle({
      body: {
        cartId: 'any_cardId',
        address: {
          city: 'any_city',
          number: 12,
          postalCode: '36170000',
          state: 'any_state',
          street: 'any_street'
        }
      }
    })

    expect(result).toEqual(error400('Address field neighborhood is required'))
  })

  it('Deve retornar erro 400 com mensagem correta se o campo postalCode de address não for enviado', async () => {
    const result = await sut.handle({
      body: {
        cartId: 'any_cardId',
        address: {
          city: 'any_city',
          number: 12,
          neighborhood: 'any_neighborhood',
          state: 'any_state',
          street: 'any_street'
        }
      }
    })

    expect(result).toEqual(error400('Address field postalCode is required'))
  })

  it('Deve retornar erro 400 com mensagem correta se o campo city de address não for enviado', async () => {
    const result = await sut.handle({
      body: {
        cartId: 'any_cardId',
        address: {
          number: 12,
          postalCode: 123,
          neighborhood: 'any_neighborhood',
          state: 'any_state',
          street: 'any_street'
        }
      }
    })

    expect(result).toEqual(error400('Address field city is required'))
  })

  it('Deve retornar erro 400 com mensagem correta se o campo state de address não for enviado', async () => {
    const result = await sut.handle({
      body: {
        cartId: 'any_cardId',
        address: {
          number: 12,
          postalCode: 123,
          city: 'any_city',
          neighborhood: 'any_neighborhood',
          street: 'any_street'
        }
      }
    })

    expect(result).toEqual(error400('Address field state is required'))
  })

  it('Deve chamar DeliveryAddress com parametros corretos', async () => {
    await sut.handle({
      body: {
        cartId: 'any_cardId',
        address: {
          number: 12,
          postalCode: 123,
          city: 'any_city',
          neighborhood: 'any_neighborhood',
          street: 'any_street',
          state: 'any_state'
        }
      }
    })

    expect(DeliveryAddress.perform).toHaveBeenCalledTimes(1)
    expect(DeliveryAddress.perform).toHaveBeenCalledWith({
      cartId: 'any_cardId',
      address: {
        number: 12,
        postalCode: 123,
        city: 'any_city',
        neighborhood: 'any_neighborhood',
        street: 'any_street',
        state: 'any_state'
      }
    })
  })

  it('Deve retornar error500 se DeliveryAddress throws', async () => {
    DeliveryAddress.perform.mockImplementationOnce(() => {
      throw new Error('Test Error')
    })
    const response = await sut.handle({
      body: {
        cartId: 'any_cardId',
        address: {
          number: 12,
          postalCode: 123,
          city: 'any_city',
          neighborhood: 'any_neighborhood',
          street: 'any_street',
          state: 'any_state'
        }
      }
    })

    expect(response).toEqual(error500('Test Error'))
  })

  it('Deve retornar correct data goes right', async () => {
    DeliveryAddress.perform.mockResolvedValueOnce({
      checkoutObject: checkoutInProgressMock,
      deliveryMethods: [deliveryMethod]
    })
    const response = await sut.handle({
      body: {
        cartId: 'any_cardId',
        address: {
          number: 12,
          postalCode: 123,
          city: 'any_city',
          neighborhood: 'any_neighborhood',
          street: 'any_street',
          state: 'any_state'
        }
      }
    })

    expect(response).toEqual({
      body: {
        checkoutObject: {
          cart: {},
          checkoutReady: false,
          deliveryAddress: undefined,
          deliveryMethod: undefined,
          id: 'any_id',
          nextStep: {
            endPoint: '/address',
            method: 'POST'
          },
          paymentMethod: undefined,
          state: 'initial'
        },
        deliveryMethods: [
          {
            id: 'any_id',
            method: 'sedex',
            value: 123
          }
        ]
      },
      statusCode: 201
    })
  })
})
