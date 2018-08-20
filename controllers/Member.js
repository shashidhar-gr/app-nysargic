const Datastore = require('@google-cloud/datastore');
var uniqid = require('uniqid');

exports.add = function (userObj) {

    return new Promise(function (resolve, reject) {
        // Your Google Cloud Platform project ID
        const projectId = 'app-nysargic';

        // Creates a client
        const datastore = new Datastore({
            projectId: projectId,
        });

        // The kind for the new entity
        const kind = 'User';

        // The Cloud Datastore key for the new entity
        const taskKey = datastore.key([kind]);
        const query = datastore
            .createQuery('User')
            .filter('mobile', '=', userObj.userid);

        datastore.runQuery(query)
            .then(results => {
                const users = results[0];

                if (users.length > 0) {

                    const member = {
                        'memberid': uniqid(),
                        'username': userObj.username,
                        'nickName': userObj.nickName,
                        'dob': userObj.dob,
                        'gender': userObj.gender
                    }

                    const user = users[0];
                    const taskKey = datastore.key([kind, user.mobile]);
                    user.members.push(member);

                    const entity = {
                        key: taskKey,
                        data: user
                    }

                    datastore.update(entity)
                        .then(result => {
                            resolve({
                                "message": result
                            });
                        })
                        .catch(err => {
                            reject({
                                "err": "",
                                "message": "Internal server error."
                            });
                        });
                }
                else {
                    console.log(err);
                    reject({
                        "err": "",
                        "message": "Userid not registered."
                    });
                }
            })
            .catch(err => {
                console.log(err);
                reject({
                    "err": err,
                    "message": "Internal server error"
                });
            });
    });
}

exports.update = function(userObj) {
    return new Promise(function(resolve, reject){
        // Your Google Cloud Platform project ID
        const projectId = 'app-nysargic';

        // Creates a client
        const datastore = new Datastore({
            projectId: projectId,
        });

        // The kind for the new entity
        const kind = 'User';

        // The Cloud Datastore key for the new entity
        const taskKey = datastore.key([kind]);
        const query = datastore
            .createQuery('User')
            .filter('mobile', '=', userObj.userid);

        datastore.runQuery(query)
        .then(results => {
            const users = results[0];

            if (users.length > 0) {

                const member = {
                    'memberid': userObj.memberid,
                    'username': userObj.username,
                    'nickName': userObj.nickName,
                    'dob': userObj.dob,
                    'gender': userObj.gender
                }

                const user = users[0];
                const taskKey = datastore.key([kind, user.mobile]);

                user.members.forEach(function(member, index, members) {

                    if(member.memberid === userObj.memberid) {
                        member.username = userObj.username,
                        member.nickName = userObj.nickName,
                        member.dob = userObj.dob,
                        member.gender = userObj.gender

                        user.members[index] = member;
                    }
                });

                const entity = {
                    key: taskKey,
                    data: user
                }

                datastore.update(entity)
                    .then(result => {
                        resolve({
                            "message": result
                        });
                    })
                    .catch(err => {
                        reject({
                            "err": "",
                            "message": "Internal server error."
                        });
                    });
            }
            else {
                reject({
                    "err": "",
                    "message": "Userid not registered."
                });
            }
        })
        .catch(err => {
            console.log(err);
            reject({
                "err": err,
                "message": "Internal server error"
            });
        });
    });
}

exports.remove = function(userObj) {
    return new Promise(function(resolve, reject){
        // Your Google Cloud Platform project ID
        const projectId = 'app-nysargic';

        // Creates a client
        const datastore = new Datastore({
            projectId: projectId,
        });

        // The kind for the new entity
        const kind = 'User';

        // The Cloud Datastore key for the new entity
        const taskKey = datastore.key([kind]);
        const query = datastore
            .createQuery('User')
            .filter('mobile', '=', userObj.userid);

        datastore.runQuery(query)
        .then(results => {
            const users = results[0];

            if (users.length > 0) {

                const user = users[0];
                const taskKey = datastore.key([kind, user.mobile]);

                let newMembers = [];
                user.members.forEach(function(member, index, members) {
                    if(member.memberid !== userObj.memberid) {
                        newMembers.push(member);
                    }
                });
                
                user.members = newMembers;

                const entity = {
                    key: taskKey,
                    data: user
                }

                datastore.update(entity)
                    .then(result => {
                        resolve({
                            "message": result
                        });
                    })
                    .catch(err => {
                        reject({
                            "err": "",
                            "message": "Internal server error."
                        });
                    });
            }
            else {
                reject({
                    "err": "",
                    "message": "Userid not registered."
                });
            }
        })
        .catch(err => {
            console.log(err);
            reject({
                "err": err,
                "message": "Internal server error"
            });
        });
    });
}
