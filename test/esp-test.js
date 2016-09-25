var assert = require('assert');
var ESPDB = require('../server/db.js');


describe('DB tests', function () {

    before(function () {
        ESPDB.connect();
    });

    describe('#ESPDB', function () {
        it('Should return at least 1 campaign', function () {
            ESPDB.createCampaign();
            var allCampaigns = ESPDB.findAllCampaigns();
            assert.equal(1, allCampaigns.length);
        });

        it('Should return relevant adverts for campaign', function () {
            var campaignId = ESPDB.findAllCampaigns()[0]._id;

            ESPDB.createAdvert({campaignId: campaignId});
            var adverts = ESPDB.getAdverts(campaignId);

            assert.equal(campaignId, adverts[0].campaignId);
        });

    });
});