const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const addToCartSchema = new mongoose.Schema({
    item_Name: {  
        type: String,  
        required: true, 
    },
    item_Price: {  
        type: Number,  
        required: true, 
    }, 
    item_Quantity: {
        type: Number,  
        required: true,
    },
    item_image: {
        type: String,
        required: true,
    },
    item_Slip: {
        type: String,
        required: true,
    },
    // Cus_ID: {  
    //     type: Schema.Types.ObjectId,  
    //     ref: 'Customer',  
    //     required: true, 
    // }, 
})

const addToCart = mongoose.model('addToCart', addToCartSchema);

module.exports = addToCart; 