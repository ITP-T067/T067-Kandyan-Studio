import React from 'react';
import logo from '../../images/logo.png';
import '../../Styles/style.css';
import { HiOutlineLogout,HiOutlineShoppingCart,HiBookmark } from "react-icons/hi";

const CustomerHeader = () => {
    const userRole = localStorage.getItem('userRole');
    const username = localStorage.getItem('username');
    
    const myorder = () => {
        window.location.href = '/myorder';
    }

    const customercart = () => {
        window.location.href = '/customercart';
    }

    const home = () => {
        window.location.href = '/';
    }

    const reviews = () => {
        window.location.href = '/review';
    }

    const inquiry = () => {
        window.location.href = '/inquiries';
    }

    const profile = () => {
        window.location.href = '/profile';
    }
    


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
                <button className="bg-kgray text-kwhite text-sm font-bold py-2 px-4 rounded-l-full"onClick={myorder}>My Orders</button>
                <button className="bg-kgray text-kwhite text-sm font-bold py-2 px-4 mx-1" onClick={handleLogout}>My Events</button>
                <button className="bg-kgray text-kwhite text-sm font-bold py-2 px-4 mx-1" onClick={inquiry}>Inquiries</button>
                <button className="bg-kgray text-kwhite text-sm font-bold py-2 px-4 rounded-r-full" onClick={reviews}>Reviews</button>
            </div>
            <img src={logo} alt="Logo" width="30" height="30" className="mx-auto" onClick={home} />
            <button className="actor-button text-kwhite font-bold py-2 px-4 rounded-full" onClick={customercart}><HiOutlineShoppingCart className='w-6 h-6'/></button>
            <div className="flex">
                <button className="flex bg-kblack text-kwhite">
                    <img class="ml-5 h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""onClick={profile} />
                    <div className='ml-3'>
                        {username}
                        <div className='flex'>
                        <HiBookmark/>
                        <span className='text-xs flex'>Loyalty</span>
                        </div>
                    </div>
                </button>
                <button className="ml-5 px-4 logout-button items-center justify-center text-kwhite rounded-full" onClick={handleLogout}>
                    <HiOutlineLogout />
                    </button>
            </div>
        </nav>
    );
}

export default CustomerHeader;
