var ForerunnerDB = require("forerunnerdb");
var fdb = new ForerunnerDB();

var db, campaign, advert;

module.exports = {
    connect: function () {
        db = fdb.db("esp");
        campaign = db.collection("campaign");
        advert = db.collection("advert");
    },

    createCampaign: function () {
        campaign.insert({
            startDate       : fdb.make(new Date()),
            endDate         : fdb.make(new Date()),
            visiblePeriod   : fdb.make(new Date()),
            secondsRunning  : 0,
            impressions     : 0,
            clicks          : 0,
            remainingBudget : 0
        });
    },

    createAdvert: function(){
        advert.insert({
            campaign        : '',
            impressions     : 0,
            clicks          : 0,
            imageSizeWidth  : 0,
            imageSizeHeight : 0,
            image           : '',
            text            : ''
        });
    },

    findCampaign: function(){
        return campaign.find();
    }

};