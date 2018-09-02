var mongo = require('mongodb');
var config = require('../config');

var MongoClient = mongo.MongoClient;

exports.do = function() {

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      db.db(config.dbName).collection(config.collections.schedules).find({}).toArray(function(err, array) {

        db.close();

        var result = [];

        for (var i = 0; i < array.length; i++) {
          result.push(array[i]);
        }

        success(result);

      });
    });
  });

}
