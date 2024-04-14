const SupplyRequest = require('../../models/StockManagement/supplyrequest.model');
const { errorHandler } = require('../../utils/error');

const index_supplyrequest = async(req, res, next) => {
    try{
        const data = await SupplyRequest.find();
        if(res.status(201)){
            res.json({success : true , data: data});
        }
    } catch (error) {
        next(error);
    }
}

//create supply request
const create_supplyrequest = async(req, res, next) => {
    console.log(req.body);
    const data = new SupplyRequest(req.body);

    try {
        await data.save();
        if(res.status(201)){
            res.send({success : true, message : "Supply Request saved successfully", data: data});
        }
    } catch (error) {
        next(error);
    }
}

//update supply request
const update_supplyrequest = async(req, res, next) => {
    console.log(req.body);
    const {_id, ...rest} = req.body;
    console.log(rest);
    try {
        const data = await SupplyRequest.updateOne({_id : _id}, rest);
        if(res.status(201)){
            res.send({success:true, message: "Supply Request updated successfully", data : data});
        }
    }catch(error){
        next(error);
    }
}

//delete supply request
const del_supplyrequest = async(req, res, next) => {
    const id = req.params.id;
    console.log(id);

    try {
        const data = await SupplyRequest.deleteOne({_id : id});
        if(res.status(201)){
            res.send({success:true, message: "Supply Request deleted successfully", data : data});
        }
    }catch(error){
        next(error);
    }
}

module.exports = {index_supplyrequest, create_supplyrequest, update_supplyrequest, del_supplyrequest};