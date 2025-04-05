import LandingPage from './components/LandingPage'
import TodoApp from './components/TodoApp'
import Auth from './components/Authentication'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

let email = localStorage.getItem('email')
console.log(email);
function App () {
  
  if (!email) {
    console.log('email not found');
  }

  const router = createBrowserRouter([
    {path: '/', element: <LandingPage />},
    {path: '/register', element: <Auth />},
    {path: `/todos/${email}`, element: <TodoApp />},
  ])
  return (
    <> 
      <RouterProvider router={router} />
    </>
  )
}

export default App
