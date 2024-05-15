const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  productRating: {
    type: String,
    required: true,
  },
  deliveryRating: {
    type: String,
    required: true,
  },
});

const ReviewModel = mongoose.model("Review", ReviewSchema);

module.exports = ReviewModel;