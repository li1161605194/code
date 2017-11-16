/*
 *  时间：2017-05-24
 *  作者：lst
 */
"use strict";
var settings = {},
    defaults = {},
    _content,
    _thisIdName;
(function(window) {
    var idNum = 1,
        classNum = 1,
        zidNum = 1;
    var S = {
        ID_NAME: "screenQueryId",
        CLASS_NAME: "screenQueryClass"
    }
    var screen = function(settings) {
        return new screen.fn.init(settings);
    };
    //版本号
    screen.version = 104;
    //原型拓展
    screen.fn = screen.prototype = {
        init: function(settings) {
            screen.fn._creatMenuHTML(settings);
        },
        _creatMenuHTML: function(settings) {
            if (settings.boxId == undefined) {
                $("body").before('<div id="screenQuery"></div>');
                settings.boxId = "#screenQuery" + (zidNum++);
            }
            _content = $(settings.boxId);
            if (settings.searchBoxs == undefined || typeof(settings.searchBoxs) != "object") {
                return false;
            }
            if (settings.queryType != undefined && settings.queryType == 2) {
                _content.addClass("queryType_2");
            }
            var a_params = settings.searchBoxs;
            var a_leg = a_params.length;
            var a_html = '',
                b_html = '';
            for (var a_i = 0; a_i < a_leg; a_i++) {
                var typeid = screen.randomIdNum(a_params[a_i].menuId);
                a_html += '<li style="width:' + ((100 / parseInt(a_leg)) - 0.1).toString() + '%" typeid="' + typeid + '" class="menuli">' + a_params[a_i].menuText + '</li>';
                if (settings.queryType != undefined && settings.queryType == 2) {
                    b_html += '<div class="menu_bjk ' + typeid + '"><div class="queryType_2_dwk">' +
                        screen.fn._creatTitleHTML(typeid, a_params[a_i].menuText) + '<div class="qt2_dwk">' + screen.fn._creatFirstHTML(typeid, a_params[a_i]) + '</div></div></div>';
                } else {
                    b_html += '<div class="menu_bjk ' + typeid + '">' + screen.fn._creatFirstHTML(typeid, a_params[a_i]) + '</div>';
                }
            }
            _content.append(b_html);
            screen.each($(settings.boxId).find(".yijili"), function(k, v) {
                screen.on("click", function(_this) {
                    var typeid = $(screen.target(_this)).parent().attr("typeid");
                    $(screen.target(_this)).parent().parent().find("li.yijili").removeClass("xuanz");
                    $(screen.target(_this)).parent().addClass("xuanz");
                    $(".erjiul").css("left", "100%");
                    $("." + typeid).css("left", "50%");
                }, v);
            });
            if (settings.queryType != undefined && settings.queryType == 2) {
                screen.each($(settings.boxId).find(".queryType_2_dwk .erjili"), function(k, v) {
                    screen.on("click", function(_this) {
                        if ($(screen.target(_this)).data("multiselect") == undefined || $(screen.target(_this)).data("multiselect") == "1") {
                            $(screen.target(_this)).parent().parent().find("li.erjili").removeClass("xuanz");
                            $(screen.target(_this)).addClass("xuanz");
                        } else if ($(screen.target(_this)).data("multiselect") != undefined || $(screen.target(_this)).data("multiselect") == "2") {
                            if ($(screen.target(_this)).attr("class").indexOf("xuanz") != -1) {
                                $(screen.target(_this)).removeClass("xuanz");
                            } else {
                                $(screen.target(_this)).addClass("xuanz");
                            }
                        }
                    }, v);
                });
                screen.on("click", function(_this) {
                    $(settings.boxId).find(".menu_bjk").removeClass('yijiul-roll');
                    if (typeof(settings.quxiaofunc) == 'function') {
                        settings.quxiaofunc(screen.prototype.getXuanzParamsQuery2());
                    }
                }, $(settings.boxId).find("span.title_zks_c.yi")[0]);
                screen.on("click", function(_this) {
                    $(settings.boxId).find(".menu_bjk").removeClass('yijiul-roll');
                    if (typeof(settings.querenfunc) == 'function') {
                        settings.querenfunc(screen.prototype.getXuanzParamsQuery2());
                    }
                }, $(settings.boxId).find("span.title_zks_c.san")[0]);
            } else {
                screen.each($(settings.boxId).find(".erjili"), function(k, v) {
                    screen.on("click", function(_this) {
                        if ($(screen.target(_this)).data("multiselect") == undefined || $(screen.target(_this)).data("multiselect") == "1") {
                            $(screen.target(_this)).parent().find("li.erjili").removeClass("xuanz");
                            $(screen.target(_this)).addClass("xuanz");
                        } else if ($(screen.target(_this)).data("multiselect") != undefined || $(screen.target(_this)).data("multiselect") == "2") {
                            if ($(screen.target(_this)).attr("class").indexOf("xuanz") != -1) {
                                $(screen.target(_this)).removeClass("xuanz");
                            } else {
                                $(screen.target(_this)).addClass("xuanz");
                            }
                        }
                    }, v);
                });
            }

            if (settings.queryType != undefined && settings.queryType == 2) {
                if (settings.defaultXuanz != undefined && settings.defaultXuanz >= 0 && settings.defaultXuanz <= $(settings.boxId).find("li.yijili").size()) {
                    screen.on("click", function(_this) {
                        var typeid = $(screen.target(_this)).parent().attr("typeid");
                        $(screen.target(_this)).parent().parent().find("li.yijili").removeClass("xuanz");
                        $(screen.target(_this)).parent().addClass("xuanz");
                        $(".erjiul").css("left", "100%");
                        $("." + typeid).css("left", "50%");
                    }, $(settings.boxId).find("li.yijili").eq(settings.defaultXuanz)[0]);
                } else {
                    screen.on("click", function(_this) {
                        var typeid = $(screen.target(_this)).parent().attr("typeid");
                        $(screen.target(_this)).parent().parent().find("li.yijili").removeClass("xuanz");
                        $(screen.target(_this)).parent().addClass("xuanz");
                        $(".erjiul").css("left", "100%");
                        $("." + typeid).css("left", "50%");
                    }, $(settings.boxId).find("li.yijili").eq(0)[0]);
                }
            }
        },
        _creatTitleHTML: function(id, title) {
            title = title == undefined ? "请选择" : title;
            var html = '<div class="title_zk"><span class="title_zks_c yi">取消</span>' +
                '<span class="title_zks_c er">' + title + '</span>' +
                '<span class="title_zks_c san">确认</span></div>';
            return html;
        },
        _creatFirstHTML: function(id, data) {
            var b_html = '<ul class="yijiul">';
            var c_html = '';
            for (var a = 0; a < data.dataList.length; a++) {
                var queryType_defaultXuanz = false;
                var typeid = screen.randomIdNum(data.dataList[a].yijiId);
                if (settings[_thisIdName].queryType != undefined && settings[_thisIdName].queryType == 2) {
                    var yijiValue = data.dataList[a].yijiValue == undefined ? a : data.dataList[a].yijiValue;
                    if (settings[_thisIdName].defaultXuanz != undefined && settings[_thisIdName].defaultXuanz == a) {
                        b_html += '<li data-value="' + yijiValue + '" class="yijili xuanz" typeid="' + typeid + '"><div style="' + screen.yijiliImgLeft(data.dataList[a]) + '">' + data.dataList[a].yijiText + '</div></li>';
                        queryType_defaultXuanz = true;
                    } else {
                        b_html += '<li data-value="' + yijiValue + '" class="yijili" typeid="' + typeid + '"><div style="' + screen.yijiliImgLeft(data.dataList[a]) + '">' + data.dataList[a].yijiText + '</div></li>';
                    }
                } else {
                    b_html += '<li class="yijili" typeid="' + typeid + '"><div style="' + screen.yijiliImgLeft(data.dataList[a]) + '">' + data.dataList[a].yijiText + '</div></li>';
                }
                c_html += screen.fn._creatSecondHTML(typeid, data.dataList[a], "", queryType_defaultXuanz);
            }
            b_html += '</ul>';
            return b_html + c_html;
        },
        _creatSecondHTML: function(id, data, key, queryType_defaultXuanz) {
            var style = '';
            if (queryType_defaultXuanz) {
                style = 'style="left:50%;"';
            }
            var s = data.dataList;
            var c_html = '<ul ' + style + ' class="erjiul ' + id + '" data-key="' + screen.dataKey(data, s[0]) + '">';
            var defaultValue = data.defaultValue == undefined ? "" : data.defaultValue;
            if (data.unlimited != undefined && data.unlimited == true) {
                var unlimitedValue = data.unlimitedValue == undefined ? "" : data.unlimitedValue;
                var defaultValueXuanz = data.defaultValue == "" ? "" : "xuanz";
                c_html += '<li data-key="' + screen.dataKey(data, s[0]) + '" data-value="' + unlimitedValue + '" class="erjili ' + defaultValueXuanz + '">不限</li>';
            }
            if (data.allselect != undefined && data.allselect == true) {
                var allselectValue = data.allselectValue == undefined ? "all" : data.allselectValue;
                var defaultValueXuanz = data.defaultValue == "" ? "" : "xuanz";
                c_html += '<li data-key="' + screen.dataKey(data, s[0]) + '" data-value="' + allselectValue + '" class="erjili ' + defaultValueXuanz + '">全选</li>';
            }
            for (var a = 0; a < s.length; a++) {
                var typeid = screen.randomIdNum(s[a].yijiId);
                if (s[a].erjiType && s[a].erjiType == 2) {
                    c_html += '<div class="zimu">' + s[a].erjiText + '</div>';
                } else if (s[a].erjiType == undefined || s[a].erjiType == 1) {
                    var value = s[a].erjiValue == undefined ? s[a].erjiText : s[a].erjiValue;
                    var defaultValueXuanz = data.defaultValue == value ? "xuanz" : "";
                    if (data.multiselect != undefined && data.multiselect == true) {
                        var jsonorarray = data.jsonorarray == undefined ? "1" : data.jsonorarray;
                        c_html += '<li data-jsonorarray="' + jsonorarray + '" data-multiselect="2" data-key="' + screen.dataKey(data, s[a]) + '" data-value="' + value + '" class="erjili ' + defaultValueXuanz + '">' + s[a].erjiText + '</li>';
                    } else {
                        c_html += '<li data-key="' + screen.dataKey(data, s[a]) + '" data-value="' + value + '" class="erjili ' + defaultValueXuanz + '">' + s[a].erjiText + '</li>';
                    }
                } else if (s[a].erjiType != undefined || s[a].erjiType == "datetime") {
                    c_html += '<div class="zimu" id="' + s[a].erjiDateTimeId + '">' + s[a].erjiText + '</div>';
                }
            }
            c_html += '</ul>';
            return c_html;
        }
    }
    screen.prototype.init.prototype = screen.prototype;
    screen.prototype.showScreenQuery = function(_thisId) {
        _thisIdName = _thisId.attr("id") == undefined ? "onlyone" : _thisId.attr("id");
        if ($(settings[_thisIdName].boxId).find(".menu_bjk").hasClass('yijiul-roll')) {
            $(settings[_thisIdName].boxId).find(".menu_bjk").removeClass('yijiul-roll');
            return screen.prototype.getXuanzParams(_thisId);
        } else {
            $(settings[_thisIdName].boxId).find(".menu_bjk").addClass('yijiul-roll');
            return false;
        }
    }
    screen.prototype.getXuanzParams = function(_thisId) {
        _thisIdName = _thisId.attr("id") == undefined ? "onlyone" : _thisId.attr("id");
        var a = $(settings[_thisIdName].boxId).find("ul.erjiul");
        var Json = {};
        $.each(a, function(k, v) {
            var leg = $(v).find(".xuanz").length;
            if (leg > 0) {
                var xuanzData = $(v).find(".xuanz").eq(0);
                if (xuanzData.data("multiselect") == undefined || xuanzData.data("multiselect") == 1) {
                    Json[xuanzData.data("key")] = xuanzData.data("value");
                } else if (xuanzData.data("multiselect") != undefined || xuanzData.data("multiselect") == 2) {
                    if (xuanzData.data("jsonorarray") == undefined || xuanzData.data("jsonOrAray") == "1") {
                        var tempJson = {};
                        for (var i = 0; i < leg; i++) {
                            tempJson[i] = $(v).find(".xuanz").eq(i).data("value");
                        }
                        Json[xuanzData.data("key")] = tempJson;
                    } else if (xuanzData.data("jsonorarray") != undefined || xuanzData.data("jsonOrAray") == "2") {
                        var tempArray = [];
                        for (var i = 0; i < leg; i++) {
                            tempArray.push($(v).find(".xuanz").eq(i).data("value"))
                        }
                        Json[xuanzData.data("key")] = tempArray;
                    }
                }
            } else {
                var xuanzData = $(v).find("li.erjili").eq(0);
                Json[xuanzData.data("key")] = "";
            }
        });
        return Json;
    }
    screen.prototype.getXuanzParamsQuery2 = function(_thisId) {
        //_thisIdName = _thisId.attr("id");
        var a = $(settings[_thisIdName].boxId).find("ul.yijiul");
        var yiji = [ /*settings[_thisIdName].defaultXuanz == undefined ? "1" : settings[_thisIdName].defaultXuanz*/ ];
        $.each(a, function(k, v) {
            var leg = $(v).find(".xuanz").length;
            if (leg > 0) {
                var xuanzData = $(v).find(".xuanz").eq(0);
                if (xuanzData.data("multiselect") == undefined || xuanzData.data("multiselect") == 1) {
                    yiji.push(xuanzData.data("value"));
                } else if (xuanzData.data("multiselect") != undefined || xuanzData.data("multiselect") == 2) {
                    var tempJson = {};
                    for (var i = 0; i < leg; i++) {
                        tempJson[i] = $(v).find(".xuanz").eq(i).data("value");
                    }
                    yiji.push(tempJson);
                }
            }
        });
        var b = $(settings[_thisIdName].boxId).find("ul.erjiul");
        var Json = {};
        $.each(b, function(k, v) {
            var leg = $(v).find(".xuanz").length;
            if (leg > 0) {
                var xuanzData = $(v).find(".xuanz").eq(0);
                if (xuanzData.data("multiselect") == undefined || xuanzData.data("multiselect") == 1) {
                    Json[xuanzData.data("key")] = xuanzData.data("value");
                } else if (xuanzData.data("multiselect") != undefined || xuanzData.data("multiselect") == 2) {
                    if (xuanzData.data("jsonorarray") == undefined || xuanzData.data("jsonOrAray") == "1") {
                        var tempJson = {};
                        for (var i = 0; i < leg; i++) {
                            tempJson[i] = $(v).find(".xuanz").eq(i).data("value");
                        }
                        Json[xuanzData.data("key")] = tempJson;
                    } else if (xuanzData.data("jsonorarray") != undefined || xuanzData.data("jsonOrAray") == "2") {
                        var tempArray = [];
                        for (var i = 0; i < leg; i++) {
                            tempArray.push($(v).find(".xuanz").eq(i).data("value"))
                        }
                        Json[xuanzData.data("key")] = tempArray;
                    }
                }
            }
        });
        Json.yiji = yiji;
        return Json;
    }
    screen.each = function(obj, fn) {
        //this指向obj[i]; i是第一个参数 obj[i]第二个 ...
        var i = 0,
            len = obj.length;
        for (; i < len; i++) {
            if (fn.call(obj[i], i, obj[i]) == false) {
                break
            }
        }
    };
    //添加事件处理程序
    screen.on = function(type, fn, obj) {
        if (obj.addEventListener) {
            type == "mousewheel" && typeof(onmousewheel) == "undefined" && (type = "DOMMouseScroll"); /*兼容FireFox滚轮事件*/
            obj.addEventListener(type, fn, false);
        } else if (obj.attachEvent) {
            obj['e' + type + fn] = fn; /*对象某属性等于该处理程序 this 指向对象本身*/
            obj[type + fn] = function() {
                obj['e' + type + fn]()
            }
            obj.attachEvent("on" + type, obj[type + fn]);
        } else {
            obj["on" + type] = fn
        }
    };
    /*移除事件处理程序*/
    screen.off = function(type, fn, obj) {
        if (obj.removeEventListener) {
            (type == "mousewheel" && typeof(onmousewheel) == "undefined") && (type = "DOMMouseScroll"); /*兼容FireFox滚轮事件*/
            obj.removeEventListener(type, fn, false);
        } else if (obj.detachEvent) {
            obj.detachEvent("on" + type, obj[type + fn]);
            obj[type + fn] = null
        }
    };
    screen.randomIdNum = function(id) {
        if (id == undefined || id == "" || id == null) {
            id = S.ID_NAME + idNum;
            idNum++;
        }
        return id;
    };
    screen.randomClassNum = function(id) {
        if (id == undefined || id == "" || id == null) {
            id = S.CLASS_NAME + classNum;
            classNum++;
        }
        return id;
    };
    screen.dataKey = function(k1, k2) {
        var key;
        if (k2.erjiKey == undefined) {
            if (k1.yijiKey == undefined) {
                console.error("未指定字段名");
            } else {
                key = k1.yijiKey;
            }
        } else {
            key = k2.erjiKey;
        }
        return key;
    };
    screen.yijiliImgLeft = function(data) {
            if ((data.yijiType && data.yijiType == 2) || data.yijiImg) {
                if (settings[_thisIdName].queryType != undefined && settings[_thisIdName].queryType == 2) {
                    return "background:url(" + data.yijiImg + ") no-repeat left;background-size:2rem;height:3rem;padding-left:3.5rem;";
                } else {
                    return "background:url(" + data.yijiImg + ") no-repeat left;background-size:3rem;height:4rem;padding-left:3.5rem;";
                }
            } else {
                return "";
            }
        }
        //判断数组
    screen.isArray = function(t) {
        return Object.prototype.toString.call(t) === "[object Array]"
    };
    //判断是键值对
    screen.isKV = function(t) {
            return t && typeof(t) == "object" && Object.prototype.toString.call(t).toLowerCase() == "[object object]" && !t.length
        }
        //event
    screen.event = function(e) {
        return e || window.event
    };
    //target
    screen.target = function(e) {
        return screen.event(e).srcElement || screen.event(e).target
    };
    //阻止事件冒泡
    screen.stopEvent = function(e) {
        if (e && e.stopPropagation) {
            e.stopPropagation()
        } else {
            window.event.cancelBubble = true
        }
    };
    //阻止浏览器默认行为
    screen.stopDefault = function(e) {
        if (e && e.preventDefault) {
            e.preventDefault()
        } else {
            window.event.returnValue = false
        }
    };
    //按键ASCII值
    screen.keys = function(e) {
        return screen.event(e).keyCode || screen.event(e).which || screen.event(e).charCode
    };
    $.fn.initScreen = function(options) {
        _thisIdName = $(this).attr("id") == undefined ? "onlyone" : $(this).attr("id");
        defaults = {
            searchBoxs: [],
            defaultXuanz: 0,
            searchOnSelect: false,
            searchFunction: function() {},
            yesFunction: function() {},
            noFunction: function() {},
            closeFunction: function() {},
            initFunction: function() {}
        }
        settings[_thisIdName] = $.extend(defaults, options);
        return new screen.fn.init(settings[_thisIdName]);
    };
    //$.fn.query = screen;
})($);