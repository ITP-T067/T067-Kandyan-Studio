const Item = require('../../models/StockManagement/item.model');
const { errorHandler } = require('../../utils/error');
const nodemailer = require("nodemailer");

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

// create item
const create_item = async (req, res, next) => {
    try {
        const { name, description, type, quantity, maxCapacity, damaged, sellingPrice, buyingPrice } = req.body;
        const { filename: image } = req.file;

        // Check if maxCapacity is less than quantity
        if (parseInt(maxCapacity) < parseInt(quantity)) {
            return res.status(400).json({ success: false, message: "Max Capacity should be greater than or equal to Quantity" });
        }

        const data = new Item({
            name,
            description,
            type,
            quantity,
            maxCapacity,
            damaged,
            sellingPrice,
            buyingPrice,
            image
        });

        await data.save();

        return res.status(201).json({ success: true, message: "Item saved successfully", data: data });

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

//Find Item by ID
const find_item = async(req, res, next) => {
    const id = req.params.id;

    try {
        const data = await Item.findOne({_id : id});
        if(res.status(201)){
            res.send({success:true, message: "Item found successfully", data : data});
        }
    }catch(error){
        next(error);
    }
}



//Email Sending
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'kandyan.info@gmail.com',
        pass: 'ukle odkn trba qhuh',
    },
});

const send_email = async(req, res, next) => {
    const {subject, text} = req.body;

    try{
        const mailOptions = {
            from: {
                name: "Kandyan Studio - Inventory Management",
                address: 'kandyan.info@gmail.com',
            },
            to : 'pahanabhayawardhane@gmail.com',
            subject,
            text
        };
        await transporter.sendMail(mailOptions);
        res.send({success: true, message: "Email sent successfully"});
    }catch(error){
        console.error('Error sending email : ',error);
        next(error);
        res.status(500).send({success: false, message: "Error sending email"});
    }
};

const update_quantity_minus = async(req, res, next) => {
    const {id, quantity} = req.body;

    try {
        const item = await Item.findOne({_id : id});
        const newQuantity = item.quantity - quantity;
        const percentage = (item.quantity / item.maxCapacity) * 100;


        const data = await Item.updateOne({_id : id}, {quantity : newQuantity});
        if(res.status(201)){
            res.send({success:true, message: "Item quantity deducted successfully", data : data});
        }

        

        if(percentage < 20){
            const mailOptions = {
                from: {
                    name: "Kandyan Studio - Inventory Management",
                    address: 'kandyan.info@gmail.com',
                },
                to : 'pahanabhayawardhane@gmail.com',
                subject : "Critical Stock Level Alert",
                text : `Stock level of ${item.name} is below 20%. Please restock before it's too late. Current Stock Levels: ${percentage}`,
            };
            await transporter.sendMail(mailOptions);
            if(res.status(201)){
                res.send({success:true, message: "Email sent successfully"});
            }
        } else if (percentage == 0){
            const mailOptions = {
                from: {
                    name: "Kandyan Studio - Inventory Management",
                    address: 'kandyan.info@gmail.com',
                },
                to : 'pahanabhayawardhane@gmail.com',
                subject : "Out of Stock Alert",
                text : `${item.name} is Out of Stock. Please restock immediately.`,
            };
            await transporter.sendMail(mailOptions);
            if(res.status(201)){
                res.send({success:true, message: "Email sent successfully"});
            }
        }
    }
    catch(error){
        next(error);
    }
}

const update_item_plus = async(req, res, next) => {
    const {id, quantity} = req.body;


    try {
        const item = await Item.findOne({_id : id});
        const newQuantity = item.quantity + quantity;
        const incPercentage = (quantity / item.maxCapacity) * 100;
        const newPercentage = ((item.quantity+quantity) / item.maxCapacity) * 100;

        const data = await Item.updateOne({_id : id}, {quantity : newQuantity});
        if(res.status(201)){
            res.send({success:true, message: "Item quantity added successfully", data : data});
        }

        const mailOptions = {
            from: {
                name: "Kandyan Studio - Inventory Management",
                address: 'kandyan.info@gmail.com',
            },
            to : 'pahanabhayawardhane@gmail.com',
            subject : "Stock Addition Alert",
            text : `Stock level of ${item.name} has been increased by +${incPercentage}% . New stock level is ${newPercentage}%.`,
        };
        await transporter.sendMail(mailOptions);
        if(res.status(201)){
            res.send({success:true, message: "Email sent successfully"});
        }
    }
    catch(error){
        next(error);
    }
}



module.exports = {index_item, create_item, update_item, del_item, find_item, send_email, update_quantity_minus, update_item_plus};

