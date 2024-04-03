const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({ 

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

    Type: {  
        type: String,  
        required: true, 

    }, 

    Status: {  
        type: String,  
        required: true, 

    }, 

    Cus_ID: {  

        type: Schema.Types.ObjectId,  
        ref: 'Customer' ,  
        required: true, 

    }, 

}) 

const Order = mongoose.model('Order', orderSchema); 

module.exports = Order; 