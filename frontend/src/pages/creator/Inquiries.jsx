import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import logo from '../../images/logo.png';

axios.defaults.baseURL = "http://localhost:8010/";

export default function Inquiries() {
    const [dataList, setDataList] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reportSection, setReportSection] = useState(false);

    const componentPDF = useRef([]);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
    });

    useEffect(() => {
        getFetchData();
    }, []);

    const getFetchData = async () => {
        try {
            const response = await axios.get("/inquiry/");
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

    const SupplyRequestPrintable = ({ dataList, startDate, endDate }) => {
        return (
            <div ref={componentPDF} className="bg-kwhite mx-auto items-center justify-center p-10 rounded-lg">
                <img src={logo} className="h-20 w-20 mx-auto " />
                <span className="text-2xl text-kblack font-bold flex items-cneter justify-center mt-5">Kandyan Studio & Digital Color Lab</span>
                 <div ref={componentPDF} className="bg-kwhite mx-auto items-center justify-center p-10 rounded-lg">
                    <div className="text-2xl font-bold text-kblack items-center justify-center text-center mb-5">Inquiry Report</div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-kblack mb-3">Generated on: {new Date().toLocaleString()}</span>
                        <span className="text-sm text-kblack mb-3">Report Period: {startDate && endDate ? startDate.toLocaleDateString() + ' to ' + endDate.toLocaleDateString() : 'All'}</span>
                    </div>
                    <table className="w-full table-fixed border rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-kblack border-kblack text-kwhite border text-center">
                                <th className="px-4 py-2">Customer Name</th>
                                <th className="px-4 py-2">Inquiry Type</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataList.map((el, index) => (
                                <tr key={el._id}>
                                    <td className="px-4 py-2 text-center text-kblack">{el.Cus_ID ? el.Cus_ID.Cus_Name : 'N/A'}</td>
                                    <td className="px-4 py-2 text-center text-kblack">{el.Inquiry_subType}</td>
                                    <td className="px-4 py-2 text-center text-kblack">{formatDate(el.Inquiry_Date)}</td>
                                    <td className="px-4 py-2 text-center text-kblack">{el.Status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const componentRef = useRef();

  return (
    <>
    

{reportSection && (
    <div className="fixed grid grid-cols-1 top-0 left-0 h-full bg-kblack bg-opacity-50 backdrop-blur flex items-center justify-center text-kwhite z-50 p-24 ">
    <button
                className="absolute top-5 right-5 bg-kblack text-kwhite"
                onClick={() => setReportSection(false)}
            >
                X
            </button>
    <SupplyRequestPrintable ref={componentRef} dataList={dataList} startDate={startDate} endDate={endDate}/>
    <button className="bg-kgreen rounded-lg text-kwhite mx-50 mx-64 p-2" onClick={generatePDF}>Print</button>
    </div>
)}
    <div className="mt-5 mx-auto w-11/12">
    <div className='flex'>
            <button className="bg-kblue text-kwhite p-3 px-5" onClick={() => setReportSection(true)}>Generate Report</button>
          </div>
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
                          const rowClass = el.Status === "Resolved" ? "bg-pgreen/30" : "bg-kwhite/10";
                            return (
                                <tr key={el._id}  className={`border-b text-kwhite text-center items-center p-4 ${rowClass}`}>
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
