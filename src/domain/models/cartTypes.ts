
type cartProduct = {
  id: string,
  nome: string,
  valor: number
  quantidade: number
}

export interface cartTypes {
  id: string
  produtosDisponiveis: cartProduct[],
  produtosIndisponiveis: cartProduct[]
  total: number
}
