var jFuncs = require("./jFuncs"),
  $ = require("jquery");

jFuncs.fade(".metaInfo");
jFuncs.fade(".menu");
jFuncs.fade(".socialMedia");

$(document).ready(function () {
  var $circle = $(".selector > img");
  var w = {
    y: $(window).height(),
    x: $(window).width()
  };
  console.log(w.x, w.y);

  $circle.on("click", function () {
    $(this).addClass("moveUp");
  });

  var rotate = jFuncs.mouseRotate($circle);
  $circle.one("webkitAnimationEnd oanimationend mozAnimationEnd animationend",
    function () {
      $circle.removeClass("openUp");
      setTimeout(function () {
        $(document).on("mousemove", rotate);
      }, 100);
    });

  $("body").on("click", ".expander", function () {
    var icon = $(this).children(".icon");
    var expandee = $(this).siblings(".expandee");
    if (icon) {
      //$(icon).addClass("expandAnim");
      if ($(expandee).css("display") == "none") {
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
        console.log("AJAXING");
        var $view = $("#view");
        $circle.addClass("moveUp");
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