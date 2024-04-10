import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerCart() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="h-96 bg-kgray bg-opacity-30 rounded-3xl ml-12 mr-12 max-h-[550px] relative">

        <div className="relative">
          <div class="flex items-center ml-6 pt-5">
            <svg class="h-11 w-11 mb-3 text-kwhite mr-2 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={() => navigate('/cusdashboard')}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 8 8 12 12 16" />
              <line x1="16" y1="12" x2="8" y2="12" />
            </svg>
          </div>
          <h2 className="left-[73px] top-5 absolute text-kwhite text-5xl font-bold font-['Inter']">Shopping Cart (3)</h2>
        </div>

        <div class="overflow-y-auto max-h-[450px] max-w-[800px] mt-2">
          <div className="h-28 bg-kgray rounded-3xl m-4" />
          <div className="h-28 bg-kgray rounded-3xl m-4" />  
          <div className="h-28 bg-kgray rounded-3xl m-4" />
        </div>
        
        <div className="absolute top-0 right-0 h-[28.5rem] w-[34rem] bg-kgray bg-opacity-80 rounded-3xl m-12 mt-16 text-kwhite">
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-5xl font-bold font-['Inter']">Summary</div>

            <div className="m-12 text-2xl">
              <div className="w-[28rem] top-[110px] absolute">
                <div className="absolute font-normal font-['Inter']">Subtotal</div>
                <div className="text-right font-normal font-['Inter']">LKR 75,000.00</div>
              </div>
              <div className=" w-[28rem] top-[160px] absolute">
                <div className="absolute font-normal font-['Inter']">Loyalty Discount</div>
                <div className="text-right font-normal font-['Inter']">LKR 5,000.00</div>
              </div>
              <div className="w-[28rem] top-[210px] absolute">
                <div className="absolute font-normal font-['Inter']">Total</div>
                <div className="text-right left-[300px] font-normal font-['Inter']">LKR 70,000.00</div>
              </div>
            </div>

            <div>
              <button type="button" className="text-kwhite bg-kgreen hover:bg-kyellow font-bold rounded-xl text-2xl px-36 py-2.5 m-12 mt-64" onClick={() => navigate('/payorder')}>Checkout (3)</button>
            </div>
        </div>
      </div>
    </div>
  );
}
