const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const eventSchema = new mongoose.Schema({

    cus_name: {

        type: String,
        required: true,
    },

    cus_contact: {

        type: String,
        required: true,
    },

    date: {

        type: Date,
    },

    venue: {

        type: String,
        required: true,
    },

    additional: {

        type: String,
    },

    file: {

        type: String,
        required: true,
    },

    package_id: {
        type: Schema.Types.ObjectId,
        ref: 'Package',
    },

    // customer_id: {

    //     type: Schema.Types.ObjectId,
    //     ref: 'Customer'
    // },

}, { timestamps: true })

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;