const Supplier = require("../../models/Supplier/supplierCreate.model.js") 
const {errorHandler} = require("../../utils/error.js");

const index_supplierCreate = async(req,res, next) => {

    try{
        const data = await Supplier.find({})
        if(res.status(201)){
            res.json({success : true , data: data})
        }
    }catch(error){
        next(error);
    }
}
//create data
const create_supplierCreate = async(req,res, next) => {
    console.log(req.body)
    const data = new Supplier(req.body)

    try{
        await data.save() 
        if(res.status(201)){
            res.send({success : true, message : "Supplier saved successfully", data: data})
        }
    }catch(error){
        next(error);
    }

}
//update data
const update_supplierCreate = async(req, res, next) => {
    console.log(req.body)
    const {_id, ...rest} = req.body
    console.log(rest)
    try{
        const data = await Supplier.updateOne({item_id: _id}, rest)
        if(res.status(201)){
            res.send({success:true, message: "Supplier updated successfully", data : data})
        }
    }catch(error){
        next(error);
    }

}

//delete data
const del_supplierCreate = async (req, res, next) => {
    const id = req.params.id;

    try {
        const data = await Supplier.deleteOne({ _id: id });

        if (data.deletedCount === 1) {
            res.status(200).json({ success: true, message: "Supplier  deleted successfully" });
        } else {
            res.status(404).json({ success: false, message: "Supplier  not found" });
        }
    } catch (error) {
        next(error);
    }
};



module.exports = { index_supplierCreate, create_supplierCreate, update_supplierCreate, del_supplierCreate};
