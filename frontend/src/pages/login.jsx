import React from 'react';


const Login = () => {
    localStorage.setItem('userRole', '');
    const handleLogin = (role) => {
        return () => {
            console.log('User role:', role);
            passUserSession(role);
        console.log('User session passed');
        window.location.href = '/dashboard';
    };
};

const passUserSession = (role) => {
    localStorage.setItem('userRole', role);
    console.log('User role identified');
};

    return (
        <div className="flex justify-center items-center h-screen">
            <button name="customer"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogin('Customer')}
            >
                Customer
            </button>

            <button name="manager"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogin('Manager')}
            >
                Manager
            </button>
            <button name="cashier"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogin('Cashier')}
            >
                Cashier
            </button>
            <button name="creator"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogin('Creator')}
            >
                Creator
            </button>

            <button name="supplier"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogin('Supplier')}
            >
                Supplier
            </button>
        </div>
    );
};

export default Login;