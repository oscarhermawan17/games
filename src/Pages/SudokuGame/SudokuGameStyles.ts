const styles = {
  grid: (isDesktop: boolean) => ({
    width: isDesktop ? '500px' : '90%', 
    bgcolor: 'black',
    border: '2px solid #fff',
    boxShadow: 24,
  }),
  containerTypography: {
    textAlign: "center",
    marginTop: 2.5,
  },
  gridContainer: {
    backgroundColor: "black",
    marginTop: 1
  },
  boxContent: (emptyCard: boolean) => ({
    height: 50,
    width: '100%',
    backgroundColor: emptyCard ? "#F5FFFA" : "#FFFACD",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: '2px solid black',
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
    width: '100%'
   }
}

export default styles