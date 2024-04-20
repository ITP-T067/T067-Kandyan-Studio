import React, { useEffect, useState,useRef } from "react";
import { Typography, Button, Progress, Card, CardBody } from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";

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

    //Stock Level Demonstration
    const colorChanger = (percentage) => {
        let color = "";

        if (percentage < 25) {
            color = 'bg-pred/70';
        } else if (percentage < 50) {
            color = 'bg-porange/70';
        } else if (percentage < 75) {
            color = 'bg-pyellow/70';
        } else if (percentage < 90) {
            color = 'bg-plgreen/70';
        } else {
            color = 'bg-pgreen/70';
        }

        return `${color}`;
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

    const statusChanger = (percentage) => {
        if (percentage == 0) {
            return 'Out of Stock';
        }else if (percentage < 25) {
            return 'Critically Low, Order Immediately';
        } else if (percentage < 50) {
            return 'Low Stock, Order Soon';
        } else if (percentage < 75) {
            return 'Sufficent Stock, But Consider Ordering';
        } else if (percentage < 90) {
            return 'Stock Levels are Good';
        } else {
            return 'Stock Levels are Excellent';
        }
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
    const componentPDF = useRef([]);
    const [isReport,setIsReport] = useState(false);

    const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };


    const Report = () => {
        setIsReport(true);
        console.log("Generate Report Section Opened");
    };

    const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "History Report",
    onAfterPrint: () => alert("Data saved in PDF")
  });


    
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

    const handleButton = (type) => {
        return () => {
            switch (type) {
                case "Add":
                    window.location.href = "/manager/stockdept/items/additem";
                    break;
                default:
                    break;
            }
        };
    };

    return (
        <>
            <div className="mx-5 mb-5">
                <Card>
                    <CardBody className="flex items-center justify-between">
                        <div>
                            <Button
                                onClick={GoBack}
                                className="flex items-center space-x-2 bg-transparent text-kwhite px-3 py-2 rounded-md"
                            >
                                <HiOutlineArrowCircleLeft className="w-5 h-5" />
                                <span className="text-sm">Stock Levels</span>
                            </Button>
                        </div>
                        <div>
                            <input
                                type="search"
                                placeholder="Search"
                                className="bg-kwhite rounded-full p-2 text-sm"
                                value = {searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div>
                            <Button className="bg-kblue text-kwhite p-3 px-5" onClick={Report}>
                                Generate Reports
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
            {isReport && (
                <div className="mx-5 mb-5">
                    <Card>
                        <CardBody className="flex items-center justify-between">
                            <div>
                                <Typography color="blue">Report Generation</Typography>
                            </div>
                            <DatePicker
            className='text-kwhite bg-kgray w-36 h-10 bg-opacity-80  rounded-3xl text-center'
            selected={startDate}
            onChange={handleStartDateChange}
          />
          <label className='font-bold text-kwhite text-lg ml-8 mr-2'>TO</label>
          <DatePicker
            className='text-kwhite bg-kgray w-36 h-10 bg-opacity-80  rounded-3xl text-center'
            selected={endDate}
            onChange={handleEndDateChange}
          />
                            <div>
                                <Button className="bg-kblue text-kwhite p-3 px-5" onClick={generatePDF}>
                                    Generate PDF
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            )}
            <div className="px-10" ref={componentPDF}>
                <table className="w-full rounded-lg overflow-hidden text-sm">
                    <thead>
                        <tr className="bg-kblack/40 border-kwhite text-kwhite p-4 font-bold border-b text-center">
                            <th className="w-1/4 py-5">Name</th>
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
                                        <td>
                                            <div className={`grid grid-cols-3 items-center ${rowColorChanger(percentage)} py-1 px-2 rounded-full`}>
                                            <div className="col-span-2 w-full bg-kgray rounded-full border overflow-hidden">
                                                <div
                                                    className={`${colorChanger(percentage)} p-2 text-center text-xs font-medium leading-none text-kwhite`}
                                                    style={{ width: `${percentage}%` }}
                                                >
                                                    {percentage + "%"}
                                                </div>
                                            </div>
                                            <span className="col-span-1">
                                                {statusChanger(calcPercentage(il.quantity, il.maxCapacity))}
                                            </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-grow justify-center mx-auto">
                                                <Button className="p-3 bg-kblue text-kwhite" onClick={handleRequestButton(il._id)}>
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
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">Previous</Button>
                    <div className="flex items-center gap-2">
                        {pageNumbers.map((number) => (
                            <Button key={number} variant="text" size="sm" className="text-kblack bg-kwhite" onClick={() => paginate(number)}>
                                {number}
                            </Button>
                        ))}
                    </div>
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">Next</Button>
                </div>
            </div>
        </>
    );
};

export default StockLevels;