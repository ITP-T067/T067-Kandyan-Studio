const Salary = require("../../models/employeeManagement/salary.model");

const index_Salary = async (req, res, next) => {
  try {
    const data = await Salary.find({});
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    next(error);
  }
};

const create_Salary = async (req, res, next) => {
  try {
    const newSalary = new Salary(req.body);
    await newSalary.save();
    res.status(201).json({ success: true, message: "Salary data created successfully", data: newSalary });
  } catch (error) {
    next(error);
  }
};

const update_Salary = async (req, res, next) => {
  try {
    const { _id, ...rest } = req.body;
    const updatedSalary = await Salary.findByIdAndUpdate(_id, rest, { new: true });
    res.status(200).json({ success: true, message: "Salary data updated successfully", data: updatedSalary });
  } catch (error) {
    next(error);
  }
};

const delete_Salary = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Salary.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Salary data deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const get_Salary_By_Employee_And_Month = async (req, res, next) => {
    try {
      const { employeeName, selectedMonth } = req.query;
  
      if (!employeeName || !selectedMonth) {
        return res.status(400).json({ success: false, message: 'Employee name and month are required.' });
      }
  
      // Parse selectedMonth to extract the year and month
      const monthStart = new Date(selectedMonth);// This is expected to be in the "YYYY-MM" format
      monthStart.setDate(1);//first day of the month
      monthStart.setUTCHours(0,0,0,0);

      const monthEnd = new Date(monthStart);
      monthEnd.setMonth(monthEnd.getMonth() + 1);// Move to the next month
  
      const salaryData = await Salary.find({
        employeeName,
        selectedMonth: {
          $gte: monthStart,
          $lt: monthEnd,
        },
      });
  
      if (salaryData.length === 0) {
        return res.status(404).json({ success: false, message: 'No salary data found.' });
      }
  
      res.status(200).json({ success: true, data: salaryData });
    } catch (error) {
      console.error('Error fetching salary data:', error);
      res.status(500).json({ success: false, message: 'An error occurred while fetching salary data.' });
    }
  };

module.exports = { index_Salary, create_Salary, update_Salary, delete_Salary, get_Salary_By_Employee_And_Month };
