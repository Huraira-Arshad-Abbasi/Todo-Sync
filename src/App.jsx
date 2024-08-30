import { useContext } from 'react';
import { AuthContext } from './components/AuthContext';
import Login from './components/Login';
// import Logout from './components/Logout';
import TodoApp from './components/TodoApp';  

function App() {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {isAuthenticated ? (
                <>
                    <TodoApp />
                </>
            ) : (
              <>
              <TodoApp />
              <Login />
          </>
            )}
        </div>
    );
}

export default App;

