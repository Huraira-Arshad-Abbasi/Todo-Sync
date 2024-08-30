import '../css/nav.css';
import logo from '../assets/logo3.jpeg';
import Start_button from './Start_button';
export default function Navbar() {
  return (
    <div>
      <nav>
        <div className="logo">
          <img width='55rem' src={logo} alt="" />
          <div className="name">Sticky Notes</div>
        </div>
        <div className="nav__links">
          <ul>
            <li><a href="">Features</a></li>
            <li><a href="">For Teams</a></li>
            <li><a href="">Resources</a></li>
            <li><a href="">Pricing</a></li>
            <li><a href="">Log in</a></li>
          </ul>
        </div>
        <div className="navBtn">
          <Start_button />
        </div>
      </nav>
    </div>
  )
}


