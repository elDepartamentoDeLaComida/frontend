"use strict";

var jFuncs = require("../jFuncs"),
    $ = require("jquery"),
    Backbone = require("backbone"),
    contentView = require("./content");
Backbone.$ = $;

module.exports = Backbone.View.extend({
    el: "body",
    ui: {
        $metaInfo: $(".metaInfo"),
        $menu: $(".menu"),
        $socialMedia: $(".socialMedia"),
        $circle: $(".selector"),
        $viewSection: $("#view section"),
        $nav: $("nav")
    },

    events: {
        "click .selector": "shiftUp",
        "webkitAnimationEnd oanimationend mozAnimationEnd animationend .selector":
            "startRotating",
        "click nav a": "pullView"
    },

    initialize: function () {
        jFuncs.fadeIn(this.ui.$metaInfo);
        jFuncs.fadeIn(this.ui.$menu);
        jFuncs.fadeIn(this.ui.$socialMedia);
    },
    shiftUp: jFuncs.shiftUp,

    startRotating: function () {
        if (window.location.pathname === "/index.html") {
            jFuncs.stopExpandStartRotate(this.ui.$circle);
        }
    },

    pullView: function (e) {
        jFuncs.pullView(e, this.ui.$viewSection, this.ui.$circle);
    }
});
