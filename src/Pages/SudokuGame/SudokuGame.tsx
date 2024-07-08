import { useState, useRef } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Grid from "@mui/system/Unstable_Grid"
import Modal from '@mui/material/Modal';
import Typography from "@mui/material/Typography"

import type { Board, PosibilitesValue, StepStack } from "./SudokuGameType"
import Styles from './SudokuGameStyles'
import Library, { allZero } from './GameLibrary'

const dataTmp = Library()


function SudokuGame() {
  const [dataList, setDataList] = useState<Board>(dataTmp);
  const [openModal, setOpenModal] = useState(false);
  const [posibilitiesOnModal, setPosibilitiesOnModal] = useState<number[]>([]);
  const coordinate = useRef<[number, number]>([0, 0]);

  const handleClose = () => setOpenModal(false);

  const resetBoard = () => {
    const newBoard = Library();
    console.log('Resetting board to', newBoard);
    setDataList(newBoard);
  };

  const zeroBoard = () => {
    const newZeroBoard = allZero()
    setDataList(newZeroBoard)
  }

  const openFunction = (indexRow: number, indexColom: number) => {
    const setPosibilitiesForModal = findPossibleValues(dataList, indexRow, indexColom)
    setPosibilitiesOnModal(setPosibilitiesForModal)
    coordinate.current = [indexRow, indexColom]
    setOpenModal(true);
  }

  const changeCard = (value: number, indexRow: number, indexColom: number) => {
    const newDataList = [...dataList];
    newDataList[indexRow][indexColom] = value
    setDataList(newDataList);
    handleClose()
  };

  const getAnswer = () => {
    const backTrackingValue = backTracking()
    if(backTrackingValue) {
      setDataList([...backTrackingValue])
    } else {
      alert('Cant solve this games')
    }
  }

  const backTracking = () => {
    const board: Board = [...dataList]
    const emptyPositionList = findEmpty(board);
    let posibilitesValue: PosibilitesValue = {}
    let stepStack: StepStack = []
    let canFix = true

    outerLoop: for(let row = 0; row < 9; row++) {
      for(let col = 0; col < 9; col++) {
        if(emptyPositionList.includes(`${row},${col}`)) {
          if(!posibilitesValue.hasOwnProperty(`${row},${col}`)) {
            posibilitesValue = {
              ...posibilitesValue,
              [`${row},${col}`]: findPossibleValues(board,row,col)
            }
          }
          const valueNow = posibilitesValue[`${row},${col}`].find((nilai: number) => nilai > board[row][col])

          if(valueNow === undefined) {
            if(stepStack.length === 0) {
              canFix = false
              break outerLoop;
            }
            delete posibilitesValue[`${row},${col}`]
            board[row][col] = 0
            const lastStack = stepStack.length -1
            row = stepStack[lastStack][0]
            col = stepStack[lastStack][1] -1
            stepStack = stepStack.slice(0,-1) as StepStack
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
    const possibleValues = [];
    for (let num = 1; num <= 9; num++) {
      if (isValid(board, num, row, col)) {
        possibleValues.push(num);
      }
    }
    return possibleValues;
  }

  function isValid(board: Board, num: number, row: number, col: number) {
    // Periksa baris
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) {
        return false;
      }
    }

    // Periksa kolom
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) {
        return false;
      }
    }

    // Periksa kotak 3x3
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[startRow + r][startCol + c] === num) {
          return false;
        }
      }
    }
    return true;
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
    return empty;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="body1" sx={Styles.containerTypography}>
        Solving your sudoku game
      </Typography>

      <Grid container spacing={1} sx={Styles.gridContainer}>
        {dataList.map((dataPerRow: number[], indexRow: number) => {
          return dataPerRow.map((dataPerColom: number, indexColom: number) => {
            const key = `${indexRow}-${indexColom}`;
            return (
              <Grid xs={1.33} md={1.33} key={key}>
                <Box sx={Styles.boxContent}>
                  <div
                    style={{
                      width: "100%",
                      border: 'none',
                      borderColor: 'transparent',
                      outline: 'none',
                      textAlign: 'center'
                    }}
                    onClick={() => openFunction(indexRow, indexColom)}
                  >
                    {dataPerColom}
                  </div>
                </Box>
              </Grid>
            );
          });
        })}
      </Grid>
      <Box sx={Styles.boxButton}>
        <Button variant="contained" onClick={zeroBoard}>Zero Board</Button> &nbsp;
        <Button variant="contained" onClick={getAnswer}>Get Answer</Button> &nbsp;
        <Button variant="contained" onClick={() => alert('Still Work In Progress')}>Check</Button> &nbsp;
        <Button variant="contained" onClick={resetBoard}>Change</Button>
      </Box>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid container spacing={2} sx={Styles.grid}>
          <Grid xs={12}>
            <Typography
              variant="body1"
              sx={Styles.modalTypography}
            >
              Choose your number
            </Typography>
          </Grid>

          {posibilitiesOnModal.map((value => (
            <Grid xs={4} md={1.33} key={value}>
              <Box sx={Styles.boxpossibilities}
                onClick={() => changeCard(value, coordinate.current[0], coordinate.current[1])}
              >
                {value}
              </Box>
            </Grid>
            
          )))}
        </Grid>
      </Modal>
    </Container>
  )
}

export default SudokuGame;