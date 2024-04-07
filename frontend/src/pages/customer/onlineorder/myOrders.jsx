import React from 'react';
import process from '../../../images/process.png';
import complete from '../../../images/complete.png';
import genarate from '../../../images/genarate.png';


function MyOrder() {
  return (
    <div>
        <div class="flex m-16">
            <div class="flex-grow p-6 bg-white rounded-3xl shadow dark:bg-kgray dark:border-kgray mr-8">
                <h5 class="mt-auto text-4xl font-bold dark:text-kwhite">Total Orders</h5>
                <h1 className="font-bold text-6xl text-kwhite dark:text-kwhite text-right mb-auto mt-10">12</h1>
            </div>
            <div class="flex-grow p-6 bg-white rounded-3xl shadow dark:bg-kgray dark:border-kgray ml-8">
                <h5 class=" text-4xl font-bold dark:text-kwhite ">Total Expenditure</h5>
                <h1 className="font-bold text-6xl text-kwhite dark:text-kwhite text-right mt-10">LKR 14,300.00</h1>
            </div>
        </div>

        <div className='flex justify-center'>
            <a href="/pendingorder" className='flex-grow relative mx-auto ml-16 duration-300 delay-150 transform hover:scale-110'>
                <div className="absolute">
                <div className="w-72 h-80 top-0 absolute bg-kblack rounded-3xl border-4 border-kyellow flex justify-center">
                    <img src={process} alt="Image" className="w-52 h-52" />
                </div>
                <div className="w-72 h-20 left-0 top-[232px] absolute text-center text-kwhite text-3xl font-bold font-['Inter']">Pending<br/>Orders</div>
                </div>
            </a>
            <a href="/processingorder" className='flex-grow relative mx-aut duration-300 delay-150 transform hover:scale-110'>
                <div className="absolute">
                <div className="w-72 h-80 top-0 absolute bg-kblack rounded-3xl border-4 border-kyellow flex justify-center">
                    <img src={process} alt="Image" className="w-52 h-52" />
                </div>
                <div className="w-72 h-20 left-0 top-[232px] absolute text-center text-kwhite text-3xl font-bold font-['Inter']">Processing<br/>Orders</div>
                </div>
            </a>
            <a href="/completeorder" className='flex-grow relative mx-auto  duration-300 delay-150 transform hover:scale-110'>
                <div className="absolute">
                <div className="w-72 h-80 top-0 absolute bg-kblack rounded-3xl border-4 border-kyellow flex justify-center">
                    <img src={complete} alt="Image" className="w-52 h-52" />
                </div>
                <div className="w-72 h-20 left-0 top-[232px] absolute text-center text-kwhite text-3xl font-bold font-['Inter']">Completed<br/>Orders</div>
                </div>
            </a>
            <a href="/generatereport" className='flex-grow relative mx-auto duration-300 delay-150 transform hover:scale-110'>
                <div className="absolute">
                <div className="w-72 h-80 top-0 absolute bg-kblack rounded-3xl border-4 border-kyellow flex justify-center">
                    <img src={genarate} alt="Image" className="w-52 h-52" />
                </div>
                <div className="w-72 h-20 left-0 top-[232px] absolute text-center text-kwhite text-3xl font-bold font-['Inter']">Generate<br/>Reports</div>
                </div>
            </a>
        </div>






       
    </div>
  );
}
export default MyOrder;