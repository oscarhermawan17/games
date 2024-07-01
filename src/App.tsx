import { useEffect } from "react"
import { Container } from "@mui/material"
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from "@mui/system/Unstable_Grid"
import Card from "./Card/Card"
import imageWin from '../public/MyWife.jpeg'
import { useState, useCallback, useRef } from "react"

type Card = {
  id: number
  card: string
  isFlipped: boolean
}

type CardCollection = {
  [key: string]: Card
}

const dataStatic = () => {
  const cardDataStatic = [
    1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12,
    12, 13, 13, 14, 14, 15, 15, 16, 16
  ]
  const data: CardCollection = {}
  let i: number = 0
  while (cardDataStatic.length > 0) {
    const getIndexRandom = Math.floor(Math.random() * cardDataStatic.length)
    data[i] = {
      id: i,
      card: cardDataStatic[getIndexRandom].toString(),
      isFlipped: false,
    }
    i++
    cardDataStatic.splice(getIndexRandom, 1)
  }
  return data
}



function App() {
  const [listOfCard, setListOfCard] = useState(() => dataStatic())
  const [isGameOver, setIsGameOver] = useState(false)
  const [modalGame, setModalGame] = useState(false)

  const ref = useRef<null | number>(null)
  const hold = useRef<boolean>(false)
  const totalSolveCard = useRef<number>(0)
  const totalOpenCard = useRef<number>(0)

  useEffect(() => {
    if (isGameOver) {
      setTimeout(() => setModalGame(true), 1500)
    }
  }, [isGameOver])

  const setListFunction = (id: number, flippedStatus: boolean) => ({
    [id]: {
      id: id,
      card: listOfCard[id].card,
      isFlipped: flippedStatus,
    },
  })

  const checkGameIsOver = (currentSolveCard: number) => {
    if (currentSolveCard === Object.keys(listOfCard).length) {
      setIsGameOver(true)
    }
  }

  const openCard = useCallback((id: number) => {
    if (isGameOver || hold.current) {
      return
    }

    /** Open First Card  (After macthed also) */
    if (ref.current === null) {
      ref.current = id as number
      const object = setListFunction(id, true)
      setListOfCard((prevState: CardCollection) => ({
        ...prevState,
        ...object,
      }))
      /** Open Second Card, But Not match  */
    } else if (listOfCard[ref.current].card !== listOfCard[id].card) {
      console.log(hold.current)
      hold.current = true
      const object = setListFunction(id, true)
      setListOfCard((prevState: CardCollection) => ({
        ...prevState,
        ...object,
      }))
      setTimeout(() => {
        const currentId = ref.current as number
        ref.current = null
        const object = setListFunction(id, false)
        const object2 = setListFunction(currentId, false)
        setListOfCard((prevState: CardCollection) => ({
          ...prevState,
          ...object,
          ...object2,
        }))
        hold.current = false
      }, 2000)
      /** Open Second Card, and matched  */
    } else if (listOfCard[ref.current].card === listOfCard[id].card) {
      const currentId = ref.current as number
      ref.current = null
      const object = setListFunction(id, true)
      const object2 = setListFunction(currentId, true)
      setListOfCard((prevState: CardCollection) => ({
        ...prevState,
        ...object,
        ...object2,
      }))
      totalSolveCard.current += 2
    }
    totalOpenCard.current += 1
    checkGameIsOver(totalSolveCard.current)
  }, [])

  return (
    <Container sx={{marginTop: '180px' }}>
      <Grid container spacing={2} >
        {Object.keys(listOfCard).map((key) => (
          <Grid xs={1.5} key={key}>
            <Card
              id={listOfCard[key].id}
              card={listOfCard[key].card}
              isFlipped={listOfCard[key].isFlipped}
              openCardClick={openCard}
            />
          </Grid>
        ))}
      </Grid>

      { /** Modal confirmation, game end or win */}
      <Modal
        open={modalGame}
        onClose={() => setModalGame(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box 
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Box sx={{ 
            margin: '0 auto',
            width: 300,
            padding: '8px', 
            backgroundColor: 'white',
          }}>
            <img
              src={imageWin}
              style={{
                maxWidth:`100%`
              }}
              alt={'MyWife'}
              loading="lazy"
            />
            <Box sx={{
              marginTop: '20px',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: 22}}>You win with total {totalOpenCard.current} clicks.</p>
              <p>This game is for My Wife (@lestaridewi)</p>
              <Button variant="contained" color="success" onClick={() => location.reload()}>Tari CANTIK? YA !!</Button>
            </Box>
        </Box>

        </Box>
        
      </Modal>
    </Container>
  )
}

export default App
