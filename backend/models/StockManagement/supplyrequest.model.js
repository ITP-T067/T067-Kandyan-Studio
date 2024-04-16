const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplyReqSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
    reqquantity: {
        type: Number,
        required: true,
    },
    supplier: {
        type: String,
        required: true,
    },
    exdate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    cost: {
        type: String,
        required: true,
    },
    additional: {
        type: String,
        required: true,
    },
});

const SupplyRequest = mongoose.model('SupplyRequest', supplyReqSchema);

module.exports = SupplyRequest;