"use strict";

var UP = {
    H5: {
        Config: {
            STORAGE_PREFIX: "136a3d039748S",
            LOCALSTORAGE_PREFIX: "136a3d039782L",
            COOKIE_PREFIX: "136a3d039794C"
        }
    },
    Storage: {
        setCommonUseLocalStorage: function(key, val) {
            if ($("html").html().indexOf("json2html/json2html.js") == -1) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = baseUrl + "/html/js/plugins/json2html/json2html.js";
                document.body.appendChild(script);
            }
            localStorage.setItem(H5.Config.LOCALSTORAGE_PREFIX + key, JSON.stringify(val));
        },
        getCommonUseLocalStorage: function(key) {
            if ($("html").html().indexOf("json2html/json2html.js") == -1) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = baseUrl + "/html/js/plugins/json2html/json2html.js";
                document.body.appendChild(script);
            }
            return JSON.parse(localStorage.getItem(H5.Config.LOCALSTORAGE_PREFIX + key));
        },
        setSessionStorage: function(key, val) {
            sessionStorage.setItem(H5.Config.STORAGE_PREFIX + key, val);
        },
        setLocalStorage: function(key, val) {
            localStorage.setItem(H5.Config.LOCALSTORAGE_PREFIX + key, val);
        },
        setCookie: function(key, val, da) {
            if (da == null) da = 30;

            if (da == 0) {
                $.cookie(H5.Config.COOKIE_PREFIX + key, val);
            } else {
                $.cookie(H5.Config.COOKIE_PREFIX + key, val, {
                    expires: da
                });
            }
        },
        getFromSessionStorage: function(key) {
            return sessionStorage.getItem(H5.Config.STORAGE_PREFIX + key);
        },
        getFromLocalStorage: function(key) {
            return localStorage.getItem(H5.Config.LOCALSTORAGE_PREFIX + key);
        },
        getCookie: function(key) {
            return $.cookie(H5.Config.COOKIE_PREFIX + key);
        },
        removeSessionStorage: function(key) {
            sessionStorage.removeItem(H5.Config.STORAGE_PREFIX + key);
        },
        removeLocalStorage: function(key) {
            localStorage.removeItem(H5.Config.LOCALSTORAGE_PREFIX + key);
        },
        removeCookie: function(key) {
            $.cookie(H5.Config.COOKIE_PREFIX + key, '', {
                expires: -1
            }); // 删除 cookie
        }
    },
    Format: {
        isPositiveNum(s) { //是否为正整数  
            var re = /^[0-9]*[1-9][0-9]*$/;
            return re.test(s)
        },
        validChineseIDCard: function(id) {
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

            // 15位身份证号
            // 2013年1月1日起将停止使用
            // http://www.gov.cn/flfg/2011-10/29/content_1981408.htm
            function rid15(id) {
                var pattern = /^[1-9]\d{5}(\d{2})(\d{2})(\d{2})\d{2}[\dxX]$/,
                    matches, y, m, d, date;
                matches = id.match(pattern);
                if (matches == null)
                    return false;
                y = +('19' + matches[1]);
                m = +matches[2];
                d = +matches[3];
                date = new Date(y, m - 1, d);
                return (date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d);
            }

            return rid18(id); // || rid15(id); // We will only allow 18 digits ID cards 
        },
        isPhoneNumber: function(value) {
            return /^1[34578]\d{9}$/.test(value);
        },
        isDoubleNum: function(value) {
            return /^[-\+]?\d+\.?\d{0,2}$/.test(value);
        }
    }
};　
if (typeof(define) == 'function') {
    define(['jquery'], function($) {　　　
        return {
            UP: UP　　　　
        };　　
    });
}