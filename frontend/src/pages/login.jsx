import React from 'react';


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
        window.location.href = '/dashboard';
    };
};

const passUserSession = (role,name,id) => {
    localStorage.setItem('userRole', role);
    localStorage.setItem('username', name);
    localStorage.setItem('userID', id);
    console.log('User role identified');
};

    return (
        <div className="flex justify-center items-center h-screen">
            <button name="customer"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogin('Customer','Saman','C001')}
            >
                Customer
            </button>

            <button name="manager"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogin('Manager','Deepal','M001')}
            >
                Manager
            </button>
            <button name="cashier"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogin('Cashier','Kamal','CA001')}
            >
                Cashier
            </button>
            <button name="creator"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogin('Creator','Amal','CR001')}
            >
                Creator
            </button>

            <button name="supplier"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogin('Supplier','PhotoTechnica','S001')}
            >
                Supplier
            </button>
        </div>
    );
};

export default Login;