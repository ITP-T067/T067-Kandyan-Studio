const express = require('express')
const { index_cproject, create_cproject, update_cproject, del_cproject } = require("../controllers/project.controller.js");

const router = express.Router();

router.get("/", index_cproject);
router.post("/create", create_cproject);
router.put("/update", update_cproject);
router.delete("/delete/:id", del_cproject);

module.exports = router;