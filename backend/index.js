const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

//Manager - Stock Department
const itemRouter = require("./routes/StockManagement/item.route.js");
const supplyRequestRouter = require("./routes/StockManagement/supplyrequest.route.js");

//Manager - Employee Department
const employees  = require("./routes/employeeManagement/employees.route.js")

//Creator
const orderRouter = require("./routes/order.route.js");
const projectRouter = require("./routes/project.route.js");
const customerRouter = require("./routes/customer.route.js");
const receiptRouter = require("./routes/receipt.route.js");


const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8010

mongoose.connect("mongodb+srv://ssddias29:kandyan123@kandyan-studio.qgnehe2.mongodb.net/?retryWrites=true&w=majority&appName=Kandyan-Studio")
.then(() => {
    console.log("Connect to DB")
    app.listen(PORT, () => console.log("Server is running..."))
})
.catch((err) => console.log(err))

//Manager - Stock Department
app.use('/item', itemRouter);
app.use('/supplyrequest', supplyRequestRouter);

//Manager - Employee Department
app.use('/employee', employees);

//Creator
app.use('/order', orderRouter);
app.use('/project', projectRouter);
app.use('/customer', customerRouter);
app.use('/receipt', receiptRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({success: false, statusCode, message});
 }); 

    