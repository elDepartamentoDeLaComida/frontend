var $ = require("jquery");
module.exports = {
  fade: function (el) {
    var $el = $(el);
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
        degrees = (radians * (180 / Math.PI) * -1) + 50;
      //66 so it stays on target with mouse
      el.css({
        "transform": 'rotate(' + degrees + 'deg)',
        "-webkit-transform": 'rotate(' + degrees + 'deg)',
        "-ms-transform": 'rotate(' + degrees + 'deg)'
      });
    };
  }
};