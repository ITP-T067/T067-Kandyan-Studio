const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salarySchema = new Schema({
  selectedMonth: {
    type: Date,
    required: true
  },
  nicNumber: {
    type: String,
    required: true
  },
  employeeName: {
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
  },
  otHours: {
    type: Number
  },
  otRate: {
    type: Number
  },
  otPayment: {
    type: Number
  },
  allowances: {
    type: Number
  },
  loans: {
    type: Number
  },
  noPayDays: {
    type: Number
  },
  noPayDeduction: {
    type: Number
  },
  attendance: {
    type: Number
  },
  epf8: {
    type: Number
  },
  epf12: {
    type: Number
  },
  etf3: {
    type: Number
  },
  totalEarnings: {
    type: Number
  },
  totalDeductions: {
    type: Number
  },
  netSalary: {
    type: Number
  },
});

const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;
