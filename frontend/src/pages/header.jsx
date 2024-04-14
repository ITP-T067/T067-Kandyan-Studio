import React from 'react';
import '../Styles/style.css'


const CustomerHeader = () => {

    const handleLogin = () => {
        window.location.href = '/login';
    };

    return (
        <nav className="flex justify-end items-center r-5 py-30 mb-5 mr-5">
            <div className="flex">
                <button className="bg-kwhite text-kblack text-sm font-bold py-2 px-4 rounded-full mr-2">Become a Supplier</button>
                <button className="bg-kwhite text-kblack text-sm font-bold py-2 px-4 rounded-full mr-2" onClick={handleLogin}>Login</button>
                <button className="bg-kwhite text-kblack text-sm font-bold py-2 px-4 rounded-full ">Sign Up</button>
            </div>
        </nav>
    );
}

export default CustomerHeader;
