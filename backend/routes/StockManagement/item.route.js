const express = require('express')
const {index_item, create_item, update_item, del_item, find_item} = require("../../controllers/StockManagement/item.controller");

const router = express.Router();

//items
router.get("/", index_item);
router.post("/create", create_item);
router.put("/update", update_item);
router.delete("/delete/:id", del_item);
router.get("/find/:id", find_item);

module.exports = router;