var express = require('express');
var router = express.Router();

//Controlelrs.
var Test = require('./Test');

router.get('/:testId', function (req, res, next) {
    Test.get(req.params)
        .then(function (user) {
            res.status(200).json({ "success": true, "message": user.message });
        })
        .catch(function (err) {
            res.status(500).json({ "success": false, "message": err.message });
        });
});

router.post('/', function (req, res) {
    Test.create(req.body)
        .then(function (user) {
            res.status(200).json({ "success": true, "message": user.message });
        })
        .catch(function (err) {
            res.status(500).json({ "success": false, "message": err.message });
        });
});

router.post('/attend', function (req, res) {
    Test.attend(req.body)
        .then(function (user) {
            res.status(200).json({ "success": true, "message": user.message });
        })
        .catch(function (err) {
            res.status(500).json({ "success": false, "message": err.message });
        });
});

module.exports = router;