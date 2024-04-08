const express = require('express')
const {index_onOrder, create_onOrder, update_onOrder, del_onOrder } = require("../controllers/onlineOrder.controller.js");
const {index_offOrder, create_offOrder, update_offOrder, del_offOrder } = require("../controllers/offlineOrder.controller.js");

const router = express.Router();
//online orders
router.get("/on/", index_onOrder);
router.post("/on/create", create_onOrder);
router.put("/on/update", update_onOrder);
router.delete("/on/delete/:id", del_onOrder);
//offline orders
router.get("/off/", index_offOrder);
router.post("/off/create", create_offOrder);
router.put("/off/update", update_offOrder);
router.delete("/off/delete/:id", del_offOrder);

module.exports = router;