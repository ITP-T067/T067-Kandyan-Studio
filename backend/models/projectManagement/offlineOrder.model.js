const mongoose = require('mongoose')

const offlineOrderSchema = new mongoose.Schema({ 

    Order_Type: {  
        type: String,    
        required: true, 
    }, 
    
    Item_Name: {
        type: String,
        required: true,
    },

    Quantity: {  
        type: Number,  
        required: true, 
    }, 
    
    Additional: {  
        type: String,  
    }, 
    
    Artwork_Price: { 
        type: Number, 
        required: true, 
    }, 
    
    Cus_Name: { 
        type: String, 
        required: true, 
    },  

    Order_Date: {
        type: Date,
        required: true,
    },
    
    Phone_Number: { 
        type: String, 
        required: true, 
    }, 
    
    Status: {  
        type: String,  
        required: true, 
    }, 
    
    Project_Status:{ 
        type: String, 
        Required: true,
    }, 
    
}) 

const OfflineOrder = mongoose.model('OfflineOrder', offlineOrderSchema); 

module.exports = OfflineOrder; 