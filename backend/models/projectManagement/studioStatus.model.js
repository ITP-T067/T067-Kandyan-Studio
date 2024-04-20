const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const studioStatusSchema = new mongoose.Schema({ 

    Studio_Status: {  
        type: String,  
        required: true, 
    }, 
    
    Date_Updated: { 
        type: Date, 
        required: true, 
    }, 
    
    }) 
    
const StudioStatus = mongoose.model('StudioStatus', studioStatusSchema); 

module.exports = StudioStatus; 