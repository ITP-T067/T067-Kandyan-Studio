const Mainorder = require("../../models/Cashier/mainorder.model.js");
const {errorHandler} = require("../../utils/error.js");

//create mainorder
const create_Placeorder = async(req,res, next) => {
    console.log(req.body)
    const data = new Placeorder(req.body)
    try{
        await data.save() 
        if(res.status(201)){
            res.send({success : true, message : "mainorder saved successfully", data: data})
        }
    }catch(error){
        next(error);
    }
}

//read mainorder
const index_Placeorder = async(req, res, next) => {
    try {
        const data = await Placeorder.find();
        if(res.status(201)){
            res.json({success : true , data: data});
        }
    } catch (error) {
        next(error);
    }
}

//delete mainorder
const del_Placeorder = async(req,res, next) =>{
    const id = req.params.id
    console.log(id)

    try{
        const data = await Placeorder.deleteOne({_id : id})
        if(res.status(201)){
            res.send({success:true, message: "Mainorder deleted successfully", data : data})
        }
    }catch(error){
        next(error);
    }
}

//update mainorder
const update_Placeorder = async(req, res, next) => {
    console.log(req.body);
    const {_id, ...rest} = req.body;
    console.log(rest);
    try {
        const data = await Placeorder.updateOne({_id : _id}, rest);
        if(res.status(201)){
            res.send({success:true, message: "Mainorder updated successfully", data : data});
        }
    }catch(error){
        next(error);
    }
}

module.exports = { create_Placeorder, index_Placeorder, del_Placeorder,update_Placeorder};