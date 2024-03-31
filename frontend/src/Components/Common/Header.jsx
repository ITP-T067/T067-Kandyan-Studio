import logo from '../../images/logo.png'
import '../../Styles/style.css'

const Header = () => {
    return (
        <>
        <nav className="navbar">
            <div className='navbar-title navbar-text'>Staff Dashboard</div>
            <a href="#">
                <img src={logo} width="30" height="30" alt="Logo" />
            </a>
            <div className="navbar-buttons">
                <button className="actor-button navbar-text" id="actor">Actor</button>
                <button className="logout-button navbar-text" id="logout">Logout</button>
            </div>
        </nav>
        
        </>
    );
}

export default Header;