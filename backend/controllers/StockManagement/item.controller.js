const Item = require('../../models/StockManagement/item.model');
const { errorHandler } = require('../../utils/error');

const index_item = async(req, res, next) => {
    try {
        const data = await Item.find();
        if(res.status(201)){
            res.json({success : true , data: data});
        }
    } catch (error) {
        next(error);
    }
}

//create item
const create_item = async(req, res, next) => {
    console.log(req.body);
    const data = new Item(req.body);

    try {
        await data.save();
        if(res.status(201)){
            res.send({success : true, message : "Item saved successfully", data: data});
        }
    } catch (error) {
        next(error);
    }
}

//update item
const update_item = async(req, res, next) => {
    console.log(req.body);
    const {_id, ...rest} = req.body;
    console.log(rest);
    try {
        const data = await Item.updateOne({_id : _id}, rest);
        if(res.status(201)){
            res.send({success:true, message: "Item updated successfully", data : data});
        }
    }catch(error){
        next(error);
    }
}

//delete item
const del_item = async(req, res, next) => {
    const id = req.params.id;
    console.log(id);

    try {
        const data = await Item.deleteOne({_id : id});
        if(res.status(201)){
            res.send({success:true, message: "Item deleted successfully", data : data});
        }
    }catch(error){
        next(error);
    }
}


module.exports = {index_item, create_item, update_item, del_item}