type Card = {
  id: number
  card: string
  isFlipped: boolean
}

export type CardCollection = {
  [key: string]: Card
}
