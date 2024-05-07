import React, { useEffect, useState, useCallback } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { Button, Card, CardBody } from "@material-tailwind/react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8010/";

const MyItemList = () => {
    const [dataList, setDataList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Fetch data from the API
    const fetchData = async () => {
        try {
            const response = await axios.get("/supplyitem/");
            if (response.data.success) {
                setDataList(response.data.data);
            } else {
                console.error("Unexpected data format:", response.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
        console.log(dataList);
    },[])

    // Filter data based on the search term
    useEffect(() => {
        // Filter data based on the search term and item name
        const filteredResults = dataList.filter(item => 
            item.item_id && item.item_id.name && item.item_id.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredResults);
    }, [searchTerm, dataList]);
    
    
    // Calculate pagination
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


    // Handle navigation
    const handleNavigation = (type) => {
        switch (type) {
            case "Add":
                window.location.href = "/supplier/addsupply";
                break;
            case "Info":
                window.location.href = "/supplier/supplyinfo";
                break;
            default:
                break;
        }
    };

    //handle update
    

    // Handle delete
    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (confirmed) {
            try {
                const response = await axios.delete(`/supplyitem/delete/${id}`);
                if (response.data.success) {
                    fetchData(); // Refetch data after deletion
                    alert(response.data.message);
                } else {
                    console.error("Error deleting item:", response.data.message);
                }
            } catch (error) {
                console.error("Error deleting item:", error);
            }
        }
    };

    // Calculate total pages
    const totalPages = Math.ceil(searchResults.length / itemsPerPage);



   

    const [editSection, setEditSection] = useState(false);
    const [formDataEdit,setFormDataEdit] = useState({
        item_id: "Item1",
        supplier_id: "6625f009459f1a3566dd4c45",
        unit_cost: "",
        discount: "",
    });

    const handleEdit = async (item) => {
        
        setEditSection(true);
        setFormDataEdit(item);
        console.log("Edit Item Form Opened");
    };

    const handleEditOnChange = async(e) =>{
        const { value, id } = e.target;
        setFormDataEdit((prev) => ({
            ...prev,
            [id]: value,
        }));

        if (id === "item_id") {
            // Use optional chaining to safely access properties of the selected item
            const selectedItem = itemList.find((item) => item._id === value);
    
            if (selectedItem) {
                setSellingPrice(parseFloat(selectedItem.sellingPrice || 0));
                setFormData((prev) => ({
                    ...prev,
                    unit_cost: selectedItem.unit_cost || '',
                }));
            } else {
                setSellingPrice(0); // Set to 0 if no selected item found
            }
        }
    }

    
    const [formData, setFormData] = useState({
        item_id: "Item1",
        supplier_id: "6625f009459f1a3566dd4c45",
        unit_cost: "",
        discount: "",
    });

    const [sellingPrice, setSellingPrice] = useState(0);

    // Function to handle item change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    
        if (name === "item_id") {
            // Use optional chaining to safely access properties of the selected item
            const selectedItem = itemList.find((item) => item._id === value);
    
            if (selectedItem) {
                setSellingPrice(parseFloat(selectedItem.sellingPrice || 0));
                setFormData((prev) => ({
                    ...prev,
                    unit_cost: selectedItem.unit_cost || '',
                }));
            } else {
                setSellingPrice(0); // Set to 0 if no selected item found
            }
        }
    };
    


    const [itemList, setItemList] = useState([]);
    const getFetchItemData = async () => {
        try {
            const response = await axios.get("/item/");
            console.log(response);
            if (response.data.success) {
                setItemList(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getFetchItemData();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.put("/supplyitem/update/", formDataEdit);
            if (data.data.success) {
                console.log(data.data.message);
                setEditSection(false);
                fetchData();
            }
        } catch (error) {
            console.log(error);
        }
    };
    

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        // Validate supply cost
        if (parseFloat(formData.unit_cost) >= sellingPrice) {
            alert("Supply cost must be lower than the current selling price.");
            return;
        }

        try {
            // Send supply item data to the backend
            const response = await axios.post("/supplyitem/create", formData);

            if (response.data.success) {
                alert("Supply item Create successfully");
                // Redirect to item list page
                window.location.href = "/supplier/itemlist";
            } else {
                alert("Failed to create supply item: " + response.data.error);
            }
        } catch (error) {
            console.error("Error creating supply item:", error);
            alert("An error occurred while creating the supply item. Please try again later.");
        }
    };
    

    // JSX structure for the page
    return (
        <div className="mx-5 mb-6">
            {/* Search bar and Add button */}
            <Card>
                <CardBody className="flex items-center justify-between">
                    <input
                        type="search"
                        placeholder="Search"
                        className="bg-kwhite flex-grow rounded-full p-2 text-sm truncate max-w-xs"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button
                        className="flex items-center space-x-2 bg-kblue text-kwhite p-3 px-5 rounded-full"
                        onClick={() => handleNavigation("Add")}
                    >
                        <HiOutlinePlusCircle className="w-5 h-5" />
                        <span className="text-sm">Add Supply Item</span>
                    </Button>
                </CardBody>
            </Card>
            
            {/* Table */}
            <div className="p-10">
                <table className="w-full rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-kblack/40 border-kwhite text-kwhite p-4 font-bold border-b text-center">
                            <th>Item Name</th>
                            <th>Description</th>
                            <th>Unit Cost</th>
                            <th>Discount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((li) => {
                                return (
                                    <tr key={li._id} className="border-b bg-kwhite/20 text-kwhite text-center items-center p-4">
                                        <td>{li.item_id.name}</td>
                                        <td className="truncate max-w-xs">{li.item_id.description}</td>
                                        <td>LKR {li.unit_cost}</td>
                                        <td>{li.discount} %</td>
                                        <td className="p-6 text-kblack flex-grow">
                                            <div className="flex justify-center gap-3 mx-auto">
                                                <Button className="p-3 bg-kred" onClick={() => handleDelete(li._id)}>
                                                    Delete
                                                </Button>
                                                <Button className="p-3 bg-kblue text-kwhite" onClick={()=>handleEdit(li)}>
                                                    Edit
                                                </Button>
                                                <Button className=" p-3 bg-kwhite text-kblack "  onClick={() => handleNavigation("Info")}>
                                                    i
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })                            
                        ) : (
                            <tr className="bg-kwhite/20 w-full text-kwhite">
                                <td colSpan="3" className="text-center py-4">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                
            </div>
            
            <div className="flex justify-center items-center gap-2  ">
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

         
            {editSection && (
            <div className="PageContainer text-kwhite" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="AddSupplyItemsForm" style={{ width: 500, position: 'relative', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                <form onSubmit={handleUpdate}>
                    <div className="FormItem">
                        <label htmlFor="itemSelect" style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Item:</label>
                        <select
                            id="item_id"
                            className="ItemSelect text-kblack"
                            style={{ width: '100%', height: '40px', fontSize: '16px' }}
                            name="item_id"
                            value={formDataEdit.item_id}
                            onChange={handleEditOnChange}
                        >   
                        <option value="">Select Item</option>
                            {itemList.length > 0 ? (
                                itemList.map((il, index) => (
                                    <option key={il._id} value={il._id}>{il.name}</option>
                                ))
                            ) : (
                                <option value="">No Items found</option>
                            )}
                        </select>

                    </div>

                    <div className="FormItem">
                        <label htmlFor="currentSellingPrice" style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Current Selling Price:</label>
                        <div id="currentSellingPrice" style={{ fontSize: '16px' }}>
                            LKR {typeof sellingPrice === 'number' ? sellingPrice.toFixed(2) : '0.00'}
                        </div>


                    </div>

                    <div className="FormItem">
                        <label htmlFor="supplyCostInput" style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Supply Cost (Per Unit):</label>
                        <input
                            type="text"
                            id="unit_cost"
                            className="SupplyCostInput bg-kwhite text-kblack"
                            style={{ width: '100%', height: '40px', fontSize: '16px' }}
                            name="unit_cost"
                            value={formDataEdit.unit_cost}
                            onChange={handleEditOnChange}
                        />
                    </div>

                    <div className="FormItem">
                        <label htmlFor="discountInput" style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Discount:</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                id="discount"
                                className="DiscountInput bg-kwhite text-kblack"
                                style={{ width: 'calc(100% - 20px)', height: '40px', fontSize: '16px', marginRight: '10px' }}
                                name="discount"
                                value={formDataEdit.discount}
                                onChange={handleEditOnChange}
                            />
                            <span style={{ fontSize: '16px' }}>%</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                        <button type="submit" className="SubmitButton" style={{ width: '150px', height: '40px', background: '#BB0A21', borderRadius: '5px', color: 'white', fontSize: '16px', fontWeight: 'bold', marginRight: '10px' }}>
                            Submit
                        </button>
                        <button className="CancelButton" style={{ width: '150px', height: '40px', background: 'lightgray', borderRadius: '5px', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
            )}
           
        </div>
    );
};

export default MyItemList;
