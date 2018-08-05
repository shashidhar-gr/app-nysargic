var db = require('../utils/dbConfig');
var User = require('../models/User').User;

exports.register = function (userObj) {
    //Using users collection.
    const collection = db.get().collection('users');

    return new Promise(function (resolve, reject) {

        //Creating user object.
        var user = new User('','', userObj.username);

        //Searching emailid or phone in the collection first to avoid duplicate entries.
        collection.find({ "username": user.username }).toArray()
            .then(function (users) {

                if (users.length > 0) {
                    console.log("username already exists.");
                    reject(
                        {
                            "err": "",
                            "message": "username already exists."
                        });
                }
                else {
                    // Inserting user.
                    collection.insert([
                        user
                    ], function (err, result) {
                        resolve({
                            "message": result
                        });
                    });
                }
            })
            .catch(function (err) {
                console.log(err);
                reject(
                    {
                        "err": err,
                        "message": "something went wrong."
                    });
            });
    });
}