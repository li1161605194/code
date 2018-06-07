(function() {
    var $, _this, evf, _evf, _options, _evfJson, evfRules;
    var s_array = [],
        verificationResult = true;
    $ = jQuery;
    $.fn.extend({
        easyform: function(options) {
            var _r = new evf();
            var _result = _r.init($(this));
            return verificationResult;
        },
        getformdata: function(options) {
            _this = $(this);
            return _this.serializeDOMArray();
        }
    });
    evf = (function() {
        evf.prototype.init = function(_this) {
            _evfJson = _this.selectTextInputRules();
            for (var k in _evfJson) {
                var _thisKey = $("[name=" + k + "]");
                verificationResult = _evfTipsFunction(_thisKey);
                if (verificationResult) {} else {
                    return verificationResult;
                }
            }
        };
    });
    $("input").each(function(k, v) {
        if ($(v).attr("rules") && $(v).attr("rules").length > 1) {
            $(v).blur(function() {
                var _thisInputBlur = $(this);
                _evfTipsFunction(_thisInputBlur);
            });
        }
    });
    $("textarea").each(function(k, v) {
        if ($(v).attr("rules") && $(v).attr("rules").length > 1) {
            $(v).blur(function() {
                var _thisInputBlur = $(this);
                _evfTipsFunction(_thisInputBlur);
            });
        }
    });
    $("select").each(function(k, v) {
        if ($(v).attr("rules") && $(v).attr("rules").length > 1) {
            $(v).change(function() {
                var _thisInputBlur = $(this);
                _evfTipsFunction(_thisInputBlur);
            });
        }
    });
    _evfTipsFunction = function(_thisKey) {
        if (_thisKey.attr("rules") && _thisKey.attr("rules").length > 1) {
            var msgName = "";
            if (_thisKey.attr("msgname") && _thisKey.attr("msgname") != undefined) {
                msgName = _thisKey.attr("msgname");
            }
            verificationResult = _evfJsonValidate(_thisKey.attr("name"), _thisKey.val(), msgName);
            var b_leg = s_array.length;
            for (var i = 0; i < b_leg; i++) {
                if (s_array[i].jg == "n") {
                    _evfJsonValidateLayerTips(s_array[i].msg, _thisKey);
                    return verificationResult;
                    //_evfJsonValidateTips(s_array[i].msg, _thisKey);
                }
            }
            return verificationResult;
        }
    }
    _evfJsonValidate = function(k, v, msgName) {
        msgName = msgName != undefined ? msgName : "";
        s_array = [];
        var s = {};
        var _thisKey = $("[name=" + k + "]");
        var _thisKeyTagName = _thisKey.get(0).tagName;
        var _thisKeyType = _thisKeyTagName;
        var _thisKeyRules = "";
        if (_thisKeyTagName == "INPUT") {
            _thisKeyType = _thisKey.attr("type");
        }
        if (_thisKey.attr("rules") && _thisKey.attr("rules").length > 1) {
            _thisKeyRules = _thisKey.attr("rules").split(",");
        }
        var a_leg = _thisKeyRules.length;
        for (var i = 0; i < a_leg; i++) {
            var v_jg = evfRules.validators[_thisKeyRules[i]].get(v, _thisKey);
            if (v_jg) {
                s = {
                    jg: "y"
                }
                verificationResult = true;
                //s_array.push(s);
            } else {
                s = {
                    jg: "n",
                    msg: msgName + evfRules.validators[_thisKeyRules[i]].msg
                }
                s_array.push(s);
                verificationResult = false;
                return false;
            }
        }
        if (s_array.length == 0) {
            return verificationResult;
        } else {
            return verificationResult;
        }
        //return s_array;
    }
    _evfJsonValidateLayerTips = function(msg, _thisK, type) {
        /*_thisK.css("background-color", "red");
        setTimeout(function() {
            _thisK.css("background-color", "#fff");
        }, 1500);*/
        //var top = _thisK.offset().top;
        //top = -parseInt($(window).height() / 2) + top + 42;
        //top = parseInt($(window).height() / 2) + top;
        layer.open({
            content: msg,
            skin: 'msg',
            time: 3,
            style: 'top:' + -40 + 'px;'
        });
        verificationResult = false;
    }
    _evfJsonValidateTips = function(msg, _thisK, type) {
        _thisK.after('<div class="evfjgtips_c" style="">' + msg + '</div>');
        _evfJsonValidateTipsHide(_thisK);
    }
    _evfJsonValidateTipsHide = function(_thisInput) {
        setTimeout(function() {
            _thisInput.parent().find("div.evfjgtips_c").animate({
                "opacity": 0
            }, 500);
            setTimeout(function() {
                _thisInput.parent().find("div.evfjgtips_c").remove();
            }, 500);
        }, 1900);
    }
    evfRules = {
        validators: {
            min: {
                msg: '格式不正确',
                get: function(value, field) {
                    var num = field.attr("minlength");
                    if (value.toString().length != num) {
                        return false;
                    } else {
                        return value;
                    }
                }
            },
            max: {
                msg: '格式不正确',
                get: function(value, field) {
                    var num = field.attr("maxlength");
                    if (value.toString().length != num) {
                        return false;
                    } else {
                        return value;
                    }
                }
            },
            required: {
                msg: "必填不能为空",
                get: function(value, field) {
                    if (value === "" || value === null || value === undefined || value.toString().length === 0) {
                        return false;
                    } else {
                        return value;
                    }
                }
            },
            mobile: {
                msg: '格式不正确',
                get: function(value, field) {
                    if (!(/^1[34578]\d{9}$/.test(value))) {
                        return false;
                    } else {
                        return value;
                    }
                }
            },
            cph: {
                msg: '格式不正确',
                get: function(value, field) {
                    var ok = (/(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/.test(value))
                    if (!ok) {
                        return false;
                    } else {
                        return value;
                    }
                }
            },
            dph_vin: {
                msg: '格式不正确',
                get: function(value, field) {
                    var Arr = new Array();
                    var Brr = new Array();
                    Arr['A'] = 1;
                    Arr['B'] = 2;
                    Arr['C'] = 3;
                    Arr['D'] = 4;
                    Arr['E'] = 5;
                    Arr['F'] = 6;
                    Arr['G'] = 7;
                    Arr['H'] = 8;
                    Arr['J'] = 1;
                    Arr['K'] = 2;
                    Arr['L'] = 3;
                    Arr['M'] = 4;
                    Arr['N'] = 5;
                    Arr['P'] = 7;
                    Arr['R'] = 9;
                    Arr['S'] = 2;
                    Arr['T'] = 3;
                    Arr['U'] = 4;
                    Arr['V'] = 5;
                    Arr['W'] = 6;
                    Arr['X'] = 7;
                    Arr['Y'] = 8;
                    Arr['Z'] = 9;
                    Arr['1'] = 1;
                    Arr['2'] = 2;
                    Arr['3'] = 3;
                    Arr['4'] = 4;
                    Arr['5'] = 5;
                    Arr['6'] = 6;
                    Arr['7'] = 7;
                    Arr['8'] = 8;
                    Arr['9'] = 9;
                    Arr['0'] = 0;
                    Brr[1] = 8;
                    Brr[2] = 7;
                    Brr[3] = 6;
                    Brr[4] = 5;
                    Brr[5] = 4;
                    Brr[6] = 3;
                    Brr[7] = 2;
                    Brr[8] = 10;
                    Brr[9] = 0;
                    Brr[10] = 9;
                    Brr[11] = 8;
                    Brr[12] = 7;
                    Brr[13] = 6;
                    Brr[14] = 5;
                    Brr[15] = 4;
                    Brr[16] = 3;
                    Brr[17] = 2;

                    function getCheckVin(sVIN) {
                        var sKYZF = "ABCDEFGHJKLMNPRSTUVWXYZ1234567890";
                        var sJYW = '';
                        var bl = false;
                        var blKYZF = false;
                        if (sVIN.length == 17) {
                            var iJQS = 0,
                                intTemp = 0;
                            ht = Arr;
                            htZM = Brr;
                            try {
                                for (var i = 0; i < sVIN.length; i++) {
                                    if (sKYZF.indexOf(sVIN.substr(i, 1)) != -1) {
                                        blKYZF = true;
                                        iJQS = iJQS + parseInt(ht[sVIN.substr(i, 1)]) * parseInt(htZM[(i + 1)]);
                                    } else {
                                        blKYZF = false;
                                        break;
                                    }
                                }
                                if (blKYZF) {
                                    intTemp = iJQS % 11;
                                    if (intTemp == 10) {
                                        sJYW = "X";
                                    } else {
                                        sJYW = intTemp.toString();
                                    }
                                    if (sJYW == sVIN.substr(8, 1)) bl = true;
                                } else {
                                    bl = false;
                                }
                            } catch (err) {
                                bl = false;
                            }
                        }
                        return bl;
                    }
                    if (!getCheckVin(value)) {
                        return false;
                    } else {
                        return value;
                    }
                }
            },
            zzs: { //正整数不包含0
                msg: '请填写正整数',
                get: function(value, field) {
                    if (!(/^[0-9]*[1-9][0-9]*$/.test(value))) {
                        return false;
                    } else {
                        return value;
                    }
                }
            },
            email: {
                msg: '格式不正确',
                get: function(value, field) {
                    if (!(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value))) {
                        return false;
                    } else {
                        return value;
                    }
                }
            },
            date: {
                msg: '格式不正确',
                get: function(value, field) {
                    if (!(/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(value))) {
                        return false;
                    } else {
                        return value;
                    }
                }
            },
            only: {
                msg: '格式不正确',
                get: function(value, field) {
                    if (value) {
                        return false;
                    } else {
                        return value;
                    }
                }
            },
            idcard: {
                msg: '格式不正确',
                get: function(id, field) {
                    // 18位身份证号
                    // 国家标准《GB 11643-1999》
                    function rid18(id) {
                        if (!/^\d{17}[\dxX]$/.test(id)) {
                            return false;
                        }
                        var modcmpl = function(m, i, n) {
                                return (i + n - m % i) % i;
                            },
                            f = function(v, i) {
                                return v * (Math.pow(2, i - 1) % 11);
                            },
                            s = 0;
                        for (var i = 0; i < 17; i++) {
                            s += f(+id.charAt(i), 18 - i);
                        }
                        var c0 = id.charAt(17),
                            c1 = modcmpl(s, 11, 1);
                        return c0 - c1 === 0 || (c0.toLowerCase() === 'x' && c1 === 10);
                    }
                    if (!rid18(id)) {
                        return false;
                    } else {
                        return id;
                    }
                }
            }
        }
    }

    $.fn.selectTextInputRules = function() {
        var params = [];
        var s = {};
        this.find("textarea").each(function(a, b) {
            _thisTextarea = b;
            if (_thisTextarea.hasAttribute("name") && _thisTextarea.hasAttribute("rules")) {
                _thisTextarea = $(_thisTextarea);
                var _thisTextareaName = _thisTextarea.attr("name");
                s[_thisTextareaName] = _thisTextarea.val();
            }
        });
        this.find("input").each(function(a, b) {
            _thisInput = b;
            if (_thisInput.hasAttribute("name") && _thisInput.hasAttribute("rules") && _thisInput.hasAttribute("type")) {
                _thisInput = $(_thisInput);
                var _thisInputName = _thisInput.attr("name");
                var _thisInputType = _thisInput.attr("type");
                if (_thisInputType == "text" || _thisInputType == "number" || _thisInputType == "tel" || _thisInputType == "email") {
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
        this.find("select").each(function(a, b) {
            _thisSelect = b;
            if (_thisSelect.hasAttribute("name") && _thisSelect.hasAttribute("rules")) {
                _thisSelect = $(_thisSelect);
                s[_thisSelect.attr("name")] = _thisSelect.find("option:selected").text();
            }
        });
        return s;
    }
}).call(this)