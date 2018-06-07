var topNavigationTextHtml = '';
var tab = {
    pushStatePopstate: function(url) {
        if (url == undefined || url == null || url == "" || url == "/" || url.toString().length < 3) {
            url = "views/home";
        }
        var stateObject = {
            url: url
        };
        var _url = (url.indexOf(".html") != -1) ? url.split(".html")[0] : url;
        var newUrl = cbl.pages + "index.html#/" + _url;
        history.pushState(stateObject, null, newUrl);
    },
    jumpPage: function(url) {
        var _url = url;
        main.getHtml(_url, function(res) {
            cbl.selfContentBody.html('');
            cbl.selfContentBody.html(res);
            tab.pushStatePopstate(_url);
            main.initLinkScript();
        });
    }
};