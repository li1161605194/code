var onlyid_form = '',
    pushid_to = '';
onlyid_form = window.localStorage.getItem("onlyid_form");
if (onlyid_form != undefined && onlyid_form != null && onlyid_form != "") {
    //window.localStorage.setItem("onlyid_form", new Date().getTime().toString() + parseInt(Math.random() * 123456789).toString());
    onlyid_form = window.localStorage.getItem("onlyid_form");
} else {
    window.localStorage.setItem("onlyid_form", new Date().getTime().toString() + parseInt(Math.random() * 123456789).toString());
    onlyid_form = window.localStorage.getItem("onlyid_form");
}
var RECEPUSH = function(options) {

    _RECEPUSH = RECEPUSH.prototype;

    _RECEPUSH.init = function() {
        var _options = {
            pd: "$^#&#^$",
            SubscribeKey: "BS-3e4d6c3cf9834766ae81b000d172343e",
            Commonkey: "BC-c277a47659194c2ebd0ce76290d4ffc9"
        };
        mergeJSON(_options, options);
        goEasy = new GoEasy({
            appkey: options.Commonkey,
            onConnected: function() {
                console.log(123);
            },
            onDisconnected: function() {
                console.log(456);
            },
            onConnectFailed: function(error) {
                console.log("连接失败，错误编码：" + error.code + "错误信息：" + error.content);
            }
        });
    };
    _RECEPUSH.pushchannel = function(opt) {
        goEasy.publish({
            channel: opt.channel,
            message: _RECEPUSH.pushMessage(opt.message),
            onSuccess: function() {
                opt.succfun();
            },
            onFailed: function(error) {
                console.log("消息发送失败，错误编码：" + error.code + " 错误信息：" + error.content);
            }
        });
    };
    _RECEPUSH.receivechannel = function(opt) {
        goEasy.subscribe({
            channel: opt.channel,
            onMessage: function(message) {
                var zmsg = message.content;
                var zz = zmsg.split(options.pd);
                var zzleg = zz.length;
                var arr = [];
                for (var a = 0; a < zzleg; a++) {
                    arr.push(zz[a]);
                }
                opt.receiveMessage(arr);
            },
            onSuccess: function() {},
            onFailed: function(error) {
                console.log("Channel订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
            }
        });
    };
    _RECEPUSH.pushMessage = function(data) {
        if (typeof(data) == "object") {
            var leg = data.length;
            var str = "";
            if (leg < 1) {
                console.log("pushMessage失败，错误编码：10035");
            } else {
                for (var a = 0; a < leg; a++) {
                    if (a == (leg - 1)) {
                        str += data[a];
                    } else {
                        str += data[a] + options.pd;
                    }
                }
                return str;
            }
        } else if (typeof(data.toString()) == "string") {
            return data;
        } else {
            console.log("pushMessage失败，错误编码：10036");
        }
    };
}

function mergeJSON(minor, main) {
    var z_new_j = {};
    for (var key in minor) {
        if (isJSON(minor[key])) {
            arguments.callee(minor[key], main[key]);
        }
        if (main[key] === undefined) {
            main[key] = minor[key];
            z_new_j[key] = minor[key];
            continue;
        } else if (main[key] != undefined && !isJSON(minor[key])) {
            main[key] = minor[key];
            z_new_j[key] = minor[key];
            continue;
        }
    }
    return main;
}

function isJSON(target) {
    return typeof target == "object" && target.constructor == Object;
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

var urlJson = searchParse();