import { useState, useEffect } from "react"
import Container from "@mui/material/Container"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { styled } from "@mui/material/styles"
import { Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const HoverListItem = styled(ListItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}))

const Home = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const items = ["Memory Game", "Let me solve your sudoku problem", "Find hat"]
  const navigate = useNavigate()

  const handleKeyDown = ({ key }: { key: string }) => {
    if (key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex < items.length - 1 ? prevIndex + 1 : prevIndex
      )
    } else if (key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      )
    }
  }

  const clickChangeUrl = (index: number) => {
    if (index === 0) {
      navigate("/games/memory_game")
    } else if (index === 1) {
      navigate("/games/sudoku_game")
    } else {
      alert("Sorry. The game is not ready yet")
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <Container maxWidth="md">
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          marginTop: 2.5,
        }}
      >
        What game do you want to play ? Select it.
      </Typography>
      <List>
        {items.map((item, index) => (
          <HoverListItem
            key={item}
            selected={selectedIndex === index}
            onMouseEnter={() => setSelectedIndex(index)}
          >
            <ListItemText
              primary={item}
              onClick={() => clickChangeUrl(index)}
            />
          </HoverListItem>
        ))}
      </List>
    </Container>
  )
}

export default Home
