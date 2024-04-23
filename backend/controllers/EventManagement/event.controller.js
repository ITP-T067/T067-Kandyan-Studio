const Event = require("../../models/EventManagement/event.model");
const Package = require("../../models/EventManagement/package.model");
const {errorHandler} = require("../../utils/error")

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

//get events populating package id
const get_eventsByPackage = async(req, res, next) => {
    try{
        const data = await Event.find().populate('package_id', 'pkg_category pkg_name price');
        if(data){
            res.json({success : true, data: data});
        } else {
            res.json({ success: false, message: "No data avaliable"});
        }
    }catch(error){
        next(error);
    }
};

//create data
const create_event = async(req, res, next) => {
    try{
        const { cus_name, cus_contact, date, package_id, venue, additional } = req.body;
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
        const existingEvent = await Event.findOne        
        ({date}); 
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
            package_id
        }); 

        await newEvent.save();

        res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: newEvent
        });
        
    }catch(error){
        console.error("Error creating event: ", error)
        next(error);
    }
}

//geteventByID 
const getEventByID = async(req, res, next) => {
    const eventId = req.params.id;

    try{
        const event = await Event.findById(eventId).populate({
            path: 'Event_ID'
        })

    }catch(error){
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

module.exports = { get_events, get_eventsByPackage, get_packagesByCategory, create_event, getEventByID, update_event, delete_event};