const Inquiry = require("../models/inquiry.model.js") 
const {errorHandler} = require("../utils/error.js");

const index_inquiry = async(req,res, next) => {

    try{
        const data = await Inquiry.find({}).populate({
            path: 'Cus_ID',
            select: 'Cus_Name',
        });
        if(res.status(201)){
            res.json({success : true , data: data})
        }
    }catch(error){
        next(error);
    }
}

const getInquiryById_inquiry = async (req, res, next) => {
    const inquiryId = req.params.id;

    try {
        const inquiry = await Inquiry.findById(inquiryId).populate({
            path: 'Cus_ID',
            select: 'Cus_Name',
        });

        if (!inquiry) {
            return res.status(404).json({ success: false, message: "Inquiry not found" });
        }

        res.status(200).json({ success: true, data: inquiry });
    } catch (error) {
        next(error);
    }
};

//create data
const create_inquiry = async(req,res, next) => {
    const { Inquiry_Type, Inquiry_subType, Inquiry_Data, Status, Cus_ID } = req.body;
    const Inquiry_Date = new Date();

    const newInquiry = new Inquiry({
        Inquiry_Type, 
        Inquiry_subType, 
        Inquiry_Data,
        Inquiry_Date, 
        Status,  
        Cus_ID
    });

    await newInquiry.save();

    try{
        if(res.status(201)){
            res.send({success: true,
                message: "Inquiry saved successfully",
                data: newInquiry})
        }
    }catch(error){
        next(error);
    }

}
//update data
const update_inquiry = async (req, res, next) => {
    const { _id, Status, ...rest } = req.body;
    try {
        let updatedInquiry;
        if (Status === "Resolved") {
            updatedInquiry = await Inquiry.findOneAndUpdate({ _id }, { ...rest, Status, Inquiry_Resolved_Date: new Date() }, { new: true });
        } else {
            updatedInquiry = await Inquiry.findOneAndUpdate({ _id }, { ...rest, Status }, { new: true });
        }

        res.status(200).json({ success: true, message: "Inquiry updated successfully", data: updatedInquiry });
    } catch (error) {
        next(error);
    }
}

//delete data
const del_inquiry = async(req,res, next) =>{
    const id = req.params.id
    console.log(id)

    try{
        const data = await Inquiry.deleteOne({_id : id})
        if(res.status(201)){
            res.send({success:true, message: "Inquiry deleted successfully", data : data})
        }
    }catch(error){
        next(error);
    }
}

module.exports = { index_inquiry, getInquiryById_inquiry, create_inquiry, update_inquiry, del_inquiry};
