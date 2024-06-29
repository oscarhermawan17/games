import { useEffect, memo } from 'react';
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
  cursor: 'pointer'
});

const CardBack = styled(CardFace)({
  backgroundColor: '#4caf50',
  transform: 'rotateY(180deg)',
});


type CardInfo = {
  id: number
  card: string
  isFinish: boolean,
  isFlipped: boolean,
  openCardClick: ({id, card }: { id: number, card: string }) => void
}

const Card = ({ id, card, isFinish, isFlipped, openCardClick }: CardInfo) => {
  useEffect(() => {
  }, [])


  return (
    <CardContent onClick={() => openCardClick({ id, card })} flipped={isFlipped}>
      <CardFront>Default</CardFront>
      <CardBack>{card}</CardBack>
    </CardContent>
  )
}

export default memo(Card)