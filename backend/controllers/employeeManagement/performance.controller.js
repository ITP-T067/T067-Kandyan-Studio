const Performance = require("../../models/employeeManagement/performance.model.js");
const {errorHandler} = require("../../utils/error.js");

const index_Performance = async (req, res, next) => {
  try {
    const data = await Performance.find({});
    if(res.status(201)){
      res.json({ success: true, data: data });
    }
  } catch (error) {
    next(error);
  }
};


//create performance
const create_Performance = async (req, res, next) => {
  console.log(req.body)
  const data = new Performance(req.body)
  try {
    await data.save();
    if(res.status(201)){
      res.send({ success: true, message: "Performance created successfully", data: data });
    }
    
  } catch (error) {
    next(error);
  }
};

//update employee
const update_Performance = async (req, res, next) => {
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

//delete performance
const delete_Performance = async (req, res, next) => {
  const id = req.params.id;
  console.log(id)
  try {
    const data = await Performance.deleteOne({_id : id})
    if (res.status(201)) {
      res.send({ success: true, message: "Performance deleted successfully", data: data });
    }
   
  } catch (error) {
    next(error);
  }
};

module.exports = { index_Performance, create_Performance, update_Performance, delete_Performance};

