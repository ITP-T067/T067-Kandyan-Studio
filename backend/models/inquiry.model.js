const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const inquirySchema = new mongoose.Schema({  

    Inquiry_Type: {    
        type: String,   
        required: true,   
    },  

    Inquiry_subType: {
        type: String,
        required: true,
    },

    Inquiry_Data: {     
        type: String,   
        required: true,  
    }, 

    Inquiry_Date: {  
        type: Date,
        Required: true,  
    }, 

    Feedback: {
        type: String,
    },
    
    Inquiry_Resolved_Date: {
        type: Date,
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

const Inquiry = mongoose.model('Inquiry', inquirySchema);  

module.exports = Inquiry; 