const express = require('express');

const { index_Employee, create_Employee, update_Employee, delete_Employee, sendMail} = require("../../controllers/employeeManagement/employees.controller");

const router = express.Router();

// Index route
router.get("/", index_Employee);

// Create route
router.post("/create", create_Employee);

// Update route
router.put("/update", update_Employee);

// Delete route
router.delete("/delete/:id", delete_Employee);

//send email
router.post("/notify/:id", sendMail);

module.exports = router;
