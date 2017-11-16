"use strict";

var UC = {
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
    searchParse: function() {
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
                resultObj[kv[0]] = typeof kv[1] === "undefined" ? "" : kv[1];
            }
        }
        return resultObj;
    },
    getJsonLength: function(jsonData) {
        var jsonLength = 0;
        for (var item in jsonData) {
            jsonLength++;
        }
        return jsonLength;
    },
    serializeDOMArray: function(_this) {
        var params = [];
        var s = {};
        if (_this.get(0).tagName == "FORM") {
            params = _this.serializeArray();
        } else {
            _this.wrap('<form id="NotRepeatId"></form>');
            params = $("#NotRepeatId").serializeArray();
            _this.insertAfter($("#NotRepeatId"));
            $("#NotRepeatId").remove();
        }
        $.each(params, function(i, v) {
            s[v.name] = decodeURIComponent(v.value);
        });
        return s;
    },
    selectTextInputVal: function(_this) {
        var params = [];
        var s = {};
        _this.find("input").each(function(a, b) {
            _thisInput = $(b);
            if (_thisInput.attr("name") != undefined && _thisInput.attr("name").length > 1 && _thisInput.attr("type") != undefined) {
                var _thisInputName = _thisInput.attr("name");
                var _thisInputType = _thisInput.attr("type");
                if (_thisInputType == "text") {
                    s[_thisInputName] = _thisInput.val();
                } else if (_thisInputType == "radio") {
                    s[_thisInputName] = $("input[name=" + _thisInputName + "]:checked").val();
                } else if (_thisInputType == "checkbox") {
                    var chk_value = [];
                    $('input[name=' + _thisInputName + ']:checked').each(function() {
                        chk_value.push($(this).val());
                    });
                    s[_thisInputName] = chk_value;
                }
            }
        });
        _this.find("select").each(function(a, b) {
            _thisSelect = $(b);
            if (_thisSelect.attr("name") != undefined && _thisSelect.attr("name").length > 1) {
                s[_thisSelect.attr("name")] = _thisSelect.find("option:selected").text();
            }
        });
        return s;
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
    }
};

if (typeof(define) == 'function') {
    define(['jquery'], function($) {　　　　
        return {
            UC: UC　　　　
        };　　
    });
}