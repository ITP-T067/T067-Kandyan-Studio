import React, { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import axios from "axios";


axios.defaults.baseURL = "http://localhost:8010/";

const Notification = () => {
  const GoBack = () => {
    window.location.href = "/manager/employee/";
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

  const handleNotify = async (employee) => {
    
    try {
      await axios.post(`/employee/notify/${employee._id}`);
      console.log("Notification sent to", employee.name);
      console.log("ID : ", employee._id);
      alert(`Notification sent to ${employee.name}`);
    } catch (error) {
      console.error("Error sending notification:", error);
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
      <div>
        <button onClick={GoBack}>
          <div className="flex items-center">
            <div className="flex items-center justify-center bg-transparent rounded-full h-10 w-10 ml-7 border border-kwhite transition-transform duration-300 transform-gpu hover:scale-110">
              <BsArrowLeft className="text-kwhite stroke-2" />
            </div>
            <h1 className="text-left text-kwhite text-3xl pr-4 pb-4 ml-7 mt-4">Payroll Notification</h1>
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
                placeholder="         Search"
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
                        <button onClick={() => handleNotify(employee)} id="notifyButton" className="inline-flex items-center text-kwhite bg-kblue border border-kblue focus:outline-none hover:bg-kwhite hover:text-kblue hover:border-kblue font-bold rounded-lg text-sm px-3 py-1.5" type="button">
                          <span className="sr-only">Notify button</span>
                          Notify
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

export default Notification;
