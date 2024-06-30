const Customer = require("../models/customer.model.js");
const { errorHandler } = require("../utils/error.js");

const index_customer = async (req, res, next) => {
    try {
        const data = await Customer.find({});
        res.status(200).json({ success: true, data: data });
    } catch (error) {
        next(error);
    }
};

const create_customer = async (req, res, next) => {
    try {
        const data = await Customer.create(req.body);
        res.status(201).json({ success: true, message: "Customer saved successfully", data: data });
    } catch (error) {
        next(error);
    }
};

const update_customer = async (req, res, next) => {
    const { id } = req.params;
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCustomer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }
        res.status(200).json({ success: true, message: "Customer updated successfully", data: updatedCustomer });
    } catch (error) {
        next(error);
    }
};

const del_customer = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deletedCustomer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }
        res.status(200).json({ success: true, message: "Customer deleted successfully", data: deletedCustomer });
    } catch (error) {
        next(error);
    }
};

const find_customer_by_id = async (req, res, next) => {
    const { id } = req.params;
    try {
        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }
        res.status(200).json({ success: true, data: customer });
    } catch (error) {
        next(error);
    }
};

module.exports = { index_customer, create_customer, update_customer, del_customer, find_customer_by_id };
