import LandingPage from './components/LandingPage'
import TodoApp from './components/TodoApp'
import Auth from './components/Authentication'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App () {
  const router = createBrowserRouter([
    {path: '/', element: <LandingPage />},
    {path: '/register', element: <Auth />},
    {path: '/todos', element: <TodoApp />},
  ])
  return (
    <> 
      <RouterProvider router={router} />
    </>
  )
}

export default App
