const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LoyaltySchema = mongoose.Schema({
    Cus_ID: {  
        type: Schema.Types.ObjectId,  
        ref: 'Customer',  
        default : "66147c480a94b623c0e9a698",
    }, 
    cus_name: {
        type: String,
        required: true,
    },
    total_price: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});

const ReviewModel = mongoose.model("loyalty", LoyaltySchema);

module.exports = ReviewModel;