require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

//connect the mongo server 
// naming the DB as hospitalDetailsDB
mongoose.connect( process.env.DATABASE_URL, { useNewUrlParser : true});
const db=mongoose.connection;
db.once('open', function(){
    console.log('Connected to the Database');
})

const newCaseRoute = require('./routes/createNewCase');
app.use('/createNewCase', newCaseRoute);

const doctorDetails = require('./routes/doctorsDetails');
app.use('/doctorsDetails', doctorDetails);

const getPatientList = require('./routes/getPatientList');
app.use('/getPatientList', getPatientList);

// calling server
app.listen( 3000, function(){
    console.log(" Server actively running on port 3000");
})