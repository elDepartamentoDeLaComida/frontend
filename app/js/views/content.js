"use strict";

var jFuncs = require("../jFuncs"),
    $ = require("jquery"),
    Backbone = require("backbone"),
    path = require("path");
Backbone.$ = $;

module.exports = Backbone.View.extend({
    tagName: "section",
    events: {
        "click .expander": "expand"
    },
    pages: {},
    initialize: function (options) {
        this.$el = options.$el;
        this.template = options.template;
        this.page = options.page;
        this.render();
    },
    render: function () {
        this.$el.hide();
        this.$el.html(this.template);
        this.$el.show("slow");
        return this;
    },
    expand: function (e) {
        jFuncs.expandExpanders.call(e.target);
    }
});
