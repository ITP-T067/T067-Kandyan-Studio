const express = require('express')
const { index_studioStatus, create_studioStatus, update_studioStatus } = require("../../controllers/projectManagement/studioStatus.controller.js");

const router = express.Router();

router.get("/", index_studioStatus);
router.post("/create", create_studioStatus);
router.put("/update", update_studioStatus);

module.exports = router;