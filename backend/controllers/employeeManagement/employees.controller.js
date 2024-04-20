const Employee = require("../../models/employeeManagement/employees.model.js");
const {errorHandler} = require("../../utils/error.js");

const index_Employee = async (req, res, next) => {
  try {
    const data = await Employee.find({});
    if(res.status(201)){
      res.json({ success: true, data: data });
    }
  } catch (error) {
    next(error);
  }
};


//create employee
const create_Employee = async (req, res, next) => {
  console.log(req.body)
  const data = new Employee(req.body)
  try {
    await data.save();
    if(res.status(201)){
      res.send({ success: true, message: "Employee created successfully", data: data });
    }
    
  } catch (error) {
    next(error);
  }
};

//update employee
const update_Employee = async (req, res, next) => {
  console.log(req.body)
  const {_id, ...rest} = req.body;
  console.log(rest)
  try {
    const data = await Employee.updateOne({_id:_id}, rest);
    if (res.status(201)) {
      res.send({ success: true, message: "Employee updated successfully", data : data });
    }
  } catch (error) {
    next(error);
  }
};

//delete employee
const delete_Employee = async (req, res, next) => {
  const id = req.params.id;
  console.log(id)
  try {
    const data = await Employee.deleteOne({_id : id})
    if (res.status(201)) {
      res.send({ success: true, message: "Employee deleted successfully", data: data });
    }
   
  } catch (error) {
    next(error);
  }
};

module.exports = { index_Employee, create_Employee, update_Employee, delete_Employee};
