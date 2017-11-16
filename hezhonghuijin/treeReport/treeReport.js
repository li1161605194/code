/*
 *  时间：2017-06-01
 *  作者：lst
 */
"use strict";
(function(window) {
    var defaults, settings, idNum = 0,
        classNum = 0;
    var S = {

    }
    var treeReport = function(options) {
        return new treeReport.fn.init(options);
    };
    //版本号
    treeReport.version = 104;
    //原型拓展
    treeReport.fn = treeReport.prototype = {
        init: function(options) {
            $("head").append('<style type="text/css">' +
                'div.treeReport{display: block;float: none;overflow: hidden; width: 900px;margin: 0 auto; text-align: center;vertical-align: middle;}' +
                'div.treeReport div{display: block;float: none; margin: 0px; text-align: center;vertical-align: middle; }' +
                'div.treeReport div.dwk_c{overflow: hidden; position: relative;padding-top: 30px;}' +
                'div.treeReport div.bsnum{float: left;margin: 0px; padding: 0 2px;border-radius: 4px;}' +
                'div.treeReport div.bjk_c{border-bottom: solid 0px #000;position: relative;border-radius: 4px;}' +
                'div.treeReport em.shuxian_c{position: absolute; top: -30px; font-size: 30px; left: 49%;}' +
                'div.treeReport div.dwk_c div.bsnum div.bjk_c span{display: inline-block;text-align: center;vertical-align: middle;' +
                '    font-size: 14px;border: solid 0px #000; border-bottom: solid 0px #000; padding: 6px 2px;font-size: 13px;border-radius: 4px;}' +
                '.hong{background-color: #FF0000;}.lan{background-color: #0000FF;}.huang{background-color: #FFFF00;}.lv{background-color: #00FF00;}' +
                '</style>');
            treeReport.fn._initHTML(options);
        },
        _initHTML: function(options) {
            var html = '';
            var a = options.list.length;
            if (a > 0) {
                var listHtml = '';
                listHtml += '<div class="dwk_c">';
                for (var i = 0; i < a; i++) {
                    var color = treeReport.fn._backgroundColor(options.list[i]);
                    listHtml += '<div class="bsnum"><div class="bjk_c ' + color + '"><span class="wujt">' + options.list[i].text + '</span></div>';
                    listHtml += treeReport.fn._initListHTML(options.list[i].sublevel);
                    listHtml += '</div>';
                }
                listHtml += '</div>';
                options.boxId.html(listHtml);
                treeReport.widthInitTreeReport(options);
            }
        },
        _initListHTML: function(data) {
            var a = data.length;
            if (a > 0) {
                var listHtml = '';
                listHtml += '<div class="dwk_c">';
                for (var i = 0; i < a; i++) {
                    var color = treeReport.fn._backgroundColor(data[i]);
                    listHtml += '<div class="bsnum"><div class="bjk_c ' + color + '"><span>' + data[i].text + '</span></div>';
                    listHtml += treeReport.fn._initListHTML(data[i].sublevel);
                    listHtml += '</div>';
                }
                listHtml += '</div>';
                return listHtml;
            } else {
                return "";
            }
        },
        _backgroundColor: function(data) {
            var a = parseInt(3 * Math.random()) //0-2
            var color = ["hong", "huang", "lv"];
            return color[a];
        }
    }
    treeReport.prototype.init.prototype = treeReport.prototype;

    treeReport.widthInitTreeReport = function(options) {
        var a = options.boxId.find(".bjk_c").size();
        var lieNum = 1;
        for (var i = 0; i < a; i++) {
            if (options.boxId.find(".bjk_c").eq(i).next().length == 0) {
                lieNum++;
            }
        }
        var f = (options.boxId.width() / (lieNum)) - 8;
        $(".bsnum span").width(f);
        $(".bjk_c").prepend('<em class="shuxian_c fa fa-long-arrow-down"></em>');
        $(".wujt").parent().find("em").remove();
        var h = options.boxId.find(".bjk_c").size();
        for (var i = 0; i < h; i++) {
            if (($(".bjk_c").eq(i).find("span").width() + 40) < $(".bjk_c").eq(i).width()) {
                $(".bjk_c").eq(i).find("span").attr("style", "");
                $(".bjk_c").eq(i).find("span").width($(".bjk_c").eq(i).find("span").width() + 30);
            }
        }
    }

    treeReport.initTree = function(options) {
        defaults = {
            boxId: '',
            list: []
        };
        settings = $.extend(defaults, options);
        return new treeReport.fn.init(settings);
    };
    window.treeReport = treeReport;
})(window);