const express = require('express')
const { index_receipt, create_receipt, update_receipt, del_receipt } = require("../controllers/receipt.controller.js");

const router = express.Router();

router.get("/", index_receipt);
router.post("/create", create_receipt);
router.put("/update", update_receipt);
router.delete("/delete/:id", del_receipt);

module.exports = router;