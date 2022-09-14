export type billingTypes= {
  id: string
  method: string
}

export type creditCardTypes = {
  name: string,
  number: string,
  code: string
  experationDate: string
  installments: number
}

export interface paymentMethods {
  billing: billingTypes
  creditCard: creditCardTypes
}
