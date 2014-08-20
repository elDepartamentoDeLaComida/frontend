"use strict";
var AppView = require("./views/app"),
    $ = require("jquery"),
    Backbone = require("backbone");
$(function () {
    new AppView();
    Backbone.history.start({pushState: true});
});
