try {
    var http_s = window.location.protocol.split(":")[0];
    var wx_sq_href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxef71ebe07bf9aa4f&" +
        "redirect_uri=" + http_s + "%3a%2f%2fm.hzqcjt.com%2fweb%2fpages%2foauth%2fwx_yn.html&response_type=code&" +
        "scope=snsapi_userinfo";
    var wx_sq_href_register = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxef71ebe07bf9aa4f&" +
        "redirect_uri=" + http_s + "%3a%2f%2fm.hzqcjt.com%2fweb%2fpages%2fviews%2flogin_register%2fregister.html&response_type=code&" +
        "scope=snsapi_userinfo";
    var main = {
        initLinkScript: function() {
            var css_leg = cbl.selfContentBody.find('cstemp').length;
            var js_leg = cbl.selfContentBody.find('sctemp').length;
            for (var c = 0; c < css_leg; c++) {
                var _now = cbl.selfContentBody.find('cstemp')[c];
                var _src = $(_now).data("src");
                cbl.selfContentBody.append('<link rel="stylesheet" href="' + cbl.css + _src + '">');
            }
            for (var j = 0; j < js_leg; j++) {
                var _now = cbl.selfContentBody.find('sctemp')[j];
                var _src = $(_now).data("src");
                cbl.selfContentBody.append('<script src="' + cbl.js + _src + '"></script>');
            }
            $("cstemp").remove();
            $("sctemp").remove();
        },
        getHtml: function(url, callback) {
            /*var load = layer.open({
                type: 2,
                content: '加载中'
            });*/
            if (url == undefined || url == null || url == "" || url == "/" || url.toString().length < 3) {
                url = "views/home";
            }
            var _url = (url.indexOf(".html") != -1) ? cbl.pages + url + '?_v=' + Math.random() : cbl.pages + url + '.html?_v=' + Math.random();
            $.ajax({
                url: _url,
                type: 'GET',
                dataType: 'html',
                data: {},
                success: function(res) {
                    //layer.close(load);
                    callback(res);
                },
                error: function(res) {
                    //layer.close(load);
                    console.log(res);
                }
            });
        },
        initHtmlLoad: function() {

        },
        jsonToStr: function(data) {
            var str = JSON.stringify(data);
            str = str.replace(/\s+/g, "|空格|");
            str = str.replace(/\"/g, "|syh|");
            return str;
        },
        strToJson: function(str) {
            str = str.replace(/\|空格\|/g, " ");
            str = str.replace(/\|syh\|/g, "\"");
            var _json = JSON.parse(str);
            return _json;
        },
        searchParse: function(search) {
            var resultObj = {};
            if (search && search.length > 1) {
                search = search.split("?")[1];
            } else {
                search = window.location.search;
            }
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
        },
        t: {
            kong: function(value) {
                if (value === "" || value === null || value === undefined || (!isFinite(value) && typeof(value) == "number") || value == "NaN" || value == "Infinity" || value === "null" || value === "undefined") {
                    return "——";
                } else {
                    return value;
                }
            },
            kongTips: function(value) {
                if (main.kong(value) == "——") {
                    return lang.KONGTIPS;
                } else {
                    return value;
                }
            },
            sex: function(value, data) {
                return value == "1" ? lang.SEXM : lang.SEXW;
            },
            userStatus: function(value, data) {
                return value == "1" ? lang.USERTYPEU : lang.USERTYPEA;
            },
            roleType: function(value, data) {
                return value == "1" ? lang.ROLETYPEU : lang.ROLETYPEA;
            },
            roleStatus: function(value, data) {
                return value == "1" ? lang.ROLESTATUSY : lang.ROLESTATUSN;
            }
        }
    };

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
    var ca = "loginty2u_usernamep3lkjh4gfds=5azxcvbnm";
    var cb = "QAZ6WSX7userinfo_RFV9TGBYHNcode=IKOLP";
    //isWeiXin();
    var userinfo = {};
    var wxCompany = "易享优车";
} catch (e) {
    alert("请重新打开[联系管理员]" + JSON.stringify(e));
    console.log(e);
}