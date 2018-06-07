layui.define(['configBase', 'lang'], function(exports) {
    var configBase = layui.configBase,
        lang = layui.lang;
    var main = {
        initLinkScript: function() {
            var css_leg = configBase.selfContentBody.find('cstemp').length;
            var js_leg = configBase.selfContentBody.find('sctemp').length;
            for (var c = 0; c < css_leg; c++) {
                var _now = configBase.selfContentBody.find('cstemp')[c];
                var _src = $(_now).data("src");
                configBase.selfContentBody.append('<link rel="stylesheet" href="' + configBase.css + _src + '">');
            }
            for (var j = 0; j < js_leg; j++) {
                var _now = configBase.selfContentBody.find('sctemp')[j];
                var _src = $(_now).data("src");
                configBase.selfContentBody.append('<script src="' + configBase.js + _src + '"></script>');
            }
            $("cstemp").remove();
            $("sctemp").remove();
        },
        getHtml: function(url, callback) {
            var load = layer.load();
            if (url == "" || url == "/" || url.toString().length < 3) {
                url = "home/home";
            }
            var _url = (url.indexOf(".html") != -1) ? configBase.pages + url + '?_v=' + Math.random() : configBase.pages + url + '.html?_v=' + Math.random();
            $.ajax({
                url: _url,
                type: 'GET',
                dataType: 'html',
                data: {},
                success: function(res) {
                    layer.close(load);
                    callback(res);
                },
                error: function(res) {
                    layer.close(load);
                    console.log(res);
                }
            });
        },
        initHtmlLayui: function() {
            layui.use(['element', 'form'], function() {
                var element = layui.element;
                var form = layui.form;
                form.render();
                element.init();
            });
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
        checkRadio: function(name, value) {
            if (name && value) {
                var _r = $("input[name='" + name + "']");
                if (_r && _r.length && _r.length > 0) {
                    for (var a = 0; a < _r.length; a++) {
                        var _now = $(_r[a]);
                        if (_now.val() == value) {
                            _now.click();
                            _now.attr("checked", 'checked');
                        } else {
                            _now.removeAttr('checked');
                        }
                    }
                }
            } else {
                layer.msg("MAINJS-CHECKRADIO");
            }

        },
        reloadNowPageInit: function() {
            var _now = configBase.selfLeftMenu.find('.layui-this a.tzpage_c');
            var _url = "home/home";
            if (_now && _now.length && _now.length == 1) {
                _url = _now.data('url');
            }
            tab.tabRefresh(_url);
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
    exports('main', main);
});