const express = require('express');

const { index_Performance, create_Performance, update_Performance, delete_Performance} = require("../../controllers/employeeManagement/performance.controller");

const router = express.Router();

const Employee = require('../../models/employeeManagement/employees.model'); // Assuming you have a Mongoose model for Employee

// Index route
router.get("/", index_Performance);

// Create route
router.post("/create", create_Performance);

//Update route
router.put("/update", update_Performance);

//Delete route
router.delete("/delete/:id", delete_Performance)

router.get('/employee', async (req, res) => {
    const { name } = req.query;

    try {
        const employee = await Employee.findOne({ name }); // Query MongoDB to find the employee by name
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Return the necessary data
    res.json({
        nicNumber: employee.nicNumber,
        basicSalary: employee.basicSalary,
      });
      
    } catch (error) {
        console.error('Error fetching employee data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

