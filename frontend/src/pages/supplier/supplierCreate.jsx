import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
axios.defaults.baseURL = "http://localhost:8010/";

const SupplierCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCancel = () => {
    // Reset form data to its initial state
    setFormData({
      name: '',
      email: '',
      phoneNumber: '',
      address: ''
    });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.match(emailRegex)) {
      errors.email = 'Invalid email address';
      isValid = false;
    }

    // Validate phone number
    const phoneRegex = /^\d{10}$/;
    if (!formData.phoneNumber.match(phoneRegex)) {
      errors.phoneNumber = 'Phone number must be 10 digits';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('/supplier/create', formData);
      console.log(response.data);
      alert('Supplier successfully joined Kandyan studio');

      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        address: ''
      });
    } catch (error) {
      console.error('Error creating supplier:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'gray' }}>
      <div style={{ width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h4 style={{ color: 'black', textAlign: 'center' }}>Create Supplier</h4>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} required />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} required />
            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Phone Number:</label>
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} required />
            {errors.phoneNumber && <span style={{ color: 'red' }}>{errors.phoneNumber}</span>}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Address:</label>
            <textarea name="address" value={formData.address} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} required></textarea>
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Create Supplier</button>
          <button type="button" onClick={handleCancel} style={{ width: '100%', padding: '10px', backgroundColor: 'red', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer', marginTop: '10px' }}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default SupplierCreate;
