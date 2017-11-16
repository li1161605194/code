function AjaxRequest(url, data, successfun, errorfun) {
    $.ajax({
        url: url,
        type: "POST",
        dateType: "json",
        data: data,
        success: successfun,
        error: errorfun
    });
}

function AjaxRequestWithGet(url, data, successfun, errorfun) {
    $.ajax({
        url: url,
        type: "GET",
        dateType: "json",
        data: data,
        success: successfun,
        error: errorfun
    });
}

function getParams(url) {
    if (url.indexOf("?") == -1) {

    } else {
        if (url === undefined || typeof(url) != 'string') {
            return null;
        }
        items = url.split('?')[1].split('&');
        var json = {};
        for (var i = 0; i < items.length; i++) {
            var item = items[i].split('=');
            json[item[0]] = item[1] == undefined ? "" : item[1];
        }
        //console.info(json);
        return json;
    }
}
function strToJson(str){ 
var json = eval('(' + str + ')'); 
return json; 
} 
actionNotice = function(data) {
    var params = {};
    params.msg = "操作执行";
    params.time = 3000;
    params.fontcolor = "#3A87ADe";
    params.bgcolor = "#D9EDF7";
    if (data) {
        $.each(data, function(i) {
            params[i] = data[i];
        });
    } else {

    }
    $('#succ_msg').clearQueue().remove();
    var screen_width = $(window).width() / 2 - 300 / 2;
    var screen_height = $(window).height() / 2 - 40 / 2;
    var html = '<div id="succ_msg" style="_position:absolute;display:none;padding: 15px;position:fixed;top:' + screen_height + 'px;z-index:9999999999;width:300px;left:' + screen_width + 'px;border-radius: 4px;background-color: ' + params.bgcolor + ';border-color: #BCE8F1;color:' + params.fontcolor + ' ;font-size:14px;line-height:26px;text-align:center;font-weight:bold;">' + params.msg + '</div>';
    $('body').append(html);
    $("#succ_msg").fadeIn(500);
    setTimeout(function() {
        $("#succ_msg").fadeOut(500);
    }, params.time);
}
getMaxHeight= function(elms) {
    var maxHeight = 0;
    elms.each(function() {
        var height = $(this).height();
        if(height > maxHeight) {
            maxHeight = height;
        }
    });
    return maxHeight;
}

var headerhtml='<div class="bd-w1200 tou-dwk"><div class="tou-common fll">'+
'<img style="margin-top: 12px;" class="logoimg" alt="" src="img/page/logo.png">'+
'</div><div class="tou-common flr"><span class="loginan"><a href="dazhuanpan/index.html">幸运大转盘</a></span>'+
'</div><div class="tou-common flr"><span class="telnum"><a href="download.html">app下载</a></span>'+
'</div><div class="tou-common flr"><span class="loginan">登录</span>'+
'</div><div class="tou-common flr"><span class="telnum">电话:0375-7016870</span>'+
'</div><div class="tou-common flr">'+
'<img style="margin-top: 17px;" class="logoimg" alt="" src="img/page/tel.png">'+
'</div></div>';

var footerhtml='<div class="bd-w1200 footerdwk"><p style="margin-top: 55px;" class="footerpsm-common bd-w1200">平顶山市峰飞网络科技有限公司<a style="color: #fff;" href="http://www.fengfei77.com">www.fengfei77.com</a>版权所有</p><p class="footerpsm-common bd-w1200">豫ICP备-16021814</p></div>';