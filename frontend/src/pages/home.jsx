import React from 'react';

function Home() {

    const handleLogin = () => {
        console.log('Login button clicked');
        window.location.href = '/login';
    };

    return (
        <div>
            <h1>Welcome to the Home page</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Home;