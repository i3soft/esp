var EspWidget = {

    elem: '',
    _attrs: {},
    _url: '',

    timer: '',
    _timeRunning: 0,

    init: function (id) {
        EspWidget.elem = $("#" + id);
        EspService._setWidgetAttrs(EspWidget.elem);
        EspService.injectHTML(function () {
            EspWidget.startTimer();
            EspWidget.cycleThroughAds();
            EspWidget.logImpression();
        });
    },

    startTimer: function () {
        EspWidget.timer = setInterval(function () {
            EspWidget.incrementTimer();
        }, 1000);
    },

    incrementTimer: function () {
        EspWidget._timeRunning += 1;
        if (EspWidget._timeRunning % 20 == 0) {
            var campaignId = EspService._getCampaignId();
            EspService.postAdData(campaignId, null, {secondsRunning: EspWidget._timeRunning});

            EspWidget._timeRunning = 0;
        }
    },

    clickAd: function (advertId, meta) {
        var campaignId = EspService._getCampaignId();
        EspService.postAdData(campaignId, advertId, meta);
    },

    logImpression: function () {
        var campaignId = EspService._getCampaignId();
        EspService.postAdData(campaignId, null, {logImpression: 1});
    },

    cycleThroughAds: function () {
        var divs = $('div[id^="content-"]').hide();
        var i = 0;

        (function cycle() {
            divs.eq(i)
                .fadeIn(400)
                .delay(EspService._getAdSpeed())
                .fadeOut(400, cycle);
            i = ++i % divs.length;
        })();
    }

};

var EspService = {

    injectHTML: function (callback) {
        $.ajax({
            type: "GET",
            url: EspWidget._url + '/widget/renderHTML',
            data: {
                "espUrl": EspWidget._url,
                "campaignId": EspService._getCampaignId()
            },
            success: function (result) {
                EspWidget.elem.html(result);
                if (callback) callback()
            }
        });
    },

    postAdData: function (campaignId, advertId, meta) {
        if (!meta) meta = {};
        if (campaignId) meta.campaignId = campaignId;
        if (advertId) meta.advertId = advertId;

        $.ajax({
            type: "GET",
            url: EspWidget._url + '/widget/postAdData',
            data: meta,
            success: function (result) {

            }
        });
    },

    /**
     * ESP widget attribute getters and setters
     */

    _getCampaignId: function () {
        var campaignId = EspWidget._attrs["esp-campaign-id"];
        if (!campaignId) console.error("ESP: No campaign ID set!");
        return EspWidget._attrs["esp-campaign-id"];
    },

    _getAdSpeed: function () {
        return parseFloat(EspWidget._attrs["esp-ad-speed"]) || 1000;
    },

    _setWidgetAttrs: function (elem) {
        $(elem).each(function () {
            $.each(this.attributes, function () {
                if (this.specified && this.name.startsWith("esp")) {
                    EspWidget._attrs[this.name] = this.value;
                }
            });
        });
    }
};