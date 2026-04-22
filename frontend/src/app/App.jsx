import { RouterProvider } from "react-router-dom"
import { router } from "../routes"
import { useAuth } from "../features/auth/hook/useAuth"
import { useEffect } from "react"

const App = () => {
  const {handleGetMe} = useAuth()

  useEffect(() => {
    handleGetMe()
  }, [])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
