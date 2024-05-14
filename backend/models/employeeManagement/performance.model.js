const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const performanceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  nicNumber: {
    type: String,
    required: true
  },
  selectedMonth: {
    type: Date,
    required: true
  },
  attendance: {
    type: Number,
    required: true
  },
  otHours: {
    type: Number,
    required: true
  },
  noPayDays: {
    type: Number,
    required: true
  },
  otPayment: {
    type: Number,
    required: true
  },
  noPayDeduction: {
    type: Number,
    required: true
  },
  basicSalary: {
    type: Number,
    required: true
  }
});

const Performance = mongoose.model('Performance', performanceSchema);

module.exports = Performance;
