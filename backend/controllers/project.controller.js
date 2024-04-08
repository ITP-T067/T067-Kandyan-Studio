const Project = require("../models/project.model.js");
const { errorHandler } = require("../utils/error.js");

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

// Create data
const create_cproject = async (req, res, next) => {
    try {
        const { Project_Name, Status, Order_ID, OrderModel } = req.body;
        const Project_Date = new Date();

        const newCreatorProject = new Project({
            Project_Name,
            Status,
            Project_Date,
            Order_ID,
            OrderModel
        });

        // Save the new project
        await newCreatorProject.save();

        res.status(201).json({
            success: true,
            message: "Project saved successfully",
            data: newCreatorProject
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
}

// Update data
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

// Delete data
const del_cproject = async (req, res, next) => {
    const id = req.params.id;

    try {
        const data = await Project.deleteOne({ _id: id });
        if (data.deletedCount > 0) {
            res.json({ success: true, message: "Project deleted successfully", data: data });
        } else {
            res.json({ success: false, message: "Project not found" });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { index_cproject, create_cproject, update_cproject, del_cproject };
