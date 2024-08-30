import { useContext } from 'react';
import { AuthContext } from './AuthContext';

function Logout() {
    const { logout } = useContext(AuthContext);

    return <button className='btn absolute z-10 right-3 shadow-black shadow-sm font-bold text-white rounded p-3  transition-all hover:bg-sky-700' onClick={logout}>Logout</button>;
}
export default Logout;
