var element, form, layer, configBase, lang, tab, main, common, upload;
var initLoading = {
    initIndexHomePage: function() {
        var stateObject = {
            url: "home/home",
            title: lang.NAME
        };
        var newUrl = configBase.pages + "index.html#/home/home";
        history.pushState(stateObject, lang.NAME, newUrl);
    },
    condition: function() {
        if (typeof(Worker) == "function" && typeof(JSON) == "object" && typeof(window.applicationCache) == "object") {
            layui.use(['element', 'form', 'table', 'laypage', 'layer', 'configBase', 'lang', 'tab', 'main', 'common'], function() {
                element = layui.element,
                    form = layui.form,
                    table = layui.table,
                    laypage = layui.laypage,
                    layer = layui.layer,
                    configBase = layui.configBase,
                    lang = layui.lang,
                    tab = layui.tab,
                    main = layui.main,
                    common = layui.common;

                var all_url = window.location.href;
                if (all_url) {
                    if (all_url.indexOf("pages/index.html#home/home") != -1) {
                        initLoading.initIndexHomePage();
                    } else {
                        all_url = all_url.split("/pages/index.html#/")[1];
                        tab.tabRefresh(all_url);
                    }
                } else {
                    initLoading.initIndexHomePage();
                    window.location.href = configBase.pages + "index.html#/home/home";
                }
            });
        } else {
            window.location.href = "modules/downloadBrowser.html";
        }
    }
}
initLoading.condition();

window.onpopstate = function(event) {
    //alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
    var now_url = window.location.href.toString();
    if (event && event.state && event.state.url) {
        var url = event.state.url;
        console.log(url);
        if (url == "" || url == undefined || url == null) {
            url = "home/home";
        }
        tab.tabRefresh(url, 1);
    } else {
        tab.tabRefresh("home/home", 1);
    }
};