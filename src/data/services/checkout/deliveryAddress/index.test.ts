import { mock, MockProxy } from 'jest-mock-extended'
import { DeliveryAddressData } from '.'
import { DeliveryAddressDomain } from '../../../../domain/features/checkout/address'
import { cartTypes } from '../../../../domain/models/cartTypes'
import { checkoutObject, stateTypes } from '../../../../domain/models/checkoutObject'
import { checkoutIsInProgressInfra } from '../../../contracts/checkoutObject/checkIsInProgress'
import { SaveCheckoutInfra } from '../../../contracts/checkoutObject/save'
import { getDeliveryMethodsInfra } from '../../../contracts/deliveryMethods/getDeliveryMethods'

describe('DeliveryAddressData tests', () => {
  let sut: DeliveryAddressDomain
  let checkoutIsInProgress: MockProxy<checkoutIsInProgressInfra>
  let saveCheckout: MockProxy<SaveCheckoutInfra>
  let getDeliveryMethods: MockProxy<getDeliveryMethodsInfra>
  const sutParams = {
    cartId: 'any_cartId',
    address: {
      city: 'any_city',
      neighborhood: 'any_neighborhood',
      number: 123,
      postalCode: '36170000',
      state: 'any_state',
      street: 'any_street'
    }
  }

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
    checkoutIsInProgress = mock()
    saveCheckout = mock()
    getDeliveryMethods = mock()
  })

  beforeEach(() => {
    checkoutIsInProgress.perform.mockResolvedValue(checkoutInProgressMock)
    getDeliveryMethods.perform.mockResolvedValue({ deliveryMethods: [deliveryMethod] })
    sut = new DeliveryAddressData(checkoutIsInProgress, saveCheckout, getDeliveryMethods)
  })
  it('Deve chamar checkoutIsInProgress com parametros corretos', async () => {
    await sut.perform(sutParams)
    expect(checkoutIsInProgress.perform).toHaveBeenCalledTimes(1)
    expect(checkoutIsInProgress.perform).toHaveBeenCalledWith({ cartId: sutParams.cartId })
  })

  it('Deve rethrow se checkoutIsInProgress throws', async () => {
    checkoutIsInProgress.perform.mockImplementationOnce(() => {
      throw new Error('Test Error')
    })
    const promise = sut.perform(sutParams)
    expect(promise).rejects.toThrowError('Test Error')
  })

  it('Deve throw um Error com mensagem correta se checkoutIsInProgress retornar null ', async () => {
    checkoutIsInProgress.perform.mockResolvedValueOnce(null)
    const promise = sut.perform(sutParams)
    expect(promise).rejects.toThrowError('Incorrect step, try /create')
  })

  it('Deve chamar saveCheckout com parametros corretos', async () => {
    await sut.perform(sutParams)
    expect(saveCheckout.perform).toHaveBeenCalledTimes(1)
    expect(saveCheckout.perform).toHaveBeenCalledWith({ checkoutObject: { cart: {}, checkoutReady: false, deliveryAddress: { city: 'any_city', neighborhood: 'any_neighborhood', number: 123, postalCode: '36170000', state: 'any_state', street: 'any_street' }, deliveryMethod: undefined, id: 'any_id', nextStep: { endPoint: '/delivery', method: 'POST' }, paymentMethod: undefined, state: 'delivery' } })
  })

  it('Deve rethrow se saveCheckout throws', async () => {
    saveCheckout.perform.mockImplementationOnce(() => {
      throw new Error('Test Error')
    })
    const promise = sut.perform(sutParams)
    expect(promise).rejects.toThrowError('Test Error')
  })

  it('Deve chamar getDeliveryMethods com parametros corretos', async () => {
    await sut.perform(sutParams)
    expect(getDeliveryMethods.perform).toHaveBeenCalledTimes(1)
    expect(getDeliveryMethods.perform).toHaveBeenCalledWith({
      address:
      {
        city: 'any_city',
        neighborhood: 'any_neighborhood',
        number: 123,
        postalCode: '36170000',
        state: 'any_state',
        street: 'any_street'
      }
    })
  })

  it('Deve rethrow se getDeliveryMethods throws', async () => {
    getDeliveryMethods.perform.mockImplementationOnce(() => {
      throw new Error('Test Error')
    })
    const promise = sut.perform(sutParams)
    expect(promise).rejects.toThrowError('Test Error')
  })

  it('Se todos os passos anteriores derem certo, deve retornar dados corretos', async () => {
    const result = await sut.perform(sutParams)
    expect(result).toEqual({
      checkoutObject: {
        cart: {},
        checkoutReady: false,
        deliveryAddress: {
          city: 'any_city',
          neighborhood: 'any_neighborhood',
          number: 123,
          postalCode: '36170000',
          state: 'any_state',
          street: 'any_street'
        },
        deliveryMethod: undefined,
        id: 'any_id',
        nextStep: {
          endPoint: '/delivery',
          method: 'POST'
        },
        paymentMethod: undefined,
        state: 'delivery'
      },
      deliveryMethods: [deliveryMethod]
    })
  })
})
