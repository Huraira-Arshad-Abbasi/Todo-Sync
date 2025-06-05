import { Link } from 'react-router-dom';
import '../css/Logout.css';
const handleLogout = () => {
    localStorage.removeItem('email');
};
function Logout() {

    return <button onClick={handleLogout}className='Logout__btn' ><Link to= "/register">Logout</Link></button>;
}
export default Logout;
