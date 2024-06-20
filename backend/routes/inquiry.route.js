const express = require('express')
const { index_inquiry, getInquiryById_inquiry, create_inquiry, update_inquiry, del_inquiry } = require("../controllers/inquiry.controller.js");

const router = express.Router();

router.get("/", index_inquiry);
router.get("/:id", getInquiryById_inquiry);
router.post("/create", create_inquiry);
router.put("/update", update_inquiry);
router.delete("/delete/:id", del_inquiry);

module.exports = router;
