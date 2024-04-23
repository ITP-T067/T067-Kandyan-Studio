const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MainorderSchema = new mongoose.Schema({

    billNo: {
        type: String,
        required: true,
    },

    customer: {
        type: String,
        required: true,
    },
    
    telephone: {
        type: Number,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    paymentmethod: {
        type: String,
        required: true,
    },

    total: {
        type: String,
        required: true,
    },

    tendered: {
        type: String,
        required: true,
    },

    change: {
        type: String,
        required: true,
    },

    paymentStatus: {
        type: String,
        required: true,
    },
  
});

const Item = mongoose.model('Mainorder', MainorderSchema);

module.exports = Item;




