"use strict";

var jFuncs = require("../jFuncs"),
    $ = require("jquery"),
    Backbone = require("backbone");
Backbone.$ = $;

module.exports = Backbone.View.extend({
    tagName: "section",
    templatePrefix: "views/",
    events: {
        "click .expander": "expand"
    },

    initialize: function (page) {
        console.log(this.templateprefix + page);
        this.template = require(this.templateprefix + page);
        this.page = page;
        this.listenTo(this.model, "change", this.render);
    },
    render: function () {
        this.$el.html(this.template);

        return this;
    },
    expand: jFuncs.expandExpanders
});
