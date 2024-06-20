import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8010/";

const AddSupply = () => {
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

    
    

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
    
        // Validate supply cost
        if (parseFloat(formData.unit_cost) >= sellingPrice) {
            alert("Supply cost must be lower than the current selling price.");
            return;
        }
    
        // Validate discount
        if (parseFloat(formData.discount) < 0 || parseFloat(formData.discount) > 100) {
            alert("Discount must be between 0 and 100.");
            return;
        }
    
        try {
            // Send supply item data to the backend
            const response = await axios.post("/supplyitem/create", formData);
    
            if (response.data.success) {
                alert("Supply item created successfully");
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
    

    return (
        <div className="PageContainer text-kwhite" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="AddSupplyItemsForm" style={{ width: 500, position: 'relative', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                <form onSubmit={handleSubmit}>
                    <div className="FormItem">
                        <label htmlFor="itemSelect" style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Item:</label>
                        <select
    id="itemSelect"
    className="ItemSelect text-kblack"
    style={{ width: '100%', height: '40px', fontSize: '16px' }}
    name="item_id"
    value={formData.item_id}
    onChange={handleChange}
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
                            id="supplyCostInput"
                            className="SupplyCostInput bg-kwhite text-kblack"
                            style={{ width: '100%', height: '40px', fontSize: '16px' }}
                            name="unit_cost"
                            value={formData.unit_cost}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="FormItem">
                        <label htmlFor="discountInput" style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Discount:</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                id="discountInput"
                                className="DiscountInput bg-kwhite text-kblack"
                                style={{ width: 'calc(100% - 20px)', height: '40px', fontSize: '16px', marginRight: '10px' }}
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
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
    );
};

export default AddSupply;
