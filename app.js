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
const db = require('./utils/newDbConfig');
const usersRouter = require('./controllers/usersRouter')
const otherRouter = require('./controllers/otherRouter');

/**
 * Routing rules.
**/
app.use('/', otherRouter);
app.use('/user', usersRouter);

app.listen(8080, () => console.log('Example app listening on port 8080!'))


