export type CardProps = {
  id: number
  card: string
  isFlipped: boolean
  openCardClick: (id: number) => void
}
