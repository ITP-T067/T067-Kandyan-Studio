import React, { useEffect, useState } from 'react';
import '../../Styles/creator/projects.css';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8010/";

export default function CompletedProjects() {

    const [dataList, setDataList] = useState([]);

    const getFetchData = async () => {
        try {
          const response = await axios.get("/project/");
          if (response.data.success) {
            setDataList(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      useEffect(() =>{
        getFetchData()
      }, [])

    const formatCompletedDate = (completedDate) => {
        return completedDate ? new Date(completedDate).toLocaleDateString() : 'N/A';
    };

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

  return (
    <>
        <nav className="w-3/5  flex flex-row justify-center items-center mx-auto text-kwhite">
                <a className="w-1/2 h-[65px] py-5 text-center rounded-tl-[30px] rounded-bl-[30px] bg-kblack font-medium" href="/creator/"><div className="">Ongoing Projects</div></a>
                <a className="w-1/2 h-[65px] py-5 text-center rounded-tr-[30px] rounded-br-[30px] bg-kgray font-medium" href="/creator/completedProjects"><div>Completed Projects</div></a>
        </nav>

        <div className='mt-5 mx-auto w-11/12'>
            <table className="w-full border-collapse text-kwhite">
            <thead  className="bg-kblack text-kwhite h-[60px]">
                <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Order Name</th>
                <th className="px-4 py-2">Customer Name</th>
                <th className="px-4 py-2">Added Date</th>
                <th className="px-4 py-2">Completed Date</th>
                </tr>
            </thead>
            <tbody className="bg-kgray bg-opacity-20 h-[80px]">
                {dataList.length > 0 ? (
                    dataList.map((el) => {
                        if(el.Status == "Completed"){
                        
                        return (
                            <tr key={el._id}>
                                <td className="px-4 py-2 text-center">{el.Project_Name}</td>
                                <td className="px-4 py-2 text-center">
                                                {el.Order_ID ? el.Order_ID.Item_Name : 'N/A'}</td>
                                <td className="px-4 py-2 text-center">{el.Order_ID ? el.Order_ID.Cus_ID.Cus_Name : 'N/A'}</td>
                                <td className="px-4 py-2 text-center">{formatDate(el.Project_Date)}</td>
                                <td className="px-4 py-2 text-center">{formatDate(el.Completed_Date)}</td>
                            </tr>
                        )
                        }
                    })
                ) : (
                    <tr>
                        <td colSpan="4">No data available</td>
                    </tr>
                )}
            </tbody>
            </table>
        </div>
    </>
  )
}
