import React, { useEffect, useState, useRef } from "react";
import { Card, Typography, Button, CardBody, Select, Option } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { HiOutlineArrowCircleLeft, HiOutlinePlusCircle, HiFilter, HiOutlineDocumentReport } from "react-icons/hi";
import ComplexProgressBar from "../manager/stock/complexprogressbar";
import DatePicker from "react-datepicker";
import { useReactToPrint } from 'react-to-print';

import Alert from "../../Components/Common/Alerts/alert";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8010/";

const SupplyRequest = () => {

  const renderApprovedRows = () => {
    return searchResults.map((srl, index) => {
        if (srl.status === "Approved") {
            return (
                <tr key={srl._id} className="border-b bg-kwhite/20 text-kwhite text-center items-center p-4">
                    {/* Render table cell data */}
                    <td>{/* Render other table cells here */}</td>
                    <td>{/* Render other table cells here */}</td>
                    {/* Add a "Pay" button for each approved row */}
                    <td className="p-4 text-kblack flex-grow">
                        <Button 
                            className="p-3 bg-kgreen text-kwhite text-sm" 
                            onClick={() => handlePay(srl._id)}
                        >
                            Pay
                        </Button>
                    </td>
                </tr>
            );
        }
        return null; // Skip rendering for non-approved items
    });
};

// Function to handle payment
const handlePay = async (id) => {
    try {
        const data = await axios.put(`/supplyrequest/pay/${id}`);
        if (data.data.success) {
            // Update the status of the corresponding item in the UI
            setSearchResults(prevResults => {
                return prevResults.map(item => {
                    if (item._id === id) {
                        return { ...item, status: "Paid" };
                    }
                    return item; 
                });
            });
            // Show success message
            setIsAlert(true);
            setAlertStatus("success");
            setMessage("Supply Request Paid Successfully!");
            setTimeout(() => {
                setIsAlert(false);
            }, 5000);
        } else {
            // Show error message
            setIsAlert(true);
            setAlertStatus("error");
            setMessage("Failed to pay Supply Request!");
            setTimeout(() => {
                setIsAlert(false);
            }, 5000);
        }
    } catch (error) {
        console.error("Error paying supply request:", error);
        // Show error message
        setIsAlert(true);
        setAlertStatus("error");
        setMessage("Failed to pay Supply Request!");
        setTimeout(() => {
            setIsAlert(false);
        }, 5000);
    }
};

//main


    const GoBack = () => {
        window.location.href = "/cashier/ordermain";
    };

    // Find Item Name By ID to Display in Table
    const fetchItemById = async (itemId) => {
        try {
            const response = await axios.get(`/item/find/${itemId}`);
            if (response.data.success && response.data.data) {
                // Check if data exists
                const { name, quantity, maxCapacity } = response.data.data; // Destructure if data exists
                return { name, quantity, maxCapacity };
            } else {
                console.error("Failed to fetch item data:", response.data.message);
                return "Item not found";
            }
        } catch (error) {
            console.error("Error fetching item data:", error);
            return "Item not found";
        }
    };

    // Edit Supply Request
    const [formDataEdit, setFormDataEdit] = useState({
        date: "",
        item: "",
        reqquantity: "",
        supplier: "",
        exdate: "",
        status: "Paid",
        cost:""

    });
    const [editSection, setEditSection] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.put("/supplyrequest/update/", formDataEdit);
            if (data.data.success) {
                console.log(data.data.message);
                setEditSection(false);
                getFetchData();
                setIsAlert(true);
                setAlertStatus("success");
                setMessage("Supply Request Updated Successfully!");
                setTimeout(() => {
                    setIsAlert(false); // Reset delete status after 5000ms
                }, 5000);
            } else {
                setIsAlert(true);
                setAlertStatus("error");
                setMessage("Failed to Update Supply Request!");
                setTimeout(() => {
                    setIsAlert(false); // Reset delete status after 5000ms
                }, 5000);
            }
        } catch (error) {
            console.log(error);
            setIsAlert(true);
            setAlertStatus("error");
            setMessage("Failed to Update Supply Request!");
        }
    };

    const handleEditOnChange = async (e) => {
        const { value, id } = e.target;
        setFormDataEdit((prev) => {
            return {
                ...prev,
                [id]: value,
            };
        });
    };

    const handleEdit = async (supplyRequest) => {
        setFormDataEdit(supplyRequest);
        setEditSection(true);
        console.log("Edit Supply Request Form Opened");
    };

    const [isAlert, setIsAlert] = useState(false);
    const [alertStatus, setAlertStatus] = useState(false);
    const [message, setMessage] = useState("");

    // Delete Supply Request
    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this request?");
        if (confirmed) {
            const data = await axios.delete("/supplyrequest/delete/" + id);
            if (data.data.success) {
                getFetchData();
                setIsAlert(true);
                setAlertStatus("success");
                setMessage("Supply Request Deleted Successfully!");
                setTimeout(() => {
                    setIsAlert(false); // Reset delete status after 5000ms
                }, 5000);
            } else {
                setIsAlert(true);
                setAlertStatus("error");
                setMessage("Failed to Delete Supply Request!");
                setTimeout(() => {
                    setIsAlert(false); // Reset delete status after 5000ms
                }, 5000);
            }
        }
    };

    const [dataList, setDataList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };


    // Fetch Data

    useEffect(() => {
        if (startDate && endDate) {
            getFetchData();
        }
    }, [startDate, endDate]);

    useEffect(() => {
        getFetchData();
        console.log(dataList);
    }, []);

    useEffect(() => {
        if (startDate && endDate && startDate > endDate) {
            setIsAlert(true);
            setAlertStatus("error");
            setMessage("Invalid Date Range!");
        } else {
            setIsAlert(false);
        }
    }, [startDate, endDate]);

    // Fetch Data Function
    const getFetchData = async () => {
        try {
            const response = await axios.get("/supplyrequest/");
            console.log(response);

            if (response.data.success) {
                const supplyRequests = response.data.data;

                if(startDate && endDate){
                    const filteredRequests = supplyRequests.filter(request => {
                        const requestDate = new Date(request.exdate);
                        return requestDate >= startDate && requestDate <= endDate;
                    });

                    
                    const items = await Promise.all(
                        filteredRequests.map(async (request) => {
                            const item = await fetchItemById(request.item);
                            const { name, quantity, maxCapacity } = item;
                            const exquantity = quantity;
                            return { ...request, name, exquantity, maxCapacity };
                        })
                    );
    
                    // Set the data list with the updated items
                    setDataList(items);
                }else{

                // Fetch additional item information for each request
                const items = await Promise.all(
                    supplyRequests.map(async (request) => {
                        const item = await fetchItemById(request.item);
                        const { name, quantity, maxCapacity } = item;
                        const exquantity = quantity;
                        return { ...request, name, exquantity, maxCapacity };
                    })
                );

                // Set the data list with the updated items
                setDataList(items);
            }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Search Supply Request By ID
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const results = dataList.filter((item) =>
            item.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerm, dataList]);


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

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(searchResults.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    //Status Changer
    const statusColorChanger = (status) => {
        switch (status) {
            case "Pending":
                return "bg-kyellow/70";
            case "Approved":
                return "bg-kgreen/70";
            case "Rejected":
                return "bg-kred/70";
            case "Paid":
                return "bg-kgreen/70";
            default:
                return "bg-kgray";
        }
    }


    const SupplyRequestPrintable = ({ dataList, startDate, endDate }) => {
        return (
            <div ref={componentPDF} className="bg-kwhite mx-auto items-center justify-center p-10 rounded-lg">
                    <div className="text-2xl font-bold text-kblack items-center justify-center text-center mb-5">Supply Request Report</div>
                    <div className="flex items-center justify-between">
                    <span className="text-sm text-kblack mb-3">Generated on: {new Date().toLocaleString()}</span>
                    <span className="text-sm text-kblack mb-3">Report Period: {startDate && endDate ? startDate.toLocaleDateString() + ' to ' + endDate.toLocaleDateString() : 'All'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                    </div>
                    <table className="w-full table-fixed border rounded-lg overflow-hidden">
        <thead>
            <tr className="bg-kblack border-kblack text-kwhite border text-center">
                <th>Date</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Supplier</th>
                <th>Total Cost</th>
                <th>Expected Delivery Date</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
                {dataList.map((srl, index) => {
                    const ReqDate = new Date(srl.date);
                    const ReqDateStr =
                        ReqDate.getDate() +
                        " - " +
                        (ReqDate.getMonth() + 1) +
                        " - " +
                        ReqDate.getFullYear();

                    const ExDate = new Date(srl.exdate);
                    const ExDateStr =
                        ExDate.getDate() +
                        " - " +
                        (ExDate.getMonth() + 1) +
                        " - " +
                        ExDate.getFullYear();

                    return (
                        <tr key={srl._id} className="border text-kblack text-center items-center p-4">
                            <td>{ReqDateStr}</td>
                            <td>{srl.name}</td>
                            <td>{srl.reqquantity}</td>
                            <td>{srl.supplier}</td>
                            <td>{srl.cost}</td>
                            <td>{ExDateStr}</td>
                            <td>{srl.status}</td>
                        </tr>
                    );
                })}
            </tbody>
    </table>
                <div className="grid grid-cols-2">
                    <span className="text-sm text-kblack mt-5">Total Requests:</span>
                    <span className="text-sm text-kblack mt-5">{dataList.length}</span>
                    <span className="text-sm text-kblack mt-5">Total Cost of the Requests:</span>
                    <span className="text-sm text-kblack mt-5">{calcTotalCost(dataList)}</span>
                </div>
                </div>
        );
    };

    const componentRef = useRef();


    const [reportSection, setReportSection] = useState(false);

    return (
        <>
            <div>{isAlert && <Alert message={message} type={alertStatus} />}</div>
            {editSection && (
                <div className="fixed top-0 left-0 w-full h-full bg-kblack bg-opacity-50 backdrop-blur flex items-center justify-center text-kwhite z-50">
                    <button
                        className="absolute top-5 right-5 bg-kblack text-kwhite"
                        onClick={() => setEditSection(false)}
                    >
                        X
                    </button>
                    <form onSubmit={handleUpdate} className=" p-10 rounded-lg bg-kblack/60 text-kwhite">
                    <span className="text-2xl text-center font-bold items-center justify-center w-full">
                            Edit Supply Request
                        </span>
                        <div className="flex flex-col m-5">
                            <label htmlFor="item">Item Name</label>
                            <input
                                type="text"
                                className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm"
                                id="item"
                                value={formDataEdit.name}
                                onChange={handleEditOnChange}
                            />
                        </div>
                        <div className="flex flex-col m-5">
                            <label htmlFor="quantity">Quantity</label>
                            <input
                                type="number"
                                className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm"
                                id="reqquantity"
                                value={formDataEdit.reqquantity}
                                onChange={handleEditOnChange}
                            />
                        </div>
                        <div className="flex flex-col m-5">
                            <label htmlFor="supplier">Supplier</label>
                            <select
                                className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm"
                                id="supplier"
                                value={formDataEdit.supplier}
                                onChange={handleEditOnChange}
                            >
                                {formDataEdit.supplier && (
                                    <option value={formDataEdit.supplier} selected>
                                        {formDataEdit.supplier}
                                    </option>
                                )}
                                <option value="Photo Technica">Photo Technica</option>
                                            <option value="Nine Hearts">Nine Hearts</option>
                                            <option value="Pettah Traders">Pettah Traders</option>
                            </select>
                        </div>
                        <div className="flex flex-col m-5">
                            <label htmlFor="exdate">Expected Delivery Date</label>
                            <input
                                type="date"
                                className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm"
                                id="exdate"
                                value={formDataEdit.exdate}
                                onChange={handleEditOnChange}
                            />
                        </div>
                        <div className="flex flex-col m-5">
                            <label htmlFor="additional">Additional (Optional)</label>
                            <textarea
                                className="bg-kwhite rounded-lg p-1 text-kblack text-sm w-full"
                                id="additional"
                                cols="100"
                                rows="5"
                                value={formDataEdit.additional}
                                onChange={handleEditOnChange}
                            />
                        </div>
                        <div className="p-4 text-kblack flex flex-col">
                            <button type="submit" className="bg-kred text-kwhite rounded-lg p-3 mb-4">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            )}

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
            

            <div className="mx-5 mb-5">
            <div className="grid grid-cols-7 w-full bg-transparent items-center mr-5">
                            <Button
                                onClick={GoBack}
                                className="col-span-2 flex items-center bg-transparent text-kwhite px-5"
                            >
                                <HiOutlineArrowCircleLeft className="w-10 h-10" />
                                <span className="text-2xl ml-5">Order</span>
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
                        <div></div>
                     
                </div>
            </div>
                    
            <div className="px-10">
                <table className="w-full table-fixed rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-kblack/40 border-kwhite text-kwhite border-b text-center">
                            <th>Date</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Supplier</th>
                            <th className="w-1/4 py-5">Expected Levels</th>
                            <th>Total Cost</th>
                            
                           
                
                        </tr>
                    </thead>
                    <tbody>
                          {currentItems.length > 0 ? (
                              searchResults.map((srl, index) => {
                                  // Filter items to display only those with status "Approved"
                                  if (srl.status === "Approved") {
                                      const itemQuantity = parseInt(srl.exquantity, 10);
                                      const itemMaxCapacity = parseInt(srl.maxCapacity, 10);
                                      const itemReqQuantity = parseInt(srl.reqquantity,10)

                                      const ReqDate = new Date(srl.date);
                                      const ReqDateStr =
                                          ReqDate.getDate() +
                                          " - " +
                                          (ReqDate.getMonth() + 1) +
                                          " - " +
                                          ReqDate.getFullYear();

                                      const ExDate = new Date(srl.exdate);
                                      const ExDateStr =
                                          ExDate.getDate() +
                                          " - " +
                                          (ExDate.getMonth() + 1) +
                                          " - " +
                                          ExDate.getFullYear();

                                      const handleMarkAsPaid = async () => {
                                          try {
                                              const updatedSRL = { ...srl, status: "Paid" };
                                              const data = await axios.put(`/supplyrequest/update/${srl._id}`, updatedSRL);
                                              if (data.data.success) {
                                                  getFetchData(); // Fetch updated data after status change
                                                  setIsAlert(true);
                                                  setAlertStatus("success");
                                                  setMessage("Supply Request Marked as Paid!");
                                                  setTimeout(() => {
                                                      setIsAlert(false); // Reset alert status after 5000ms
                                                  }, 5000);
                                              } else {
                                                  setIsAlert(true);
                                                  setAlertStatus("error");
                                                  setMessage("Failed to Mark Supply Request as Paid!");
                                                  setTimeout(() => {
                                                      setIsAlert(false); // Reset alert status after 5000ms
                                                  }, 5000);
                                              }
                                          } catch (error) {
                                              console.error("Error marking supply request as paid:", error);
                                              setIsAlert(true);
                                              setAlertStatus("error");
                                              setMessage("Failed to Mark Supply Request as Paid!");
                                          }
                                      };

                                      return (
                                          <>
                                              <tr key={srl._id} className="border-b bg-kwhite/20 text-kwhite text-center items-center p-4">
                                                  <td>{ReqDateStr}</td>
                                                  <td>{srl.name}</td>
                                                  <td>{srl.reqquantity}</td>
                                                  <td>{srl.supplier}</td>
                                                  <td className="text-sm">
                                                      <ComplexProgressBar
                                                          itemQuantity={itemQuantity} 
                                                          maxCapacity={itemMaxCapacity}
                                                          reqQuantity={itemReqQuantity}
                                                      />
                                                  </td>
                                                  <td>{srl.cost}.00/=</td>
                                                  
                                                 
                                                  
                                              </tr>
                                          </>
                                      );
                                  }
                              })
                          ) : (
                              <tr className="border-b bg-kwhite/20 text-kwhite text-center items-center p-4">
                                  <td colSpan="8" className="text-center py-4">
                                      No data available
                                  </td>
                              </tr>
                          )}
                      </tbody>


                </table>

                <div className="flex  items-center justify-between border-t bg-kblack p-4">
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        {pageNumbers.map((number) => (
                            <Button
                                key={number}
                                varient="text"
                                size="sm"
                                className="text-kblack bg-kwhite"
                                onClick={() => paginate(number)}
                            >
                                {number}
                            </Button>
                        ))}
                    </div>
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SupplyRequest;
