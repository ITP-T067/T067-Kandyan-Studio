import react from 'react'
import logo from '../../images/logo.png'
import '../../Styles/style.css'

const Navbar = () => {
    return (
        <div className="department-container">
            <nav className="secondary-navbar">
        	    <a className="secondary-navbar-left" href="/manager/eventdept">Event Department</a>
                <a className="#" href="/manager/stockdept">Stock Department</a>
                <a className="#" href="/">Finance Department</a>
                <a className="#" href="">Employee Department</a>
                <a className="#" href="">Supplier Department</a>
                <a className="secondary-navbar-right" href="">Loyalty Department</a>
    	    </nav>
        </div>
    );
}

export default Navbar;