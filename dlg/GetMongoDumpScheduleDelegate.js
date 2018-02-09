var mongo = require('mongodb');
var config = require('../config');

var MongoClient = mongo.MongoClient;

exports.getSchedule = function(schedule) {

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      db.db(config.dbName).collection(config.collections.schedules).find({}).toArray(function(err, array) {

        db.close();

        success(array != null && array.length > 0 ? array[0] : null);

      });
    });
  });

}
