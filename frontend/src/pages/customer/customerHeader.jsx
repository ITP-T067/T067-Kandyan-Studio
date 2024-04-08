import React from 'react';
import logo from '../../images/logo.png';
import '../../Styles/style.css';
import { HiOutlineLogout,HiOutlineShoppingCart } from "react-icons/hi";

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
            <div className="flex items-center">
                <button className="bg-kgray text-kwhite text-sm font-bold py-2 px-4 rounded-l-full">My Orders</button>
                <button className="bg-kgray text-kwhite text-sm font-bold py-2 px-4 mx-1" onClick={handleLogout}>My Events</button>
                <button className="bg-kgray text-kwhite text-sm font-bold py-2 px-4 rounded-r-full" onClick={handleLogout}>Reviews</button>
            </div>
            <img src={logo} alt="Logo" width="30" height="30" className="mx-auto" />
            <button className="actor-button text-kwhite font-bold py-2 px-4 rounded-full"><HiOutlineShoppingCart className='w-6 h-6'/></button>
            <div className="navbar-buttons flex">
                <div>
                <div class="flex-shrink-0">
                <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
                <button className="actor-button text-kwhite font-bold py-2 px-4 rounded">{username}</button>
                </div>
                <button className="logout-button text-kwhite font-bold py-2 px-4 rounded" onClick={handleLogout}><HiOutlineLogout /></button>
            </div>
        </nav>
    );
}

export default CustomerHeader;
