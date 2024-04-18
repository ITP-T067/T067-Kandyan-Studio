import React from 'react';
import { HiOutlineArrowCircleLeft } from "react-icons/hi";


const Login = () => {
    localStorage.setItem('userRole', '');
    localStorage.setItem('username', '');
    localStorage.setItem('userID', '');

    const handleLogin = (role,name,id) => {
        return () => {
            console.log('User role:', role);
            console.log('Username:', name);
            console.log('User ID:', id);
            passUserSession(role,name,id);
        console.log('User session passed');
        if(role === 'Customer'){
            window.location.href = '/';
        }else if(role === 'Manager'){
            window.location.href = '/manager';
        }else if(role === 'Cashier'){
            window.location.href = '/cashier/ordermain';
        }else if(role === 'Creator'){
            window.location.href = '/creator';
        }else if(role === 'Supplier'){
            window.location.href = '/supplier';
        }else if(role === 'Studio Operator'){
            window.location.href = '/studiooperator';
        }else{
            window.location.href = '/';
        }
    };
};

const passUserSession = (role,name,id) => {
    localStorage.setItem('userRole', role);
    localStorage.setItem('username', name);
    localStorage.setItem('userID', id);
    console.log('User role identified');
};

const GoBack = () => {
    window.location.href = "/";
};

    return (
        <>
        <div className="flex flex-col justify-center items-center h-screen text-kwhite">
            <div className='flex flex-wrap justify-center'>
            <button name="customer"
                className="bg-kblack hover:bg-kgray text-kwhite font-bold py-2 px-4 rounded-full mr-3"
                onClick={handleLogin('Customer','Saman','C001')}
            >
                Customer
            </button>

            <button name="manager"
                 className="bg-kblack hover:bg-kgray text-kwhite font-bold py-2 px-4 rounded-full mr-3"
                onClick={handleLogin('Manager','Deepal','M001')}
            >
                Manager
            </button>
            <button name="cashier"
                 className="bg-kblack hover:bg-kgray text-kwhite font-bold py-2 px-4 rounded-full mr-3"
                onClick={handleLogin('Cashier','Kamal','CA001')}
            >
                Cashier
            </button>
            <button name="creator"
                 className="bg-kblack hover:bg-kgray text-kwhite font-bold py-2 px-4 rounded-full mr-3"
                onClick={handleLogin('Creator','Amal','CR001')}
            >
                Creator
            </button>

            <button name="studiooperator"
                className="bg-kblack hover:bg-kgray text-kwhite font-bold py-2 px-4 rounded-full mr-3"
                onClick={handleLogin('Studio Operator','Namal','SO001')}
            >
                Studio Operator
            </button>

            <button name="supplier"
                className="bg-kblack hover:bg-kgray text-kwhite font-bold py-2 px-4 rounded-full mr-3"
                onClick={handleLogin('Supplier','PhotoTechnica','S001')}
            >
                Supplier
            </button>
            </div>
                <button className="flex items-center justify-center m-0 bg-kwhite text-kblack w-1/3 rounded-full py-2 px-4 font-bold mt-10" onClick={GoBack}><HiOutlineArrowCircleLeft className='w-5 h-5 mr-3'/>Back</button>
            </div>
        </>
    );
};

export default Login;