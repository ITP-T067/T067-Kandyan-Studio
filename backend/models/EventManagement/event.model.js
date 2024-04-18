const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const eventSchema = new mongoose.Schema({

    Event_Category: {

        type: String,
        required: true,
    },

    Customer_Name: {

        type: String,
        required: true,
    },

    Contact_No: {

        type: Number,
        required: true,
    },

    Date: {

        type: Date,
        required: true,
        unique: true,        
    },

    Venue: {

        type: String,
        required: true,
    },

    Description: {

        type: String,
    },

    Payment_slip: {

        // data: {
        //     type: Buffer,
        //     required: true,
        // },
        // contentType: {
        //     type: String,
        //     required: true,
        // }
        type: String,
    },

    Package_Name: {

        type: String,
        required: true,
    },

    Package_ID: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
    },

    Customer_ID: {

        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },

}, {timestamps:true})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;