
import { Container } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import Card from './Card/Card'
import { useState, useCallback, useRef } from 'react';

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

type Card = {
  id: number;
  card: number;
  isFinish: boolean;
  isFlipped: boolean;
}

interface CardCollection {
  [key: string]: Card;
}

function App() {

  const [listOfCard, setListOfCard] = useState(() => dataStatic())
  const ref = useRef<null | number>(null)

  const setListFunction = (id: number, flippedStatus: boolean, finishStatus: boolean = false) => ({
    [id]: {
      id: id,
      card: listOfCard[id].card,
      isFinish: finishStatus,
      isFlipped: flippedStatus
    }
  })

  const openCard = useCallback(({ id, card } : { id: number, card: string}) => {
    console.log('card', card)
    /** Open First Card  (After macthed also) */
    if(ref.current === null) {
      ref.current = id as number;
      const object = setListFunction(id, true)
      setListOfCard((prevState: CardCollection) => ({
        ...prevState,
        ...object
      }))
    /** Open Second Card, But Not match  */
    } else if (listOfCard[ref.current].card !== listOfCard[id].card) {
      const object = setListFunction(id, true)
      setListOfCard((prevState: CardCollection) => ({
        ...prevState,
        ...object
      }))
      setTimeout(() => {
        const currentId = ref.current as number;
        ref.current = null
        const object = setListFunction(id, false)
        const object2 = setListFunction(currentId, false)
        setListOfCard((prevState: CardCollection) => (
          {
            ...prevState,
            ...object,
            ...object2
          }))
      }, 2000)
    /** Open Second Card, and matched  */
    } else if(listOfCard[ref.current].card === listOfCard[id].card) {
      const currentId = ref.current as number;
      ref.current = null
      const object = setListFunction(id, true, true)
      const object2 = setListFunction(currentId, true, true)
      setListOfCard((prevState: CardCollection) => (
        {
          ...prevState,
          ...object,
          ...object2
        }))
    }
  }, [])

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
