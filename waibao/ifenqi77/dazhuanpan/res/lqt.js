function SetAdInfo(cb) {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'http://f.kjduobao.com/Ajax/AjaxAd.ashx/AdMonitor',
        data: JSON.stringify(kjad),
        dataType: 'json',
        success: function (result) {
           
                if (cb)
                    cb();
            
        }
    });
}

function GetQueryString(tag) {
    var reg = new RegExp('(^|&)' + tag + '=([^&]*)(&|$)');
    var url = window.location.href;
    var r = url.substr(url.indexOf('?') + 1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
//唯一标识
function GetSign() {
    if (getCookie('ad_user') == null)
        SetCookie('ad_user', new Date().getTime());
    return getCookie('ad_user');
}
//移动设备
function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad)
        return "ipad";
    else if (bIsIphoneOs)
        return "iphone os";
    else if (bIsMidp)
        return "midp";
    else if (bIsUc7)
        return "rv:1.2.3.4";
    else if (bIsUc)
        return "ucweb";
    else if (bIsAndroid)
        return "android";
    else if (bIsCE)
        return "windows ce";
    else if (bIsWM)
        return "windows mobile";
    else
        return "pc";
}

//两个参数，一个是cookie的名子，一个是值
function SetCookie(name, value) {
    name = name + '_' + GetPort();
    var Days = 1; //此 cookie 将被保存 30 天
    var exp = new Date();    //new Date('December 31, 9998');
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
}
//取cookies函数   
function getCookie(name) {
    name = name + '_' + GetPort();
    var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
    if (arr != null) return decodeURI(arr[2]); return null;

}
//删除cookie
function delCookie(name) {
    name = name + '_' + GetPort();
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
}

//获取端口
function GetPort() {
    if (document.location.host.split(':').length > 0)
        return document.location.host.split(':')[1];
    else return 80;
}
