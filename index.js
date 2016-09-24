var express = require('express');

//ESP libraries
var ESPRoutes = require('./server/routes.js');
var ESPDB = require('./server/db.js');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'))
});

//Bootstrap
ESPDB.connect();
ESPRoutes.setRoutes(app);