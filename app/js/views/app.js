"use strict";

var jFuncs = require("../jFuncs"),
    $ = require("jquery"),
    Backbone = require("backbone"),
    Router = require("../routers/routers"),
    ContentView = require("./content");
Backbone.$ = $;

module.exports = Backbone.View.extend({
    el: "body",
    ui: {
        $metaInfo: $(".metaInfo"),
        $menu: $(".menu"),
        $socialMedia: $(".socialMedia"),
        $circle: $(".selector"),
        $viewSection: $("#view section"),
        $nav: $("nav"),
        $footer: $("footer")
    },

    cachedPages: {},

    events: {
        "click nav a": "renderContent"
    },

    initialize: function () {
        jFuncs.fadeIn(this.ui.$metaInfo);
        jFuncs.fadeIn(this.ui.$menu);
        jFuncs.fadeIn(this.ui.$socialMedia);
        this.ui.$circle.one("webkitAnimationEnd oanimationend mozAnimationEnd animationend",
            this.startRotating);
        this.router = new Router();
        this.router.on("link", this.renderContent);
    },

    shiftUp: function (el) {
        jFuncs.stopRotate();
        jFuncs.shiftUp(el);
    },

    shout: function () {
        console.log("SHOUT");
    },

    startRotating: function () {
        if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
            jFuncs.stopExpandStartRotate($(this));
        }
    },

    fetchContent: function (page) {
        $.ajax({
            method: "GET",
            url: "/views/" + page,
            context: this
        }).done(function (data) {
            this.cachedPages[page] = new ContentView({
                page: page,
                template: data,
                $el: this.ui.$viewSection
            });
        });
    },

    renderContent: function (event) {
        event.preventDefault();
        this.shiftUp(this.ui.$circle);
        var page = $(event.target).attr("data-view-cid");
        this.router.navigate(page);
        if (this.cachedPages[page]) {
            this.cachedPages[page].render();
        } else {
            this.fetchContent(page);
        }
        this.ui.$footer.css("position", "inherit");
        //jFuncs.pullView(e, this.ui.$viewSection, this.ui.$circle);
    }
});
