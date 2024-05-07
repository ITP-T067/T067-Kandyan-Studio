const express = require('express')
const { index_supplyitems, create_supplyitems, update_supplyitems, del_supplyitems} = require("../../controllers/SupplierManagement/supplyItems.controller");

const router = express.Router();

//items
router.get("/", index_supplyitems);
router.post("/create", create_supplyitems);
router.put("/update", update_supplyitems);
router.delete("/delete/:id", del_supplyitems);


module.exports = router;