const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const addToCartSchema = new mongoose.Schema({
    Cus_ID: {  
        type: Schema.Types.ObjectId,  
        ref: 'Customer',  
        default : "66147c480a94b623c0e9a698",
    }, 
    
    Item_ID: {  
        type: Schema.Types.ObjectId,  
        ref: 'Item',  
        required: true, 
    },
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
    item_file:{
        type: String,
        required: true,
    },
})

const addToCart = mongoose.model('addToCart', addToCartSchema);

module.exports = addToCart; 