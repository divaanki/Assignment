const mongoose = require('mongoose');

const caselogSchema = new mongoose.Schema({
    patientID:{
        type: Number,
        required: [true, 'Data not found']
    },
    doctorID: Number,
    description:{
        type: String
    }
})

module.exports = mongoose.model('Case', caselogSchema);