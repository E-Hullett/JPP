//TODO Add userid column, find out a way to test userid and email in the same query

var express = require('express');
var Users = require('../models/users');

//Handles HTTP stuff
var router = express.Router();

//Methods don't overlap[ despite being on the same path because of the different types of methods used (get, post)
//Callback (second parameter), takes request and response. Uses city model passing another callback
router.post('/login', (req, res) => {
    //console.log(email);
    //console.log("Request made")
    Users.retrieveViaEmail(req.body, (err, result) => {
        if(err) return res.json(err);
        //Authenticate the user and create a response to be returned to the client
        //Return crafted response to the client
        return res.json(result);
    });
});

router.post('/register', (req, res) => {
    //Hash pasword
    //Insert register request in the database
    Users.insert(req.body, (err, result) => {
        if(err) return res.json(err);
        return(res.json(result))
    });
});

router.post('/dataFormCheck', (req, res) => {
    Users.dataFormRetrieveViaUserID(req.body, (err, result) => {
        if(err) return res.json(err);
        return(res.json(result))
    });
});

router.post('/dataFormSubmit', (req, res) => {
    //Check if the user has already entered data (to update the old data or insert new data)
    //Set lowest level passed object to a variable
    let sentData = req.body.dataSubmit;
    //console.log(`Sent data: ${sentData}`)
    if(sentData.alreadyEnteredData){
        Users.dataFormUpdate(sentData, (err, result) => {
            if (err) return res.json(err);
            return (res.json(result))
        });
    }else{
        Users.dataFormInsert(sentData, (err, result) => {
            if (err) return res.json(err);
            return (res.json(result))
        });
    }
});
router.post('/retrieveAppointments', (req, res) => {
    console.log("Retrieve the appointments")
    Users.retrieveAppointments(req.body.currentLogin, (err, result) => {
        if (err) return res.json(err);
        return (res.json(result))
    });
});




module.exports = router;