const express = require('express')
const { index_cproject, getProjectById_cproject, create_cproject, update_cproject, del_cproject, getProjectReport_cproject, cart_find_item_withing_order_id } = require("../../controllers/projectManagement/project.controller.js");

const router = express.Router();

router.get("/", index_cproject);
router.get("/report", getProjectReport_cproject);
router.get("/:id", getProjectById_cproject);
router.post("/create", create_cproject);
router.put("/update", update_cproject);
router.delete("/delete/:id", del_cproject);


//completed order date find
router.get("/order/:id", cart_find_item_withing_order_id);

module.exports = router;