import '../css/footer.css';
import logo from '../assets/logo3.jpeg';
export default function Footer() {
    return (
        <div >
            <div className="Footer">
                <div className="upper_content">
                    <div className="left">
                        <div className="logo">
                            <img width='55rem' src={logo} alt="" />
                            <div className="name">
                                Sticky Notes
                            </div>
                        </div>
                        <p>Join millions of people who organize work and life with Todoist.</p>
                    </div>
                    <div className="Footer_links">
                        <ul>
                            <h2>Features</h2>
                            <li><a href="">How It works</a></li>
                            <li><a href="">For Teams</a></li>
                            <li><a href="">Pricing</a></li>
                            <li><a href="">Templetes</a></li>
                        </ul>
                        <ul>
                            <h2>Resources</h2>
                            <li><a href="">Download App</a></li>
                            <li><a href="">Help Center</a></li>
                            <li><a href="">Productivity Methods</a></li>
                            <li><a href="">Integration</a></li>
                            <li><a href="">Channel Patner</a></li>
                            <li><a href="">Develper API</a></li>
                            <li><a href="">Status</a></li>
                        </ul>
                        <ul>
                            <h2>Company</h2>
                            <li><a href="">About Us</a></li>
                            <li><a href="">Careers</a></li>
                            <li><a href="">Inspiration HUb</a></li>
                            <li><a href="">Press</a></li>
                            <li><a href="">Twist</a></li>
                        </ul>
                        <div className="links_icon"></div>
                    </div>
                </div>
                <div className="bottom_footer">
                    <div className="left">
                        <ul>
                            <li>Security</li>
                            <li>Privacy</li>
                            <li>Terms</li>
                            <li>© Doist Inc</li>
                        </ul>
                    </div>
                    <div className="FooterBtn">
                        <button type="button">English</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

