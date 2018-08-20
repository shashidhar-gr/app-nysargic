const Datastore = require('@google-cloud/datastore');

exports.login = function (userObj) {
    return new Promise(function (resolve, reject) {
        // Your Google Cloud Platform project ID
        const projectId = 'app-nysargic';

        // Creates a client
        const datastore = new Datastore({
            projectId: projectId,
        });

        const query = datastore
            .createQuery('User')
            .filter('mobile', '=', userObj.mobile);

        datastore.runQuery(query)
            .then(results => {
                const users = results[0];

                if (users.length > 0) {
                    reject({
                        "err": "",
                        "message": "Mobile number is already registered."
                    });
                }
                else {
                    const user = {
                        'username': userObj.username,
                        'mobile': userObj.mobile,
                        'email': userObj.email
                    }

                    const entity = {
                        key: taskKey,
                        data: user
                    }

                    datastore.insert(entity)
                        .then(result => {
                            resolve({
                                "message": result
                            });
                        })
                        .catch(err => {
                            reject({
                                "err": err,
                                "message": "Internal server error"
                            });
                        });
                }
            })
            .catch(err => {
                reject({
                    "err": err,
                    "message": "Internal server error"
                });
            });
    });
}