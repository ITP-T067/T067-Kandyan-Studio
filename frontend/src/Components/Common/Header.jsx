import React from 'react';
import logo from '../../images/logo.png';
import '../../Styles/style.css';
import Customer from '../../pages/customer/customerHeader';
import { HiOutlineLogout } from "react-icons/hi";


const Header = () => {
    const userRole = localStorage.getItem('userRole');
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.setItem('userRole', '');
        localStorage.setItem('username', '');
        localStorage.setItem('userID', '');
        localStorage.setItem('activeButton',null);

        console.log('User role:', userRole);
        console.log('User session destroyed');
        window.location.href = '/login';
    };

    const renderHeader = () => {
        if (userRole === 'Customer') {
            return <Customer />;
        } else if (userRole === 'Manager' || userRole === 'Cashier' || userRole === 'Creator' || userRole === 'Supplier') {
            return (
                <nav className="navbar flex justify-between items-center px-20 top-0 left-0 bg-black py-30">
                    <div className='navbar-title text-kwhite text-4xl font-bold'>{userRole} Dashboard</div>
                    <img src={logo} alt="Logo" width="30" height="30" className="mx-auto" />
                    <div className="flex flex-cols">
                        <button className="actor-button text-kwhite text-sm font-bold py-2 px-4 rounded-full mr-2">{username}</button>
                        <button className="flex items-center space-x-2 text-sm logout-button text-kwhite font-bold py-2 px-4 rounded-full" onClick={handleLogout} ><HiOutlineLogout /><span className="text-sm">Logout</span></button>
                    </div>
                </nav>
            );
        } else {
            return null;
        }
    };

    return (
        <>
            {renderHeader()}
        </>
    );
};

export default Header;
