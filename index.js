var express = require('express');
var Promise = require('promise');
var bodyParser = require("body-parser");
var logger = require('toto-apimon-events')

var putMongoDumpScheduleDlg = require('./dlg/PutMongoDumpScheduleDelegate');
var initMongoDumpScheduleDlg = require('./dlg/InitMongoDumpScheduleDelegate');
var dumpScheduler = require('./sched/DumpScheduler');

var apiName = 'mongo-dump-scheduler';

var app = express();

initMongoDumpScheduleDlg.init();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, GoogleIdToken");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  next();
});
app.use(bodyParser.json());
app.use(express.static('/app'));

app.get('/', function(req, res) {res.send({api: apiName, status: 'running'});});
app.put('/schedule', function(req, res) {
  logger.apiCalled(apiName, '/schedule', 'PUT', req.query, req.params, req.body);
  putMongoDumpScheduleDlg.putSchedule(req.body).then(function(result) {
    res.status(200).send(result);
  }, (error) => {
    res.status(500).send({error: error});
  });
});

app.listen(8080, function() {
  console.log('Mongo Dump Scheduler Microservice up and running');
});
