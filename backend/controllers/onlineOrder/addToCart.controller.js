const addToCart = require("../../models/onlineOrder/addToCart.model");
const {errorHandler} = require("../../utils/error.js");

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

module.exports = { create_addToCart};