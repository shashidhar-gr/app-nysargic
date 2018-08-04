const express = require('express')
const app = express()
const Datastore = require('@google-cloud/datastore');
//app.get('/', (req, res) => res.send('Hello World Nysargic!'))
app.get('/', function(req, res) {

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
app.listen(8080, () => console.log('Example app listening on port 8080!'))

