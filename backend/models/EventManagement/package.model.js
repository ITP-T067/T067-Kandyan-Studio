const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const packageSchema = new mongoose.Schema({

    pkg_category: {

        type: String,
        required: true,
    },

    pkg_name: {

        type: String,
        required: true,
    },

    price: {

        type: Number,
        required: true,
    },

    description: {

        type: String,
        required: true,
    },

    image: {
        
        type: String,
        required: true,
    },

}, {timestamps:true})

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;