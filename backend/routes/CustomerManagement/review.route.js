const express = require("express");
const {loyalty_customer} = require("../../controllers/CustomerManagement/loyalty.controller");

const router = express.Router();

const {
  addreview,
  displayreview,
  updatereview,
  deleteReview,
} = require("../../controllers/CustomerManagement/review.controller");

router.post("/add", addreview);
router.post("/display", displayreview);
router.patch("/update/:id", updatereview);
router.delete("/delete/:id", deleteReview);

router.post("/loyalty/add", loyalty_customer);

module.exports = router;
