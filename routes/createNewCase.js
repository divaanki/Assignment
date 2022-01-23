const express = require('express');
const router = express.Router();

const Patient = require('../model/patient');
const Doctor = require('../model/doctor');
const Case = require('../model/cases');

router.post('/', async function(req, res){

    console.log('Patient registered')
    console.log(req.body.pAadharNumber);
    // check for existance of the patient
    var checkPatientId = req.body.pAadharNumber;
    //var present = false;
    const newPatient = await Patient.find({ pAadharNumber: checkPatientId});
    console.log(newPatient);
    if( newPatient.length == 0)
    {
        var patient = new Patient({

            pAadharNumber: req.body.pAadharNumber,
            pname: req.body.pName,
            pEMailId: req.body.pEMailId,
            pGender: req.body.pGender,
            pAge: req.body.pAge,
            pCustomerId: req.body.pAadharNumber
            })
        console.log(patient);
        patient.save();
    }
    //creating caselog
    // assigning doctor to new patient logged
    var doctorAssigned, tmpCount=-1;
    Doctor.find(async function(err, doctors){
        if(err){
            res.send(err);
            //res.json(err);
        }
        else
            {
                // console.log(doctors);
                doctors.forEach( function(doctor){
                    //console.log(doctor);
                    console.log('---------------------------');
                    if( tmpCount==-1 || doctor.dCaseCount<tmpCount)
                    {
                        tmpCount=doctor.dCaseCount;
                        doctorAssigned=doctor.dIdNumber;
                    }   
                })
                Doctor.updateOne({ dIdNumber:doctorAssigned}, {dCaseCount: tmpCount+1}, function(err){
                    if(err)
                        console.log(err);
                })
                const caseRegistered = new Case({

                    patientID: checkPatientId,
                    doctorID: doctorAssigned,
                    description:'This is the description of illness'
                });
                await caseRegistered.save();
                console.log(caseRegistered);
            }    
    }).clone();
})

module.exports = router;