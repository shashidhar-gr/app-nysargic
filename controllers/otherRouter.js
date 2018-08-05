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
            res.send(200, { "success": true, "message": user.message });
        })
        .catch(function (err) {
            res.json(500, { "success": false, "message": err.message });
        });
});

router.post('/login', function (req, res, next) {
    res.send('User Login');
});

module.exports = router;
