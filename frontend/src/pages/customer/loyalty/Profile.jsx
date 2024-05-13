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
    <div className='mx-60'>
      {findCusDetails && (
        <div className="m-10 w-full bg-kgray bg-opacity-30 rounded-3xl mx-auto">
          <div className="grid grid-cols-5 p-8 bg-kyellow bg-opacity-100 rounded-3xl mx-auto">
              <div className="bg-kwhite rounded-full">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="profile" className=" rounded-full"/>
                  
              </div> 
              <div className="col-span-4 p-8 bg-kwhite bg-opacity-70 rounded-3xl ml-5 flex items-center"> 
                <div className='font-bold text-xl'>
                  <div>User Name : {findCusDetails.Cus_Name}</div>
                  <div>Email Address : {findCusDetails.Email}</div>
                  <div>Phone Number : {findCusDetails.Contact_No} </div>    
                </div>
              </div>       
          </div>
          <div className='grid grid-cols-3 gap-1'>
          <div className="m-5 bg-kwhite rounded-3xl justify-center items-center p-5 flex flex-col">
            <div className="flex justify-center items-center" >
            <span className="text-kwhite bg-korange/70 px-5 py-2 rounded-full font-bold text-xl text-center">Bronze Member</span>
            </div>
            <div className="text-black text-sm font-semibold p-3">Welcome Package: Offer new customers a welcome package with a 5% discount on their first booking or purchase</div>
            <img src={require(`../../../../../frontend/src/images/coin-3.png`)} className='mx-auto w-40 h-40'/>
          </div>
          <div className="m-5 bg-kwhite rounded-3xl justify-center items-center p-5 flex flex-col">
            <div className="flex justify-center items-center" >
            <span className="text-kwhite bg-kgray/70 px-5 py-2 rounded-full font-bold text-xl text-center">Silver Member</span>
            </div>
            <div className="text-black text-sm font-semibold p-3">Increased Rewards: Provide higher rewards, such as double points or bonus discounts, for Silver members compared to bronze members.</div>
            <img src={require(`../../../../../frontend/src/images/coin-2.png`)} className='mx-auto w-40 h-40'/>
          </div>
          <div className="m-5 bg-kwhite rounded-3xl justify-center items-center p-5 flex flex-col">
            <div className="flex justify-center items-center" >
            <span className="text-kwhite bg-kyellow/70 px-5 py-2 rounded-full font-bold text-xl text-center">Gold Member</span>
            </div>
            <div className="text-black text-sm font-semibold p-3">Exclusive Benefits: Offer exclusive benefits to Gold members, such as free shipping, or a personal account manager.</div>
            <img src={require(`../../../../../frontend/src/images/coin.png`)} className='mx-auto w-40 h-40'/>
          </div>
        </div>

        </div>
      )}
    </div>
  )
}

