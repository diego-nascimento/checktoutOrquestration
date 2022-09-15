import { StartCheckoutData } from '.'

import { mock, MockProxy } from 'jest-mock-extended'
import { StartCheckoutDomain } from 'domain/features/checkout/start'
import { checkoutIsInProgressInfra } from 'data/contracts/checkoutObject/checkIsInProgress'
import { findCartInfra } from 'data/contracts/cart/findCart'
import { SaveCheckoutInfra } from 'data/contracts/checkoutObject/save'
import { addressTypes } from 'domain/models/address'
import { deliveryMethodsTypes } from 'domain/models/deliveryMethods'
import { paymentMethodTypes } from 'domain/models/checkoutObject'
import { cartTypes } from 'domain/models/cartTypes'

describe('StartCheckoutData tests', () => {
  let sut: StartCheckoutDomain
  let checkoutIsInProgress: MockProxy<checkoutIsInProgressInfra>
  let findCartInfra: MockProxy<findCartInfra>
  let saveCheckout: MockProxy<SaveCheckoutInfra>

  beforeAll(() => {
    checkoutIsInProgress = mock()
    findCartInfra = mock()
    saveCheckout = mock()

    checkoutIsInProgress.perform.mockResolvedValue(null)
    findCartInfra.perform.mockResolvedValue({
      id: 'any_id',
      produtosDisponiveis: [{
        id: '1',
        nome: 'produto1',
        quantidade: 2,
        valor: 20
      }],
      produtosIndisponiveis: [],
      total: 40
    })
  })

  beforeEach(() => {
    sut = new StartCheckoutData(checkoutIsInProgress, findCartInfra, saveCheckout)
  })
  it('Deve chamar checkoutIsInProgress com parametros corretos', async () => {
    await sut.perform({
      cartId: 'any_cartId'
    })
    expect(checkoutIsInProgress.perform).toHaveBeenCalledTimes(1)
    expect(checkoutIsInProgress.perform).toHaveBeenCalledWith({
      cartId: 'any_cartId'
    })
  })

  it('Deve retornar um checkoutObject se checkoutIsInProgress encontrar um checkout em andamento', async () => {
    checkoutIsInProgress.perform.mockResolvedValueOnce({
      id: 'any_id',
      deliveryAddress: {} as addressTypes,
      deliveryMethod: {} as deliveryMethodsTypes,
      paymentMethod: {} as paymentMethodTypes,
      cart: {} as cartTypes

    })
    const result = await sut.perform({
      cartId: 'any_cartId'
    })
    expect(result).toEqual({
      id: 'any_id',
      checkoutReady: true,
      deliveryAddress: {},
      deliveryMethod: {},
      paymentMethod: {},
      state: 'ready',
      cart: {} as cartTypes,
      nextStep: {
        endPoint: '/ready',
        method: 'POST'
      }
    })
  })

  it('Deve chamar findCartInfra com parametros corretos', async () => {
    await sut.perform({
      cartId: 'any_cartId'
    })

    expect(findCartInfra.perform).toHaveBeenCalledTimes(1)
    expect(findCartInfra.perform).toHaveBeenCalledWith({
      cartId: 'any_cartId'
    })
  })

  it('Deve retornar null se findCartInfra não encontrar um carrinho', async () => {
    findCartInfra.perform.mockResolvedValueOnce(null)
    const result = await sut.perform({
      cartId: 'any_cartId'
    })

    expect(result).toBeNull()
  })

  it('Deve chamar saveCheckout com parametros corretos', async () => {
    await sut.perform({
      cartId: 'any_cartId'
    })

    expect(saveCheckout.perform).toHaveBeenCalledTimes(1)
    expect(saveCheckout.perform).toHaveBeenCalledWith({
      checkoutObject: {
        cart: {
          id: 'any_id',
          produtosDisponiveis: [
            {
              id: '1',
              nome: 'produto1',
              quantidade: 2,
              valor: 20
            }],

          produtosIndisponiveis: [],
          total: 40
        },
        checkoutReady: false,
        nextStep: {
          endPoint: '/address',
          method: 'POST'
        },
        state: 'initial'
      }
    })
  })

  it('Deve rethrow o throw seguindo se se alguma saveCheckout throws', async () => {
    saveCheckout.perform.mockImplementationOnce(() => {
      throw new Error('Test Error')
    })
    const promise = sut.perform({
      cartId: 'any_cartId'
    })

    expect(promise).rejects.toThrow()
  })

  it('Deve rethrow o throw seguindo se se alguma findCartInfra throws', async () => {
    findCartInfra.perform.mockImplementationOnce(() => {
      throw new Error('Test Error')
    })
    const promise = sut.perform({
      cartId: 'any_cartId'
    })

    expect(promise).rejects.toThrow()
  })

  it('Deve rethrow o throw seguindo se se alguma checkoutIsInProgress throws', async () => {
    checkoutIsInProgress.perform.mockImplementationOnce(() => {
      throw new Error('Test Error')
    })
    const promise = sut.perform({
      cartId: 'any_cartId'
    })

    expect(promise).rejects.toThrow()
  })
  it('Deve retornar um checkoutObject se  saveCheckout salvar corretamente', async () => {
    saveCheckout.perform.mockResolvedValueOnce({
      id: 'any_id',
      checkoutReady: false,
      deliveryAddress: undefined,
      deliveryMethod: undefined,
      paymentMethod: undefined,
      state: 'initial',
      cart: {} as cartTypes
    })
    const response = await sut.perform({
      cartId: 'any_cartId'
    })

    expect(response).toEqual({
      id: 'any_id',
      checkoutReady: false,
      deliveryAddress: undefined,
      deliveryMethod: undefined,
      paymentMethod: undefined,
      state: 'initial',
      cart: {} as cartTypes
    })
  })
})
