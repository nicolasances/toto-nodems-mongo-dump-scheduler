var Controller = require('toto-api-controller');

var putMongoDumpScheduleDlg = require('./dlg/PutMongoDumpScheduleDelegate');
var getMongoDumpSchedules = require('./dlg/GetMongoDumpSchedules');

var api = new Controller('mongo-dump-scheduler');

api.path('GET', '/schedules', (req, res) => {getMongoDumpSchedules})
api.path('PUT', '/schedule', (req, res) => {putMongoDumpScheduleDlg})

app.listen();
