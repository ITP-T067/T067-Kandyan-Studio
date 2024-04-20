import React, { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8010/"
const StudioDash = () => {

    const [data, setData] = useState();
    const [currentStatus, setCurrentStatus] = useState();

      const getFetchData = async () => {
          try {
              const response = await axios.get("/studio/");
              if (response.data.success) {
                  setData(response.data.data);
                  setCurrentStatus(response.data.data[0].Studio_Status);
              }
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      };

      useEffect(() => {
        getFetchData();
      }, []);
    

      const handleOnClick = async(value) => {
        try {  
            const response = await axios.put("/studio/update", {Studio_Status: value});
            if (response.data.success) {
                console.log(response.data.message);
                setCurrentStatus(value);
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error updating:", error);
        }
      }

    return (
        <>  
            <h2 className="text-kwhite text-4xl font-bold">Orders</h2>

            <div className="w-11/12 mx-auto bg-kgray h-28 rounded-lg flex flex-row items-center justify-evenly bg-opacity-50 border-2 border-kwhite">
                <div className="h-20 flex flex-col justify-center items-center text-center">
                    <h3 className="text-kwhite text-4xl font-bold">Status</h3>
                </div>
                <button 
                    value="BABY ONBOARD" 
                    onClick={() => handleOnClick("BABY ONBOARD")} 
                    className="text-lg h-3/5 w-1/6 btn_edit bg-kblue text-kwhite font-bold py-3 px-5 rounded-[10px] mr-2 disabled:bg-kgray" 
                    disabled={currentStatus === "BABY ONBOARD"}
                >
                    BABY ONBOARD
                </button>
                <button 
                    value="OCCUPIED" 
                    onClick={() => handleOnClick("OCCUPIED")} 
                    className='text-lg h-3/5 w-1/6 btn_edit bg-kred text-kwhite font-bold py-3 px-5 rounded-[10px] mr-2 disabled:bg-kgray' 
                    disabled={currentStatus === "OCCUPIED"}
                >
                    OCCUPIED
                </button>
                <button 
                    value="VACANT" 
                    onClick={() => handleOnClick("VACANT")} 
                    className='text-lg h-3/5 w-1/6 btn_edit bg-kgreen text-kwhite font-bold py-3 px-7 rounded-[10px] mr-2 disabled:bg-kgray' 
                    disabled={currentStatus === "VACANT"}
                >
                    VACANT
                </button>

            </div>
        </>
    );
}

export default StudioDash;
