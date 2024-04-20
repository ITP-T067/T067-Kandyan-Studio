const pendingOrder = require("../../models/onlineOrder/pendingOrder.module");
const {errorHandler} = require("../../utils/error.js");

//create pending part
const create_pendingOrder = async(req,res, next) => {
    console.log(req.body)
    const data = new pendingOrder(req.body)

    try{
        await data.save() 
        if(res.status(201)){
            res.send({success : true, message : "send pending list successfully", data: data})
        }
    }catch(error){
        next(error);
    }

}

//read item
const index_pendingOrder = async(req, res, next) => {
    try {
        const data = await pendingOrder.find();
        if(res.status(201)){
            res.json({success : true , data: data});
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {create_pendingOrder, index_pendingOrder};