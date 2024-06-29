import { styled } from '@mui/system';

const CardContent = styled('div')(({ flipped }: { flipped : boolean}) => ({
  width: '100%',
  color: 'white',
  height: 100,
  borderRadius: 10,
  transformStyle: 'preserve-3d',
  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  transition: 'transform 0.6s',
}))

const CardFace = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '24px',
  color: '#fff',
  borderRadius: '10px',
});

const CardFront = styled(CardFace)({
  backgroundColor: '#ff6f61',
});

const CardBack = styled(CardFace)({
  backgroundColor: '#4caf50',
  transform: 'rotateY(180deg)',
});


type CardInfo = {
  card: string
  isFinish: boolean,
  isFlipped: boolean,
  openCardClick: (card: string) => void
}

const Card = ({ card, isFinish, isFlipped, openCardClick }: CardInfo) => {
  console.log('card', card)
  return (
    <CardContent onClick={() => openCardClick(card)} flipped={isFlipped}>
      <CardFront>Default</CardFront>
      <CardBack>{card}</CardBack>
    </CardContent>
  )
}

export default Card