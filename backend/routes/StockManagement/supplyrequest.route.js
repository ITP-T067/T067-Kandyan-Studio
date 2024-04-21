const express = require('express')
const {index_supplyrequest, create_supplyrequest, update_supplyrequest, del_supplyrequest } = require("../../controllers/StockManagement/supplyrequest.controller");

const router = express.Router();

//supply request
router.get("/", index_supplyrequest);
router.post("/create", create_supplyrequest);
router.put("/update", update_supplyrequest);
router.delete("/delete/:id", del_supplyrequest);

module.exports = router;