import React, { useState } from 'react';
import axios from 'axios';

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    Inquiry_Type: '',
    Inquiry_subType: '',
    Inquiry_Data: '',
    Status: 'Pending',
    Cus_ID: '66147c480a94b623c0e9a698'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/inquiry/create', formData);
      alert('Inquiry submitted successfully');
      setFormData({
        Inquiry_Type: '',
        Inquiry_subType: '',
        Inquiry_Data: ''
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Failed to submit inquiry');
    }
  };

  return (
    <div className="addContainer w-[400px] h-[500px] bg-kgray bg-opacity-70 rounded-[20px] shadow flex flex-col mt-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5">
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-3xl text-kwhite font-semibold text-center mb-6">Submit an Inquiry</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="Inquiry_Type" className="block text-kwhite font-bold mb-2">Inquiry Type:</label>
          <select
            id="Inquiry_Type"
            name="Inquiry_Type"
            value={formData.Inquiry_Type}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
          >
            <option value="">Select Inquiry Type</option>
            <option value="Products">Products</option>
            <option value="General">General</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="Inquiry_subType" className="block text-kwhite font-bold mb-2">Inquiry Title:</label>
          <input
            type="text"
            id="Inquiry_subType"
            name="Inquiry_subType"
            value={formData.Inquiry_subType}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="Inquiry_Data" className="block text-kwhite font-bold mb-2">Inquiry Data:</label>
          <textarea
            id="Inquiry_Data"
            name="Inquiry_Data"
            value={formData.Inquiry_Data}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">Submit Inquiry</button>
      </form>
    </div>
    </div>
  );
};

export default InquiryForm;
