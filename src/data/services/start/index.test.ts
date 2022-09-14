import { StartCheckoutData } from '.'

import { mock, MockProxy } from 'jest-mock-extended'
import { StartCheckoutDomain } from '../../../domain/features/start'
import { checkoutIsInProgressDomain } from '../../contracts/checkoutObject/checkIsInProgress'
import { findCartInfra } from '../../../domain/features/cart/findCart'
import { SaveCheckoutInfra } from '../../contracts/checkoutObject/save'
import { addressTypes } from '../../../domain/protocols/address'
import { deliveryMethodsTypes } from '../../../domain/protocols/deliveryMethods'
import { paymentMethodTypes } from '../../../domain/protocols/checkoutObject'
import { cartTypes } from '../../../domain/protocols/cartTypes'

describe('StartCheckoutData tests', () => {
  let sut: StartCheckoutDomain
  let checkoutIsInProgress: MockProxy<checkoutIsInProgressDomain>
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
      cart: {} as cartTypes
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
        state: 'initial'
      }
    })
  })
})
