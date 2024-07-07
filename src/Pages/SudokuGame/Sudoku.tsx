import { useRef, useEffect } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Grid from "@mui/system/Unstable_Grid"
import Typography from "@mui/material/Typography"

type Row = string[];

type DataTmp = Row[];

type InputRefs = {
  [key: string]: HTMLInputElement | null;
};

const dataTmp = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

function Sudoku() {
  const dataRef = useRef({ dataList: dataTmp, inputRefs: {} });

  const changeCard = (target, indexRow, indexColom) => {
    const newDataList = [...dataRef.current.dataList];
    console.log(Number(target.value))
    newDataList[indexRow][indexColom] = Number(target.value)
    console.log(newDataList)
    dataRef.current.dataList = newDataList;
  };

  const handleClickFocus = (indexRow, indexColom) => {
    const key = `${indexRow}-${indexColom}`;
    if (dataRef.current.inputRefs[key]) {
      dataRef.current.inputRefs[key].focus();
    }
  };

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
    console.log('Final = ', dataRef.current.dataList)
    console.log(canFix)
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

  useEffect(() => {
    // This effect runs only once, so it doesn't trigger re-renders
  }, []);


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
        {dataRef.current.dataList.map((dataPerRow, indexRow) => {
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
                  }}
                  onClick={() => handleClickFocus(indexRow, indexColom)}
                >
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      border: 'none',
                      borderColor: 'transparent',
                      outline: 'none',
                      textAlign: 'center'
                    }}
                    ref={(el) => (dataRef.current.inputRefs[key] = el)}
                    defaultValue={dataPerColom}
                    onChange={(event) => changeCard(event.target, indexRow, indexColom)}
                  />
                </Box>
              </Grid>
            );
          });
        })}
      </Grid>
      <Box sx={{ marginTop: 3, textAlign: 'center' }}>
        <Button variant="contained" onClick={backTracking}>Get Answer</Button> &nbsp;
        <Button variant="contained" onClick={() => alert('Still Work In Progress')}>Check</Button>
      </Box>
    </Container>
  )
}

export default Sudoku;