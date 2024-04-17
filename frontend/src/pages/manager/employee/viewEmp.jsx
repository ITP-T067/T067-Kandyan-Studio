import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';

const ViewEmp = () => {
  return (
    <div className='flex flex-col h-screen'>

      <div className="flex items-center">
        <div className="flex items-center justify-center bg-transparent rounded-full h-10 w-10 ml-7 border border-kwhite transition-transform duration-300 transform-gpu hover:scale-110">
          <BsArrowLeft className="text-kwhite stroke-2" />
        </div>
        <h1 className="text-left text-kwhite text-3xl pr-4 pb-4 ml-7 mt-4">View Employees</h1>
      </div>

      <div className='flex flex-col justify-center items-center'>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-transparent ">
            <div>
              <button id="deleteEmployeeButton" class="inline-flex items-center text-kwhite bg-kred border border-kred focus:outline-none hover:bg-kwhite hover:text-kred hover:border-kred font-bold rounded-lg text-sm px-3 py-1.5" type="button">
                <span class="sr-only">Delete Employee button</span>
                Delete
              </button>
            </div>
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-kwhite opacity-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="text" id="table-search-users" class="block p-2 ps-10 text-sm text-kwhite border-2 border-kwhite rounded-lg w-80 bg-kgray bg-opacity-70 focus:ring-kblue focus:border-kblue" placeholder="Search for users" />
            </div>
          </div>
          <table class="w-full text-sm text-left rtl:text-right text-kwhite ">
            <thead class="text-xs text-kwhite uppercase bg-kblack ">
              <tr>
                <th scope="col" class="p-4">
                  <div class="flex items-center">
                    <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-kblue bg-kgray border-kwhite rounded focus:ring-kblue focus:ring-2 " />
                    <label for="checkbox-all-search" class="sr-only">checkbox</label>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Username
                </th>
                <th scope="col" class="px-6 py-3">
                  Designation
                </th>
                <th scope="col" class="px-6 py-3">
                  Address
                </th>
                <th scope="col" class="px-6 py-3">
                  Contact No
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-kgray bg-opacity-30 border-b hover:bg-opacity-10 hover:bg-kgray">
                <td class="w-4 p-4">
                  <div class="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-kblue bg-kgray border-kwhite rounded focus:ring-kblue focus:ring-2 " />
                    <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                  </div>
                </td>
                <th scope="row" class="flex items-center px-6 py-4 text-kwhite whitespace-nowrap">
                  <div class="ps-3">
                    <div class="text-base font-semibold">Neil Sims</div>
                    <div class="font-normal text-kgray">neil.sims@flowbite.com</div>
                  </div>
                </th>
                <td class="px-6 py-4">
                  2290
                </td>
                <td class="px-6 py-4">
                  Creator
                </td>
                <td class="px-6 py-4">
                  Main Rd, Makola
                </td>
                <td class="px-6 py-4">
                  0112233445
                </td>
                <td class="px-6 py-4">
                  <a href="#" class="font-semibold text-kblue hover:underline">Edit user</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

  );
}

export default ViewEmp;
