var mongo = require('mongodb');
var config = require('../config');
var dumpScheduler = require('../sched/DumpScheduler');

var MongoClient = mongo.MongoClient;

exports.putSchedule = function(schedule) {

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      var update = {$set: {
        env: schedule.env,
        cron: schedule.cron
      }};

      db.db(config.dbName).collection(config.collections.schedules).updateOne({}, update, function(err, res) {

        db.close();

        dumpScheduler.reschedule({env: schedule.env, cron: schedule.cron});

        success(schedule);

      });
    });
  });

}
