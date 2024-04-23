import React, {useEffect, useState} from 'react'
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8010/";


export default function Profile()  {

  
const [findCusDetails, setfindCusDetails] = useState([]);

  useEffect(() => {
    getCustomerDetail();
  }, []);
  
  const getCustomerDetail = async () => {
    try {
        const response = await axios.get('/customer/find/66147c480a94b623c0e9a698'); // Replace '/path/to/your/backend/api' with your actual API endpoint
        setfindCusDetails(response.data.data);
    } catch (error) {
        console.error('Error fetching pending orders:', error);
    }
  };



  return(
    <div>
      {findCusDetails && (
        <div className="h-[34rem] w-[60rem] bg-kgray bg-opacity-30 rounded-3xl mx-auto">
          <div className="grid grid-cols-5 h-[14rem] w-[60rem] p-8 bg-kyellow bg-opacity-100 rounded-3xl mx-auto">
              <div className="h-[10rem] w-[10rem] bg-kwhite rounded-3xl">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="profile" className="h-[10rem] w-[10rem] rounded-3xl"/>
                  
              </div> 
              <div className="col-span-4 h-[8rem] w-[40rem] p-8 bg-kwhite bg-opacity-70 rounded-3xl ml-[4rem] mt-4"> 
                <div className='font-bold text-xl -mt-2'>
                  <div>User Name : {findCusDetails.Cus_Name}</div>
                  <div>Email Address : {findCusDetails.Email}</div>
                  <div>Phone Number : {findCusDetails.Contact_No} </div>    
                </div>
              </div>       
          </div>
          <div className='flex justify-between'>
          <div className="h-[14rem] w-[50rem] m-10 bg-kwhite rounded-3xl flex items-center justify-center">
            <span className="text-black text-lg font-semibold ml-2 Bold ">Silver Member
            <div className="text-kred">Welcome Package: Offer new customers a welcome package with a 5% discount on their first booking or purchase</div>
            </span>
          </div>
          <div className="h-[14rem] w-[50rem] m-10 bg-kwhite rounded-3xl flex items-center justify-center">
            <span className="text-black text-lg font-semibold ml-2 Bold">Gold Member
            <div className="text-korange">Increased Rewards: Provide higher rewards, such as double points or bonus discounts, for gold members compared to bronze members.</div>
            </span>
          </div>
          <div className="h-[14rem] w-[50rem] m-10 bg-kwhite rounded-3xl flex items-center justify-center">
            <span className="text-black text-lg font-semibold Bold">Platinum Member
            <div className="text-kgray">Exclusive Benefits: Offer exclusive benefits to platinum members, such as free shipping, early access to new products, or a personal account manager.</div>
            </span>
          </div>
        </div>

        </div>
      )}
    </div>
  )
}

