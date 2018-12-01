var express = require('express');
var Users = require('../models/login');

//Handles HTTP stuff
var router = express.Router();

//Methods don't overlap[ despite being on the same path because of the different types of methods used (get, post)
//Callback (second parameter), takes request and response. Uses city model passing another callback
router.get('/login', (req, res) => {
    console.log("awdawdwda")
    Users.retrieveAll((err, loginDetails) => {
        if(err)
            return res.json(err);
        return res.json(loginDetails);
    });
});


router.post('/', (req, res) => {
    var city = req.body.city;

    Users.insert(userid, (err, result) => {
        if (err)
            return res.json(err);
        return res.json(result);
    });
});

module.exports = router;