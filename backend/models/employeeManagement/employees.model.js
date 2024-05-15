const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  contactNumber: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  nicNumber: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  basicSalary: {
    type: Number,
    required: true
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
