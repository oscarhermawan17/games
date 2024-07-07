import { useState, useRef } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Grid from "@mui/system/Unstable_Grid"
import Modal from '@mui/material/Modal';
import Typography from "@mui/material/Typography"

import LibraryGame from './GameLibrary'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  border: '2px solid #fff',
  boxShadow: 24,
};

const dataTmp = LibraryGame()

function SudokuGame() {
  const [dataList, setDataList] = useState(dataTmp);
  const dataRef = useRef({ dataList: dataTmp, inputRefs: {} });
  const [openModal, setOpenModal] = useState(false)
  const [posibilitiesOnModal, setPosibilitiesOnModal] = useState([])
  const coordinate = useRef([])

  const handleClose = () => setOpenModal(false);

  const openFunction = (indexRow, indexColom) => {
    const setPosibilitiesForModal = findPossibleValues(dataList, indexRow, indexColom)
    setPosibilitiesOnModal(setPosibilitiesForModal)
    coordinate.current = [indexRow, indexColom]
    setOpenModal(true);
  }

  const changeCard = (value, indexRow, indexColom) => {
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
    const emptyPositionList = findEmpty(dataRef.current.dataList);
    let posibilitesValue = {}
    let stepStack = []
    let canFix = true

    outerLoop: for(let row = 0; row < 9; row++) {
      for(let col = 0; col < 9; col++) {
        if(emptyPositionList.includes(`${row},${col}`)) {
          if(!posibilitesValue.hasOwnProperty(`${row},${col}`)) {
            posibilitesValue = {
              ...posibilitesValue,
              [`${row},${col}`]: findPossibleValues(dataRef.current.dataList,row,col)
            }
          }
          const valueNow = posibilitesValue[`${row},${col}`].find((nilai: number) => nilai > dataRef.current.dataList[row][col])

          if(valueNow === undefined) {
            if(stepStack.length === 0) {
              canFix = false
              break outerLoop;
            }
            delete posibilitesValue[`${row},${col}`]
            dataRef.current.dataList[row][col] = 0
            const lastStack = stepStack.length -1
            row = stepStack[lastStack][0]
            col = stepStack[lastStack][1] -1
            stepStack = stepStack.slice(0,-1)
          } else {
            dataRef.current.dataList[row][col] = valueNow
            stepStack = [...stepStack, [row, col]]
          }
        }
      }
    }
    return canFix ? dataRef.current.dataList : false
  }

  function findPossibleValues(board, row, col) {
    let possibleValues = [];
    for (let num = 1; num <= 9; num++) {
      if (isValid(board, num, row, col)) {
        possibleValues.push(num);
      }
    }
    return possibleValues;
  }

  function isValid(board, num, row, col) {
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
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[startRow + r][startCol + c] === num) {
          return false;
        }
      }
    }
    return true;
  }

  const findEmpty = (board) => {
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
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          marginTop: 2.5,
        }}
      >
        Solving your sudoku game
      </Typography>

      <Grid container spacing={1} sx={{ backgroundColor: "black", marginTop: 6 }}>
        {dataList.map((dataPerRow, indexRow) => {
          return dataPerRow.map((dataPerColom, indexColom) => {
            const key = `${indexRow}-${indexColom}`;
            return (
              <Grid xs={1.33} md={1.33} key={key}>
                <Box sx={{
                  height: 40,
                  width: '100%',
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
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
      <Box sx={{ marginTop: 3, textAlign: 'center' }}>
        <Button variant="contained" onClick={getAnswer}>Get Answer</Button> &nbsp;
        <Button variant="contained" onClick={() => alert('Still Work In Progress')}>Check</Button>
      </Box>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid container spacing={2} sx={style}>
          <Grid xs={12}>
            <Typography
              variant="body1"
              sx={{
                marginTop: '10px',
                color: 'white',
                textAlign: "center",
              }}
            >
              Choose your number
            </Typography>
          </Grid>

          {posibilitiesOnModal.map((value => (
            <Grid xs={4} md={1.33} key={value}>
              <Box sx={{
                  height: 40,
                  width: '100%',
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
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