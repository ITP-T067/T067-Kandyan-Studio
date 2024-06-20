const express = require('express')
const { index_Placeorder, create_Placeorder, del_Placeorder, update_Placeorder } = require("../../controllers/Cashier/placeorder.controller");

const router = express.Router();

router.get("/", index_Placeorder);
router.post("/create", create_Placeorder);
router.delete("/delete/:id", del_Placeorder);
router.put("/update", update_Placeorder);

module.exports = router;