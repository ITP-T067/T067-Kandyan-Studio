const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupplyListSchema = new mongoose.Schema({
   
   
    item_name: {
        type: String,
        required: true,
    },
  
    supplier_name: {
        type: String,
        // required: true,
    },
    phone_number: {
        type: String,
        // required: true,
    },
    supplier_email: {
        type: String,
        // required: true,
    },

   
});

const SupplyList = mongoose.model('SupplyList', SupplyListSchema);

module.exports = SupplyList;