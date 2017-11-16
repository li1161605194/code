"use strict";
document.getElementsByTagName("html")[0].setAttribute("style", "opacity:0");
var date = new Date();
var _v = "?_v=" + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + "_001027_hzqz";
var initCssJsUrl = {
        "css": [
            "css/font-awesome.min.css",
            "js/unit/mui/mui.min.css",
            "js/unit/mui/mui.picker.min.css",
            "css/weui.min.css",
            "js/unit/layer2/need/layer.css",
            "css/main.css",
            "css/style.css"
        ],
        "js": [
            "js/unit/jquery.min.js",
            "js/unit/zepto.min.js",
            "js/unit/weui.min.js",
            "js/unit/mui/mui.min.js",
            "js/unit/mui/mui.picker.min.js",
            "js/unit/json2.js",
            "js/unit/layer2/layer.js",
            "js/common.js",
        ]
   }
for (var a = 0; a < initParams.css.length; a++) {
    initCssJsUrl.css.push(initParams.css[a]);
}
for (var a = 0; a < initParams.js.length; a++) {
    initCssJsUrl.js.push(initParams.js[a]);
}
var _getCssStyle = function(url) {
    if (typeof(url) == "object") {
        var a_leg = url.length;
        for (var a = 0; a < a_leg; a++) {
            var link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = rootDirectory + url[a] + _v;
            document.getElementsByTagName("head")[0].appendChild(link);
        }
    } else {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = rootDirectory + url + _v;
        document.getElementsByTagName("head")[0].appendChild(link);
    }
}
var _getScript = function(url) {
    getLoadCallBack(url, 0);
}
var getLoadCallBack = function(url, num) {
    var a_leg = url.length;
    var js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', rootDirectory + url[num] + _v);
    document.getElementsByTagName('head')[0].appendChild(js);
    if ((num + 1) < a_leg) {
        num = num + 1;
    } else if ((num + 1) >= a_leg) {
        return false;
    }
    if (js.readyState) {
        js.onreadystatechange = function() {
            if (js.readyState == "loaded" || js.readyState == "complete") {
                js.onreadystatechange = null;
                getLoadCallBack(url, num);
            }
        };
    } else {
        js.onload = function() {
            getLoadCallBack(url, num);
        };
    }
}
var iframeZindex = 9999;
var sfwx = 4;
var baseUrl = window.location.href;
var hrefUrl = window.location.href;
if (baseUrl.indexOf("http://localhost:86/") != -1) {
	baseUrl="http://localhost:86/";
} else if (baseUrl.indexOf("http://e.mapstar.com.cn:85/") != -1) {
	baseUrl="http://e.mapstar.com.cn:85/";
}
var isIphone, isAndroid, isMobile;
var isWeiXin = function() {
    var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    isAndroid = ua.match(/(Android)\s+([\d.]+)/);
    isMobile = isIphone || isAndroid;
    if (isMobile) {
        if (ua.indexOf("Alipay") > -1) {
            sfwx = 2;
        } else if (ua.indexOf("MicroMessenger") > -1) {
            sfwx = 1;
        } else {
            sfwx = 3;
        }
    } else {
        sfwx = 4;
        document.getElementsByTagName('html')[0].style.width = 640 + "px";
        document.getElementsByTagName('html')[0].innerHTML = '请使用手机移动端浏览器打开';
    }
    return sfwx;
}
var getMobileSystem = function() {
    var sys = "";
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 || u.indexOf('Safari') > -1) { //Android
        sys = "1";
    } else if (u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1) { //IOS
        sys = "2";
    } else if (u.indexOf('Windows Phone') > -1) { //WinPhone
        sys = "3";
    }
    return sys;
}
var rootDirectory = hrefUrl.split("/pages/");
if (rootDirectory[0] == undefined) {
    alert("路径请求有误");
} else {
    rootDirectory = rootDirectory[0] + "/";
    _getCssStyle(initCssJsUrl.css);
    _getScript(initCssJsUrl.js);
}
var searchParse = function() {
    var resultObj = {};
    var search = window.location.search;
    if (search && search.length > 1) {
        var search = search.substring(1);
        var items = search.split('&');
        for (var index = 0; index < items.length; index++) {
            if (!items[index]) {
                continue;
            }
            var kv = items[index].split('=');
            resultObj[kv[0]] = decodeURIComponent(typeof kv[1] === "undefined" ? "" : kv[1]);
        }
    }
    return resultObj;
}
var ca = "loginty2u_usernamep3lkjh4gfds=5azxcvbnm";
var cb = "QAZ6WSX7userinfo_RFV9TGBYHNcode=IKOLP";
isWeiXin();
var urlJson = searchParse();
var userinfo = {};
var opt={};
var wxCompany = "天健湖壹号院";