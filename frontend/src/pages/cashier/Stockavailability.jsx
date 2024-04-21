import { Navbar,Typography,IconButton, Button,Input,Progress} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import {Card,CardHeader,CardBody,Chip,CardFooter,Avatar,Tooltip,} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8010/";

const Stockavailability = () => {


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

const statusChanger = (percentage) => {
    if (percentage < 25) {
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
      <div className='order text-kwhite '>
                       <div className=" px-10">
                            <input
                                type="search"
                                placeholder="Search"
                                className="bg-kwhite text-kblack rounded-full p-2 text-lg "
                                value = {searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <br/>

      <div className="px-10 ">
                <table className="w-full rounded-lg overflow-hidden text-sm">
                    <thead>
                        <tr className="bg-kblack/40 border-kwhite text-kwhite p-4 font-bold border-b text-center text-lg">
                            <th className="w-1/3 py-5">Name</th>
                            <th className="w-1/3">Percentage</th>
                            <th className="w-1/3 px-10">Available Quantity</th>
                            
                          
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((il, index) => {
                                const percentage = calcPercentage(il.quantity,il.maxCapacity)
                               
                                return (
                                    <>
                                    <tr key={index} className="border-b bg-kwhite/20 text-kwhite text-center items-center p-4 text-lg">
                                        <td className="p-4"> {il.name}</td>
                                        <td>
                                            <div className="w-full bg-kgray rounded-full border overflow-hidden">
                                                <div
                                                    className={ colorChanger(percentage) + " p-2 text-center text-lg font-medium leading-none text-kwhite "}
                                                    style={{ width: `${percentage}%` }}
                                                >
                                                    {percentage + "%"}
                                                </div>
                                            </div>
                                        </td>
                                        
                                        
                                        <td className="p-4">
                                            <div className="flex flex-grow justify-center mx-auto">
                                                <Button className="p-3 text-kwhite text-lg" onClick={handleRequestButton(il._id)}>
                                                   {il.quantity + " Out of "+il.maxCapacity}
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

  </div>
      
    );
  }
  
export default Stockavailability;
  




  