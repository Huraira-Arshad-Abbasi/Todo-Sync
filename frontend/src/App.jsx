import LandingPage from './components/LandingPage'
import TodoApp from './components/TodoApp'
import Auth from './components/Authentication'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PageNotFound from './components/PageNotFound';
import PrivateRoute from './components/PrivateRoute';

function App () {
  const router = createBrowserRouter([
    {path: '/', element: <LandingPage />},
    {path: '/register', element: <Auth />},
    {path: `/todos`, element: <PrivateRoute>
          <TodoApp />
        </PrivateRoute>},
    {path: '*', element: <PageNotFound/>}, // Catch-all route
  ])
  return (
    <> 
      <RouterProvider router={router} />
    </>
  )
}

export default App
