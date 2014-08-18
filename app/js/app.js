var jFuncs = require("./jFuncs"),
    $ = require("jquery");

$(function () {
    "use strict";
    jFuncs.fadeIn(".metaInfo");
    jFuncs.fadeIn(".menu");
    jFuncs.fadeIn(".socialMedia");

    var $circle = $(".selector"),
        windowSize = {
            y: $(window).height(),
            x: $(window).width()
        },
        $view = $("#view").children("section"),
        $nav = $("nav");

    console.log(windowSize.x, windowSize.y);

    $circle.on("click", function () {
        $(this).addClass("shiftUpAndShrink");
    });

    if (window.location.pathname === "/index.html") {
        $circle.one("webkitAnimationEnd oanimationend mozAnimationEnd animationend",
            jFuncs.stopExpandStartRotate($circle)
        );
    }

    $view.on("click", ".expander", jFuncs.expandExpanders);

    $nav.on("click", "a", function (e) {
        jFuncs.pullView(e, $view, $circle);
    });
});
