const OnlineOrder = require("../../models/onlineOrder/onlineOrder.model.js") 
const {errorHandler} = require("../../utils/error.js");

const index_onOrder = async(req,res, next) => {

    try{
        const data = await OnlineOrder.find({}).populate({
            path: 'Cus_ID',
            select: 'Cus_Name',
        });
        if(res.status(201)){
            res.json({success : true , data: data})
        }
    }catch(error){
        next(error);
    }
}
//create data
const create_onOrder = async(req,res, next) => {
    const { Order_Type, Quantity, Additional, Status, Order_Amount, Project_Status, Cus_ID } = req.body;
    const Order_Date = new Date();

    const newOrder = new OnlineOrder({
        Order_Type, 
        Quantity, 
        Additional,
        Order_Date, 
        Status, 
        Order_Amount,
        Project_Status, 
        Cus_ID
    });

    await newOrder.save();

    try{
        if(res.status(201)){
            res.send({success: true,
                message: "Order saved successfully",
                data: newOrder})
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
