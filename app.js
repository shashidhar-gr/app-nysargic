const express = require('express')
const app = express()

/**
 * Middlewares.
 **/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
* Controllers, Routers and other Config files.  
**/
const db = require('./utils/dbConfig');
const usersRouter = require('./controllers/usersRouter')
const otherRouter = require('./controllers/otherRouter');

/**
 * Routing rules.
**/
app.use('/', otherRouter);
app.use('/user', usersRouter);

/**
 * Database connectivity.
**/
var dataPromise = db.connect('mongodb+srv://growforus_dev_db:24XjILY2jAz4CgmW@cluster0-ebbj4.mongodb.net/growforus?retryWrites=true');
dataPromise.then(function(data) {
    app.listen(8080, () => console.log('Example app listening on port 8080!'))
})
.catch(function(err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
});


