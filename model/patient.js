const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    pAadharNumber:{
        type: Number,
        required: [true, 'You can\'t skip this field']
    },
    pname:String,
    pEMailId:String,
    pGender:String,
    pAge:Number,
    pCustomerId:Number
});

module.exports = mongoose.model('Patient', patientSchema);