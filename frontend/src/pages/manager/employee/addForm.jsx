import React, { useState, useEffect } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import axios from 'axios';

import Alert from "../../../Components/Common/Alerts/alert";

axios.defaults.baseURL = "http://localhost:8010/";

function AddForm() {
  const GoBack = () => {
    window.location.href = "/manager/employee/";
  };
  const fields = [
    { label: 'Employee Name', key: 'name' },
    { label: 'Username', key: 'username' },
    { label: 'Email Address', key: 'email' },
    { label: 'Contact Number', key: 'contactNumber' },
    { label: 'Address', key: 'address' },
    { label: 'NIC Number', key: 'nicNumber' },
    { label: 'Designation', key: 'designation' },
    { label: 'Basic Salary', key: 'basicSalary' }
  ];

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    contactNumber: '',
    address: '',
    nicNumber: '',
    designation: '',
    basicSalary: ''
  });

  useEffect(() => {
    const generateUniqueUsername = () => {
      let username = '';
      do {
        username = Math.floor(1000 + Math.random() * 9000).toString();
      } while (formData.username === username);
      return username;
    };

    setFormData(prevData => ({
      ...prevData,
      username: generateUniqueUsername()
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      // Allow only alphabetic characters and spaces
      const onlyAlphabets = value.replace(/[^a-zA-Z ]/g, '');
      setFormData((prevData) => ({
        ...prevData,
        [name]: onlyAlphabets,
      }));
    } else {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validateNIC = (nic) => {
    // Regular expression for NIC validation (both old and new format)
    const nicRegex = /^[0-9]{9}[vVxX]|[0-9]{12}$/;
    return nicRegex.test(nic);
  };

  const validateContactNumber = (contactNumber) => {
    // Regular expression for Sri Lankan phone numbers
    const contactNumberRegex = /^(?:\+?94|0)(?:\d{9}|\d{2}-\d{7})$/;
    return contactNumberRegex.test(contactNumber);
  };

  const [isAlert, setIsAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState('success');
  const [message, setMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!validateEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!validateNIC(formData.nicNumber)) {
      alert('Please enter a valid NIC number.');
      return;
    }

    if (!validateContactNumber(formData.contactNumber)) {
      alert('Please enter a valid contact number.');
      return;
    }

    console.log("Form Data", formData);
    try {
      const data = await axios.post("/employee/create", formData);
      console.log("Response:", data);
      if (data.data.success) {
        setFormData({
          name: '',
          username: '',
          email: '',
          contactNumber: '',
          address: '',
          nicNumber: '',
          designation: '',
          basicSalary: ''
        });
        setIsAlert(true);
                setAlertStatus('success');
                setMessage("Employee Added Successfully !");
                setTimeout(() => {
                    setIsAlert(false);
                    window.location.href = "/manager/employee/viewEmp/";
                }, 3000);
      } else {
        setIsAlert(true);
                setAlertStatus('danger');
                setMessage("Failed to Add Employee !");
                setTimeout(() => {
                    setIsAlert(false);
                }, 3000);
      }
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  return (
    <>
    <div>{isAlert && <Alert message={message} type={alertStatus} />}</div>
    <div className='flex flex-col'>
      <div onClick={GoBack} className="flex items-center">
        <div className="flex items-center justify-center bg-transparent rounded-full h-10 w-10 ml-7 border border-kwhite transition-transform duration-300 transform-gpu hover:scale-110">
          <BsArrowLeft className="text-kwhite stroke-2" />
        </div>
        <h1 className="text-left text-kwhite text-3xl pr-4 pb-4 ml-7 mt-4">Add Employee</h1>
      </div>

      <div className='flex flex-col justify-center items-center'>
        <div className='max-w-[850px] w-full h-auto flex flex-col justify-between items-center bg-kgray rounded-lg border-2 border-kyellow shadow-lg shadow-kblack/60 p-8 opacity-70 mb-10'>
          <form className='w-full grid grid-cols-2 gap-x-10 gap-y-3 text-kwhite opacity-100' onSubmit={handleSubmit}>
            {fields.map((field, index) => (
              <div key={index} className="relative h-[4rem]">
                <div className="relative z-0">
                <label
                    htmlFor={`floating_${field.key}`}
                    className="block mb-2 text-sm font-medium text-kwhite "
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.key === 'basicSalary' || field.key === 'contactNumber' ? 'number' : 'text'}
                    id={`floating_${field.key}`}
                    name={field.key}
                    value={formData[field.key]}
                    onChange={handleChange}
                    required
                    className="bg-kwhite border border-kwhite text-kblack text-sm rounded-lg focus:ring-kblue focus:border-kblue block w-full p-2.5 "
                    placeholder=" "
                  />
                
                  
                </div>
              </div>
            ))}
            <div></div>
            <div className="flex justify-end w-full">
              <button type="submit" className='h-[38px] w-44 bg-kgreen text-kwhite font-bold rounded mb-4 transition-transform hover:scale-105'>Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default AddForm;
