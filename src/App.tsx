import React, { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const CardContainer = styled(Box)({
  perspective: '1000px',
});

const Card = styled(Box)(({ flipped }) => ({
  width: '200px',
  height: '300px',
  position: 'relative',
  transformStyle: 'preserve-3d',
  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  transition: 'transform 0.6s',
}));

const CardFace = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '100%',
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

const FlipCard = () => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <CardContainer onClick={handleFlip}>
      <Card flipped={flipped}>
        <CardFront>Front</CardFront>
        <CardBack>Back</CardBack>
      </Card>
    </CardContainer>
  );
};

export default FlipCard;
