const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const onlineOrderSchema = new mongoose.Schema({ 

    PendingOrder_ID: {  
        type: Schema.Types.ObjectId,  
        ref: 'pendingOrder',  
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

    Uploaded_Image: {
        type: String,
    },
    
    Order_Date: { 
        type: Date,
        required: true, 

    }, 

    Order_Amount: {
        type: Number,
        required: true,
    },
    
    Project_Status:{ 
        type: String, 
        required: true,
        default: "Not Taken",
    }, 
    
    Cus_ID: {  
        type: Schema.Types.ObjectId,  
        ref: 'Customer',  
        default : "66147c480a94b623c0e9a698",
    }, 
    
}) 
    
const OnlineOrder = mongoose.model('OnlineOrder', onlineOrderSchema); 

module.exports = OnlineOrder;