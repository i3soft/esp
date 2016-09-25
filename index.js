var express = require('express');

//ESP libraries
var ESPRoutes = require('./server/routes.js');
var ESPDB = require('./server/db.js');

var app = express();

app.set('port', (process.env.PORT || 5000));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'))
});

//Bootstrap
ESPDB.connect();
ESPDB.spoofData();
ESPRoutes.setRoutes(app);