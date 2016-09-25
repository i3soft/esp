var ForerunnerDB = require("forerunnerdb");
var fdb = new ForerunnerDB();

var db, campaign, advert;

module.exports = {
    connect: function () {
        db = fdb.db("esp");
        campaign = db.collection("campaign");
        advert = db.collection("advert");
    },

    createCampaign: function (params, callback) {
        campaign.insert({
            startDate: fdb.make(new Date()),
            endDate: fdb.make(new Date()),
            visiblePeriod: fdb.make(new Date()),
            secondsRunning: 0,
            impressions: 0,
            clicks: 0,
            remainingBudget: 0
        }, function () {
            if (callback) callback();
        });
    },

    createAdvert: function (params) {
        advert.insert({
            campaignId: params.campaignId || '',
            impressions: params.impressions || 0,
            clicks: params.clicks || 0,
            imageSizeWidth: params.imageSizeWidth || 0,
            imageSizeHeight: params.imageSizeHeight || 0,
            image: params.image || '',
            text: params.text || ''
        });
    },

    findAllCampaigns: function () {
        return campaign.find();
    },

    getAdverts: function (campaignId) {
        return advert.find({
            campaignId: {
                "$eeq": campaignId
            }
        });
    },

    spoofData: function () {
        this.createCampaign();
        var campaignId = this.findAllCampaigns()[0]._id;
        console.log(campaignId);
        this.createAdvert({campaignId: campaignId});
        this.createAdvert({campaignId: campaignId});
    }
};