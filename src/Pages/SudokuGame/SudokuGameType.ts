export type Board = number[][]

export type LibraryGames = {
  [key: number]: Board
}

export type PosibilitesValue = {
  [key: string]: number[]
}

export type StepStack = number[][]