const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const pendingOrderSchema = new mongoose.Schema({
    item_Names: {  
        type: String,  
        required: true, 
    },
    total_Price: {  
        type: Number,  
        required: true, 
    }, 
    order_slip:{
        type: String,
        default: ""
    },
    order_uploaded_image:{
        type: String,
        required: true,
    },
    order_Date:{
        type: Date,
        default: Date.now
    },
    order_status:{
        type: String,  
        default: "Proccecing" 
    },
    

})

const pendingOrder = mongoose.model('pendingOrder', pendingOrderSchema);

module.exports = pendingOrder; 