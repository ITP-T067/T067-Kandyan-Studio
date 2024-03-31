import React from 'react';

import logo from '../../images/logo.png';
import '../../Styles/style.css';

import Customer from '../../pages/customer/customerHeader';

const Header = () => {
    const userRole = localStorage.getItem('userRole');

    const handleLogout = () => {
        localStorage.setItem('userRole', '');
        console.log('User role:', userRole);
        console.log('User session destroyed');
        window.location.href = '/login';
    };

    const renderHeader = () => {
        if (userRole === 'Customer') {
            return (
                <Customer />
            );
        } else if (userRole === 'Manager' || userRole === 'Cashier' || userRole === 'Creator' || userRole === 'Supplier') {
            return (
                <nav className="navbar">
                    <div className='navbar-title navbar-text'>{userRole} Dashboard</div>
                    <a href="#">
                        <img src={logo} width="30" height="30" alt="Logo" />
                    </a>
                    <div className="navbar-buttons">
                        <button className="logout-button navbar-text" id="logout" onClick={handleLogout}>Logout</button>
                    </div>
                </nav>
            );
        } else {
            return (
                <></>
            );
        } 
    };

    return (
        <>
            {renderHeader()}
        </>
    );
};

export default Header;