var express = require('express');
var router = express.Router();
var db = require('../utils/dbConfig');

//Controlelrs.
var Registration = require('./Registration');

router.get('/', function (req, res, next) {
    res.send('Hello there!!');
});

router.post('/registration', function (req, res, next) {

    Registration.register(req.body)
        .then(function (user) {
            res.status(200).json({ "success": true, "message": user.message });
        })
        .catch(function (err) {
            res.status(500).json({ "success": false, "message": err.message });
        });
});

router.post('/login', function (req, res, next) {
    res.send('User Login');
});

module.exports = router;
