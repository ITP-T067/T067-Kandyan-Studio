import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';

const CreatorSlip = ({ formValues }) => {
  return (
    <div className='flex flex-col h-screen'>
      <div className="flex items-center">
        <div className="flex items-center justify-center bg-transparent rounded-full h-10 w-10 ml-7 border border-kwhite transition-transform duration-300 transform-gpu hover:scale-110">
          <BsArrowLeft className="text-kwhite stroke-2" />
        </div>
        <h1 className="text-left text-kwhite text-3xl pr-4 pb-4 ml-7 mt-4">Salary Slip</h1>
      </div>

      <div className="flex justify-center">
        <div className="border-kblack border-8 bg-kwhite bg-opacity-70 w-90vw p-4 mt-4 text-kblack">
          
          <div className="text-center font-bold text-kblack mb-4">
            Kandyan Studio and Digital Color Lab - Pay slip for the month December - 2023
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>NIC Number:</div>
            <div>xxxxxx</div>
            <div>Employee Name:</div>
            <div>xxxxxx</div>
            <div>Designation:</div>
            <div>xxxxxx</div>
            <div></div> 
            <div></div>
            <div>Basic Salary:</div>
            <div>xxxxxx</div>
            <div>OT Payment:</div>
            <div>xxxxxx</div>
            <div>Gross Salary:</div>
            <div>xxxxxx</div>
            <div></div> 
            <div></div>
            <div>No Pay:</div>
            <div>xxxxxx</div>
            <div>Loans:</div>
            <div>xxxxxx</div>
            <div>EPF 8%:</div>
            <div>xxxxxx</div>
            <div>Total Deductions:</div>
            <div>xxxxxx</div>
            <div></div> 
            <div></div>
            <div>EPF 12%:</div>
            <div>xxxxxx</div>
            <div>ETF 3%:</div>
            <div>xxxxxx</div>
            <div></div> 
            <div></div>
            <div>Net Salary:</div>
            <div>xxxxxx</div>
            <div></div>
            <div></div>
            <div>OT Hours:</div>
            <div>xxxxxx</div>
            <div>Attendance:</div>
            <div>xxxxxx</div>
            <div>No Pay Days:</div>
            <div>xxxxxx</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatorSlip;
