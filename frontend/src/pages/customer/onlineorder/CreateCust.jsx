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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.Cus_Name || !formData.Email || !formData.Contact_No) {
            setError('Please fill in all fields');
            return;
        }
        if (!isValidEmail(formData.Email)) {
            setError('Please enter a valid email address');
            return;
        }
        if (!isValidContactNumber(formData.Contact_No)) {
            setError('Please enter a valid contact number');
            return;
        }
        try {
            const response = await axios.post('/loycus/create', formData);
            if (response.data.success) {
                alert('Customer signed up successfully');
                setFormData({
                    Cus_Name: '',
                    Email: '',
                    Contact_No: '',
                });
                setError('');
            } else {
                setError(response.data.message || 'Failed to sign up customer');
            }
        } catch (error) {
            console.error('Error signing up customer:', error);
            setError('Failed to sign up customer');
        }
    };
    
    const isValidEmail = (email) => {
        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    const isValidContactNumber = (contactNumber) => {
        // Simple contact number validation regex (10 digits)
        const contactNumberRegex = /^\d{10}$/;
        return contactNumberRegex.test(contactNumber);
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
