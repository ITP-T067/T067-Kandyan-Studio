const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const ReviewModel = mongoose.model("Review", ReviewSchema);

module.exports = ReviewModel;