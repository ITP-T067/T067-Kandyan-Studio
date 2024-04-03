const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({ 

    Project_Name: {  

        type: String,  
        required: true, 

    }, 

    Project_Date: { 

        type: Date,
        Required: true, 

    }, 

    Status: {  

        type: String,  
        required: true, 

    }, 

    
    Order_ID: {   
        type: Schema.Types.ObjectId,   
        ref: 'Order' ,   
        required: true,  
    }, 

}) 

const Project = mongoose.model('Project', projectSchema); 

module.exports = Project; 