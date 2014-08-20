"use strict";
var $ = require("jquery"),
    Backbone = require("backbone");
Backbone.$ = $;

module.exports = Backbone.Router.extend({
    routes: {
        "*link": "triggerLink"
    },

    triggerLink: function (param) {
        if (param) {
            param = param.trim();
        }
        console.log(param);
        this.trigger("link", {target: param});
    }

});