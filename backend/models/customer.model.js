const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({ 

    Cus_Name:{ 

        type: String, 
        unique: true, 
        required: true, 

    }, 

    Email:{ 

        type: String, 
        unique: true, 
        required: true, 

    }, 

 

    Contact_No:{ 

        type: String, 
        required: true, 

    }, 

}) 

 

const Customer = mongoose.model('Customer', customerSchema); 

module.exports = Customer; 