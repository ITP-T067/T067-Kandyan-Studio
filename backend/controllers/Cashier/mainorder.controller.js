const Mainorder = require("../../models/Cashier/mainorder.model.js");
const {errorHandler} = require("../../utils/error.js");

//create mainorder
const create_Mainorder = async (req, res, next) => {
    try {
        const data = new Mainorder(req.body);
        await data.save();
        res.status(201).send({ success: true, message: "Mainorder saved successfully", data: data });
    } catch (error) {
        next(errorHandler(error));
    }
};

//read mainorder
const index_Mainorder = async (req, res, next) => {
    try {
        const data = await Mainorder.find();
        res.status(200).json({ success: true, data: data });
    } catch (error) {
        next(errorHandler(error));
    }
};

//delete mainorder
const del_Mainorder = async (req, res, next) => {
    const id = req.params.id;
    try {
        const data = await Mainorder.deleteOne({ _id: id });
        if (data.deletedCount > 0) {
            res.status(200).send({ success: true, message: "Mainorder deleted successfully", data: data });
        } else {
            res.status(404).send({ success: false, message: "Mainorder not found" });
        }
    } catch (error) {
        next(errorHandler(error));
    }
};

//update mainorder
const update_Mainorder = async (req, res, next) => {
    const { _id, ...rest } = req.body;
    try {
        const data = await Mainorder.updateOne({ _id: _id }, rest);
        if (data.nModified > 0) {
            res.status(200).send({ success: true, message: "Mainorder updated successfully", data: data });
        } else {
            res.status(404).send({ success: false, message: "Mainorder not found" });
        }
    } catch (error) {
        next(errorHandler(error));
    }
};

module.exports = { create_Mainorder, index_Mainorder, del_Mainorder,update_Mainorder};