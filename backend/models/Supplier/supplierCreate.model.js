const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
