import React, { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8010/";

const ViewPerformance = () => {
  const GoBack = () => {
    window.location.href = "/manager/employee/";
  };

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    getFetchData();
  }, []);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/performance/");
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
    const results = dataList.filter((performance) =>
      performance.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, dataList]);

  return (
    <div className='flex flex-col h-screen'>
      <div>
        <button onClick={GoBack}>
          <div className="flex items-center">
            <div className="flex items-center justify-center bg-transparent rounded-full h-10 w-10 ml-7 border border-kwhite transition-transform duration-300 transform-gpu hover:scale-110">
              <BsArrowLeft className="text-kwhite stroke-2" />
            </div>
            <h1 className="text-left text-kwhite text-3xl pr-4 pb-4 ml-7 mt-4">View Performance</h1>
          </div>
        </button>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-transparent ">
            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-kwhite opacity-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input
                type="search"
                placeholder="Search"
                className="bg-kwhite flex-grow rounded-full p-2 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-kwhite ">
            <thead className="text-xs text-kwhite bg-kblack">
              <tr>
                <th scope="col" className="px-6 py-3">Employee Name</th>
                <th scope="col" className="px-6 py-3">Month</th>
                <th scope="col" className="px-6 py-3">Attendance</th>
                <th scope="col" className="px-6 py-3">OT Hours</th>
                <th scope="col" className="px-6 py-3">No Pay Days</th>
                <th scope="col" className="px-6 py-3">OT Payment</th>
                <th scope="col" className="px-6 py-3">No Pay Deduction</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.length > 0 ? (
                searchResults.map((performance, index) => (
                  <tr key={performance._id} className="bg-kgray bg-opacity-30 border-b hover:bg-opacity-10 hover:bg-kgray">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {performance.employeeName}
                    </td>
                    <td className="px-6 py-4">
                      {performance.month}
                    </td>
                    <td className="px-6 py-4">
                      {performance.attendance}
                    </td>
                    <td className="px-6 py-4">
                      {performance.otHours}
                    </td>
                    <td className="px-6 py-4">
                      {performance.noPayDays}
                    </td>
                    <td className="px-6 py-4">
                      {performance.otPayment}
                    </td>
                    <td className="px-6 py-4">
                      {performance.noPayDeduction}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-kwhite/20 w-full text-kwhite">
                  <td colSpan="7" className="text-center py-4">
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

export default ViewPerformance;
