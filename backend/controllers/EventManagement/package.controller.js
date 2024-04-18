const Package = require("../../models/EventManagement/package.model")
const {errorHandler} = require("../../utils/error");

//create data
const create_package = async(req, res, next) => {
    try{
        const { Package_Category, Package_Name, Price, Description, Image, Employee_ID } = req.body;

        const newPackage = new Package({
            Package_Category,
            Package_Name,
            Price,
            Description,
            Image,
            Employee_ID
        });

        await newPackage.save();

        res.status(201).json({
            success: true,
            message: "Package created successfully",
            data: newPackage
        })
    }catch(error){
        console.error("Error creating package: ", error)
        next(error);
    }
}

module.exports = {create_package};