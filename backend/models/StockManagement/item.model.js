const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    maxCapacity: {
        type: Number,
        required: true,
    },
    damaged: {
        type: Number,
        required: true,
    },
    sellingPrice: {
        type: String,
        required: true,
    },
    buyingPrice: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
