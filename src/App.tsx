
import { Container } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';

// import { styles } from './App.ts'
import Card from './Card/Card'
import { useState, useCallback, useMemo } from 'react';


const dataStatic = () => {
  const data: any = {}
  for(let i=0; i<8; i++) {
    data[i] = {
      id: i,
      card: i%2 == 0 ? i : i-1,
      isFinish: false,
      isFlipped: false
    }
  }
  return data;
}

function App() {

  const [listOfCard, setListOfCard] = useState(() => dataStatic())
  const [tmpValueId, setTmpValueId] = useState(null)

  console.log('luar', tmpValueId)

  const openCard = useCallback(({ id, card } : { id: number, card: string}) => {
    if(tmpValueId === null) {
      setListOfCard((prevState) => (
        {
          ...prevState,
          [id]: {
            id: id,
            card: card,
            isFinish: false,
            isFlipped: true
          }
        }))
        setTmpValueId(id)
    } else if (listOfCard[tmpValueId].card !== listOfCard[id].card) {
      console.log('ELSE IF')
      setListOfCard((prevState) => (
        {
          ...prevState,
          [id]: {
            id: id,
            card: card,
            isFinish: false,
            isFlipped: true
          }
        }))
      setTimeout(() => {
        setTmpValueId(null)
        setListOfCard((prevState) => (
          {
            ...prevState,
            [id]: {
              id: id,
              card: card,
              isFinish: false,
              isFlipped: false
            },
            [tmpValueId]: {
              id: tmpValueId,
              card: listOfCard[tmpValueId].card,
              isFinish: false,
              isFlipped: false
            }
          }))
      }, 4000)
    }   
  }, [tmpValueId])

  return (
    <Container>
      <Grid container spacing={2}>
        {
          Object.keys(listOfCard).map(key => (
            <Grid xs={1.5} key={key}>
              <Card
                id={listOfCard[key].id}
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
