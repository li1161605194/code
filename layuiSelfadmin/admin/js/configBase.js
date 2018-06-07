layui.define(function(exports) {
    var configBase = {
        url: window.location.origin,
        hostname: window.location.hostname,
        protocol: window.location.protocol,
        xmName: "admin",

        vm: "vmCtrl",
        vmId: $("#vmId"),
        selfContentBody: $("#selfContentBody"),
        selfHeader: $("#selfHeader"),
        selfLeftMenu: $("#selfLeftMenu"),
        selfuiFooter: $("#selfuiFooter"),
        selfUserName: "#selfUserName",
        selfLoginOut: "#selfLoginOut",

        limit: 15,
        limits: [15, 30, 50, 100],

    };
    configBase.posturl = configBase.url + "/";
    configBase.baseurl = configBase.url + "/" + configBase.xmName + "/";
    configBase.pages = configBase.baseurl + "pages/";
    configBase.js = configBase.baseurl + "js/";
    configBase.json = configBase.baseurl + "json/";
    configBase.css = configBase.baseurl + "css/";
    configBase.img = configBase.baseurl + "img/";

    exports('configBase', configBase);
});