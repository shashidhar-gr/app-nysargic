var MongoClient = require('mongodb').MongoClient

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

        MongoClient.connect(url, { useNewUrlParser: true })
        .then(function(dbObject) {
            state.db = dbObject.db(dbname);
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