import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8010/"; // Adjust base URL if needed

const SupplyInfo = () => {
    // State variables to hold data
    const [items, setItems] = useState([]);
    
    // Fetch data using useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/items/"); // Adjust the URL as per your API endpoint
                setItems(response.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchData();
    }, []);
    
    return (
        <div>
            {items.map((item) => (
                <div key={item._id} className="group-8895 mx-5 mb-6 flex items-center">
                    <div className="background-overlay rounded-lg" />
                    <div className="left-rectangle rounded-lg" />
                    
                    {/* Display item details */}
                    <div className="item-id text-white font-inter text-base font-normal">Item ID: {item._id}</div>
                    <div className="title text-white font-inter text-4xl font-bold text-center">{item.name}</div>
                    <div className="description-title text-white font-inter text-base font-normal">Description:</div>
                    <div className="description text-white font-inter text-base font-normal break-words">{item.description}</div>
                    <div className="type text-white font-inter text-base font-normal">Type: {item.type}</div>
                    <div className="unit-price text-white font-inter text-base font-normal">Unit Price: {item.sellingPrice}</div>
                    <div className="max-capacity text-white font-inter text-base font-normal">Max Capacity: {item.maxCapacity}</div>
                    
                    {/* Add more fields as needed */}
                </div>
            ))}
        </div>
    );
};

export default SupplyInfo;
