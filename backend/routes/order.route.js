const express = require('express')
const {index_order, create_order, update_order, del_order } = require("../controllers/order.controller.js");

const router = express.Router();

router.get("/", index_order);
router.post("/create", create_order);
router.put("/update", update_order);
router.delete("/delete/:id", del_order);

module.exports = router;