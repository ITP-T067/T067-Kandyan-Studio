const Project = require("../models/project.model.js") 
const {errorHandler} = require("../utils/error.js");

const index_cproject = async (req, res, next) => {
    try {
        const data = await Project.find({}).populate({
            path: 'Order_ID',
            select: 'Order_Type',
        });
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
const create_cproject = async (req, res, next) => {
    try {
        const { Project_Name, Status, Order_ID } = req.body;
        const Project_Date = new Date();

        const newCreatorProject = new Project({
            Project_Name,
            Status,
            Project_Date,
            Order_ID
        });

        // Save the new project
        await newCreatorProject.save();

        res.status(201).json({
            success: true,
            message: "Project saved successfully",
            data: newCreatorProject // Use newCreatorProject instead of data
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
}
//update data
const update_cproject = async (req, res, next) => {
    const { _id, Status, ...rest } = req.body;
    try {
        let updatedProject;
        if (Status === "Completed") {
            updatedProject = await Project.findOneAndUpdate({ _id }, { ...rest, Status, Completed_Date: new Date() }, { new: true });
        } else {
            updatedProject = await Project.findOneAndUpdate({ _id }, { ...rest, Status }, { new: true });
        }

        res.status(200).json({ success: true, message: "Project updated successfully", data: updatedProject });
    } catch (error) {
        next(error);
    }
}

//delete data
const del_cproject = async(req,res, next) =>{
    const id = req.params.id
    console.log(id)

    try{
        const data = await Project.deleteOne({_id : id})
        if(res.status(201)){
            res.send({success:true, message: "Project deleted successfully", data : data})
        }
    }catch(error){
        next(error);
    }
}

module.exports = { index_cproject, create_cproject, update_cproject, del_cproject };
