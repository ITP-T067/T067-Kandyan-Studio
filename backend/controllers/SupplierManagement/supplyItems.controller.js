const SupplyItems = require("../../models/Supplier/supplyitems.model.js");
const { errorHandler } = require("../../utils/error.js");

// Get all supply items
const index_supplyitems = async (req, res, next) => {
    try {
        const data = await SupplyItems.find().populate('item_id supplier_id');
        res.status(200).json({ success: true, data: data });
    } catch (error) {
        next(error);
    }
};

// Create new supply item
const create_supplyitems = async (req, res, next) => {
    try {
        const data = new SupplyItems(req.body);
        await data.save();
        res.status(201).json({ success: true, message: "Supply item saved successfully", data: data });
    } catch (error) {
        next(error);
    }
};

// Update supply item
const update_supplyitems = async (req, res, next) => {
    try {
        const { _id, ...rest } = req.body;
        const data = await SupplyItems.updateOne({ _id: _id }, rest, { new: true });
        if (data) {
            res.status(200).json({ success: true, message: "Supply item updated successfully", data: data });
        } else {
            res.status(404).json({ success: false, message: "Supply item not found" });
        }
    } catch (error) {
        next(error);
    }
};

// Delete supply item
const del_supplyitems = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await SupplyItems.findByIdAndDelete(id);

        if (data) {
            res.status(200).json({ success: true, message: "Supply item deleted successfully" });
        } else {
            res.status(404).json({ success: false, message: "Supply item not found" });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { index_supplyitems, create_supplyitems, update_supplyitems, del_supplyitems };
