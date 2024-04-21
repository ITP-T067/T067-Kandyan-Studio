const Receipt = require('../models/receipt.model.js');
const { errorHandler } = require('../utils/error.js');

//Read data
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

// const getReceiptById_receipt = async (req, res, next) => {
//     const receiptId = req.params.id;

//     try {
//         const receipt = await Receipt.findById(receiptId).populate('Order_ID');

//         if (!receipt) {
//             return res.status(404).json({ success: false, message: "Receipt not found" });
//         }

//         res.status(200).json({ success: true, data: receipt });
//     } catch (error) {
//         next(error);
//     }
// };

// Create a new receipt
const create_receipt = async (req, res, next) => {
    try {
        const { Order_ID } = req.body;
        const { filename: Receipt_Path } = req.file;

        const newReceipt = new Receipt({
            Receipt_Path,
            Receipt_Date: new Date(),
            Order_ID,
        });

        await newReceipt.save();

        res.status(201).json({
            success: true,
            message: 'Receipt saved successfully',
            data: newReceipt,
        });
    } catch (error) {
        next(error);
    }
};

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

module.exports = { index_receipt, create_receipt, update_receipt, del_receipt};
