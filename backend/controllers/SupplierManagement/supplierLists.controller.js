const SupplyList = require("../../models/Supplier/supplierlist.model.js") 
const {errorHandler} = require("../../utils/error.js");

const index_supplierlist = async(req,res, next) => {

    try{
        const data = await SupplyList.find({})
        if(res.status(201)){
            res.json({success : true , data: data})
        }
    }catch(error){
        next(error);
    }
}
//create data
const create_supplierlist = async(req,res, next) => {
    console.log(req.body)
    const data = new SupplyList(req.body)

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
const update_supplierlist = async(req, res, next) => {
    console.log(req.body)
    const {_id, ...rest} = req.body
    console.log(rest)
    try{
        const data = await SupplyList.updateOne({item_id: _id}, rest)
        if(res.status(201)){
            res.send({success:true, message: "Supplier updated successfully", data : data})
        }
    }catch(error){
        next(error);
    }

}

//delete data
const del_supplierlist = async (req, res, next) => {
    const id = req.params.id;

    try {
        const data = await SupplyList.deleteOne({ _id: id });

        if (data.deletedCount === 1) {
            res.status(200).json({ success: true, message: "Supplier item deleted successfully" });
        } else {
            res.status(404).json({ success: false, message: "Supplier item not found" });
        }
    } catch (error) {
        next(error);
    }
};



module.exports = { index_supplierlist, create_supplierlist, update_supplierlist, del_supplierlist};
