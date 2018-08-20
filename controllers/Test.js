const Datastore = require('@google-cloud/datastore');
var uniqid = require('uniqid');

exports.create = function(testObj) {
    return new Promise(function (resolve, reject) {
        // Your Google Cloud Platform project ID
        const projectId = 'app-nysargic';

        // Creates a client
        const datastore = new Datastore({
            projectId: projectId,
        });

        // The kind for the new entity
        const kind = 'Test';

        // The Cloud Datastore key for the new entity
        const testKey = datastore.key([kind]);

        const test = {
            "testId": uniqid(),
            "testType": "",
            "testType": "AgniBala",
            "description": "AgniBala assesment",
            "questions": [
                {
                    "questionId": uniqid(),
                    "questionNumber": "01",
                    "questionText": "What option describes best your ability to digest food?",
                    "answers": [
                        {
                            "answerId": uniqid(),
                            "answerNumber": "01",
                            "answerText": "I am unable to digest even small quantities of food"
                        },
                        {
                            "answerId": uniqid(),
                            "answerNumber": "02",
                            "answerText": "My ability to digest food keeps varying. Sometimes I am able to digest and other times I am not"
                        },
                        {
                            "answerId": uniqid(),
                            "answerNumber": "03",
                            "answerText": "I am able to digest almost all sorts of food items when consumed in appropriate quantity"
                        },
                        {
                            "answerId": uniqid(),
                            "answerNumber": "04",
                            "answerText": "I am able to digest almost all food items very easily, even in large quantities"
                        }
                    ]
                },
                {
                    "questionId": uniqid(),
                    "questionNumber": "02",
                    "questionText": "What time do you need to feel like eating again, after having your meal?",
                    "answers": [
                        {
                            "answerId": uniqid(),
                            "answerNumber": "01",
                            "answerText": "I feel like eating only after about 8 hours of having my meal"
                        },
                        {
                            "answerId": uniqid(),
                            "answerNumber": "02",
                            "answerText": "Not consistent, keeps varying"
                        },
                        {
                            "answerId": uniqid(),
                            "answerNumber": "03",
                            "answerText": "I feel like eating 6-8 hours after having my meal"
                        },
                        {
                            "answerId": uniqid(),
                            "answerNumber": "04",
                            "answerText": "I feel like eating before 6 hours of having meal"
                        }
                    ]
                },
                {
                    "questionId": uniqid(),
                    "questionNumber": "03",
                    "questionText": "What effects do you observe in your digestion due to disturbances in your lifestyle? (eg, irregular eating habits, disturbed sleeping pattern, emotional disturbances, etc)",
                    "answers": [
                        {
                            "answerId": uniqid(),
                            "answerNumber": "01",
                            "answerText": "Digestion gets disturbed due to slight variation in lifestyle"
                        },
                        {
                            "answerId": uniqid(),
                            "answerNumber": "02",
                            "answerText": "Digestion gets disturbed due to appreciable disturbances in lifestyle"
                        },
                        {
                            "answerId": uniqid(),
                            "answerNumber": "03",
                            "answerText": "Digestion is not affected much due to disturbances in lifestyle"
                        },
                        {
                            "answerId": uniqid(),
                            "answerNumber": "04",
                            "answerText": "Process of digestion gets initially disturbed; however, later gets adapted to variations in lifestyle"
                        }
                    ]
                },
                {
                    "questionId": uniqid(),
                    "questionNumber": "04",
                    "questionText": "How frequently do you have your meals in a day?",
                    "answers": [
                        {
                            "answerId": uniqid(),
                            "answerNumber": "01",
                            "answerText": "I have <2 meals per day"
                        },
                        {
                            "answerId": uniqid(),
                            "answerNumber": "02",
                            "answerText": "My frequency of having meals varies between 1 and 4"
                        },
                        {
                            "answerId": uniqid(),
                            "answerNumber": "03",
                            "answerText": "I usually have 2 to 3 meals per day"
                        },
                        {
                            "answerId": uniqid(),
                            "answerNumber": "04",
                            "answerText": "I almost always have >3 meals per day"
                        }
                    ]
                }
            ]
        }

        const entity = {
            key: testKey,
            data: test
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

    });
}

exports.attend = function(userObj) {

    return new Promise(function (resolve, reject) {
        // Your Google Cloud Platform project ID
        const projectId = 'app-nysargic';

        // Creates a client
        const datastore = new Datastore({
            projectId: projectId,
        });

        // The kind for the new entity
        const kind = 'TestDetails';

        let entities = [];

        userObj.testDetails.forEach(function(testData, index, testDetails) {
            
            let entity = {
                "key": datastore.key([kind, userObj.testId+''+testData.userId]),
                "data": {
                    "testId": userObj.testId,
                    "userId": testData.userId,
		            "answers": testData.answers
                }
            }

            entities.push(entity);
        })

        datastore.upsert(entities)
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
    });
}