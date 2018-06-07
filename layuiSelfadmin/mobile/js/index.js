var initLoading = {
    initIndexHomePage: function() {
        var stateObject = {
            url: "views/home",
            title: lang.NAME
        };
        var newUrl = cbl.pages + "index.html#/views/home";
        history.pushState(stateObject, lang.NAME, newUrl);
    },
    condition: function() {
        if (typeof(Worker) == "function" && typeof(JSON) == "object" && typeof(window.applicationCache) == "object") {
            var all_url = window.location.href;
            if (all_url) {
                if (all_url.indexOf("pages/index.html#views/home") != -1) {
                    initLoading.initIndexHomePage();
                } else {
                    all_url = all_url.split("/pages/index.html#/")[1];
                    tab.jumpPage(all_url);
                }
            } else {
                initLoading.initIndexHomePage();
                window.location.href = cbl.pages + "index.html#/views/home";
            }
            window.onpopstate = function(event) {
                //alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
                var now_url = window.location.href.toString();
                if (event && event.state && event.state.url) {
                    var url = event.state.url;
                    console.log(url);
                    if (url == "" || url == undefined || url == null) {
                        url = "views/home";
                    }
                    tab.jumpPage(url);
                } else {
                    tab.jumpPage("views/home");
                }
            };
        } else {
            window.location.href = "modules/downloadBrowser.html";
        }
    }
}
$(function() {
    initLoading.condition();
});