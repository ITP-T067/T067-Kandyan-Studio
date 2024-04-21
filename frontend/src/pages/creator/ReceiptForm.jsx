import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8010/";

export default function ReceiptForm() {
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({ Order_ID: "", file: null });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('Order_ID', formData.Order_ID);
        formDataToSend.append('file', formData.file);

        try {
            const response = await axios.post('/receipt/create', formDataToSend);

            if (response.data.success) {
                setMessage('Receipt uploaded successfully');
            }
        } catch (error) {
            console.log(error);
            setMessage('Error uploading receipt');
        }
    };

    const handleOnchange = (e) => {
        const { value, name } = e.target;

        if (name === 'file') {
            setFormData((prev) => ({
                ...prev,
                [name]: e.target.files[0],
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    return (
        <div>
            <h2>Upload Receipt</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="Order_ID"
                        value={formData.Order_ID}
                        onChange={handleOnchange}
                        placeholder="Enter Order ID"
                        className='text-kwhite'
                    />
                </div>
                <div>
                    <label htmlFor="file">Choose PDF file:</label>
                    <input
                        type="file"
                        name="file"
                        accept=".pdf"
                        onChange={handleOnchange}
                        className='text-kwhite'
                        required
                    />
                </div>
                <button type="submit" className='text-kwhite'>Upload</button>
            </form>
            {message && <p className='text-kwhite'>{message}</p>}
        </div>
    );
}
