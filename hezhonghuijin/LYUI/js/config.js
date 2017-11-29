const fileConfig = "/LYUI/";
let BaseUrl = {
    PATH: "/",
    JSPATH: "js/",
    CSSPATH: "css/",
    HTMLPATH: "html/",
    IMGPATH: "images/"
}

let prot = window.location.protocol;
let host = window.location.host;
let origin = window.location.origin;
let AjaxUrl = "";
if (prot.indexOf("file:") != -1) {
    AjaxUrl = "";
} else if (prot.indexOf("http:") != -1) {
    AjaxUrl = prot + "//" + host + "/";
} else if (prot.indexOf("https:") != -1) {
    AjaxUrl = prot + "//" + host + "/";
}
let href = window.location.href;
href = href.split(fileConfig)[0] + fileConfig;
BaseUrl = {
    PATH: href,
    JSPATH: href + "js/",
    CSSPATH: href + "css/",
    HTMLPATH: href + "html/",
    IMGPATH: href + "images/"
}
console.log(BaseUrl);
console.log(AjaxUrl);