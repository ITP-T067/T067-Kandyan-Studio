const Package = require("../../models/EventManagement/package.model")
const {errorHandler} = require("../../utils/error");

//create data
const create_package = async(req, res, next) => {
    try{
        const { pkg_category, pkg_name, price, description,  } = req.body;
        const {filename:image} = req.file; 

        const newPackage = new Package({
            pkg_category,
            pkg_name,
            price,
            description,
            image,
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

//get package by id
const get_packageById = async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        res.json(package);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get all packages
const get_packages = async (req, res) => {
    try {
        const packages = await Package.find();
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get packages by category
const get_packagesByCategory = async (req, res) => {
    try {
        // Extract the category from the request query parameters
        const category = req.body.pkg_category;

        // Use the category to filter packages
        const packages = await Package.find({ pkg_category: category });

        // Send the filtered packages as the response
        res.json(packages);
    } catch (error) {
        // Handle any errors that occur during the database operation
        res.status(500).json({ message: error.message });
    }
}


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
const delete_package = async(req, res, next) => {
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

module.exports = {get_packages, get_packageById, get_packagesByCategory, create_package, update_package, delete_package};