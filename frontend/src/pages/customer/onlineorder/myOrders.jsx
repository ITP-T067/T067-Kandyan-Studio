import React from 'react';
import process from '../../../images/process.png';
import complete from '../../../images/complete.png';
import genarate from '../../../images/genarate.png';


function MyOrder() {
  return (
    <div>
        <div class="flex mt-4 ml-16 mr-16 mb-5">
            <div class="flex-grow p-6 bg-white rounded-3xl dark:border-kgray bg-kgray bg-opacity-50 mr-8">
                <h5 class="mt-auto text-4xl font-bold dark:text-kwhite">Total Orders</h5>
                <h1 className="font-bold text-6xl text-kwhite dark:text-kwhite text-right mb-auto mt-10">12</h1>
            </div>
            <div class="flex-grow p-6 bg-white rounded-3xl bg-kgray bg-opacity-50 dark:border-kgray ml-8">
                <h5 class=" text-4xl font-bold dark:text-kwhite ">Total Expenditure</h5>
                <h1 className="font-bold text-6xl text-kwhite dark:text-kwhite text-right mt-10">LKR 14,300.00</h1>
            </div>
        </div>

        <div className='flex justify-center'>
            <a href="/pendingorder" className='flex-grow relative ml-16 duration-300 delay-150 transform hover:scale-105'>
                <div className="w-72 h-80 top-0 absolute bg-kblack rounded-3xl border-8 border-kyellow flex justify-center">
                    <img src={process} alt="Image" className="w-52 h-52" />
                </div>
                <div className="w-72 h-20 left-0 top-[232px] absolute text-center text-kwhite text-3xl font-bold font-['Inter']">Pending<br/>Orders</div>
            </a>
            <a href="/processingorder" className='flex-grow relative duration-300 delay-150 transform hover:scale-105'>
                <div className="w-72 h-80 top-0 absolute bg-kblack rounded-3xl border-8 border-kyellow flex justify-center">
                    <img src={process} alt="Image" className="w-52 h-52" />
                </div>
                <div className="w-72 h-20 left-0 top-[232px] absolute text-center text-kwhite text-3xl font-bold font-['Inter']">Processing<br/>Orders</div>
            </a>
            <a href="/completeorder" className='flex-grow relative duration-300 delay-150 transform hover:scale-105'>
                <div className="w-72 h-80 top-0 absolute bg-kblack rounded-3xl border-8 border-kyellow flex justify-center">
                    <img src={complete} alt="Image" className="w-52 h-52" />
                </div>
                <div className="w-72 h-20 left-0 top-[232px] absolute text-center text-kwhite text-3xl font-bold font-['Inter']">Completed<br/>Orders</div>
            </a>
            <a href="/generatereport" className='flex-grow relative mr-3 duration-300 delay-150 transform hover:scale-105'>
                <div className="w-72 h-80 top-0 absolute bg-kblack rounded-3xl border-8 border-kyellow flex justify-center">
                    <img src={genarate} alt="Image" className="w-52 h-52" />
                </div>
                <div className="w-72 h-20 left-0 top-[232px] absolute text-center text-kwhite text-3xl font-bold font-['Inter']">Generate<br/>Reports</div>
            </a>
        </div>






       
    </div>
  );
}
export default MyOrder;