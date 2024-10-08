import { useState, useRef, useEffect } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Grid from "@mui/system/Unstable_Grid"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import useMediaQuery from "@mui/material/useMediaQuery"

import imageWin from "../../assets/MyWife.jpeg"
import type { Board, PosibilitesValue, StepStack } from "./SudokuGameType"
import Styles from "./SudokuGameStyles"
import Library, { allZero } from "./GameLibrary"

const dataTmp = Library()

function SudokuGame() {
  const [dataList, setDataList] = useState<Board>(dataTmp)
  const [openModal, setOpenModal] = useState(false)
  const [modalGame, setModalGame] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [posibilitiesOnModal, setPosibilitiesOnModal] = useState<number[]>([])
  const [emptyPosition, setEmptyPosition] = useState<string[]>([])
  const coordinate = useRef<[number, number]>([0, 0])

  const isDesktop = useMediaQuery("(min-width:1080px)")

  useEffect(() => {
    const empty = findEmpty(dataList)
    setEmptyPosition([...empty])
  }, [])

  useEffect(() => {
    if (isGameOver) {
      setTimeout(() => setModalGame(true), 1500)
    }
  }, [isGameOver])

  useEffect(() => {
    const empty = findEmpty(dataList)
    if (empty.length === 0) setIsGameOver(true)
  }, [dataList])

  const handleClose = () => setOpenModal(false)

  const resetBoard = () => {
    const newBoard = Library()
    const empty = findEmpty([...newBoard])
    setEmptyPosition([...empty])
    setDataList(newBoard)
  }

  const zeroBoard = () => {
    const newZeroBoard = allZero()
    const empty = findEmpty([...newZeroBoard])
    setEmptyPosition([...empty])
    setDataList(newZeroBoard)
  }

  const openFunction = (indexRow: number, indexColom: number) => {
    const setPosibilitiesForModal = findPossibleValues(
      dataList,
      indexRow,
      indexColom
    )
    setPosibilitiesOnModal([0, ...setPosibilitiesForModal])
    coordinate.current = [indexRow, indexColom]
    setOpenModal(true)
  }

  const changeCard = (value: number, indexRow: number, indexColom: number) => {
    const newDataList = [...dataList]
    newDataList[indexRow][indexColom] = value
    setDataList(newDataList)
    handleClose()
  }

  const getAnswer = () => {
    const backTrackingValue = backTracking()
    if (backTrackingValue) {
      setDataList([...backTrackingValue])
    } else {
      alert("Cant solve this games")
    }
  }

  // function checkGame() {
  //   alert("This feature still in Progress")
  // }

  const backTracking = () => {
    const board: Board = [...dataList]
    let posibilitesValue: PosibilitesValue = {}
    const emptyOnBackTrackingFunc = findEmpty(board)
    console.log("emptyOnBackTrackingFunc", emptyOnBackTrackingFunc)
    let stepStack: StepStack = []
    let canFix = true

    outerLoop: for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (emptyOnBackTrackingFunc.includes(`${row},${col}`)) {
          if (!posibilitesValue.hasOwnProperty(`${row},${col}`)) {
            posibilitesValue = {
              ...posibilitesValue,
              [`${row},${col}`]: findPossibleValues(board, row, col),
            }
          }
          const valueNow = posibilitesValue[`${row},${col}`].find(
            (nilai: number) => nilai > board[row][col]
          )

          if (valueNow === undefined) {
            if (stepStack.length === 0) {
              canFix = false
              break outerLoop
            }
            delete posibilitesValue[`${row},${col}`]
            board[row][col] = 0
            const lastStack = stepStack.length - 1
            row = stepStack[lastStack][0]
            col = stepStack[lastStack][1] - 1
            stepStack = stepStack.slice(0, -1) as StepStack
          } else {
            board[row][col] = valueNow
            stepStack = [...stepStack, [row, col]] as StepStack
          }
        }
      }
    }
    return canFix ? [...board] : false
  }

  function findPossibleValues(board: Board, row: number, col: number) {
    const possibleValues = []
    for (let num = 1; num <= 9; num++) {
      if (isValid(board, num, row, col)) {
        possibleValues.push(num)
      }
    }
    return possibleValues
  }

  function isValid(board: Board, num: number, row: number, col: number) {
    // Periksa baris
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) {
        return false
      }
    }

    // Periksa kolom
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) {
        return false
      }
    }

    // Periksa kotak 3x3
    const startRow = Math.floor(row / 3) * 3
    const startCol = Math.floor(col / 3) * 3
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[startRow + r][startCol + c] === num) {
          return false
        }
      }
    }
    return true
  }

  const findEmpty = (board: Board) => {
    const empty = []
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          empty.push(`${row},${col}`)
        }
      }
    }
    return empty
  }

  return (
    <Container maxWidth="md">
      <Typography variant="body1" sx={Styles.containerTypography}>
        Solving your sudoku game
      </Typography>
      <Box sx={Styles.boxButton}>
        <Button variant="contained" color="error" onClick={zeroBoard}>
          0 Board
        </Button>{" "}
        &nbsp;&nbsp;
        <Button variant="contained" color="warning" onClick={resetBoard}>
          Next
        </Button>
        &nbsp;&nbsp;
        <Button variant="contained" color="success" onClick={getAnswer}>
          Answer
        </Button>
        &nbsp;&nbsp;
      </Box>
      <Grid container spacing={0} sx={Styles.gridContainer}>
        {dataList.map((dataPerRow: number[], indexRow: number) => {
          return dataPerRow.map((dataPerColom: number, indexColom: number) => {
            const emptyCard = emptyPosition.includes(
              `${indexRow},${indexColom}`
            )
            const key = `${indexRow}-${indexColom}`
            const isEndOfRow = (indexColom + 1) % 3 === 0 && indexColom < 8
            const isEndOfColumn = (indexRow + 1) % 3 === 0 && indexRow < 8
            return (
              <Grid
                xs={1.33}
                md={1.33}
                key={key}
                sx={{
                  borderRight: isEndOfRow ? "2px solid black" : "",
                  borderBottom: isEndOfColumn ? "2px solid black" : "",
                  paddingRight: isEndOfRow ? "6px" : "",
                  paddingBottom: isEndOfColumn ? "6px" : "",
                }}
              >
                <Box sx={Styles.boxContent(emptyCard)}>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      borderColor: "#ccc",
                      outline: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() =>
                      emptyCard ? openFunction(indexRow, indexColom) : null
                    }
                  >
                    {dataPerColom ? dataPerColom : ""}
                  </div>
                </Box>
              </Grid>
            )
          })
        })}
      </Grid>
      {/* <Box sx={Styles.boxButton}>
        <Button variant="contained" onClick={checkGame}>
          Check
        </Button>
      </Box> */}

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={Styles.modal}
      >
        <Grid container spacing={2} sx={Styles.grid(isDesktop)}>
          <Grid xs={12}>
            <Typography variant="body1" sx={Styles.modalTypography}>
              Choose your number
            </Typography>
          </Grid>

          {posibilitiesOnModal.map((value) => (
            <Grid xs={2.4} key={value}>
              <Box
                sx={Styles.boxpossibilities}
                onClick={() =>
                  changeCard(
                    value,
                    coordinate.current[0],
                    coordinate.current[1]
                  )
                }
              >
                {value}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Modal>

      <Modal
        open={modalGame}
        onClose={() => setModalGame(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box
            sx={{
              margin: "0 auto",
              width: 300,
              padding: "8px",
              backgroundColor: "white",
            }}
          >
            <img
              src={imageWin}
              style={{
                maxWidth: `100%`,
              }}
              alt={"MyWife"}
              loading="lazy"
            />
            <Box
              sx={{
                marginTop: "20px",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: 22 }}>You win</p>
              <p>
                This game is for My Wife{" "}
                <a
                  style={{ textDecoration: "none" }}
                  href="https://www.instagram.com/lestariidewi/"
                >
                  @lestariidewi
                </a>
              </p>
              <Button
                variant="contained"
                color="success"
                onClick={() => location.reload()}
              >
                OK
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Container>
  )
}

export default SudokuGame
