const Event = require("../../models/EventManagement/event.model");
const Package = require("../../models/EventManagement/package.model");
const {errorHandler} = require("../../utils/error")
const nodemailer = require('nodemailer');
const fs = require('fs');

//get all events
const get_events = async(req, res, next) => {

    try{
        const data = await Event.find();
        if(data){
            res.json({success : true, data: data});
        } else {
            res.json({ success: false, message: "No data avaliable"});
        }

    }catch(error){
        next(error);
    }
}

//update events by id
const eventStatusById = async (req, res, next) => {
    const eventId = req.params.id;

    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { status: 'Approved'},
            { new: true} //to return the updated event
        );

        if (!updatedEvent) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }

        res.json({ success: true, data: updatedEvent });
    } catch (error) {
        next(error);
    }
};


//get events populating package id
// const get_eventsByPackage = async(req, res, next) => {

//     try{
//         const data = await Event.find().populate('package_id', 'pkg_category pkg_name price ');
//         if(data){
//             res.json({success : true, data: data});
//         } else {
//             res.json({ success: false, message: "No data avaliable"});
//         }
//     }catch(error){
//         next(error);
//     }
// };
const get_eventsByPackage = async (req, res, next) => {
    try {
      const { status } = req.query;
  
      let events;
      if (status) {
        events = await Event.find({ status }).populate('package_id', 'pkg_category pkg_name price');
      } else {
        events = await Event.find().populate('package_id', 'pkg_category pkg_name price');
      }
  
      if (events) {
        res.json({ success: true, data: events });
      } else {
        res.json({ success: false, message: "No data available" });
      }
    } catch (error) {
      next(error);
    }
  };

//get event details populating file
const get_file = async(req, res, next) => {
    try{
        const data = await Event.find().populate('file');
        if(data){
            res.json({success : true, data: data});
        } else {
            res.json({ success: false, message: "No data avaliable"});
        }
    }catch(error){
        next(error);
    }
};

//view Payment
const viewPayment = (req, res) => {
    const { file } = req.params;
    const filePath = path.join(__dirname, '..', 'uploads', 'EventManagement', file);
  
    try {
      // Check if the file exists
      if (fs.existsSync(filePath)) {
        // Read the file and send it as a response
        res.sendFile(filePath);
      } else {
        // If the file does not exist, send a 404 response
        res.status(404).send("File not found");
      }
    } catch (error) {
      // If an error occurs, send a 500 response
      console.error("Error reading file:", error);
      res.status(500).send("Internal Server Error");
    }
  };

//create data
const create_event = async(req, res, next) => {
    try{
        const { cus_name, cus_contact, date, package_id, venue, additional, status} = req.body;
        const { filename: file } = req.file;
        // // Check if a file was uploaded
        // if (!req.file) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "File is required."
        //     });
        // }

        // const { filename: file } = req.file;

        // Check if the date is null or undefined
        if (!date) {
            return res.status(400).json({
                success: false,
                message: "Date is required."
            });
        }

        //checking if the booking date is already booked
        const existingEvent = await Event.findOne({date}); 
        if(existingEvent){
            return res.status(400).json({
                success: false,
                message: "This date is already booked."
            });
        }
        
        const newEvent = new Event({
            cus_name,
            cus_contact,
            date,
            venue,
            additional,
            file,
            status,
            package_id
        }); 

        await newEvent.save();

        res.status(201).json({
            success: true,
            message: "Event booking successful",
            data: newEvent
        });
        
    }catch(error){
        console.error("Error booking event: ", error)
        next(error);
    }
}

//geteventByID 
const getEventByID = async(req, res, next) => {
    const eventId = req.params.id;

    try{
        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        res.json(event);

    }catch(error){
        console.error("Error fetching event: ", error);
        next(error);
    }
}

//get packages by category
const get_packagesByCategory = async (req, res) => {
    try {
        // Extract the category from the request query parameters
        const category = req.body.pkg_category;

        // Use the category to filter packages
        const packages = await Package.find({ pkg_category: category });

        // Send the filtered packages as the response
        res.json(packages);
    } catch (error) {
        // Handle any errors that occur during the database operation
        res.status(500).json({ message: error.message });
    }
}

//update data
const update_event = async(req, res, next) => {
    console.log(req.body)
    const{_id, ...rest} = req.body
    console.log(rest)
    try{
        const data = await Event.updateOne({_id : _id}, rest)
        const existingEvent = await Event.findOne        
        ({date}); 
        if(existingEvent){
            return res.status(400).json({
                success: false,
                message: "This date is already booked."
            });
        }
        if(res.status(201)){
            res.send({success:true, message: "Event updated successfully", data: data})
        }
    }catch(error){
        next(error);
        console.log("error!")
    }
}

//delete data
const delete_event = async(req, res, next) => {
    const id = req.params.id;

    try{
        const data = await Event.deleteOne({ _id: id});
        if(data.deletedCount > 0){
            res.json({ success: true, message: "Event deleted successfully", data: data });
        }else {
            res.json({ success: false, message: "Event not found"});
        }
    }catch (error){
        next(error);
    }
}

//sending email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kandyan.info@gmail.com',
        pass: 'ukle odkn trba qhuh'
    },
});

const send_email = async(req, res, next) => {
    const { subject, text} = req.body;

    try {
        const mailOptions = {
            from: {
                name: "Kandyan Studio - Event Management",
                address: 'kandyan.info@gmail.com',
            },
            to: 'dilmipunsara2@gmail.com',
            subject,
            text
        };
        await transporter.sendMail(mailOptions);
        res.send({ success: true, message: "Email sent successfully" });
        
    } catch (error) {
        console.error("Error sending email: ", error);
        next(error);
        res.status(500).json({ success: false, message: "Failed to send email" });
        
    }
}

module.exports = { get_events,get_file, eventStatusById, get_eventsByPackage, viewPayment, get_packagesByCategory, create_event, getEventByID, update_event, delete_event, send_email};