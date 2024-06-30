
import { Container } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
// import { styles } from './App.ts'
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

function App() {

  const [listOfCard, setListOfCard] = useState(() => dataStatic())
  let ref = useRef(null)
  const setListFunction = (id, flippedStatus, finishStatus = false) => ({
    [id]: {
      id: id,
      card: listOfCard[id].card,
      isFinish: finishStatus,
      isFlipped: flippedStatus
    }
  })

  const openCard = useCallback(({ id, card } : { id: number, card: string}) => {
    if(ref.current === null) {
      ref.current = id
      const object = setListFunction(id, true)
      setListOfCard(prevState => ({
        ...prevState,
        ...object
      }))
    } else if (listOfCard[ref.current].card !== listOfCard[id].card) {
      const object = setListFunction(id, true)
      setListOfCard(prevState => ({
        ...prevState,
        ...object
      }))
      setTimeout(() => {
        const currentId = ref.current
        ref.current = null
        const object = setListFunction(id, false)
        const object2 = setListFunction(currentId, false)
        setListOfCard((prevState) => (
          {
            ...prevState,
            ...object,
            ...object2
          }))
      }, 3000)
    } else if(listOfCard[ref.current].card === listOfCard[id].card) {
      const currentId = ref.current
      ref.current = null
      const object = setListFunction(id, true, true)
      const object2 = setListFunction(currentId, true, true)
      setListOfCard((prevState) => (
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
