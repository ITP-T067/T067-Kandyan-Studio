const Employee = require("../../models/employeeManagement/employees.model.js");
const {errorHandler} = require("../../utils/error.js");

const nodemailer = require("nodemailer");


const index_Employee = async (req, res, next) => {
  try {
    const data = await Employee.find({});
    if(res.status(201)){
      res.json({ success: true, data: data });
    }
  } catch (error) {
    next(error);
  }
};


//create employee
const create_Employee = async (req, res, next) => {
  console.log(req.body)
  const data = new Employee(req.body)
  try {
    await data.save();
    if(res.status(201)){
      res.send({ success: true, message: "Employee created successfully", data: data });
    }
    
  } catch (error) {
    next(error);
  }
};

//update employee
const update_Employee = async (req, res, next) => {
  console.log(req.body)
  const {_id, ...rest} = req.body;
  console.log(rest)
  try {
    const data = await Employee.updateOne({_id:_id}, rest);
    if (res.status(201)) {
      res.send({ success: true, message: "Employee updated successfully", data : data });
    }
  } catch (error) {
    next(error);
  }
};

//delete employee
const delete_Employee = async (req, res, next) => {
  const id = req.params.id;
  console.log(id)
  try {
    const data = await Employee.deleteOne({_id : id})
    if (res.status(201)) {
      res.send({ success: true, message: "Employee deleted successfully", data: data });
    }
   
  } catch (error) {
    next(error);
  }
};

//crete reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, //true for 465, false for other ports
    auth: {
        user: "kandyan.info@gmail.com", //Sender gmail address
        pass: "ukle odkn trba qhuh" //app password from gmail account
    },
});

const mailOptions = {
  from: {
    name: 'Kandyan Studio',
    address: process.env.USER
  }, //sender address
  to: ["dinithi2290@gmail.com"], //list of recievers
  subject: "Payroll notification",
  text: 'Dear ${employee.name},\nYour payroll for last month has been processed and your salary has been sent to your bank account.',//plain text body 
  html: '<p>Dear ${employee.name},</p><p>Your payroll for last month has been processed and your salary has been sent to your bank account.</p>' //html body
}

// Function to send email
const sendMail = async (req, res, next) => {
  const id = req.params.id;
  console.log(id)

  const employee = await Employee.findOne({_id: id});
  const mailOptions = {
    from: {
      name: 'Kandyan Studio',
      address: 'kandyan.info@gmail.com'
    },
    to: employee.email,
    subject: "Payroll notification",
    text: `Dear ${employee.name},\nYour payroll for last month has been processed and your salary has been sent to your bank account.`,
    html: `<p>Dear ${employee.name},</p><p>Your payroll for last month has been processed and your salary has been sent to your bank account.</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
} 
 

module.exports = { index_Employee, create_Employee, update_Employee, delete_Employee, sendMail};
