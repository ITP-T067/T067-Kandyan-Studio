const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const packageSchema = new mongoose.Schema({

    Package_Category: {

        type: String,
        required: true,
    },

    Package_Type: {

        type: String,
        required: true,
    },

    Price: {

        type: Number,
        required: true,
    },

    Description: {

        type: String,
        required: true,
    },

    Employee_ID: {

        type: Schema.Types.ObjectId,
        ref: 'Employee'  //change accordingly
    },

}, {timestamps:true})

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;