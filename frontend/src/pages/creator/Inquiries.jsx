import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:8010/"

export default function Inquiries() {

    const [dataList, setDataList] = useState([])
    
      useEffect(() => {
        getFetchData();
        console.log(dataList);
      }, []);
    
      const getFetchData = async () => {
        try {
          const response = await axios.get("/inquiry/");
          console.log(response);
          if (response.data.success) {
            setDataList(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };

  return (
    <>
    <div className="mt-5 mx-auto w-11/12">
        <table className="w-full border-collapse text-kwhite">
            <thead className="bg-kblack text-kwhite h-[60px]">
                <tr>
                    <th className="px-4 py-2">Customer Name</th>
                    <th className="px-4 py-2">Inquiry Type</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Action</th>
                </tr>
            </thead>
            <tbody className="bg-kgray bg-opacity-20 h-[80px]">
                {dataList.length > 0 ? (
                    dataList.map((el) => {
                        if(el.Inquiry_Type == "Products"){
                            return (
                                <tr key={el._id}>
                                    <td className="px-4 py-2 text-center">{el.Cus_ID? el.Cus_ID.Cus_Name : 'N/A'}</td>
                                    <td className="px-4 py-2 text-center">{el.Inquiry_subType}</td>
                                    <td className="px-4 py-2 text-center">{formatDate(el.Inquiry_Date)}</td>
                                    <td className="px-4 py-2 text-center">{el.Status}</td>
                                    <td className="px-4 py-2 text-center">
                                        {
                                            el.Status != "Resolved" ? <Link to={`/creator/resolveInquiries/${el._id}`}>
                                            <button className='btn_edit bg-kblue text-kwhite font-bold py-3 px-5 rounded-[10px] mr-2'>Resolve</button>
                                        </Link> : <Link to={`/creator/resolveInquiries/${el._id}`}>
                                            <button className='btn_edit bg-kgreen text-kwhite font-bold py-3 px-5 rounded-[10px] mr-2'>View Details</button>
                                        </Link>
                                        }
                                    </td>
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
