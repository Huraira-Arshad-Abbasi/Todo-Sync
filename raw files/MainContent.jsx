import '../css/main.css';
import Img from '../assets/container_img.en.avif';
import Start_button from './Start_button';
export default function main() {
  return (
    <div className='main'>
      <div className="container">
        <h2>Organize your work <br /> and life, finally.</h2>
        <p>Become focused, organized, and calm with Todoist. The world{"'"}s #1 <br /> task manager and to-do list app.</p>
        <div className="btn">
          <Start_button />
        </div>
      </div>
      <div className="img">
        <img src={Img} alt="" />
      </div>
      <div className="container c_2">
        <h2>Gain calmness and clarity with the <br /> world{"'"}s most beloved productivity app</h2>
        <p>337000+ ★★★★★ reviews on Google Play and App Store</p>
        <div className="btn">
          <Start_button />
        </div>
      </div>
    </div>
  )
}