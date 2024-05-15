import React, { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8010/";

const ViewEmp = () => {
  const GoBack = () => {
    window.location.href = "/manager/employee/";
  };

  const [formDataEdit, setFormDataEdit] = useState({
    name: '',
    username: '',
    email: '',
    contactNumber: '',
    address: '',
    nicNumber: '',
    designation: '',
    basicSalary: '',
    _id: '',
  });
  const [editSection, setEditSection] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        const data = await axios.put("/employee/update", formDataEdit);
        console.log("Response:", data);
        if (data.data.success) {
            console.log(data.data.message);
            setEditSection(false);
            getFetchData();
        }
    } catch (error) {
        console.error("Error updating employee:", error);
    }
  };

  const handleEditOnChange = async(e) => {
    const { value, id } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleEdit = async(employee) => {
    setFormDataEdit(employee);
    setEditSection(true);
    console.log("Edit Employee Form Opened");
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    if (confirmed) {
      try {
        const data = await axios.delete("/employee/delete/" + id);
        if (data.data.success) {
          getFetchData();
          alert(data.data.message);
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    getFetchData();
  }, []);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/employee/");
      console.log(response);
      if (response.data.success) {
        setDataList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const results = dataList.filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, dataList]);

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

  return (
    <div className='flex flex-col '>
      {editSection && (
        <div className="fixed top-0 left-0 w-full h-full bg-kblack bg-opacity-50 backdrop-blur flex items-center justify-center z-50">
          <button className="absolute top-5 right-5 bg-kblack text-kwhite" onClick={() => setEditSection(false)}>X</button>
          <div className='flex flex-col justify-center items-center'>
            <div className='max-w-[850px] w-full h-auto flex flex-col justify-between items-center bg-kgray/80 rounded-lg border-2 border-kwhite text-kwhite shadow-lg shadow-kblack/60 p-8'>
              <form onSubmit={handleUpdate} className='w-full grid grid-cols-2 gap-x-10 gap-y-3'>
                {fields.map((field, index) => (
                  <div key={index} className="relative h-[4rem]">
                    <div className="relative z-0">
                    <label
                        htmlFor={field.key}
                        className="block mb-2 text-sm font-medium text-kwhite "
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.key === 'basicSalary' || field.key === 'contactNumber' ? 'number' : 'text'}
                        id={field.key}
                        name={field.key}
                        value={formDataEdit[field.key]}
                        onChange={handleEditOnChange}
                        required
                        className="bg-kwhite border border-kwhite text-kblack text-sm rounded-lg focus:ring-kblue focus:border-kblue block w-full p-2.5"
                        placeholder=" "
                      />
                      
                    </div>
                  </div>
                ))}
                <div></div>
                <div className="flex justify-end w-full">
                  <button type="submit" className='h-[38px] w-44 bg-kgreen text-kwhite font-bold rounded hover:bg-kblue hover:text-kwhite mb-4'>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div>
        <button onClick={GoBack}>
          <div className="flex items-center">
            <div className="flex items-center justify-center bg-transparent rounded-full h-10 w-10 ml-7 border border-kwhite transition-transform duration-300 transform-gpu hover:scale-110">
              <BsArrowLeft className="text-kwhite stroke-2" />
            </div>
            <h1 className="text-left text-kwhite text-3xl pr-4 pb-4 ml-7 mt-4">View Employees</h1>
          </div>
        </button>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-3 pb-3">
          <div className="flex items-center justify-end pr-12 flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-transparent ">

            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="relative w-1/4 ">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none ">
                <svg className="w-4 h-4 text-kgray opacity-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input
                type="search"
                placeholder="       Search"
                className="bg-kwhite flex-grow rounded-full p-2 text-sm pl-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <table className="table-fixed w-full text-sm text-left rtl:text-right text-kwhite ">
            <thead className="text-xs text-kwhite bg-kblack">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Username</th>
                <th scope="col" className="px-6 py-3">Designation</th>
                <th scope="col" className="px-6 py-3">Address</th>
                <th scope="col" className="px-6 py-3">Contact No</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {
                searchResults.length > 0 ? (
                  searchResults.map((employee, index) => (
                    <tr key={employee._id} className="bg-kgray bg-opacity-30 border-b hover:bg-opacity-10 hover:bg-kgray">
                      <th scope="row" className="flex items-center px-6 py-4 text-kwhite whitespace-nowrap">
                        <div className="ps-3">
                          <div className="text-base font-semibold">{employee.name}</div>
                          <div className="font-normal text-kgray">{employee.email}</div>
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        {employee.username}
                      </td>
                      <td className="px-6 py-4">
                        {employee.designation}
                      </td>
                      <td className="px-6 py-4">
                        {employee.address}
                      </td>
                      <td className="px-6 py-4">
                        {employee.contactNumber}
                      </td>
                      <td className="px-6 py-4 flex gap-4">
                        <button onClick={() => handleEdit(employee)} id="editEmployeeButton" className="inline-flex items-center text-kwhite bg-kblue border border-kblue focus:outline-none hover:bg-kwhite hover:text-kblue hover:border-kblue font-bold rounded-lg text-sm px-3 py-1.5" type="button">
                          <span className="sr-only">Edit Employee button</span>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(employee._id)} id="deleteEmployeeButton" className="inline-flex items-center text-kwhite bg-kred border border-kred focus:outline-none hover:bg-kwhite hover:text-kred hover:border-kred font-bold rounded-lg text-sm px-3 py-1.5" type="button">
                          <span className="sr-only">Delete Employee button</span>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-kwhite/20 w-full text-kwhite">
                    <td colSpan="6" className="text-center py-4">
                      No data available
                    </td>
                  </tr>
                )}

            </tbody>
          </table>
        </div>
      </div>

    </div>

  );
}

export default ViewEmp;
