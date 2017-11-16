var t1 = "",
    t2 = "",
    ttop = "",
    txia = 1,
    intredtime = 1,
    intbluetime = "";
var init_num = 4;
var init_numred = 4;
var init_numblue = 4;

$(function() {

})

gameType = function(num, classname, idname) {
    switch (idname) {
        case "game_bsw":
            gameColorInit();
            break;
        case "ChineseTraditionalCulture":
            gameChineseTraditionalCultureInit();
            break;
        default:
            actionNotice({
                msg: "请刷新页面,重新加载"
            });
            window.location.reload();
            break;
    }
    $("#" + idname).css("display", "block");
    $(".xuanzk").hide();
}

gameChineseTraditionalCultureInit = function() {
    $(".ctc_zk").css("min-height",$("body").height()+"px");
    window.onresize = function() {
        $(".ctc_zk").css("min-height",$("body").height()+"px");
    }
    var scConfig=shiCiMingJu.toString().split("|");
    $.each(scConfig,function(k,v){
    	var temp=v.toString().split("____");
    	var content=temp[0];
    	var name=temp[1].toString().split("《")[0];
    	var title=temp[1].toString().split("《")[1].toString().split("》")[0];
    	$(".sc_zk").append('<p class="scmj_p"><span class="sc_title">'+title+'</span><span class="sc_name">'+name+'</span><span class="sc_content">'+content+'</span></p>');
    });
}

gameColorInit = function() {
    $(".zkcommon").height($("body").height() / 2 - 1);
    window.onresize = function() {
        $(".zkcommon").height($("body").height() / 2 - 1);
    }
    $(".alink_caoz_common.san").click(function(event) {
        var fang = $(this).parent().parent().parent().attr("class");
        if (fang.indexOf("top") != -1) {
            init_numred = 4;
            ttop = 1;
            $(".topzk").find(".alink_caoz_common.er").html("00分");
            window.clearInterval(intredtime);
        } else {
            init_numblue = 4;
            txia = 1;
            $(".xiazk").find(".alink_caoz_common.er").html("00分");
            window.clearInterval(intbluetime);
        }
        gameColor(fang);
    });
    $(".alink_caoz_common.si").click(function(event) {
        var fang = $(this).parent().parent().parent().attr("class");
        gameColor(fang, 23);
    });
    $(".alink_caoz_common.wu").click(function(event) {
        var fang = $(this).parent().parent().parent().attr("class");
        if (fang.indexOf("top") != -1) {
            init_numred = 4;
            window.clearInterval(intredtime);
        } else {
            init_numblue = 4;
            window.clearInterval(intbluetime);
        }
    });
}

var gameColor = function(fang, nexttype) {
    var _this = $(".game_nrk_zk");
    if (fang.indexOf("top") != -1) {
        _this = $(".topzk").find('.game_nrk_zk');
        init_num = init_numred;
    } else {
        _this = $(".xiazk").find('.game_nrk_zk');
        init_num = init_numblue;
    }
    init_width = function() {

        var zw = $("body").height() / 2 - 31 - init_num;
        var width_common = parseFloat(zw / init_num);
        _this.width(zw).height(zw).html(color_div(init_num, width_common));
        if (nexttype == 2 || nexttype == 23) {

        } else {
            t1 = new Date().getTime();
            $(".alink_caoz_common.yi").html("00:00:00.000");
            if (fang.indexOf("top") != -1) {
                intredtime = setInterval(function() {
                    t2 = new Date().getTime();
                    $(".topzk").find(".alink_caoz_common.yi").html(timenume(t1, t2));
                }, 1);
            } else {
                intbluetime = setInterval(function() {
                    t2 = new Date().getTime();
                    $(".xiazk").find(".alink_caoz_common.yi").html(timenume(t1, t2));
                }, 1);
            }
        }
    }
    color_div = function(init_num, width_common) {
        var divHtml = '';
        var colornum_r = parseInt(Math.random() * 255, 10),
            colornum_g = parseInt(Math.random() * 255, 10),
            colornum_b = parseInt(Math.random() * 255, 10);
        var suiji = parseInt(Math.random() * (init_num * init_num), 10);
        for (i = 0; i < init_num * init_num; i++) {
            if (i == suiji) {
                var changenum = 25 - parseInt(init_num);
                divHtml += '<div onclick="xuanz_right($(this))" style="width:' + width_common + 'px;height:' + width_common + 'px;background-color:rgb(' + parseInt(colornum_r + changenum) + ',' + parseInt(colornum_g + changenum) + ',' + parseInt(colornum_b + changenum) + ');display:inline-block;" class="color_div_common different"></div>';
            } else {
                divHtml += '<div onclick="xuanz_worry($(this))" style="width:' + width_common + 'px;height:' + width_common + 'px;background-color:rgb(' + colornum_r + ',' + colornum_g + ',' + colornum_b + ');display:inline-block;" class="color_div_common"></div>';
            }
        }
        return divHtml;
    }
    xuanz_right = function(a) {
        t2 = new Date().getTime();
        var fang = a.parent().attr("id");
        var fangcalss = "";
        switch (fang) {
            case "red":
                $("#hongfanjieg").val("1");
                var l = $("#lanfanjieg").val();
                if (l == "1") {

                } else {

                }
                init_numred = init_numred + 1;
                gameColor("topzk", 2);
                $(".topzk").find(".alink_caoz_common.er").html(ttop * 10 + "分");
                ttop = ttop + 1;
                fangcalss = $(".topzk");
                break;
            case "blue":
                $("#lanfanjieg").val("1");
                var h = $("#hongfanjieg").val();
                if (h == "1") {

                } else {

                }
                init_numblue = init_numblue + 1;
                gameColor("xiazk", 2);
                $(".xiazk").find(".alink_caoz_common.er").html(txia * 10 + "分");
                txia = txia + 1;
                fangcalss = $(".xiazk");
                break;
            default:
                actionNotice({
                    msg: "请刷新页面,重新加载"
                });
                gameColor();
                break;
        }
        //fangcalss.find(".alink_caoz_common.yi").html(timenume(t1,t2));
    }
    xuanz_worry = function(a) {
        actionNotice({
            msg: "不对!不对!错啦!"
        });
    }
    timenume = function(t1, t2) {
        var timehtml = "";
        var shi = new Date(t2 - t1).getHours();
        if (shi.toString().length < 2) {
            shi = "0" + shi;
        }
        var fen = new Date(t2 - t1).getMinutes();
        if (fen.toString().length < 2) {
            fen = "0" + fen;
        }
        var miao = new Date(t2 - t1).getSeconds();
        if (miao.toString().length < 2) {
            miao = "0" + miao;
        }
        var haomiao = new Date(t2 - t1).getMilliseconds();
        timehtml = "00:" + fen + ":" + miao + "." + haomiao;
        return timehtml;
    }
    return init_width();
}