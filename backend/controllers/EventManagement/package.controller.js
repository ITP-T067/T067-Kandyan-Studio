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

//get package by name


//update data
const update_package = async(req, res, next) => {
    console.log(req.body)
    const{_id, ...rest}= req.body
    console.log(rest)
    try {
        const data = await Package.updateOne({_id : _id}, rest)
        if(res.status(201)){
            res.send({success: true, message: "Package updated successfully", data: data})
        }
    } catch (error) {
        next(error);
    }
}

//delete package
const delete_event = async(req, res, next) => {
    const id = req.params.id;

    try{
        const data = await Package.deleteOne({ _id: id});
        if(data.deletedCount > 0){
            res.json({ success: true, message: "Package deleted successfully", data: data });
        }else {
            res.json({ success: false, message: "Package not found"});
        }
    }catch (error){
        next(error);
    }
}

module.exports = {create_package};