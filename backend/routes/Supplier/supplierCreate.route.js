const express = require('express');
const {
  index_supplierCreate,
  create_supplierCreate,
  update_supplierCreate,
  del_supplierCreate
} = require("../../controllers/SupplierManagement/supplierCreate.controller");

const router = express.Router();

// Routes
router.get("/", index_supplierCreate);
router.post("/create", create_supplierCreate);
router.put("/update", update_supplierCreate);
router.delete("/delete/:id", del_supplierCreate);

module.exports = router;
