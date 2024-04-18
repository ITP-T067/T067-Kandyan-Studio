const express = require("express")
const { create_package} = require("../../controllers/EventManagement/package.controller");

const router = express.Router();

router.post("/create", create_package);

module.exports = router;