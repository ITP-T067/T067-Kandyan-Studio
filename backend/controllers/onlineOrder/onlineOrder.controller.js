const OnlineOrder = require("../../models/onlineOrder/onlineOrder.model.js") 
const {errorHandler} = require("../../utils/error.js");

const index_onOrder = async(req,res, next) => {

    try{
        const data = await OnlineOrder.find({})
        if(res.status(201)){
            res.json({success : true , data: data})
        }
    }catch(error){
        next(error);
    }
}
//create data
const create_onOrder = async(req,res, next) => {
    console.log(req.body)
    const data = new OnlineOrder(req.body)

    try{
        await data.save() 
        if(res.status(201)){
            res.send({success : true, message : "order saved successfully", data: data})
        }
    }catch(error){
        next(error);
    }

}
//update data
const update_onOrder = async(req, res, next) => {
    console.log(req.body)
    const {_id, ...rest} = req.body
    console.log(rest)
    try{
        const data = await OnlineOrder.updateOne({_id : _id}, rest)
        if(res.status(201)){
            res.send({success:true, message: "order updated successfully", data : data})
        }
    }catch(error){
        next(error);
    }

}

//delete data
const del_onOrder = async(req,res, next) =>{
    const id = req.params.id
    console.log(id)

    try{
        const data = await OnlineOrder.deleteOne({_id : id})
        if(res.status(201)){
            res.send({success:true, message: "Order deleted successfully", data : data})
        }
    }catch(error){
        next(error);
    }
}


module.exports = { index_onOrder, create_onOrder, update_onOrder, del_onOrder};
