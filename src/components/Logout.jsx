import { Link } from 'react-router-dom';
import '../css/Logout.css';
function Logout() {

    return <button className='Logout__btn' ><Link to= "/register">Logout</Link></button>;
}
export default Logout;
