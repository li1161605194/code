var weixinjiami, wxlink;
var appId = "wx4f176740b164782e",
    appSecret = "c2610a643639ac3f6471348410cebe0f",
    timestampToDay = new Date().getTime(),
    nonceString = "bfiDFufesjGThndGFgher",
    urlajax = window.location.href;

$(function() {
    if (window.location.href.indexOf("version") == -1) {
        window.location.href = window.location.href + "?version=" + Math.random(99999);
    }
    if (isWeiXin()) {
        accon();
    }
})

var wxtitle = "木木子易";
var wxdesc = "偷得浮生半日闲";
var wximgurl = "http://lstcode.applinzi.com/res/img/wxshare/wxshare.jpg";

function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

wx.ready(function() {
    wx.onMenuShareAppMessage({
        title: wxtitle, // 分享标题
        desc: wxdesc,
        link: urlajax, // 分享链接
        imgUrl: wximgurl, // 分享图标
        success: function() {
            // 用户确认分享后执行的回调函数
            //alert("success");
        },
        cancel: function() {
            alert(1);
        }
    });
    wx.onMenuShareTimeline({
        title: wxtitle, // 分享标题
        link: urlajax, // 分享链接
        imgUrl: wximgurl, // 分享图标
        success: function() {
            // 用户确认分享后执行的回调函数
        },
        cancel: function() {
            alert(2);
        }
    });
});


function accon() {
    var access_token = localStorage.getItem("access_token");
    var ticket = localStorage.getItem("ticket");
    if (ticket && ticket.length > 1 && ((parseInt(new Date().getTime()) - parseInt(ticket.split("&")[1])) < 7000000)) {
        signweixin(ticket.split("&")[0]);
    } else {
        $.ajax({
            url: "http://lstcode.applinzi.com/lstaiyg/get.php",
            type: 'POST',
            dataType: 'json',
            data: {
                "urlParams": "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appId + "&secret=" + appSecret
            },
            success: function(res1) {
                localStorage.setItem("access_token", res1.access_token + "&" + new Date().getTime());
                $.ajax({
                    url: "http://lstcode.applinzi.com/lstaiyg/get.php",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        "urlParams": "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + res1.access_token + "&type=jsapi"
                    },
                    success: function(res2) {
                        var data = res2.ticket;
                        localStorage.setItem("ticket", res2.ticket + "&" + new Date().getTime());
                        signweixin(res2.ticket);
                    }
                });
            }
        });
    }
}

function signweixin(data) {
    var signtrue = "jsapi_ticket=" + data.toString() + "&noncestr=" + nonceString + "&timestamp=" + timestampToDay.toString() + "&url=" + urlajax.split("#")[0].toString();
    weixinjiami = $.sha1(signtrue);
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestampToDay, // 必填，生成签名的时间戳
        nonceStr: nonceString, // 必填，生成签名的随机串
        signature: weixinjiami, // 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
}