const express = require('express')
const { index_customer, create_customer, update_customer, del_customer, find_customer_by_id } = require("../controllers/customer.controller.js");
const { get } = require('mongoose');

const router = express.Router();

router.get("/", index_customer);
router.post("/create", create_customer);
router.put("/update", update_customer);
router.delete("/delete/:id", del_customer);
router.get("/find/:id", find_customer_by_id);

module.exports = router;