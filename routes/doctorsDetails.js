const express = require('express');
const router = express.Router();

//const Patient = require('../model/patient');
const Doctor = require('../model/doctor');
const Case = require('../model/cases');

router.get('/', async function(req, res){

    const doctors = await Doctor.find();
    const data= await Promise.all(
        doctors.map( async function(doctor){
            const getCaseDetail = await Case.find({doctorID: doctor.dIdNumber});
            var tmp = new Array();
            tmp.push(doctor);
            tmp = tmp.concat(getCaseDetail);
            return tmp;
        })
    )
    return res.json(data);
})

module.exports = router;