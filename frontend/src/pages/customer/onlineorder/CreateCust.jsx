import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
    const [formData, setFormData] = useState({
        Cus_Name: '',
        Email: '',
        Contact_No: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Remove special characters using regex
        const sanitizedValue = value.replace(/[^\w\s]/gi, '');
        setFormData({ ...formData, [name]: sanitizedValue });
    };

    const handleSubmit = async (e) => {
        // Your existing submit logic
    };

    return (
        <div className="addContainer w-[400px] h-[500px] bg-kgray bg-opacity-70 rounded-[20px] shadow flex flex-col mt-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5">
            <h2 className="text-3xl font-semibold text-center mb-6 text-kwhite">Customer Creation</h2>
            {error && <div className="text-red-500">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="Cus_Name" className="block text-kwhite font-bold mb-2">Name:</label>
                    <input
                        type="text"
                        id="Cus_Name"
                        name="Cus_Name"
                        value={formData.Cus_Name}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="Email" className="block text-kwhite font-bold mb-2">Email:</label>
                    <input
                        type="email"
                        id="Email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="mb-12">
                    <label htmlFor="Contact_No" className="block text-kwhite font-bold mb-2">Contact Number:</label>
                    <input
                        type="text"
                        id="Contact_No"
                        name="Contact_No"
                        value={formData.Contact_No}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
                    />
                </div>
                
                <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2  rounded-md hover:bg-blue-600 transition duration-300">Sign Up</button>
            </form>
        </div>
    );
};

export default Form;
