import React from 'react';
import logo from '../../images/logo.png';
import '../../Styles/style.css';

const CustomerHeader = () => {
    const userRole = localStorage.getItem('userRole');
    const username = localStorage.getItem('username');
    const userID = localStorage.getItem('userID');

    const handleLogout = () => {
        localStorage.setItem('userRole', '');
        localStorage.setItem('username', '');
        localStorage.setItem('userID', '');

        console.log('User role:', userRole);
        console.log('User session destroyed');
        window.location.href = '/login';
    };

    return (
        <nav className="navbar flex justify-between items-center px-20 top-0 left-0 bg-black py-30">
            <div className='navbar-title text-kwhite text-4xl font-bold'>Customer Dashboard</div>
            <img src={logo} alt="Logo" width="30" height="30" className="mx-auto" />
            <div className="navbar-buttons">
                <button className="actor-button text-kwhite font-bold py-2 px-4 rounded">{username}</button>
                <button className="logout-button text-kwhite font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
}

export default CustomerHeader;
