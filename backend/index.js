const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path');

//Manager - Stock Department
const itemRouter = require("./routes/StockManagement/item.route.js");
const supplyRequestRouter = require("./routes/StockManagement/supplyrequest.route.js");

//Manager - Employee Department
const employeeRouter  = require("./routes/employeeManagement/employees.route.js")
const salaryRouter = require("./routes/employeeManagement/salary.route.js")


//Creator
const orderRouter = require("./routes/order.route.js");
const projectRouter = require("./routes/ProjectManagement/project.route.js")
const customerRouter = require("./routes/customer.route.js");
const receiptRouter = require("./routes/receipt.route.js");
const inquiryRouter = require("./routes/inquiry.route.js");
const studioStatusRouter = require("./routes/ProjectManagement/studioStatus.route.js");

//Manager - Event Department
const packageRouter = require("./routes/EventManagement/package.route.js");

//Customer - Event Department
const eventRouter = require("./routes/EventManagement/event.route.js")
//Customer
const reviewRouter = require("./routes/CustomerManagement/review.route.js");

//cashier
const mainorder = require("./routes/Cashier/mainorder.route.js");
const placeorder = require("./routes/Cashier/placeorder.route.js");

//loyalty
 const loyaltyRouter=require("./routes/order.route.js");


const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads', 'OnlineOrder')));
app.use('/uploads/EventManagement', express.static(path.join(__dirname, 'uploads', 'EventManagement')));



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
app.use('/employee', employeeRouter);
app.use('/salary', salaryRouter);


//Creator
app.use('/order', orderRouter);
app.use('/project', projectRouter);
app.use('/customer', customerRouter);
app.use('/receipt', receiptRouter);
app.use('/inquiry', inquiryRouter);
app.use('/studio', studioStatusRouter);



//Customer
app.use('/review', reviewRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({success: false, statusCode, message});
 }); 

    