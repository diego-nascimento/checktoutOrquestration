import { checkoutIsInProgressInfra } from 'data/contracts/checkoutObject/checkIsInProgress'

export class CheckIsInProgressCreate implements checkoutIsInProgressInfra {
  async perform (data: checkoutIsInProgressInfra.params): Promise<checkoutIsInProgressInfra.result> {
    return Promise.resolve(null)
  }
}
