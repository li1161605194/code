"use strict";
$(function() {
    indexInit.jggWcommonH();
});
var indexInit = {
    jggWcommonH: function() {
        var _jggW = $(".boxes li").eq(0).width();
        $(".boxes li").css({
            "height": _jggW + "px",
            "line-height": _jggW + "px"
        });
        $("#demoSlider").flexslider({
            controlNav: false,
            directionNav: false
        });
        $("#demoSlider ul.am-slides li img").height(parseFloat(zW) / 8 * 3);
        window.onresize = function() {
            indexInit.jggWcommonH();
        }
    }
}