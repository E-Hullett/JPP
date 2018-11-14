var express = require('express');
var Cities = require('../models/cities');

//Handles HTTP stuff
var router = express.Router();


//Methods don't overlap[ despite being on the same path because of the different types of methods used (get, post)
//Callback (second parameter), takes request and response. Uses city model passing another callback
router.get('/', (req, res) => {
    Cities.retrieveAll((err, cities) => {
        if(err)
            return res.json(err);
        return res.json(cities);
    });
});

router.post('/', (req, res) => {
    var city = req.body.city;

    Cities.insert(city, (err, result) => {
        if (err)
            return res.json(err);
        return res.json(result);
    });
});

module.exports = router;