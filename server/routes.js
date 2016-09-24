var ESPDB = require('./db.js');

module.exports = {
    setRoutes: function (app) {
        app.get('/', function (request, response) {
            response.send('Hello World!');
        });

        app.get('/campaign', function (request, response) {
            response.send(ESPDB.findCampaign());
        });

        app.get('/campaign/create', function (request, response) {
            ESPDB.createCampaign();
        });
    }
};