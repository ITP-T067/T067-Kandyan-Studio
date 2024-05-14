const express = require('express');
const { index_Salary, create_Salary, update_Salary, delete_Salary, get_Salary_By_Employee_And_Month} = require("../../controllers/employeeManagement/salary.controller");

const router = express.Router();

router.get("/", index_Salary);
router.post("/create", create_Salary);
router.put("/update", update_Salary);
router.delete("/delete/:id", delete_Salary);
router.get('/salary', get_Salary_By_Employee_And_Month);

module.exports = router;
