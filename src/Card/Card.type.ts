export type CardProps = {
  id: number
  card: string
  isFlipped: boolean
  openCardClick: ({ id, card }: { id: number; card: string }) => void
}
