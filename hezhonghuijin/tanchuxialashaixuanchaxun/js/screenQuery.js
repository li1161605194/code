/*
 *  时间：2017-05-24
 *  作者：lst
 */
"use strict";
(function(window) {
    var defaults, settings, idNum = 1,
        classNum = 1;
    var S = {
        ID_NAME: "screenQueryId",
        CLASS_NAME: "screenQueryClass"
    }
    var screen = function(options) {
        return new screen.fn.init(options);
    };
    //版本号
    screen.version = 104;
    //原型拓展
    screen.fn = screen.prototype = {
        init: function(options) {
            screen.fn._creatMenuHTML(options);
        },
        _creatMenuHTML: function(options) {
            if (options.boxId == undefined) {
                $("body").before('<div id="screenQuery"></div>');
                options.boxId = "#screenQuery";
            }
            var _content = $(options.boxId);
            if (options.searchBoxs == undefined || typeof(options.searchBoxs) != "object") {
                return false;
            }
            var a_params = options.searchBoxs;
            var a_leg = a_params.length;
            var a_html = '',
                b_html = '';
            for (var a_i = 0; a_i < a_leg; a_i++) {
                var typeid = screen.randomIdNum(a_params[a_i].menuId);
                a_html += '<li style="width:' + ((100 / parseInt(a_leg)) - 0.1).toString() + '%" typeid="' + typeid + '" class="menuli">' + a_params[a_i].menuText + '</li>';
                b_html += '<div class="menu_bjk ' + typeid + '">' + screen.fn._creatFirstHTML(typeid, a_params[a_i]) + '</div>';
            }
            _content.append('<div class="screening"><ul>' + a_html + '</ul></div>' + b_html);
            screen.each($(".menuli"), function(k, v) {
                screen.on("click", function(_this) {
                    var typeid = $(screen.target(_this)).attr("typeid");
                    if ($('.' + typeid).hasClass('yijiul-roll')) {
                        $('.' + typeid).removeClass('yijiul-roll');
                    } else {
                        $(".menu_bjk").removeClass('yijiul-roll');
                        $('.' + typeid).addClass('yijiul-roll');
                    }
                }, v);
            });
            screen.each($(".yijili"), function(k, v) {
                screen.on("click", function(_this) {
                    var typeid = $(screen.target(_this)).parent().attr("typeid");
                    $(screen.target(_this)).parent().parent().find("li.yijili").removeClass("xuanz");
                    $(screen.target(_this)).parent().addClass("xuanz");
                    $(".erjiul").css("left", "100%");
                    $("." + typeid).css("left", "50%");
                }, v);
            });
            screen.each($(".erjili"), function(k, v) {
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
            screen.on("click", function(_this) {
                $('.menu_bjk').removeClass('yijiul-roll');
            }, document.getElementById("quxiao"));
            screen.on("click", function(_this) {
                $('.menu_bjk').removeClass('yijiul-roll');
                console.info(screen.getXuanzParams());
            }, document.getElementById("queren"));
        },
        _creatFirstHTML: function(id, data) {
            var b_html = '<ul class="yijiul">';
            var c_html = '';
            for (var a = 0; a < data.dataList.length; a++) {
                var typeid = screen.randomIdNum(data.dataList[a].yijiId);
                b_html += '<li class="yijili" typeid="' + typeid + '"><div style="' + screen.yijiliImgLeft(data.dataList[a]) + '">' + data.dataList[a].yijiText + '</div></li>';
                c_html += screen.fn._creatSecondHTML(typeid, data.dataList[a]);
            }
            b_html += '<li><input type="button" id="quxiao" class="btn btn-default btn-sm" value="取消">' +
                '<input type="button" id="queren" class="btn btn-primary btn-sm" value="确认"></li></ul>';
            return b_html + c_html;
        },
        _creatSecondHTML: function(id, data, key) {
            var c_html = '<ul class="erjiul ' + id + '">';
            var s = data.dataList;
            if (data.unlimited != undefined && data.unlimited == true) {
                var unlimitedValue = data.unlimitedValue == undefined ? "" : data.unlimitedValue;
                c_html += '<li data-key="' + screen.dataKey(data, s[0]) + '" data-value="' + unlimitedValue + '" class="erjili">不限</li>';
            }
            if (data.allselect != undefined && data.allselect == true) {
                var allselectValue = data.allselectValue == undefined ? "all" : data.allselectValue;
                c_html += '<li data-key="' + screen.dataKey(data, s[0]) + '" data-value="' + allselectValue + '" class="erjili">全选</li>';
            }
            for (var a = 0; a < s.length; a++) {
                var typeid = screen.randomIdNum(s[a].yijiId);
                if (s[a].erjiType && s[a].erjiType == 2) {
                    c_html += '<div class="zimu">' + s[a].erjiText + '</div>';
                } else if (s[a].erjiType == undefined || s[a].erjiType == 1) {
                    var value = s[a].erjiValue == undefined ? s[a].erjiText : s[a].erjiValue;
                    if (data.multiselect != undefined && data.multiselect == true) {
                        var jsonorarray = data.jsonorarray == undefined ? "1" : data.jsonorarray;
                        c_html += '<li data-jsonorarray="' + jsonorarray + '" data-multiselect="2" data-key="' + screen.dataKey(data, s[a]) + '" data-value="' + value + '" class="erjili">' + s[a].erjiText + '</li>';
                    } else {
                        c_html += '<li data-key="' + screen.dataKey(data, s[a]) + '" data-value="' + value + '" class="erjili">' + s[a].erjiText + '</li>';
                    }
                }
            }
            c_html += '</ul>';
            return c_html;
        }
    }
    screen.prototype.init.prototype = screen.prototype;
    screen.getXuanzParams = function() {
        var a = $("ul.erjiul");
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
            }
        });
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
                return "background:url(" + data.yijiImg + ") no-repeat left;background-size:25px;height:4rem;padding-left:3.5rem;";
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
    screen.initScreen = function(options) {
        defaults = {
            searchBoxs: [],
            searchOnSelect: false,
            searchFunction: function() {},
            yesFunction: function() {},
            noFunction: function() {},
            closeFunction: function() {},
            initFunction: function() {}
        }
        settings = $.extend(defaults, options);
        return new screen.fn.init(settings);
    };
    window.query = screen;
})(window);