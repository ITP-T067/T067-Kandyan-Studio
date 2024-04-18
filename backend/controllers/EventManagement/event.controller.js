const Event = require("../../models/EventManagement/event.model")
const {errorHandler} = require("../../utils/error")

//get all events
const get_events = async(req, res, next) => {

    try{
        const data = await Event.find({}).populate({
            path: 'Customer_ID' ,
            select: 'Customer_Name',
        });
        if(res.status(201)){
            res.json({success : true, data: data})
        }

    }catch(error){
        next(error);
    }
}

//create data
const create_event = async(req, res, next) => {
    try{
        const { Event_Category, Customer_Name, Contact_No, Date, Venue, Description, Payment_slip, Package_Name, Customer_ID } = req.body;

        //checking if the booking date is already booked
        const existingEvent = await Event.findOne({Date});
        if(existingEvent){
            return res.status(400).json({
                success: false,
                message: "This date is already booked."
            });
        }

        const newEvent = new Event({
            Event_Category,
            Customer_Name,
            Contact_No,
            Date,
            Venue,
            Description,
            Payment_slip,
            Package_Name,
            Customer_ID
        }); 

        await newEvent.save();

        res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: newEvent
        });
        
    }catch(error){
        console.log("errorrr")
        next(error);
    }
}

//geteventByID 
const getEventByID = async(req, res, next) => {
    const eventId = req.params.id;

    try{
        const Event = await Event.findById(eventId).populate({
            path: 'Event_ID'
        })

    }catch(error){
        next(error);
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

module.exports = { get_events, create_event, getEventByID, update_event, delete_event};