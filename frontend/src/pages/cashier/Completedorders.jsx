import React, { useEffect, useState } from "react";
import { Card, Typography, Button, CardBody } from "@material-tailwind/react";
import { HiOutlineArrowCircleLeft, HiOutlinePlusCircle } from "react-icons/hi";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8010/";


  const GoBack = () => {
      window.location.href = "/cashier/ordermain";
  };

  const handleButton = (type) => {
    return () => {
        switch (type) {
            case "Add":
                window.location.href = "/cashier/ordermain";
                break;
            case "Edit":
                window.location.href = "/manager/stockdept/items/edititem";
                break;
            default:
                break;
        }
    };
};



const Completedorders = () => {

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
    
    const handleRequestButton = (itemId) => {
        return () => {
            console.log("Heading to request page");
            window.location.href = `/manager/stockdept/stocklevels/request?itemId=${itemId}`;
        };
    };
    
    
    //Search Item
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    
    useEffect(() => {
        const results = dataList.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    },[searchTerm, dataList]);
    
    
    
    //Pagination
    const indexOfLastItem = currentPage * itemsPerPage; // Calculate index of the last item of current page
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Calculate index of the first item of current page
    const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem); // Get the current items to be displayed
    
    // Logic to dynamically generate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(searchResults.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };



    return (
      <div className='completedorders'>
     {/* go back and other navigations */}
     <div className="mx-5 mb-5">
                <Card>
                    <CardBody className="flex items-center justify-between">
                        <div className="w-1/3">
                            <Button

                                onClick={GoBack}
                                className="flex items-center space-x-2 bg-transparent text-kwhite px-3 py-2 rounded-md"
                            >
                                <HiOutlineArrowCircleLeft className="w-5 h-5" />
                                <span className="text-lg">Order</span>
                            </Button>
                        </div>

                        <div className="w-1/3 text-kwhite  text-4xl ">COMPLETED ORDERS</div>
                        
                        {/* search item */}
                        <div className="w-1/3 px-10">
                            <input
                                type="search"
                                placeholder="Search"
                                className="bg-kwhite text-kblack rounded-full p-2 text-lg "
                                value = {searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                    </CardBody>
                </Card>
            </div>  

            {/* table */}

            <div className="px-10 ">
                <table className="w-full rounded-lg overflow-hidden text-sm">
                    <thead>
                        <tr className="bg-kblack/40 border-kwhite text-kwhite p-4 font-bold border-b text-center text-lg">
                            <th className="w-1/4 py-5">Bill No</th>
                            <th className="w-1/4">Customer</th>
                            <th className="w-1/4 px-10">Date</th>
                            <th className="w-1/4 px-10">Action</th>
                            
                          
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((il, index) => {
                    
                               
                                return (
                                    <>
                                    <tr key={index} className="border-b bg-kwhite/20 text-kwhite text-center items-center p-4 text-lg">

                                        <td className="p-4"> {il.name}</td>

                                        <td className="p-4"> {il.name}</td>
                                        
                                        <td className="p-4">
                                            <div className="flex flex-grow justify-center mx-auto">
                                                <div className="p-3 text-kwhite text-lg" >
                                                   {il.quantity}
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <Button className="p-3 bg-kblack text-kwhite text-lg" onClick={handleRequestButton(il._id)}>
                                                {"View"}
                                            </Button>
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
  </div>
      
    );
  }
  
  export default Completedorders;