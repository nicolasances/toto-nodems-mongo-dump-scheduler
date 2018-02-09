console.log("Dump Scheduler module started");

var schedule = require('node-schedule');
var getMongoDumpScheduleDlg = require('../dlg/GetMongoDumpScheduleDelegate');

var dumpSchedule = null;
var env = null;

/**
 * Sets a schedule.
 * The schedule data must be in the following format:
 * {env: string, cron: string}
 */
var setSchedule = function(scheduleData) {

  if (scheduleData == null || scheduleData.env == null || scheduleData.env == '' || scheduleData.cron == null) return;

  env = scheduleData.env;

  if (dumpSchedule != null) dumpSchedule.cancel();

  dumpSchedule = schedule.scheduleJob(scheduleData.cron, function() {

    console.log('Dump Schedule executing');

  });
}

// Start the scheduler
getMongoDumpScheduleDlg.getSchedule().then(function(s) {

  setSchedule(s);

});

/**
 * Reschedules the mongo dump
 * The schedule data must be in the following format:
 * {env: string, cron: string}
 */
exports.reschedule = function(scheduleData) {

  setSchedule(scheduleData);

}
