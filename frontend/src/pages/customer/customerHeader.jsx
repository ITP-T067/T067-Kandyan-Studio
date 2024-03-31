import React from 'react';
import logo from '../../images/logo.png';
import '../../Styles/style.css';

const CustomerHeader = () => {

    const userRole = localStorage.getItem('userRole');

    const handleLogout = () => {
        localStorage.setItem('userRole', '');
        console.log('User role:', userRole);
        console.log('User session destroyed');
        window.location.href = '/login';
    };

    return (
        <nav className="navbar">
            <div className='navbar-title navbar-text'>Customer Dashboard</div>
            <a href="#">
                <img src={logo} width="30" height="30" alt="Logo" />
            </a>
            <div className="navbar-buttons">
                <button className="logout-button navbar-text" onClick={handleLogout} id="logout">Logout</button>
            </div>
        </nav>
    );
}

export default CustomerHeader;