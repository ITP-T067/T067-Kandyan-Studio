const Placeorder = require("../../models/Cashier/placeorder.model.js");
const {errorHandler} = require("../../utils/error.js");

//create mainorder
const create_Placeorder = async (req, res, next) => {
    console.log(req.body);
    const data = new Placeorder(req.body);
    try {
        await data.save();
        res.status(201).send({ success: true, message: "placeorder saved successfully", data: data });
    } catch (error) {
        next(errorHandler(error)); // Pass error to the global error handler
    }
};


//read mainorder
const index_Placeorder = async (req, res, next) => {
    try {
        const data = await Placeorder.find();
        res.status(200).json({ success: true, data: data });
    } catch (error) {
        next(errorHandler(error)); // Pass error to the global error handler
    }
};

//delete mainorder
const del_Placeorder = async (req, res, next) => {
    const id = req.params.id;
    try {
        const data = await Placeorder.deleteOne({ _id: id });
        if (data.deletedCount > 0) {
            res.status(200).send({ success: true, message: "Placeorder deleted successfully", data: data });
        } else {
            res.status(404).send({ success: false, message: "Placeorder not found" });
        }
    } catch (error) {
        next(errorHandler(error)); // Pass error to the global error handler
    }
};

//update mainorder
const update_Placeorder = async (req, res, next) => {
    const { _id, ...rest } = req.body;
    try {
        const data = await Placeorder.updateOne({ _id: _id }, rest);
        if (data.nModified > 0) {
            res.status(200).send({ success: true, message: "Placeorder updated successfully", data: data });
        } else {
            res.status(404).send({ success: false, message: "Placeorder not found" });
        }
    } catch (error) {
        next(errorHandler(error)); // Pass error to the global error handler
    }
};

module.exports = { create_Placeorder, index_Placeorder, del_Placeorder,update_Placeorder};