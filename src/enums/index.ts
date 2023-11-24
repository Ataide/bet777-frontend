export enum BetType {
  Unica = "Única",
  Multipla = "Múltipla",
}

export enum TransactionType {
  deposit = "Depósito",
  withdraw = "Saque",
}

export enum TransactionStatus {
  pending = "Pendente",
  canceled = "Cancelado",
  aproved = "Aprovado",
}

export enum BetResult {
  Vitoria = 1,
  Aberto = 0,
  Derrota = -1,
}
