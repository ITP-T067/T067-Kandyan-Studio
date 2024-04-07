const Receipt = require("../models/receipt.model.js") 
const {errorHandler} = require("../utils/error.js");

const index_receipt = async (req, res, next) => {
    try {
        const data = await Receipt.find({}).populate('Order_ID');
        if (data) {
            res.json({ success: true, data: data });
        } else {
            res.json({ success: false, message: "No data available" });
        }
    } catch (error) {
        next(error);
    }
}

//create data
const create_receipt = async (req, res, next) => {
    try {
        const { Receipt_Path, Order_ID } = req.body;
        const Receipt_Date = new Date();

        const newReceipt = new Receipt({
            Receipt_Path,
            Receipt_Date,
            Order_ID
        });

        // Save the new receipt
        await newReceipt.save();

        res.status(201).json({
            success: true,
            message: "Receipt saved successfully",
            data: newReceipt // Use newReceipt instead of data
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
}

//update data
const update_receipt = async(req, res, next) => {
    console.log(req.body)
    const {_id, ...rest} = req.body
    console.log(rest)
    try{
        const data = await Receipt.updateOne({_id : _id}, rest)
        if(res.status(201)){
            res.send({success:true, message: "Receipt updated successfully", data : data})
        }
    }catch(error){
        next(error);
    }

}
//delete data
const del_receipt = async(req,res, next) =>{
    const id = req.params.id
    console.log(id)

    try{
        const data = await Receipt.deleteOne({_id : id})
        if(res.status(201)){
            res.send({success:true, message: "Receipt deleted successfully", data : data})
        }
    }catch(error){
        next(error);
    }
}

module.exports = { index_receipt, create_receipt, update_receipt, del_receipt };
