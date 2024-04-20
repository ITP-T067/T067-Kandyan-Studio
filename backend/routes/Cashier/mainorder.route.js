const express = require('express')
const { index_Mainorder, create_Mainorder, del_Mainorder } = require("../../controllers/Cashier/mainorder.controller");

const router = express.Router();

router.get("/", index_Mainorder);
router.post("/create", create_Mainorder);
router.delete("/delete/:id", del_Mainorder);

module.exports = router;