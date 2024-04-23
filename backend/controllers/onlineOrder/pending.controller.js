const pendingOrder = require("../../models/onlineOrder/pendingOrder.module");
const {errorHandler} = require("../../utils/error.js");

//create pending part
const create_pendingOrder = async(req,res, next) => {

    
    const { item_Names,total_Price, order_uploaded_image } = req.body;
    const { filename: order_slip } = req.file;

    try{
        const newPending = new pendingOrder({
            item_Names,
            total_Price,
            order_uploaded_image,
            order_slip,
        });

        await newPending.save();
        if(res.status(201)){
            res.send({success : true, message : "send pending list successfully", data: newPending})
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

const getOrderById_pendingOrder = async (req, res, next) => {
    const orderId = req.params.id;

    try {
        const order = await pendingOrder.findById(orderId)

        if (!order) {
            return res.status(404).json({ success: false, message: "Pending order not found" });
        }

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        next(error);
    }
};


//update data
const update_pendingOrder = async(req, res, next) => {
    console.log(req.body)
    const {_id, ...rest} = req.body
    console.log(rest)
    try{
        const data = await pendingOrder.updateOne({_id : _id}, rest)
        if(res.status(201)){
            res.send({success:true, message: "Pending order updated successfully", data : data})
        }
    }catch(error){
        next(error);
    }

}

const del_pendingOrder = async(req,res, next) =>{
    const id = req.params.id
    console.log(id)

    try{
        const data = await pendingOrder.deleteOne({_id : id})
        if(res.status(201)){
            res.send({success:true, message: "Order deleted successfully", data : data})
        }
    }catch(error){
        next(error);
    }
}


const updateStatusToPending = async (req, res, next) => {
    const orderId = req.params.id;

    try {
        // Find the pending order by its ID
        const existingOrder = await pendingOrder.findById(orderId);

        if (!existingOrder) {
            return res.status(404).json({ success: false, message: "Pending order not found" });
        }

        // Update the status of the pending order to "Pending"
        existingOrder.order_status = "Pending";
        await existingOrder.save();

        return res.status(200).json({ success: true, message: "Pending order status updated to 'Pending'", data: existingOrder });
    } catch (error) {
        next(error);
    }
}

module.exports = {create_pendingOrder, index_pendingOrder, getOrderById_pendingOrder, update_pendingOrder, del_pendingOrder, updateStatusToPending};