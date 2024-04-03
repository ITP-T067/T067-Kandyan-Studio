const Project = require("../models/project.model.js") 
const {errorHandler} = require("../utils/error.js");

const index_cproject = async (req, res, next) => {
    try {
        const data = await Project.find({}).populate('Order_ID');
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
const update_cproject = async(req, res, next) => {
    console.log(req.body)
    const {_id, ...rest} = req.body
    console.log(rest)
    try{
        const data = await Project.updateOne({_id : _id}, rest)
        if(res.status(201)){
            res.send({success:true, message: "Project updated successfully", data : data})
        }
    }catch(error){
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
