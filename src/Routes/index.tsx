import { createBrowserRouter } from "react-router-dom"

import Home from "../Pages/Home"
import GameCard from "../Pages/GameCard"
import SudokuGame from "../Pages/SudokuGame"
import MiniTetrisGame from "../Pages/MiniTetrisGame"
import NotFoundPage from "../Pages/NotFoundPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/games",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/games/memory_game",
    element: <GameCard />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/games/sudoku_game",
    element: <SudokuGame />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/games/mini_tetris_game",
    element: <MiniTetrisGame />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])

export default router
