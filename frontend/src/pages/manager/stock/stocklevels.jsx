import React, { useEffect, useState,useRef } from "react";
import { Typography, Button, Progress, Card, CardBody } from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { HiOutlineArrowCircleLeft,HiOutlineDocumentReport } from "react-icons/hi";
import ProgressBar from "./progressbar";

import { useReactToPrint } from 'react-to-print';

axios.defaults.baseURL = "http://localhost:8010/";

const StockLevels = () => {

    const GoBack = () => {
        window.location.href = "/manager/stockdept/";
    };

    const [dataList, setDataList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        getFetchData();
        console.log(dataList);
    }, []);

    const getFetchData = async () => {
        try {
            const response = await axios.get("/item/");
            console.log(response);
            if (response.data.success) {
                setDataList(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const rowColorChanger = (percentage) => {
        let color = "";

        if (percentage < 25) {
            color = 'bg-pred/30';
        } else if (percentage < 50) {
            color = 'bg-porange/30';
        } else if (percentage < 75) {
            color = 'bg-pyellow/30';
        } else if (percentage < 90) {
            color = 'bg-plgreen/30';
        } else {
            color = 'bg-pgreen/30';
        }

        return `${color}`;
    };


    const calcPercentage = (value1, valve2) => {
        return Math.round((value1 / valve2) * 100);
    };

    const handleRequestButton = (itemId) => {
        return () => {
            console.log("Heading to request page");
            window.location.href = `/manager/stockdept/stocklevels/request?itemId=${itemId}`;
        };
    };


    // Search Item
const [searchTerm, setSearchTerm] = useState("");
const [searchResults, setSearchResults] = useState([]);

useEffect(() => {
    const results = dataList.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
}, [searchTerm, dataList]);



    //Report Generation
    const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };


    //Report Generation
    const componentPDF = useRef([]);

    const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
  });

const calcTotalCost = (dataList) => {
    let totalCost = 0;
    dataList.forEach((item) => {
        totalCost += parseInt(item.cost);
    });
    return totalCost;
};

    
    //Pagination
    const [currentItems, setCurrentItems] = useState([]);
    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);
        setCurrentItems(currentItems);
    }, [currentPage, itemsPerPage, searchResults]);

    // Logic to dynamically generate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(searchResults.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const SupplyRequestPrintable = ({ dataList, startDate, endDate }) => {
        return (
            <div ref={componentPDF} className="bg-kwhite mx-auto items-center justify-center p-10 rounded-lg">
                    <div className="text-2xl font-bold text-kblack items-center justify-center text-center mb-5">Stock Levels Report</div>
                    <div className="flex items-center justify-between">
                    <span className="text-sm text-kblack mb-3">Generated on: {new Date().toLocaleString()}</span>
                    <span className="text-sm text-kblack mb-3">Report Period: {startDate && endDate ? startDate.toLocaleDateString() + ' to ' + endDate.toLocaleDateString() : 'All'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                    </div>
                    <table className="w-full table-fixed border rounded-lg overflow-hidden">
        <thead>
            <tr className="bg-kblack border-kblack text-kwhite border text-center">
            <th className="py-5">Name</th>
                            <th>Quantity</th>
                            <th>Level</th>
            </tr>
        </thead>
        <tbody>
                {dataList.map((il, index) => {
                    const ReqDate = new Date(il.date);
                    const ReqDateStr =
                        ReqDate.getDate() +
                        " - " +
                        (ReqDate.getMonth() + 1) +
                        " - " +
                        ReqDate.getFullYear();

                    const ExDate = new Date(il.exdate);
                    const ExDateStr =
                        ExDate.getDate() +
                        " - " +
                        (ExDate.getMonth() + 1) +
                        " - " +
                        ExDate.getFullYear();

                        return (
                            <tr key={il._id} className="border text-kblack text-center items-center p-4">
                                <td>{il.name}</td>
                                <td>{il.quantity} / {il.maxCapacity}</td>
                                <td>
                                    <span>{calcPercentage(il.quantity, il.maxCapacity)}%</span>
                                </td>
                            </tr>
                        );
                        
                })}
            </tbody>
    </table>
                <div className="grid grid-cols-2">
                    <span className="text-sm text-kblack mt-5">Total Items:</span>
                    <span className="text-sm text-kblack mt-5">{dataList.length}</span>
                </div>
                </div>
        );
    };

    // State to track whether to show low stock items or all items
const [showLowStock, setShowLowStock] = useState(false);

// Filter function to filter out items running low on stock
const filterLowStock = () => {
  // Set showLowStock to true
  setShowLowStock(true);
};

// Function to reset the filter and show all items
const resetFilter = () => {
  // Set showLowStock to false
  setShowLowStock(false);
};

// Modify the useEffect to run when showLowStock state changes
useEffect(() => {
    // If showLowStock is true, filter out items running low on stock
    // Otherwise, show all items
    const results = showLowStock ? dataList.filter(item => calcPercentage(item.quantity, item.maxCapacity) < 25) : dataList;
    setSearchResults(results);
  }, [showLowStock, dataList]);

    const componentRef = useRef();


    const [reportSection, setReportSection] = useState(false);

    return (
        <>
            <div className="mx-5 mb-5">
                <div className="grid grid-cols-7 w-full bg-transparent items-center mr-5">
                            <Button
                                onClick={GoBack}
                                className="col-span-2 flex items-center bg-transparent text-kwhite px-5"
                            >
                                <HiOutlineArrowCircleLeft className="w-10 h-10" />
                                <span className="text-2xl ml-5">Stock Levels</span>
                            </Button>
                        <div className="col-span-3 px-20">
                            <input
                                type="search"
                                placeholder="Search By Item Name"
                                className="flex items-center bg-kwhite rounded-full p-2 px-5 text-sm"
                                value = {searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <Button
                                className="flex items-center space-x-2 bg-kblue text-kwhite p-3 px-5"
                                onClick={() => setReportSection(true)}
                            >
                                <HiOutlineDocumentReport className="w-5 h-5" />
                                <span className="text-sm">Generate Reports</span>
                            </Button>
<Button
  className="flex items-center space-x-2 bg-kblue text-kwhite p-3 px-5"
  onClick={filterLowStock}
>
  <span className="text-sm">Show Low Stock Items</span>
</Button>

{/* Button to reset the filter and show all items */}
<Button
  className="flex items-center space-x-2 bg-kgreen text-kwhite p-3 px-5"
  onClick={resetFilter}
>
  <span className="text-sm">Show All Items</span>
</Button>
                </div>
            </div>
            {reportSection && (
    <div className="fixed grid grid-cols-1 top-0 left-0 h-full bg-kblack bg-opacity-50 backdrop-blur flex items-center justify-center text-kwhite z-50 p-24 ">
    <button
                className="absolute top-5 right-5 bg-kblack text-kwhite"
                onClick={() => setReportSection(false)}
            >
                X
            </button>
    <SupplyRequestPrintable ref={componentRef} dataList={searchResults} startDate={startDate} endDate={endDate}/>
    <button className="bg-kgreen rounded-lg text-kwhite mx-50 mx-64 p-2" onClick={generatePDF}>Print</button>
    </div>
)}
            <div className="px-10" ref={componentPDF}>
                <table className="w-full rounded-lg overflow-hidden text-sm">
                    <thead>
                        <tr className="bg-kblack/40 border-kwhite text-kwhite p-4 font-bold border-b text-center">
                            <th className="w-1/4 py-5">Name</th>
                            <th className="w-1/8">Quantity</th>
                            <th className="w-3/5">Level</th>
                            <th className="w-1/8">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((il, index) => {
                                const percentage = calcPercentage(il.quantity, il.maxCapacity);
                                return (
                                    <>
                                    <tr key={index} className={`border-b ${rowColorChanger(percentage)} text-kwhite text-center items-center p-4`}>
                                        <td>{il.name}</td>
                                        <td>{il.quantity} / {il.maxCapacity}</td>
                                        <td>
                                            <ProgressBar value1={il.quantity} value2={il.maxCapacity} />
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-grow justify-center mx-auto">
                                                <Button className="p-3 bg-kred border text-kwhite" onClick={handleRequestButton(il._id)}>
                                                    Order Now
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                    </>
                                );
                            })
                        ) : (
                            <tr className="bg-kwhite/20 w-full text-kwhite">
                                <td colSpan="4" className="text-center py-4">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="flex items-center justify-between border-t border-kblack p-4">
                    <div className="flex items-center gap-2">
                        {pageNumbers.map((number) => (
                            <Button key={number} variant="text" size="sm" className="text-kblack bg-kwhite" onClick={() => paginate(number)}>
                                {number}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default StockLevels;