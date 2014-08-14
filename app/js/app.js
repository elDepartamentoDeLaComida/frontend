var jFuncs = require("./jFuncs"),
    $ = require("jquery");

jFuncs.fade(".metaInfo");
jFuncs.fade(".menu");
jFuncs.fade(".socialMedia");

$(function () {
    "use strict";
    var $circle = $(".selector"),
        w = {
            y: $(window).height(),
            x: $(window).width()
        };
    console.log(w.x, w.y);

    $circle.on("click", function () {
        $(this).addClass("shiftUpAndShrink");
    });


    $circle.one("webkitAnimationEnd oanimationend mozAnimationEnd animationend",
        function () {
            var rotate = jFuncs.mouseRotate($circle);
            $circle.removeClass("expandRotate");
            setTimeout(function () {
                $(document).on("mousemove", rotate);
            }, 100);
        });

    $("body").on("click", ".expander", function () {
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
    });

    $(document).not("nav").on("click", function (e) {
        var m = {
            x: e.pageX,
            y: e.pageY
        };
        jFuncs.assignQ(m, w);
    });

    $("nav").on("click", "a", function (e) {
        e.preventDefault();
        var $link = $(e.target),
            ref = "/views" + $link.attr("href");
        console.log(e.target);
        $.ajax({
            url: ref,
            method: "GET",
            success: function (data) {
                history.pushState(null, null, $link.attr("href"));
                var $view = $("#view").children("section");
                $circle.addClass("shiftUpAndShrink");
                $("footer").css("position", "initial");
                $view.hide(10);
                $view.html(data);
                $view.show("slow");
                //console.log($link.attr("href"));
            },
            error: function () {
                window.location.href = "http://eldepartamentodelacomida.com/dev" + $link.attr("href");
            }
        });
    });
});
