import { createBrowserRouter } from "react-router-dom"

import Home from "../Pages/Home"
import GameCard from "../Pages/GameCard"
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/games",
    element: <GameCard />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])

export default router
