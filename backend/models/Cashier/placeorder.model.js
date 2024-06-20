const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceorderSchema = new mongoose.Schema({

    
    cusname: {
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

    grosstotal: {
        type: Number,
        required: true,
    },

    tendered: {
        type: Number,
        required: true,
    },

    change: {
        type: Number,
        required: true,
    },

    discount: {
        type: Number,
        required: true,
    },

    nettotal: {
        type: Number,
        required: true,
    },

    ordertype: {
        type: String,
        required: true,
    },
  
});

const Item = mongoose.model('Placeorder', PlaceorderSchema);

module.exports = Item;




