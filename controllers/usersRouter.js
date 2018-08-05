var express = require('express');
var router = express.Router();
var db = require('../utils/dbConfig');

router.get('/', function(req, res, next) {
    res.send('Succesfuly listed users');
});

router.post('/', function(req, res) {
    // Your Google Cloud Platform project ID
    const projectId = 'app-nysargic';

    // Creates a client
    const datastore = new Datastore({
    projectId: projectId,
    });

    // The kind for the new entity
    const kind = 'Task';
    // The name/ID for the new entity
    const name = 'sampletask1';
    // The Cloud Datastore key for the new entity
    const taskKey = datastore.key([kind, name]);

    // Prepares the new entity
    const task = {
    key: taskKey,
    data: {
        description: 'Buy milk',
    },
    };

    // Saves the entity
    datastore
    .save(task)
    .then(() => {
        res.send(`Saved ${task.key.name}: ${task.data.description}`);
    })
    .catch(err => {
        res.send('ERROR:', err);
    });
});

router.put('/', function(req, res) {

});

router.delete('/', function(req, res) {

});

module.exports = router;

