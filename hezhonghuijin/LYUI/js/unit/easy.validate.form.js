(function() {
    var $, _this, evf, _evf, _options, _evfJson, evfRules;
    var s_array = [],
        verificationResult = true;
    $ = jQuery;
    $.fn.extend({
        easyform: function(options) {
            _this = $(this);
            var _result = new evf(_this).init(_this);
            //console.log(_result);
            return verificationResult;
            //return new evf(_this).init(_this);
        },
        getformdata: function(options) {
            _this = $(this);
            return _this.serializeDOMArray();
        }
    });
    evf = (function(_this) {
        _this = this;
        evf.prototype.init = function(_this) {
            verificationResult = true;
            _evfJson = _this.serializeDOMArray();
            $.each(_evfJson, function(k, v) {
                if (verificationResult) {
                    var _thisKey = $("[name=" + k + "]");
                    _evfTipsFunction(_thisKey);
                }
            });
            return verificationResult;
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
            var result = _evfJsonValidate(_thisKey.attr("name"), _thisKey.val(), msgName);
            var b_leg = s_array.length;
            verificationResult = true;
            for (var i = 0; i < b_leg; i++) {
                if (s_array[i].jg == "n") {
                    verificationResult = false;
                    //_evfJsonValidateTips(s_array[i].msg, _thisKey);
                    _evfJsonValidateLayerTips(s_array[i].msg, _thisKey);
                }
            }
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
                    //s_array.push(s);
            } else {
                s = {
                    jg: "n",
                    msg: msgName + evfRules.validators[_thisKeyRules[i]].msg
                }
                s_array.push(s);
                return false;
            }
        }
        return s_array;
    }
    _evfJsonValidateLayerTips = function(msg, _thisK, type) {
        /*_thisK.css("background-color", "red");
        setTimeout(function() {
            _thisK.css("background-color", "#fff");
        }, 1500);*/
        var top = _thisK.offset().top;
        top = -parseInt($(window).height() / 2) + top + 42;
        layer.open({
            content: msg,
            skin: 'msg',
            time: 2,
            style: 'top:' + top + 'px;'
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
                        return value
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
                        return value
                    }
                }
            },
            zzs: { //正整数不包含0
                msg: '请填写正整数',
                get: function(value, field) {
                    if (!(/^[0-9]*[1-9][0-9]*$/.test(value))) {
                        return false;
                    } else {
                        return value
                    }
                }
            },
            email: {
                msg: '格式不正确',
                get: function(value, field) {
                    if (!(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value))) {
                        return false;
                    } else {
                        return value
                    }
                }
            },
            date: {
                msg: '格式不正确',
                get: function(value, field) {
                    if (!(/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(value))) {
                        return false;
                    } else {
                        return value
                    }
                }
            },
            only: {
                msg: '格式不正确',
                get: function(value, field) {
                    if (value) {
                        return false;
                    } else {
                        return value
                    }
                }
            }
        }
    }
    $.fn.serializeDOMArray = function() {
        var params = [];
        var s = {};
        if (this.get(0).tagName == "FORM") {
            params = this.serializeArray();
        } else {
            this.wrap('<form id="NotRepeatId"></form>');
            params = $("#NotRepeatId").serializeArray();
            this.insertAfter($("#NotRepeatId"));
            $("#NotRepeatId").remove();
        }
        $.each(params, function(i, v) {
            s[v.name] = decodeURIComponent(v.value);
        });
        return s;
    }

    $.fn.selectTextInputVal = function() {
        var params = [];
        var s = {};
        this.find("textarea").each(function(a, b) {
            _thisTextarea = $(b);
            if (_thisTextarea.attr("name") != undefined && _thisTextarea.attr("name").length > 1) {
                var _thisTextareaName = _thisTextarea.attr("name");
                s[_thisTextareaName] = _thisTextarea.val();
            }
        });
        this.find("input").each(function(a, b) {
            _thisInput = $(b);
            if (_thisInput.attr("name") != undefined && _thisInput.attr("name").length > 1 && _thisInput.attr("type") != undefined) {
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
            _thisSelect = $(b);
            if (_thisSelect.attr("name") != undefined && _thisSelect.attr("name").length > 1) {
                s[_thisSelect.attr("name")] = _thisSelect.find("option:selected").text();
            }
        });
        return s;
    }
}).call(this)