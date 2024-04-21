const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MainorderSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    
    quantity: {
        type: Number,
        required: true,
    },

    maxCapacity: {
        type: Number,
        required: true,
    },
  
});

const Item = mongoose.model('Mainorder', MainorderSchema);

module.exports = Item;
