import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Card, Typography, Button, CardBody } from "@material-tailwind/react";
import axios from "axios";

import Alert from "../../../Components/Common/Alerts/alert";

import { HiOutlineArrowCircleLeft, HiOutlinePlusCircle } from "react-icons/hi";

axios.defaults.baseURL = "http://localhost:8010/";



const Items = () => {
    const GoBack = () => {
        window.location.href = "/manager/stockdept/";
    };

    //Edit Item
    const [formDataEdit, setFormDataEdit] = useState({
        name: "",
        description: "",
        type: "",
        maxCapacity: "",
        sellingPrice: "",
        image: "",
        _id: "",
    });
    const [editSection, setEditSection] = useState(false);


    const [isAlert,setIsAlert] = useState(false);
    const [alertStatus,setAlertStatus] = useState('success');
    const [message,setMessage] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        const data = await axios.put("/item/update", formDataEdit);
        console.log("Response:", data);
        if (data.data.success) {
            console.log(data.data.message);
            setEditSection(false);
            getFetchData();
            //alert(data.data.message);
            setIsAlert(true);
            setAlertStatus('success');
            setMessage("Item Updated Successfully!");
            setTimeout(() => {
                setIsAlert(false); // Reset delete status after 5000ms
              },5000);
        }else{
            setIsAlert(true);
            setAlertStatus("error");
            setMessage("Failed to Update Item!");
            setTimeout(() => {
                setIsAlert(false); // Reset delete status after 5000ms
            },5000);
        }
    };

    const handleEditOnchange = async(e) => {
        const {value,id} = e.target
        setFormDataEdit((prev)=> {
          return{
            ...prev,
            [id] : value
          }
        })
    };

    const handleEdit = async (item) => {
        setFormDataEdit(item);
        setEditSection(true);
        console.log("Edit Item Form Opened");
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

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (confirmed) {
            const data = await axios.delete("/item/delete/" + id);
            if (data.data.success) {
                getFetchData();
                //alert(data.data.message);
                setIsAlert(true);
                setAlertStatus('success');
                setMessage("Item Deleted Successfully!");
            }
            else{
                setIsAlert(true);
                setAlertStatus("error");
                setMessage("Failed to Delete Item!");
            }
        }
    };

    const [dataList, setDataList] = useState([]);

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

    //Search Item
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const results = dataList.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerm, dataList]);


    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    
    
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
        <>
            <div>
            {isAlert && (<Alert message={message} type={alertStatus}/>)}
        </div>
            {editSection && (
                <div className="fixed top-0 left-0 w-full h-full bg-kblack bg-opacity-50 backdrop-blur flex items-center justify-center z-50">
                    <button className="absolute top-5 right-5 bg-kblack text-kwhite" onClick={() => setEditSection(false)}>X</button>
                    <form onSubmit={handleUpdate} className="bg-kblack/60 text-kwhite p-10 rounded-lg drop-shadow-md">
                        <span className="text-2xl text-center font-bold items-center justify-center w-full">
                            Edit Item
                        </span>
                        <div className="flex flex-col m-5">
                            <label htmlFor="itemName">Item Name</label>
                            <input
                                type="text"
                                className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm"
                                id="name"
                                onChange={handleEditOnchange}
                                value={formDataEdit.name}
                                
                            />
                        </div>
                        <div className="flex flex-col m-5">
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="bg-kwhite rounded-lg p-1 text-kblack text-sm w-full"
                                id="description"
                                cols="100"
                                rows="5"
                                value={formDataEdit.description}
                                onChange={handleEditOnchange} 
                            />
                        </div>
                        <div className="grid grid-cols-2">
                        <div className="flex items-center justify between m-5">
                            <div>
                                <label htmlFor="maxCapacity">Max Capacity</label>
                                <input
                                    type="number"
                                    className="bg-kwhite rounded-lg p-1 text-kblack text-sm" 
                                    id="maxCapacity"
                                    value={formDataEdit.maxCapacity}
                                    onChange={handleEditOnchange}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify between m-5">
                        <div className="flex flex-col m-5">
                            <label htmlFor="type">Type</label>
                            <input
                                type="text"
                                className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm"
                                id="type"
                                value={formDataEdit.type}
                                onChange={handleEditOnchange}
                            />
                        </div>
                            {/* Image Upload 
                            <div>
                                <label htmlFor="image">Upload Photo</label>
                                <input 
                                    type="text" 
                                    className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm " 
                                    id="image" 
                                    value={formDataEdit.image}
                                    onChange={handleEditOnchange}
                                />
                            </div> */}
                            
                                <input type="hidden" name="itemID" value={formDataEdit._id} />
                        </div>
                        </div>
                        <div className='mr-3'>
                                <label htmlFor="sellingPrice">Selling Price</label>
                                <input 
                                    type="number" 
                                    className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm" 
                                    id="sellingPrice" 
                                    value={formDataEdit.sellingPrice}
                                    onChange={handleEditOnchange}
                                />
                            </div>
                        <div className="p-4 text-kblack flex flex-col">
                            <button type="submit" className="bg-kred text-kwhite rounded-lg p-3 mb-4">Submit</button>
                        </div>
                    </form>
                </div>
            )}
            <div className="mx-5 mb-5">
                <div className="grid grid-cols-7 w-full bg-transparent items-center mr-5">
                            <Button
                                onClick={GoBack}
                                className="col-span-2 flex items-center bg-transparent text-kwhite px-5"
                            >
                                <HiOutlineArrowCircleLeft className="w-10 h-10" />
                                <span className="text-2xl ml-5">Item List</span>
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
                        <div>
                            <Button
                                className="flex space-x-2 items-center justify-center bg-kgreen text-kwhite px-10 rounded-full"
                                onClick={handleButton("Add")}
                            >
                                <HiOutlinePlusCircle className="w-5 h-5" />
                                <span className="text-sm">Add Item</span>
                            </Button>
                            </div>
                </div>
            </div>
            <div className="px-10">
                <table className="w-full table-fixed rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-kblack/40 border-kwhite text-kwhite p-4 font-bold border-b text-center">
                            <th className="w-1/5 py-5">Item</th>
                            <th className="w-1/4">Description</th>
                            <th className="w-1/8">Type</th>
                            <th className="w-1/10">Quantity</th>
                            <th className="w-1/10">Selling Price</th>
                            <th className="w-1/4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((il, index) => {
                                return (
                                    <>
                                    <tr key={il._id} className="border-b bg-kwhite/20 text-kwhite text-center items-center p-4">
                                    <td className="px-10">
                                        <div className="grid grid-cols-2 items-center">
                                        <img className="w-14 h-14 rounded-full mr-5" src={require(`../../../../../backend/uploads/StockManagement/${il.image}`)} alt={il.name} /> {/* Added alt attribute */}
                                        <span>{il.name}</span>
                                        </div>
</td>
                                        <td className="truncate max-w-xs">{il.description}</td>
                                        <td>{il.type}</td>
                                        <td>{il.quantity} Out of {il.maxCapacity}</td>
                                        <td>{Number(il.sellingPrice).toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}</td>
                                        <td className="p-4 text-kblack items-center justify-center">
                                            <div className="grid grid-cols-4 justify-center gap-3 mx-auto">
                                                <Button className="p-3 bg-kblue" onClick={() => handleEdit(il)}>
                                                    <PencilIcon className="h-4 w-4 text-kwhite mx-auto"/>
                                                </Button>
                                                <Button className="p-3 bg-kred" onClick={() => handleDelete(il._id)}>
                                                    <TrashIcon className="h-4 w-4 text-kwhite mx-auto" />
                                                </Button>
                                                <Button size="sm" className="bg-kred text-kwhite col-span-2">
                                                    Remove Waste
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                    </>
                                );
                            })
                            
                        ) : (
                            <tr className="bg-kwhite/20 w-full text-kwhite">
                                <td colSpan="7" className="text-center py-4">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="flex items-center justify-between border-t border-kblack p-4">
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        {pageNumbers.map((number) => (
                            <Button
                                key={number}
                                variant="text"
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

export default Items;