const express = require('express')
const { index_customer, create_customer, update_customer, del_customer } = require("../controllers/customer.controller.js");

const router = express.Router();

router.get("/", index_customer);
router.post("/create", create_customer);
router.put("/update", update_customer);
router.delete("/delete/:id", del_customer);

module.exports = router;