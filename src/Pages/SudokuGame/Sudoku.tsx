import { useState, useRef } from "react"
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
  ["5","3","","","7","","","",""],
  ["6","","","1","9","5","","",""],
  ["","9","8","","","","","6",""],
  ["8","","","","6","","","","3"],
  ["4","","","8","","3","","","1"],
  ["7","","","","2","","","","6"],
  ["","6","","","","","2","8",""],
  ["","","","4","1","9","","","5"],
  ["","","","","8","","","7","9"],
]

function Sudoku() {
  const [dataList, setDataList] = useState<DataTmp>(dataTmp)
  const inputRefs = useRef<InputRefs>({});

  const changeCard = ({ value }: { value: string}, indexRow: number, indexColom: number) => {
    const tmpArray = [...dataList]
    tmpArray[indexRow][indexColom] = value
    setDataList((_) => tmpArray)
  }

  const handleClickFocus = (indexRow: number, indexColom: number) => {
    const key = `${indexRow}-${indexColom}`;
    if (inputRefs.current[key]) {
      inputRefs.current[key].focus();
    }
  };

  const handleDoubleClick = (indexRow: number, indexColom: number) => {
    const tmpArray = [...dataList]
    tmpArray[indexRow][indexColom] = ""
    setDataList((_) => tmpArray)
  };


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

      <Grid container spacing={1} sx={{backgroundColor:"black ", marginTop: 6}}>
        {dataList.map((dataPerRow, indexRow) => {
          return dataPerRow.map((dataPerColom, indexColom) => {
            const key = `${indexRow}-${indexColom}`;
            return (
              <Grid xs={1.33} md={1.33}>
                <Box sx={{
                    height: 40,
                    width: '100%', 
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => handleClickFocus(indexRow, indexColom)}
                  onDoubleClick={() => handleDoubleClick(indexRow, indexColom)}
                >
                  <input type="text" 
                    style={{ 
                      width: "100%", border: 'none', borderColor: 'transparent', outline: 'none',
                      textAlign: 'center'
                    
                    }}
                    ref={(el) => (inputRefs.current[key] = el)}
                    value={dataPerColom}
                    onChange={(event) => changeCard(event.target, indexRow, indexColom)}
                  />
                </Box>
              </Grid> 
            )
          })
        })}
      </Grid>
      <Box sx={{ marginTop: 3, textAlign: 'center' }}>
        <Button variant="contained" onClick={() => alert('Still Work In Progress')}>Get Answer</Button>
      </Box>
    </Container>
  )
}

export default Sudoku;