const express = require('express')
const {index_supplierlist, create_supplierlist, update_supplierlist, del_supplierlist} = require("../../controllers/SupplierManagement/supplierLists.controller");

const router = express.Router();

//items
router.get("/", index_supplierlist);
router.post("/create", create_supplierlist);
router.put("/update", update_supplierlist);
router.delete("/delete/:id", del_supplierlist);


module.exports = router;