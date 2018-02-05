function addJsLoad(options) {
    var js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', options.url);
    document.getElementsByTagName('body')[0].appendChild(js);
    if (js.readyState) {
        js.onreadystatechange = function() {
            if (js.readyState == "loaded" || js.readyState == "complete") {
                js.onreadystatechange = null;
                if (options.callback && typeof(options.callback) == "function") {
                    options.callback();
                }
            }
        };
    } else {
        js.onload = function() {
            if (options.callback && typeof(options.callback) == "function") {
                options.callback();
            }
        };
    }
}

var cache = {
    set: function(k, v) {
        if (typeof(localStorage === 'object') && window.localStorage) {
            window.localStorage.setItem(ca + k + cb, v);
        } else {
            console.log(20002);
            return false;
        }
    },
    get: function(k) {
        if (typeof(localStorage === 'object') && window.localStorage) {
            return window.localStorage.getItem(ca + k + cb);
        } else {
            console.log(20002);
            return false;
        }
    }
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
var ca = "loginty2u_usernamep3lkjh4gfds=5azxcvbnm";
var cb = "QAZ6WSX7userinfo_RFV9TGBYHNcode=IKOLP";
var urlJson = searchParse();
var LSTJSPAGE = document.getElementById("LSTJSPAGE");
LSTJSPAGE.innerHTML = '';
var app = '';
if (urlJson && urlJson.jp) {
    addJsLoad({
        url: 'js/jsPage/' + urlJson.jp + '.js',
        callback: function() {

        }
    })
} else {
    addJsLoad({
        url: 'js/jsPage/jsPage.js',
        callback: function() {

        }
    })
}