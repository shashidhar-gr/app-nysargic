var express = require('express');
var router = express.Router();
var db = require('../utils/dbConfig');

//Controlelrs.
var Member = require('./Member');

router.get('/member', function (req, res, next) {
    res.send('Succesfuly listed users');
});

router.post('/member', function (req, res) {
    Member.add(req.body)
        .then(function (user) {
            res.status(200).json({ "success": true, "message": user.message });
        })
        .catch(function (err) {
            res.status(500).json({ "success": false, "message": err.message });
        });
});

router.put('/member', function (req, res) {
    Member.update(req.body)
        .then(function (user) {
            res.status(200).json({ "success": true, "message": user.message });
        })
        .catch(function (err) {
            res.status(500).json({ "success": false, "message": err.message });
        });
});

router.delete('/member', function (req, res) {
    Member.remove(req.body)
        .then(function (user) {
            res.status(200).json({ "success": true, "message": user.message });
        })
        .catch(function (err) {
            res.status(500).json({ "success": false, "message": err.message });
        });
});

module.exports = router;

