const styles = {
  grid: {
    width: 400,
    bgcolor: 'black',
    border: '2px solid #fff',
    boxShadow: 24,
  },
  containerTypography: {
    textAlign: "center",
    marginTop: 2.5,
  },
  gridContainer: {
    backgroundColor: "black",
    marginTop: 1
  },
  boxContent: (emptyCard: boolean) => ({
    height: 40,
    width: '100%',
    backgroundColor: emptyCard ? "#F5FFFA" : "#FFFACD",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  boxButton: {
    marginTop: '10px',
    color: 'white',
    textAlign: "center",
  },
  boxpossibilities: {
    height: 40,
    width: '100%',
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTypography: {
    marginTop: '10px',
    color: 'white',
    textAlign: "center",
  },
  modal: { 
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
   }
}

export default styles