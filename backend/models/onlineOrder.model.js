const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const onlineOrderSchema = new mongoose.Schema({ 

    Order_Type: {  
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
    
    Status: {  
        type: String,  
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