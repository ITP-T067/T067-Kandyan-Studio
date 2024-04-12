const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const eventSchema = new mongoose.Schema({

    Event_Category: {

        type: String,
        required: true,
    },

    Customer_Name: {

        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },

    Contact_No: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },

    Date: {

        type: Date,
        required: true,        
    },

    Venue: {

        type: String,
        required: true,
    },

    Description: {

        type: String,
    },

    Payment_slip: {

        data: Buffer,
        contentType: String,
        required: true,
    },

    Package_ID: {

        type: Schema.Types.ObjectId,
        ref: 'Package'
    },

}, {timestamps:true})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;