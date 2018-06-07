var cbl = {
    url: window.location.origin,
    hostname: window.location.hostname,
    protocol: window.location.protocol,
    xmName: "mobile",
    vm: "vmCtrl",
    vmId: $("#vmId"),
    selfContentBody: $("#selfContentBody")
};
cbl.posturl = cbl.url + "/";
cbl.baseurl = cbl.url + "/" + cbl.xmName + "/";
cbl.pages = cbl.baseurl + "pages/";
cbl.js = cbl.baseurl + "js/";
cbl.json = cbl.baseurl + "json/";
cbl.css = cbl.baseurl + "css/";
cbl.img = cbl.baseurl + "img/";

var lang = {
    NAME: "易享优车",
    HOMENAME: "首页",
    KONGTIPS: "未填写|暂未空",
    SEXM: "男",
    SEXW: "女",
    USERTYPEU: "普通用户",
    USERTYPEA: "管理账号",
    ROLETYPEU: "客户端角色",
    ROLETYPEA: "管理端角色",
    ROLESTATUSY: "可用",
    ROLESTATUSN: "禁用",
};