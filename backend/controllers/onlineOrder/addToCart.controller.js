const addToCart = require("../../models/onlineOrder/addToCart.model");
const {errorHandler} = require("../../utils/error.js");

//create part
const create_addToCart = async(req,res, next) => {
    console.log(req.body)
    const data = new addToCart(req.body)

    try{
        await data.save() 
        if(res.status(201)){
            res.send({success : true, message : "order saved successfully", data: data})
        }
    }catch(error){
        next(error);
    }

}

//read item
const index_addToCart = async(req, res, next) => {
    try {
        const data = await addToCart.find();
        if(res.status(201)){
            res.json({success : true , data: data});
        }
    } catch (error) {
        next(error);
    }
}

//delete item
const del_addToCart = async(req,res, next) =>{
    const id = req.params.id
    console.log(id)

    try{
        const data = await addToCart.deleteOne({_id : id})
        if(res.status(201)){
            res.send({success:true, message: "Order deleted successfully", data : data})
        }
    }catch(error){
        next(error);
    }
}

module.exports = { create_addToCart, index_addToCart, del_addToCart};