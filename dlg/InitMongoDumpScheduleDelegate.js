var mongo = require('mongodb');
var config = require('../config');

var MongoClient = mongo.MongoClient;

exports.init = function() {

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      db.db(config.dbName).collection(config.collections.schedules).find().toArray(function(err, array) {

        if (array == null || array.length == 0) {

          db.db(config.dbName).collection(config.collections.schedules).insertOne({env: null, cron: '* * * * *'}, function(err, res) {

            db.close();
            success();
          });

        }
        else {
          db.close();
          success();
        }

      });
    });
  });

}
