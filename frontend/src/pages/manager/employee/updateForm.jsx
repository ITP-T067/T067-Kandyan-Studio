import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';

const updateForm = () => {
  const fields = [
    { label: 'Employee Name' },
    { label: 'Email Address' },
    { label: 'Contact Number' },
    { label: 'Address' },
    { label: 'NIC Number' },
    { label: 'Designation' }
  ];

  return (
    <div className='flex flex-col h-screen'>
      <div className="flex items-center">
        <div className="flex items-center justify-center bg-transparent rounded-full h-10 w-10 ml-7 border border-kwhite transition-transform duration-300 transform-gpu hover:scale-110">
          <BsArrowLeft className="text-kwhite stroke-2" />
        </div>
        <h1 className="text-left text-kwhite text-3xl pr-4 pb-4 ml-7 mt-4">Update Employee</h1>
      </div>

      <div className='flex flex-col justify-center items-center'>
        <div className='w-[400px] h-[550px] flex flex-col justify-between items-center bg-kgray rounded-lg border-2 border-kwhite text-kwhite shadow-lg shadow-kblack/60'>
          <form className='h-[440px] w-full p-4 space-y-2 overflow-hidden'>
            {fields.map((field, index) => (
              <div key={index} className="relative h-[4rem] w-full min-w-[200px]">
                <input
                  type="text"
                  className="peer h-full w-full rounded-[7px] border border-kwhite border-t-transparent bg-transparent px-3 py-2 font-sans text-sm font-normal !text-kwhite outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-kblue placeholder-shown:border-t-kblue focus:border-2 focus:border-kwhite focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-kblue"
                  placeholder=" "
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight !text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-kwhite before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-kwhite after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-kwhite peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-kwhite peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-kwhite peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-kwhite peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-kblue">
                  {field.label}
                </label>
              </div>
            ))}
          </form>
          <button className='h-[38px] w-44 bg-kyellow text-kwhite font-bold rounded hover:bg-kwhite hover:text-kblack mb-4'>Clear</button>
          <button className='h-[38px] w-44 bg-kgreen text-kwhite font-bold rounded hover:bg-kblue hover:text-kwhite mb-4'>Update</button>
        </div>
      </div>
    </div>
  );
}

export default updateForm;
