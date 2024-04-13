import React, {useEffect, useState} from "react";
import { Card, Typography, Button, CardBody } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { HiOutlineArrowCircleLeft, HiOutlinePlusCircle } from "react-icons/hi";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8010/";

const SupplyRequest = () => {
    const GoBack = () => {
        window.location.href = "/manager/stockdept/";
    };

    

    //Find Item Name By ID to Display in Table
const fetchItemById = async (itemId) => {
    try {
    const response = await axios.get(`/item/find/${itemId}`);
    if (response.data.success && response.data.data) { // Check if data exists
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
    

    //Edit Supply Request
    const [formDataEdit, setFormDataEdit] = useState({
        date: "",
        item: "",
        quantity: "",
        supplier: "",
        exdate: "",
        status: "",
    });
    const [editSection, setEditSection] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const data = await axios.put("/supplyrequest/update/", formDataEdit);
        if(data.data.success){
            console.log(data.data. message);
            setEditSection(false);
            getFetchData();
            alert(data.data.message);
        }
    };

    const handleEditOnChange = async(e) => {
        const {value,id}  = e.target
        setFormDataEdit((prev) => {
            return{
                ...prev,
                [id]: value,
            }
        })
    };

    const handleEdit = async (supplyRequest) => {
        setFormDataEdit(supplyRequest);
        setEditSection(true);
        console.log("Edit Supply Request Form Opened");
    }

    //Add custom Supply Request
    const handleButton = (option) => {
        return () => {
            switch (option) {
                case "Request":
                    window.location.href = "/manager/stockdept/stocklevels/customreq";
                    break;
                default:
                    break;
            }
        };
    };

    //Delete Supply Request
    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this request?");
        if (confirmed) {
            const data = await axios.delete("/supplyrequest/delete/"+id);
            if(data.data.success){
                getFetchData();
                alert(data.data.message);
            }
        }
    }

    const [dataList, setDataList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);


    //Fetch Data
    useEffect(() => {
        getFetchData();
        console.log(dataList);
    },[]);


    //Fetch Item Data
    useEffect(() => {
        fetchItemData();
    }, [dataList]);


    //Fetch Item Data (Name, Quantity, MaxCapacity)
    const [itemName, setItemName] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [maxCapacity, setMaxCapacity] = useState(0);

    const fetchItemData = async () => {
        try {
            const items = await Promise.all(
                dataList.map(async (request) => {
                    const item = await fetchItemById(request.item);
                    const { name, quantity, maxCapacity } = item;
                    return { ...request, name, quantity, maxCapacity};
                })
            );
            const itemNames = items.map((item) => item.name);
            const itemQuantities = items.map((item) => item.quantity);
            const itemMaxCapacities = items.map((item) => item.maxCapacity);

            setItemName(itemNames);
            setQuantity(itemQuantities);
            setMaxCapacity(itemMaxCapacities);

        } catch (error) {
            console.error("Error fetching item data:", error);
        }
    };


    //Fetch Data Function
    const getFetchData = async () => {
        try {
            const response = await axios.get("/supplyrequest/");
            console.log(response);

            if(response.data.success){
                setDataList(response.data.data);
            }
        } catch (error) {
            console.error("error fetching data:", error);
        }
    };

    //Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dataList.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dataList.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


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

    const calcExpectedPercentage = (reqQuantity, maxCapacity) => {
        return Math.round((reqQuantity / maxCapacity) * 100);
    };

    const calcPercentage = (quantity, maxCapacity) => {
        return Math.round((quantity / maxCapacity) * 100);
    };

    return (
        <>
        {
            editSection && (
                <div className="fixed top-0 left-0 w-full h-full bg-kblack bg-opacity-50 backdrop-blur flex items-center justify-center z-50">
                    <button className="absolute top-5 right-5 bg-kblack text-kwhite" onClick={() => setEditSection(false)}>X</button>
                    <form onSubmit={handleUpdate} className="bg-kgray p-10 rounded-lg">
                    <div className="flex flex-col m-5">
                        <label htmlFor="item">Item Name</label>
                        <input
                            type="text"
                            className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm"
                            id="item"
                            value={formDataEdit.item}
                            onChange={handleEditOnChange}
                        />
                    </div>
                    <div className="flex flex-col m-5">
                        <label htmlFor="quantity">Quantity</label>
                        <input 
                            type="number" 
                            className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm" 
                            id="quantity"
                            value={formDataEdit.quantity}
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
        <option value={formDataEdit.supplier} selected>{formDataEdit.supplier}</option>
    )}
    <option value="supplier1">Supplier 1</option>
    <option value="supplier2">Supplier 2</option>
    <option value="supplier3">Supplier 3</option>
</select>
                    </div>
                    <div className="flex flex-col m-5">
                        <label htmlFor="exdate">Expected Delivery Date</label>
                        <input 
                            type="date" 
                            className="bg-kwhite rounded-lg p-1 text-kblack w-full text-sm" 
                            id="exdate"
                            value={formDataEdit.exdate}
                            onChange = {handleEditOnChange}
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
                        <button type="submit" className="bg-kred text-kwhite rounded-lg p-3 mb-4">Submit</button>
                    </div>
                </form>
                </div>
            )
        }
            <div className="mx-5 mb-5">
                <Card>
                    <CardBody className="flex items-center justify-between">
                        <div>
                            <Button
                                onClick={GoBack}
                                className="flex items-center space-x-2 bg-transparent text-kwhite px-3 py-2 rounded-md"
                            >
                                <HiOutlineArrowCircleLeft className="w-5 h-5" />
                                <span className="text-sm">Supply Requests</span>
                            </Button>
                        </div>
                        <div className="mx-auto">
                            <input
                                type="search"
                                placeholder="Search"
                                className="bg-kwhite rounded-full p-2 text-sm"
                            />
                        </div>
                        <div>
                            <Button
                                className="flex items-center space-x-2 bg-kblue text-kwhite p-3 px-5"
                                onClick={handleButton("Request")}
                            >
                                <HiOutlinePlusCircle className="w-5 h-5" />
                                <span className="text-sm">Add Custom Request</span>
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="px-10">
                <table className="w-full rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-kblack/40 border-kwhite text-kwhite border-b text-center">
                            <th>Date</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Supplier</th>
                            <th>Expected Delivery Date</th>
                            <th className="w-1/4 py-5">Expected Levels</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((srl, index) => {
                                const itemQuantity = parseInt(quantity[index], 10);
const itemMaxCapacity = parseInt(maxCapacity[index], 10);

                                const ReqDate = new Date(srl.date);
                                const ReqDateStr = ReqDate.getDate() + " - " + (ReqDate.getMonth() + 1) + " - " + ReqDate.getFullYear();

                                const ExDate = new Date(srl.exdate);
                                const ExDateStr = ExDate.getDate() + " - " + (ExDate.getMonth() + 1) + " - " + ExDate.getFullYear();

                                const percentage = calcPercentage(quantity[index], maxCapacity[index]);
                                const expectedPercentage = calcExpectedPercentage(srl.quantity, itemMaxCapacity);

                                console.log(itemQuantity, itemMaxCapacity, percentage, expectedPercentage);
                                
                                return (
                                    <tr key={srl._id} className="border-b bg-kwhite/20 text-kwhite text-center items-center p-4">
                                    <td>{ReqDateStr}</td>
                                    <td>{itemName[index]}</td>
                                    <td>{srl.quantity}</td>
                                    <td>{srl.supplier}</td>
                                    <td>{ExDateStr}</td>
                                    <td className="text-sm">
                                        <div className="flex items-center bg-kwhite/30 rounded-full p-1">
                                            <div className="w-full flex bg-kgray overflow-hidden rounded-full border text-xs text-center justify-items-start">
                                                <div
                                                    className={"flex justify-center overflow-hidden " + colorChanger(percentage) + " p-2 items-center text-kwhite "}
                                                    style={{ width: `${percentage}%` }}
                                                >
                                                <span className="inline-flex mx-auto">{percentage + "%"}</span>
                                                </div>
                                                <div
                                                    className={"flex  overflow-hidden bg-plgreen/30 text-kwhite items-center font-medium"}
                                                    style={{ width: `${expectedPercentage}%` }}
                                                >
                                                <span className="mx-auto">+{(expectedPercentage) + "%"}</span>
                                                </div>
                                            </div>
                                            <span className="mx-2">{(expectedPercentage+percentage) + "%"}</span>
                                            </div>
                                    </td>
                                    <td>{srl.status}</td>
                                    <td className="p-4 text-kblack flex-grow">
                                        <div className="flex justify-center gap-3 mx-auto">
                                            <Button className="p-3 bg-kblue">
                                                <PencilIcon className="h-4 w-4 text-kwhite" onClick={() => handleEdit(srl)}/>
                                            </Button>
                                            <Button className="p-3 bg-kred">
                                                <TrashIcon className="h-4 w-4 text-kwhite" onClick={() => handleDelete(srl._id)} />
                                            </Button>
                                        </div>
                                    </td>
                                    </tr>
                                )
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
                <div className="flex items-center justify-between border-t border-kblack p-4">
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
