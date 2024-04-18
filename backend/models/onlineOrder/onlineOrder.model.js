const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const onlineOrderSchema = new mongoose.Schema({ 

    Item_ID: {  
        type: Schema.Types.ObjectId,  
        ref: 'Item',  
        required: true, 
    }, 
    
    Quantity: {  
        type: Number,  
        required: true, 
    }, 
    
    Additional: {  
        type: String,  
    }, 
    
    Order_Date: { 

        type: Date,
        required: true, 

    }, 

    Status: {  
        type: String,  
        required: true, 
    }, 

    Order_Amount: {
        type: Number,
        required: true,
    },
    
    Project_Status:{ 
        type: String, 
        required: true,
    }, 
    
    Cus_ID: {  
        type: Schema.Types.ObjectId,  
        ref: 'Customer',  
        required: true, 
    }, 
    
}) 
    
const OnlineOrder = mongoose.model('OnlineOrder', onlineOrderSchema); 

module.exports = OnlineOrder;