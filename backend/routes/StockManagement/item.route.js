const express = require('express')
const {index_item, create_item, update_item, del_item } = require("../../controllers/StockManagement/item.controller");

const router = express.Router();

//items
router.get("/item/", index_item);
router.post("/item/create", create_item);
router.put("/item/update", update_item);
router.delete("/item/delete/:id", del_item);

module.exports = router;