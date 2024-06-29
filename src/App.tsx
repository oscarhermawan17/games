
import { Container } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';

// import { styles } from './App.ts'
import Card from './Card/Card'
import { useState } from 'react';


const dataStatic = () => {
  const data: any = {}
  for(let i=0; i<8; i++) {
    data[i] = {
      card: i,
      isFinish: false,
      isFlipped: false
    }
  }
  return data;
}

type CardInfo = {
  card: string
  isFinish: boolean,
  isFlipped: boolean
}

function App() {

  const [listOfCard, setListOfCard] = useState(() => dataStatic())
  
  const openCard = (card: string) => {
    setListOfCard((prevState) => (
      {
        ...prevState,
        [card]: {
          card: card,
          isFinish: false,
          isFlipped: true
        }
      }))
  }

  return (
    <Container>
      <Grid container spacing={2}>
        {
          Object.keys(listOfCard).map(key => (
            <Grid xs={1.5} key={key}>
              <Card
                card={listOfCard[key].card}
                isFinish={listOfCard[key].isFinish}
                isFlipped={listOfCard[key].isFlipped}
                openCardClick={openCard}
              />
            </Grid>
          ))
        }  
      </Grid>
    </Container>  
  )
}

export default App
