const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const receiptSchema = new mongoose.Schema({ 
    
    Receipt_Path: {
        type: String,
        required: true,
    },

    Receipt_Date: {   
        type : Date
    }, 
    
    Order_ID: {  
        type: Schema.Types.ObjectId,  
        ref: 'OnlineOrder' ,  
        required: true, 
    }, 
    
}) 

const Receipt = mongoose.model(' Receipt ', receiptSchema); 

module.exports = Receipt; 