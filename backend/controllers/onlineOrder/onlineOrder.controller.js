const OnlineOrder = require("../../models/onlineOrder/onlineOrder.model.js") 
const {errorHandler} = require("../../utils/error.js");
const nodemailer = require('nodemailer');

//read oreder
const index_onOrder = async(req,res, next) => {

    try{
        const data = await OnlineOrder.find({}).populate([
            {
                path: 'PendingOrder_ID',
                select: 'item_Names total_Price order_slip order_uploaded_image',
            },
            {
                path: 'Cus_ID',
                select: 'Cus_Name Contact_No Email',
            },
        ]);
        if(res.status(201)){
            res.json({success : true , data: data})
        }
    }catch(error){
        next(error);
    }
}

const getOrderById_onOrder = async (req, res, next) => {
    const orderId = req.params.id;

    try {
        const order = await OnlineOrder.findById(orderId).populate([
            {
                path: 'PendingOrder_ID',
                select: 'item_Names total_Price order_slip order_uploaded_image',
            },
            {
                path: 'Cus_ID',
                select: 'Cus_Name Contact_No Email',
            },
        ]);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        next(error);
    }
};


//create data
const create_onOrder = async(req,res, next) => {
    const { PendingOrder_ID, Quantity,Item_Name,Uploaded_Image, Order_Amount, Order_Date } = req.body;

    const newOrder = new OnlineOrder({
        PendingOrder_ID, 
        Quantity, 
        Item_Name,
        Order_Date, 
        Uploaded_Image,
        Order_Amount,
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

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ssd.dias29@gmail.com',
        pass: 'veia uath lutv zpot'
    }
});

const send_email_onOrder =  async (req, res) => {
const { to, subject, text } = req.body;

try {
    const mailOptions = {
    from: 
    {
        name: "Kandyan Studio",
        address: "ssd.dias29@gmail.com"
    },
    to,
    subject,
    text
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully' });
} catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Error sending email' });
}
};


//read item
const index_count_onOrder = async(req, res, next) => {
    try {
        const data = await OnlineOrder.find();
        if(res.status(201)){
            res.json({success : true , data: data});
        }
    } catch (error) {
        next(error);
    }
}

//loyalty part
const find_cusid_data = async (req, res, next) => {
    const cusId = req.params.id;
    try {
        const data = await OnlineOrder.findOne({ Cus_ID: cusId });
        return res.status(200).send({ success: true, message: "Item found successfully", data: data });
    } catch (error) {
        next(error);
    }
}



module.exports = { index_onOrder,getOrderById_onOrder, create_onOrder, update_onOrder, del_onOrder, send_email_onOrder, index_count_onOrder, find_cusid_data,};
