var anyici = 0;
var diyicishijian, ercishijian;
var zW = $(window).width();
var zH = $(window).height();
$(function() {
    $(".showzk").height(zH);
    $("#show").css({
        "height": $(window).height() + "px",
        "min-height": $(window).height() + "px"
    });
    document.getElementById("show").src = "http://www.lst1.cn/login.html?v=" + Math.random(99999);
    if (window.plus) {
        plusReady();
    } else {
        document.addEventListener("plusready", plusReady, false);
    }
})

function plusReady() {
    plus.key.removeEventListener('backbutton', function() {}, false);
    plus.key.addEventListener('backbutton', function() {
        //var name=$(window.frames["hbmbFrm"].document).find("#show").attr("name")
        if ($(window.frames["hbmbFrm"].frames["zdIframe"].document).find(".iframe_c") && $(window.frames["hbmbFrm"].frames["zdIframe"].document).find(".iframe_c") != undefined) {
            var nowname = $(window.frames["hbmbFrm"].frames["zdIframe"].document).find(".iframe_c").attr("name");
            if (nowname != undefined) {
                if ($(window.frames["hbmbFrm"].frames["zdIframe"].frames[nowname].document).find(".iframe_c") && $(window.frames["hbmbFrm"].frames["zdIframe"].frames[nowname].document).find(".iframe_c").attr("name")) {
                    var nowname2 = $(window.frames["hbmbFrm"].frames["zdIframe"].frames[nowname].document).find(".iframe_c").attr("name");
                    if ($(window.frames["hbmbFrm"].frames["zdIframe"].frames[nowname].frames[nowname2].document).find(".iframe_c") && $(window.frames["hbmbFrm"].frames["zdIframe"].frames[nowname].frames[nowname2].document).find(".iframe_c").attr("name")) {
                        var nowname3 = $(window.frames["hbmbFrm"].frames["zdIframe"].frames[nowname].frames[nowname2].document).find(".iframe_c").attr("name");
                        if ($(window.frames["hbmbFrm"].frames["zdIframe"].frames[nowname].frames[nowname2].frames[nowname3].document).find(".iframe_c")) {
                            //if(){}
                            $(window.frames["hbmbFrm"].frames["zdIframe"].frames[nowname].frames[nowname2].frames[nowname3].document).find(".navbar-left").click();
                        } else {
                            $(window.frames["hbmbFrm"].frames["zdIframe"].frames[nowname].frames[nowname2].frames[nowname3].document).find(".navbar-left").click();
                        }
                    } else {
                        $(window.frames["hbmbFrm"].frames["zdIframe"].frames[nowname].frames[nowname2].document).find(".navbar-left").click();
                    }
                } else {
                    $(window.frames["hbmbFrm"].frames["zdIframe"].frames[nowname].document).find(".navbar-left").click();
                }
            } else {
                backApp();
            }
        } else {
            backApp();
        }
    }, false);
}


backApp = function() {
    if (anyici === 0) {
        anyici = 1;
        diyicishijian = new Date().getTime();
        var a = $(window.frames["hbmbFrm"].document).find("body");
        var screen_width = $(window).width() / 2 - 310 / 2;
        var screen_height = $(window).height() / 2 - 50 / 2;
        var html = '<div id="succ_msg" style="padding: 5px;position:fixed;top:' + screen_height + 'px;z-index:9999999999999999999999999999;width:300px;' +
            'left:' + screen_width + 'px;border-radius: 4px;background-color: #D9EDF7;color: #333;font-size:14px;' +
            'line-height:40px;height:40px;text-align:center;">再按一次,退出账单</div>';
        a.append(html);
        setTimeout(function() {
            $(window.frames["hbmbFrm"].document).find('#succ_msg').remove();
            anyici = 0;
        }, 2222);
    } else if (anyici === 1) {
        ercishijian = new Date().getTime();
        if ((parseInt(ercishijian) - parseInt(diyicishijian)) < 2500) {
            plus.runtime.quit();
        } else {
            anyici = 0;
        }
    }
}