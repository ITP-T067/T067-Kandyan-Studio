const StudioStatus = require("../../models/projectManagement/studioStatus.model.js") 

const index_studioStatus = async(req,res, next) => {

    try{
        const data = await StudioStatus.find({});
        if(res.status(201)){
            res.json({success : true , data: data})
        }
    }catch(error){
        next(error);
    }
}

//create data
const create_studioStatus = async(req,res, next) => {
    const { Studio_Status } = req.body;
    const Date_Updated = new Date();

    try {
        // Check if a studio status already exists
        const existingStatus = await StudioStatus.findOne({});
        
        if (existingStatus) {
            return res.status(400).json({
                success: false,
                message: "A studio status already exists. You cannot create more than one."
            });
        }

        const status = new StudioStatus({
            Studio_Status, 
            Date_Updated, 
        });

        await status.save();

        res.status(201).json({
            success: true,
            message: "Studio Status saved successfully",
            data: status
        });

    } catch(error) {
        next(error);
    }
}

//update data
const update_studioStatus = async (req, res, next) => {
    const { Studio_Status } = req.body;
    const Date_Updated = new Date();

    try {
        const updatedStatus = await StudioStatus.findOneAndUpdate({}, {
            Studio_Status,
            Date_Updated
        }, {
            new: true // Return the updated document
        });

        if (!updatedStatus) {
            return res.status(404).json({
                success: false,
                message: "Studio Status not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Studio Status updated successfully",
            data: updatedStatus
        });

    } catch (error) {
        next(error);
    }
}


module.exports = { index_studioStatus, create_studioStatus, update_studioStatus };
