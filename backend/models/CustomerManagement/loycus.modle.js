const mongoose = require('mongoose');

const LoycusSchema = new mongoose.Schema({
    Cus_Name: {
        type: String,
        unique: true,
        required: true,
    },
    Email: {
        type: String,
        unique: true,
        required: true,
    },
    Contact_No: {
        type: String,
        required: true,
    },
});

const Loycus = mongoose.model('Loycus', LoycusSchema);

module.exports = Loycus;
