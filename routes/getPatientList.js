const express = require('express');
const router = express.Router();

const Patient = require('../model/patient');
// const Doctor = require('../model/doctor');
const Case = require('../model/cases');
// const patient = require('../model/patient');

router.get('/', async function(req, res){

    const patients = await Patient.find();
    const patientList = await Promise.all(
        patients.map( function(patient){
            return patient;
        })
    )
    return res.json(patientList);
})

router.get('/:id', async function(req, res){

    var data;
    const patient = await Patient.find({ pCustomerId: req.params.id});
    const patientHistory = await Case.find({ patientID: req.params.id});

    data= Object.assign(patient, patientHistory);
    return res.json(data);
})

module.exports = router;