var wxCommon = {
    authorityLevel: function(level) {
        if (level) {} else {
            level = 1;
        }
        if (sfwx == 1) {
            if (level == 1) {
                wxMember.noWeCatNoMember();
            } else if (level == 2) {
                wxMember.WeCatNoMember();
            } else if (level == 3) {
                wxMember.noWeCatMember();
            } else if (level == 4) {
                wxMember.WeCatMember();
            } else if (level == 5) {
                wxCommon.initUse();
            } else {
                layer.open({
                    content: '请联系管理员[code:10001]' + JSON.stringify(res),
                    skin: 'msg',
                    time: 2
                });
            }
        } else if (sfwx == 4) {

        } else {

        }
    },
    signature: function(url) {
        r_post_jsons("weixin/getTicket.shtml", {
            url: url
        }, function(res) {
            wx.config({
                debug: false,
                appId: res.appId,
                timestamp: res.timestamp,
                nonceStr: res.nonceStr,
                signature: res.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onVoiceRecordEnd',
                    'playVoice',
                    'onVoicePlayEnd',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard'
                ]
            });
            wx.ready(function() {
                wx.error(function(res) {
                    //console.log(JSON.stringify(res))
                });
                wx.checkJsApi({
                    jsApiList: ['chooseImage'],
                    success: function(res) {
                        //console.log(JSON.stringify(res))
                    }
                });
                if (hrefUrl.indexOf("share") == -1) {
                    wx.hideAllNonBaseMenuItem();
                }
            });
        });
    },
    getMyMember: function(callback) {
        //alert("456" + "---" + common.cache.get("usid") + "--" + common.cache.get("unid"));
        if (common.isKong(common.cache.get("unid"))) {
            window.location.href = wx_sq_href + "&state=" + window.location.href + "#wechat_redirect";
        } else {
            var _orgid = "";
            if (common.isKong(common.cache.get("orgid"))) {
                _orgid = "1";
            } else {
                _orgid = common.cache.get("orgid");
            }
            //alert("789" + "---" + _orgid + "--" + common.cache.get("unid"));
            r_post_jsons("web/member/getMyMember.shtml", {
                "companyId": common.cache.get("orgid")
            }, function(res) {
                //alert(JSON.stringify(res));
                if (res && res.data) {
                    common.cache.set("userinfo", JSON.stringify(res.data));
                    if (callback) {
                        callback();
                    }
                } else {
                    layer.open({
                        content: '请联系管理员[code:30001]' + JSON.stringify(res),
                        skin: 'msg',
                        time: 2
                    });
                    return false;
                }
            });
        }
    },
    initUse: function() {
        var href = window.location.href;
        if (common.isKong(common.cache.get("usid"))) {} else {
            wxCommon.getMyMember();
        }
        if (common.isKong(common.cache.get("unid"))) {
            if (sfwx == 1) {
                if (href.indexOf("wx_yn.html?") != -1) {
                    r_post_jsons("weixin/oauth2Userinfo.shtml", {
                        code: urlJson.code
                    }, function(res) {
                        if (res && res != undefined && res.unionid != undefined) {
                            common.cache.set("wxMemberInfo", JSON.stringify(res));
                            if (!common.isKong(res.userid) && common.isKong(common.cache.get("usid"))) {

                            }
                            //window.localStorage.clear();
                            //alert(JSON.stringify(res));
                            common.cache.set("unid", res.unionid);
                            common.cache.set("usid", res.userid);
                            common.cache.set("username", res.username);
                            common.cache.set("orgid", res.orgid);
                            common.cache.set("orgname", res.orgname);
                            common.cache.set("statemsg", res.statemsg);
                            var state = urlJson.state;
                            //alert(JSON.stringify(urlJson));
                            if (!common.isKong(urlJson.state)) {
                                window.location.href = state;
                            } else {
                                window.location.href = rootDirectory + "pages/views/index.html";
                            }
                        } else {
                            layer.open({
                                content: '请重新授权登录[code:3002]' + JSON.stringify(res),
                                skin: 'msg',
                                time: 2
                            });
                            return false;
                        }
                    });
                }

            } else if (sfwx == 4) {

            }
        } else {
            //if (href.indexOf("wx_yn.html?") == -1) {
            r_post_jsons("oauth/weixinlogin.shtml", {
                "unionId": common.cache.get("unid")
            }, function(res) {
                if (res && res != undefined && res.unionid != undefined) {
                    common.cache.set("wxMemberInfo", JSON.stringify(res));
                    common.cache.set("unid", res.unionid);
                    common.cache.set("usid", res.userid);
                    var state = urlJson.state;
                    //alert(JSON.stringify(urlJson));
                    if (!common.isKong(urlJson.state)) {
                        window.location.href = state;
                    } else {
                        //window.location.href = rootDirectory + "pages/views/index.html";
                    }
                } else {
                    layer.open({
                        content: '请联系管理员[code:30001]' + JSON.stringify(res),
                        skin: 'msg',
                        time: 2
                    });
                    return false;
                }
            });
            //}
        }
        wxCommon.signature(window.location.href.split('#')[0]);
    }
}

var wxMember = {
    noWeCatNoMember: function() {
        common.cache.set("orgid", common.cache.get("orgid"));
        common.cache.set("orgname", wxCompanyCid(common.cache.get("orgid")));
        wx_titie.titleRewrite(initParams.title);
    },
    WeCatNoMember: function() {
        var unid = common.cache.get("unid");
        if (common.isKong(unid)) {
            $("html").hide();
            $("body").hide();
            window.location.href = wx_sq_href + "&state=" + window.location.href + "#wechat_redirect";
        } else {

        }
    },
    noWeCatMember: function() {
        //window.localStorage.clear(); //不是微信内部不可登录会员
    },
    WeCatMember: function() {
        var unid = common.cache.get("unid");
        var usid = common.cache.get("usid");
        //alert(!common.isKong(unid) + "------" + !common.isKong(usid) + "------" + common.cache.get("orgid"));
        if (!common.isKong(unid)) {
            if (!common.isKong(usid)) {
                //alert(common.cache.get("orgname"));
            } else {
                $("html").hide();
                $("body").hide();
                var url_sq = rootDirectory + "pages/views/login_register/register.html" + "?surl=" + window.location.href;
                window.location.href = url_sq;
            }
        } else {
            $("html").hide();
            $("body").hide();
            window.location.href = wx_sq_href + "&state=" + window.location.href + "#wechat_redirect";
        }
    }
}
wxMenuShare = function(title, desc, link, imgUrl, success, cancel) {
    if (common.isKong(title)) {
        title = "合众集团";
    }
    if (common.isKong(desc)) {
        desc = "合众集团";
    }
    if (common.isKong(link)) {
        link = "https://m.hzqcjt.com/web/pages/views/index.html?cid=" + common.cache.get("orgid");
    }
    if (common.isKong(imgUrl)) {
        imgUrl = "https://m.hzqcjt.com/web/img/loginimg.png";
    }
    wx.showMenuItems({
        menuList: ['menuItem:share:qq',
            'menuItem:share:weiboApp',
            'menuItem:favorite',
            'menuItem:share:facebook',
            'menuItem:share:QZone'
        ]
    });
    wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        type: 'link',
        success: function() {
            if (typeof(success) == "function") {
                success || success();
            }
        },
        cancel: function() {
            if (typeof(success) == "function") {
                cancel || cancel();
            }
        }
    });
    wx.onMenuShareTimeline({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        type: 'link',
        success: function() {
            if (typeof(success) == "function") {
                success || success();
            }
        },
        cancel: function() {
            if (typeof(success) == "function") {
                cancel || cancel();
            }
        }
    });
    wx.onMenuShareQQ({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        type: 'link',
        success: function() {
            if (typeof(success) == "function") {
                success || success();
            }
        },
        cancel: function() {
            if (typeof(success) == "function") {
                cancel || cancel();
            }
        }
    });
    wx.onMenuShareWeibo({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        type: 'link',
        success: function() {
            if (typeof(success) == "function") {
                success || success();
            }
        },
        cancel: function() {
            if (typeof(success) == "function") {
                cancel || cancel();
            }
        }
    });
    wx.onMenuShareQZone({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        type: 'link',
        success: function() {
            if (typeof(success) == "function") {
                success || success();
            }
        },
        cancel: function() {
            if (typeof(success) == "function") {
                cancel || cancel();
            }
        }
    });
}
$(function() {
    try {
        //wxCommon.initUse();
    } catch (e) {
        alert("请重新打开[联系管理员]" + JSON.stringify(e));
        console.log(e);
    }
});