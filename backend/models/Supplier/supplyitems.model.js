const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupplyItemsSchema = new mongoose.Schema({
   
    item_id: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
  
    supplier_id: {
        type:  Schema.Types.ObjectId,
        ref: 'SupplyList',
        required: true,
    },
    unit_cost:{
        type : String,

    },
   
   discount:{
    type : String,

   },
   
});

const SupplyItems = mongoose.model('SupplyItems', SupplyItemsSchema);

module.exports = SupplyItems;