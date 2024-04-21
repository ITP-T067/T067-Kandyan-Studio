const express = require("express");

const router = express.Router();

const {
  addreview,
  displayreview,
  updatereview,
  deleteReview,
} = require("../../controllers/CustomerManagement/review.controller");

router.post("/add", addreview);
router.post("/display", displayreview);
router.put("/update/:id", updatereview);
router.delete("/delete/:id", deleteReview);

module.exports = router;
