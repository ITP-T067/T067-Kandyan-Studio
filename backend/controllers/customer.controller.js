const Customer = require("../models/customer.model.js") 
const {errorHandler} = require("../utils/error.js");

const index_customer = async(req,res, next) => {

    try{
        const data = await Customer.find({})
        if(res.status(201)){
            res.json({success : true , data: data})
        }
    }catch(error){
        next(error);
    }
}
//create data
const create_customer = async(req,res, next) => {
    console.log(req.body)
    const data = new Customer(req.body)

    try{
        await data.save() 
        if(res.status(201)){
            res.send({success : true, message : "Customer saved successfully", data: data})
        }
    }catch(error){
        next(error);
    }

}
//update data
const update_customer = async(req, res, next) => {
    console.log(req.body)
    const {_id, ...rest} = req.body
    console.log(rest)
    try{
        const data = await Customer.updateOne({_id : _id}, rest)
        if(res.status(201)){
            res.send({success:true, message: "Customer updated successfully", data : data})
        }
    }catch(error){
        next(error);
    }

}

//delete data
const del_customer = async(req,res, next) =>{
    const id = req.params.id
    console.log(id)

    try{
        const data = await Customer.deleteOne({_id : id})
        if(res.status(201)){
            res.send({success:true, message: "Customer deleted successfully", data : data})
        }
    }catch(error){
        next(error);
    }
}

module.exports = { index_customer, create_customer, update_customer, del_customer};
