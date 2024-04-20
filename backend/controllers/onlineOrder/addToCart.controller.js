const addToCart = require("../../models/onlineOrder/addToCart.model");
const Item = require("../../models/StockManagement/item.model")
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

// cart item find and not available stock auto  delete
const cart_find_item = async (req, res, next) => {
    const itemId = req.params.id;

    try {
        const itemExists = await Item.exists({ _id: itemId });
        if (!itemExists) {
            // If the item doesn't exist in the Item table, delete it from the addToCart table
            const deletedItem = await addToCart.deleteMany({ Item_ID: itemId });
            return res.status(200).send({ success: true, message: "Item deleted from cart as it doesn't exist", data: deletedItem });
        }

        // If the item exists in the Item table, return it
        const data = await addToCart.findOne({ Item_ID: itemId });
        return res.status(200).send({ success: true, message: "Item found successfully", data: data });
    } catch (error) {
        next(error);
    }
}




module.exports = { create_addToCart, index_addToCart, del_addToCart, cart_find_item};