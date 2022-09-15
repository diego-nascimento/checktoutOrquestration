import { getDeliveryMethodsInfra } from 'data/contracts/deliveryMethods/getDeliveryMethods'

export class GetDeliveryMethodsInfra implements getDeliveryMethodsInfra {
  async perform (data: getDeliveryMethodsInfra.params): Promise<getDeliveryMethodsInfra.result> {
    return {
      deliveryMethods: [
        {
          id: '1',
          method: 'PAC',
          value: 12
        }, {
          id: '2',
          method: 'SEDEX',
          value: 25
        }
      ]
    }
  }
}
