const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    dIdNumber:{
        type: Number,
        required: [true, 'This is a mandatory field']
    },
    dName:String,
    dEMailId:String,
    dStatus:String,
    dCaseCount:Number
})

module.exports = mongoose.model('Doctor', doctorSchema);