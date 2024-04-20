const Mainorder = require("../../models/Cashier/mainorder.model.js");
const {errorHandler} = require("../../utils/error.js");

//create mainorder
const create_Mainorder = async(req,res, next) => {
    console.log(req.body)
    const data = new Mainorder(req.body)
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
const index_Mainorder = async(req, res, next) => {
    try {
        const data = await Mainorder.find();
        if(res.status(201)){
            res.json({success : true , data: data});
        }
    } catch (error) {
        next(error);
    }
}

//delete mainorder
const del_Mainorder = async(req,res, next) =>{
    const id = req.params.id
    console.log(id)

    try{
        const data = await Mainorder.deleteOne({_id : id})
        if(res.status(201)){
            res.send({success:true, message: "Mainorder deleted successfully", data : data})
        }
    }catch(error){
        next(error);
    }
}

module.exports = { create_Mainorder, index_Mainorder, del_Mainorder};