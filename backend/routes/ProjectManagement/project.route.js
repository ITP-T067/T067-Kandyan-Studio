const express = require('express')
const { index_cproject, getProjectById_cproject, create_cproject, update_cproject, del_cproject, getProjectReport_cproject } = require("../../controllers/projectManagement/project.controller.js");

const router = express.Router();

router.get("/", index_cproject);
router.get("/report", getProjectReport_cproject);
router.get("/:id", getProjectById_cproject);
router.post("/create", create_cproject);
router.put("/update", update_cproject);
router.delete("/delete/:id", del_cproject);

module.exports = router;