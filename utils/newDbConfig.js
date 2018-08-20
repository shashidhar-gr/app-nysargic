var mongoose = require('mongoose');

var state = {
    db: null,
}

/** 
Database to connect.
**/
const dbname = 'growforus';

exports.connect = function (url) {

    return new Promise(function(resolve, reject) {
        if (state.db) return resolve()

        mongoose.connect(url, { useNewUrlParser: true })
        mongoose.connection
        .then(function(dbObject) {
            state.db = dbObject
            resolve()
        })
        .catch(function(err) {
            reject(err);
        });

    });
}

exports.get = function () {
    return state.db
}

exports.close = function (done) {
    if (state.db) {
        state.db.close(function (err, result) {
            state.db = null
            state.mode = null
            done(err)
        })
    }
}


// mongoose.connect('mongodb+srv://growforus_dev_db:24XjILY2jAz4CgmW@cluster0-ebbj4.mongodb.net/growforus?retryWrites=true');

// var db = mongoose.connection;
// // db.on('error', console.error.bind(console, 'connection error:'));
// // db.once('open', function() {
// //   console.log("Hey there!!");
// // });


// mongoose.connection.then(function(conn) {
//     console.log("Connection established");
// }).catch(function() {
//     console.log("Connection not established");
// });