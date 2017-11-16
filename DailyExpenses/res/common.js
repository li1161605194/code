"use strict";
var zW = $(window).width();
var zH = $(window).height();
var iframeZindex = 9999;

var common = {
    //公共初始化 页面高度  布局
    pageInit: function() {
        $("body").css({
            "height": zH + "px",
            "min-height": zH + "px"
        });
    },
    //未开发的功能入口点击提示
    nowStop: function() {
        $(".now_stop").each(function(index, _this) {
            $(_this).off().on("click", function() {
                layer.msg("该功能暂未开放!");
            });
        })
    },
    //点击a标签  跳转页面
    alinkPage: function() {
        $(".alinkPage_c").each(function(index, _this) {
            var _t = $(_this);
            if (_t.attr("rel") != undefined && _t.attr("rel").length > 1) {
                _t.off().on("click", function(e) {
                    var _this = $(this);
                    if (_this.attr("rel") != undefined && _this.attr("rel").length > 1) {
                        var href = _this.attr("rel");
                        common.locationHref(href);
                    }
                });
            }
        });
    },
    locationHref: function(href) {
        href = href + "?v=_" + Math.random(9);
        var _thisIframe = $('<iframe name="page' + iframeZindex + '" class="iframe_c iframe_dw_c" frameborder="0" width="100%" height="100%" ' +
            'src="' + href + '" style="width:' + zW + 'px;min-height:' + zH + 'px;height:' + zH + 'px;left:' + zW + 'px;z-index:' + iframeZindex + '"></iframe>');
        $("body").append(_thisIframe);
        iframeZindex++;
        _thisIframe.animate({
            left: "0",
            opacity: "1"
        }, 555);
    },
    //点击左箭头返回上一级页面   
    goBackNavbarLeft: function() {
        $(document).on("click", ".navbar-left", function(e) {
            $("iframe", window.parent.document).animate({
                left: zW,
                opacity: "0"
            }, 555);
            setTimeout(function() {
                $("iframe", window.parent.document).remove();
            }, 555);
        });
    },
    //yyyy-mm-dd hh:mm:ss
    nowDateTime: function(type) {
        function changeTen(s) {
            return s < 10 ? '0' + s : s;
        }
        var myDate = new Date();
        var nowDate = myDate.getFullYear() + '-' + changeTen(myDate.getMonth() + 1) + "-" + changeTen(myDate.getDate());
        var nowTime = changeTen(myDate.getHours()) + ':' + changeTen(myDate.getMinutes()) + ":" + changeTen(myDate.getSeconds());
        if (type == 1 || type == undefined) {
            return nowDate + " " + nowTime;
        } else if (type == 2) {
            return nowDate;
        } else if (type == 3) {
            return nowTime;
        } else {
            return nowDate + " " + nowTime;
        }
    },
    indexFooterTabbar: function() {
        $(document).on("click", ".tabbar-item", function(e) {
            $(this).parent().find(".active").removeClass("active");
            $(this).addClass("active");
            common.locationHref($(this).attr("rel"));
            $(".tabbar-item").removeClass("active");
            $(".tabbar-item").eq(0).addClass("active");
        });
    },
    keyCorrespondingValue: function(jsonArray, keyValue, keyValueType) {
        if (typeof(jsonArray) == "object" && jsonArray.length != undefined && jsonArray.length > 0 && keyValue != undefined) {
            var _type = keyValueType == undefined ? 1 : keyValueType;
            var ja_leg = jsonArray.length;
            var result = "无匹配数据";
            for (var i = 0; i < ja_leg; i++) {
                var _thisKey = jsonArray[i][0];
                var _thisValue = jsonArray[i][1];
                if (_type == 1) {
                    if (_thisKey == keyValue) {
                        result = _thisValue;
                    }
                } else {
                    if (_thisValue == keyValue) {
                        result = _thisKey;
                    }
                }
            }
            if (result == "无匹配数据") {
                return false;
            } else {
                return result;
            }
        }
    },
    pagingUpDown: function(totalPageNum) {
        var html = '<div class="page_zk"><a href="javascript:void(0)" class="page_alink_c up" id="upPage">上一页</a>' +
            '<a href="javascript:void(0)" class="page_alink_c page" id="pageNum">共' + totalPageNum + '页—第1页</a>' +
            '<a href="javascript:void(0)" class="page_alink_c down" id="downPage">下一页</a></div>';
        $("body").append(html);
    },
    loginLoginOut: function() {
        $.ajax({
            url: window.location.origin + '/DailyExpenses/php/login.php',
            type: 'POST',
            dataType: 'json',
            data: {
                data: {
                    type: "loginagin"
                }
            },
            success: function(res) {
                if (res.resultCode && res.resultCode == "Y") {

                } else {
                    window.location.href = originName + '/login.html?v_' + Math.random();
                }
            },
            error: function(res) {
                window.location.href = originName + '/login.html?v_' + Math.random();
            }
        });
    },
    numberNullUndefind: function(num, fzy) {
        var tempnum = num;
        if (num === "" || num === null || num === undefined || !isFinite(num) || num == "NaN" || num == "Infinity") {
            return tempnum = 0;
        } else {
            if (isNaN(num)) {
                return tempnum = 0;
            } else {
                var tempnum2 = 0;
                if (fzy && fzy === 1) { //万元
                    tempnum2 = Number(parseFloat(tempnum) / 100 / 10000).toFixed(2);
                } else if (fzy && fzy === 1.1) { //万元 一位小数
                    tempnum2 = Number(parseFloat(tempnum) / 100 / 10000).toFixed(1);
                } else if (fzy && fzy === 11) { //千元
                    tempnum2 = parseInt(parseFloat(tempnum) / 100 / 1000);
                } else if (fzy && fzy === 12) { //百元
                    tempnum2 = parseInt(parseFloat(tempnum) / 100 / 100);
                } else if (fzy && fzy === 13) { //十元
                    tempnum2 = parseInt(parseFloat(tempnum) / 100 / 10);
                } else if (fzy && fzy === 2) { //后台传回原值
                    tempnum2 = parseFloat(Number(tempnum)).toFixed(2);
                } else if (fzy && fzy === 2.1) { //后台传回原值 一位小数
                    tempnum2 = parseFloat(Number(tempnum)).toFixed(1);
                } else if (fzy && fzy === 3) { //元 
                    tempnum2 = parseInt(Number(tempnum) / 100);
                } else if (fzy && fzy === 4) { //百分比
                    tempnum2 = parseFloat(Number(tempnum) * 100).toFixed(2);
                } else if (fzy && fzy === 4.1) { //百分比 一位小数
                    tempnum2 = parseFloat(Number(tempnum) * 100).toFixed(1);
                } else { //保留小数点2位
                    tempnum2 = Number(parseFloat(tempnum).toFixed(2));
                }
                var str = tempnum2.toString();
                var strs = str.split(".");
                if (str.indexOf(".") != -1) {
                    if (strs[1] == "00" || strs[1] == "0") {
                        return strs[0];
                    } else {
                        return tempnum2;
                    }
                } else {
                    return tempnum2;
                }
            }
        }
    },
    jsCssRewrite: function() {
        $("head").find("link").each(function(k, v) {
            if ($(v).attr("r") && $(v).attr("r") != undefined && $(v).attr("r") == "r") {
                var href = $(v).attr("href");
                if (href.indexOf("?") != -1) {
                    href = href.split("?")[0];
                }
                $(v).attr("href", href + "?v=" + Math.random(9999));
            }
        });
        $("body").find("script").each(function(k, v) {
            if ($(v).attr("r") && $(v).attr("r") != undefined && $(v).attr("r") == "r") {
                var src = $(v).attr("src");
                if (src.indexOf("?") != -1) {
                    src = src.split("?")[0];
                }
                $(v).attr("src", src + "?v=" + Math.random(9999));
            }
        });
    }
}
var pathName = window.location.pathname;
var originName = window.location.origin;
var anyici = 0;
var diyicishijian, ercishijian;
$(function() {
    common.pageInit();
    //common.loginLoginOut();
    window.onresize = function() {
        zW = $(window).width();
        zH = $(window).height();
        common.pageInit();
    };
    common.nowStop();
    common.alinkPage();
    common.indexFooterTabbar();
    common.jsCssRewrite();
});

var billTypeCommonzhey = [
    [11, "收入->工资"],
    [12, "收入->兼职"],
    [13, "收入->红包"],
    [14, "收入->奖励"],
    [15, "收入->其他"],
    [21, "支出->服饰穿戴"],
    [22, "支出->食材餐饮"],
    [23, "支出->交通通勤"],
    [24, "支出->生活缴费"],
    [25, "支出->日用百货"],
    [26, "支出->化妆美容"],
    [29, "支出->娱乐游玩"],
    [27, "支出->红包"],
    [28, "支出->其他"],
    [31, "借出->应收款"],
    [41, "借入->外欠款"]
];

var billTypeCommonchazhang = [
    [11, "->工资"],
    [12, "->兼职"],
    [13, "->红包"],
    [14, "->奖励"],
    [15, "->其他"],
    [21, "->服饰穿戴"],
    [22, "->食材餐饮"],
    [23, "->交通通勤"],
    [24, "->生活缴费"],
    [25, "->日用百货"],
    [26, "->化妆美容"],
    [29, "->娱乐游玩"],
    [27, "->红包"],
    [28, "->其他"],
    [31, "->应收款"],
    [41, "->外欠款"]
];

var billPayTypeCommonzhey = [
    [11, "现金"],
    [11.1, "支付宝"],
    [11.2, "微信"],
    [12, "银行卡"],
    [13, "信用卡"],
    [14, "蚂蚁花呗"],
    [15, "京东白条"],
    [16, "其他"]
];

var billDaType = [
    [1, "收入"],
    [2, "支出"],
    [3, "借出"],
    [4, "借入"]
]