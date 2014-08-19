"use strict";
var $ = require("jquery");
module.exports = {
    fadeIn: function (el) {
        var $el = el;
        if (!($el instanceof $)) {
            $el = $(el);
        }
        if ($el.css('display') !== "none") {
            $el.css("display", "none");
        }
        $el.show(800);
    },
    assignQ: function (mouseObj, windowObj) {
        var quadrent;
        if (mouseObj.x < (windowObj.x / 2) && mouseObj.y < (windowObj.y / 2)) {
            quadrent = "Q1";
        } else if (mouseObj.x > (windowObj.x / 2) && mouseObj.y < (windowObj.y / 2)) {
            quadrent = "Q2";
        } else if (mouseObj.x < (windowObj.x / 2) && mouseObj.y > (windowObj.y / 2)) {
            quadrent = "Q3";
        } else {
            quadrent = "Q4";
        }
        console.log("X:", mouseObj.x, "Y:", mouseObj.y);
        console.log("Center:", (windowObj.x / 2) + "x" + (windowObj.y / 2));
        console.log("Q:", quadrent);
        return quadrent;
    },
    mouseRotate: function (el) {
        if (!(el.hasOwnProperty("offset"))) {
            el = $(el);
        }
        var offset = el.offset();
        return function (e) {
            var center_x = (offset.left) + (el.width() / 2),
                center_y = (offset.top) + (el.height() / 2),
                mouse_x = e.pageX,
                mouse_y = e.pageY,
                radians = Math.atan2(mouse_x - center_x, mouse_y - center_y),
                degrees = (radians * (180 / Math.PI) * -1) + 25;
            //66 so it stays on target with mouse
            el.css({
                "transform": 'rotate(' + degrees + 'deg)',
                "-webkit-transform": 'rotate(' + degrees + 'deg)',
                "-ms-transform": 'rotate(' + degrees + 'deg)'
            });
        };
    },

    stopExpandStartRotate: function (el) {
        var rotateMe = this.mouseRotate(el);
        console.log(this.mouseRotate);
        el.removeClass("expandRotate");
        setTimeout(function () {
            $(document).on("mousemove", rotateMe);
        }, 100);
    },

    expandExpanders: function () {
        var icon = $(this).children(".icon"),
            expandee = $(this).siblings(".expandee");
        if (icon) {
            if ($(expandee).css("display") === "none") {
                $(icon).html("&#9660;");
            } else {
                $(icon).html("&#9654;");
            }
        }
        $(expandee).toggle("slow");
    },

    pullView: function (e, viewEl, selectorEl) {
        e.preventDefault();

        var $link = $(e.target),
            ref = "./views" + $link.attr("href");
        console.log(ref);
        $.ajax({
            url: ref,
            method: "GET",
            success: function (data) {
                history.pushState(null, null, $link.attr("href"));
                if (selectorEl) {
                    selectorEl.addClass("shiftUpAndShrink");
                }
                $("footer").css("position", "initial");
                viewEl.hide(10);
                viewEl.html(data);
                viewEl.show("slow");
                console.log($link.attr("href"));
            },
            error: function () {
                window.location.href = "http://eldepartamentodelacomida.com/dev" + $link.attr("href");
            }
        });
    },
    shiftUp: function () {
        $(this).addClass("shiftUpAndShrink");
    }
};
