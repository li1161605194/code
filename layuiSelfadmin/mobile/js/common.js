var zW = $(window).width();
var zH = $(window).height();
Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
var common = {
    cache: {
        set: function(k, v) {
            if (typeof(localStorage === 'object') && window.localStorage) {
                window.localStorage.setItem(ca + k + cb, v);
            } else {
                layer.open({
                    content: '请联系管理员[code:6666]',
                    skin: 'msg',
                    time: 2
                });
                return false;
            }
        },
        get: function(k) {
            if (typeof(localStorage === 'object') && window.localStorage) {
                return window.localStorage.getItem(ca + k + cb);
            } else {
                layer.open({
                    content: '请联系管理员[code:6666]',
                    skin: 'msg',
                    time: 2
                });
                return false;
            }
        }
    },
    isKong: function(data) {
        if (data == null || data == undefined || data == "null" || data == "undefined" || (data == "" && typeof(data) != "object")) {
            return true;
        } else {
            return false;
        }
    },
    orgid: function() {
        var orgid = "666";
        if (common.isKong(urlJson.cid)) {
            if (common.isKong(common.cache.get("orgid"))) {

            } else {
                orgid = common.cache.get("orgid");
            }
        }
        return orgid;
    },
    //公共初始化 页面高度  布局
    pageInit: function() {
        $("body").css({
            /*"height": zH + "px",*/
            "min-height": zH + "px"
        });
    },
    //点击 元素 跳转元素绑定的页面 参数传递attr
    goTiaoZhuanPage: function() {
        $(document).on("click", ".tzpage", function(e) {
            var _this = $(this);
            if (_this.attr("rel") && _this.attr("rel").length > 1) {
                var rel = _this.attr("rel");
                tab.jumpPage(rel);
                //window.location.href = rootDirectory + "pages/" + rel;
            } else {
                return false;
            }
        });
    },
    //点击 元素 未开发功能 参数传递attr
    wkf_stopPage: function() {
        $(document).on("click", ".wkf_stop", function(e) {
            event.preventDefault();
            layer.open({
                content: '功能尚未开通!攻城狮努力中...',
                skin: 'msg',
                time: 2
            });
            return false;
        });
    },
    //点击左箭头返回上一级页面   
    goBackNavbarLeft: function() {
        $(document).on("click", ".topback_c.topback_left", function(e) {
            window.history.back();
        });
        $(document).on("click", ".goBackPage", function(e) {
            window.history.back();
        });
    },
    goBackNavbarRight: function(func) {
        $(document).on('click', '.topback_c.topback_right', function(event) {
            window.location.href = rootDirectory + "pages/views/index.html";
        });
    },
    initCommonHeardHtml: function() {
        var html = '<header class="navbar navbaryi">' +
            '<div class="topback_c topback_left"><a href="javascript:void(0)"><span class="fa fa-angle-left topback_icon"></span></a></div>' +
            '<h2 class="topback_c topback_title topback_center"></h2>' +
            '<div class="topback_c topback_right"><a href="javascript:void(0)"><span class="fa fa-home topback_icon"></span></a></div>' +
            '</header>';
        $(".weui-tab").prepend(html);
        $(".weui-tab_panel").prepend('<div class="navbarhmt"></div>');
        common.goBackNavbarLeft();
        common.goBackNavbarRight();
    },
    initCommonFooterHtml: function(xuanz_num) {
        if (xuanz_num) {} else {
            xuanz_num = 1;
        }
        var html_start = '<div class="tabbarhmb"></div><div class="footer_c_zk">';
        var html1 = '<div class="foot_c_dwk tzpage" rel="views/home.html"><div class="foot_c_bjk"><img class="foot_c_img" data-src="img/common/footer/1001.png" /><span class="foot_c_wz">首页</span></div></div>';
        var html2 = '<div class="foot_c_dwk tzpage" rel="views/newcar/list.html"><div class="foot_c_bjk"><img class="foot_c_img" data-src="img/common/footer/2001.png" /><span class="foot_c_wz">新车</span></div></div>';
        var html3 = '<div class="foot_c_dwk tzpage" rel="views/home.html"><div class="foot_c_bjk"><img class="foot_c_img" data-src="img/common/footer/3001.png" /><span class="foot_c_wz">二手车</span></div></div>';
        var html4 = '<div class="foot_c_dwk tzpage" rel="views/home.html"><div class="foot_c_bjk"><img class="foot_c_img" data-src="img/common/footer/4001.png" /><span class="foot_c_wz">租车</span></div></div>';
        var html5 = '<div class="foot_c_dwk tzpage" rel="views/home.html"><div class="foot_c_bjk"><img class="foot_c_img" data-src="img/common/footer/5001.png" /><span class="foot_c_wz">我的</span></div></div>';
        switch (xuanz_num) {
            case 1:
                html1 = '<div class="foot_c_dwk"><div class="foot_c_bjk"><img class="foot_c_img" data-src="img/common/footer/1002.png" /><span class="foot_c_wz xuanz">首页</span></div></div>';
                break;
            case 2:
                html2 = '<div class="foot_c_dwk"><div class="foot_c_bjk"><img class="foot_c_img" data-src="img/common/footer/2002.png" /><span class="foot_c_wz xuanz">新车</span></div></div>';
                break;
            case 3:
                html3 = '<div class="foot_c_dwk"><div class="foot_c_bjk"><img class="foot_c_img" data-src="img/common/footer/3002.png" /><span class="foot_c_wz xuanz">二手车</span></div></div>';
                break;
            case 4:
                html4 = '<div class="foot_c_dwk"><div class="foot_c_bjk"><img class="foot_c_img" data-src="img/common/footer/4002.png" /><span class="foot_c_wz xuanz">租车</span></div></div>';
                break;
            case 5:
                html5 = '<div class="foot_c_dwk"><div class="foot_c_bjk"><img class="foot_c_img" data-src="img/common/footer/5002.png" /><span class="foot_c_wz xuanz">我的</span></div></div>';
                break;
            default:
                break;
        }
        html_end = '</div>';
        $(".weui-tab_panel").append(html_start + html1 + html2 + html3 + html4 + html5 + html_end);
    },
    //yyyy-mm-dd hh:mm:ss
    nowDateTime: function(type) {
        function changeTen(s) {
            return s < 10 ? '0' + s : s;
        }
        var myDate = new Date();
        var nowDate = myDate.getFullYear() + '-' + changeTen(myDate.getMonth() + 1) + "-" + changeTen(myDate.getDate());
        var nowTime = changeTen(myDate.getHours()) + ':' + changeTen(myDate.getMinutes()) + ":" + changeTen(myDate.getSeconds());
        if (type == 1 || type == undefined) {
            return nowDate + " " + nowTime;
        } else if (type == 2) {
            return nowDate;
        } else if (type == 3) {
            return nowTime;
        } else {
            return nowDate + " " + nowTime;
        }
    },
    numberNullUndefind: function(num, fzy) {
        var tempnum = num;
        if (num === "" || num === null || num === undefined || !isFinite(num) || num == "NaN" || num == "Infinity") {
            return tempnum = 0;
        } else {
            if (isNaN(num)) {
                return tempnum = 0;
            } else {
                var tempnum2 = 0;
                if (fzy && fzy === 1) { //万元
                    tempnum2 = Number(parseFloat(tempnum) / 100 / 10000).toFixed(2);
                } else if (fzy && fzy === 1.1) { //万元 一位小数
                    tempnum2 = Number(parseFloat(tempnum) / 100 / 10000).toFixed(1);
                } else if (fzy && fzy === 11) { //千元
                    tempnum2 = parseInt(parseFloat(tempnum) / 100 / 1000);
                } else if (fzy && fzy === 12) { //百元
                    tempnum2 = parseInt(parseFloat(tempnum) / 100 / 100);
                } else if (fzy && fzy === 13) { //十元
                    tempnum2 = parseInt(parseFloat(tempnum) / 100 / 10);
                } else if (fzy && fzy === 2) { //后台传回原值
                    tempnum2 = parseFloat(Number(tempnum)).toFixed(2);
                } else if (fzy && fzy === 2.1) { //后台传回原值 一位小数
                    tempnum2 = parseFloat(Number(tempnum)).toFixed(1);
                } else if (fzy && fzy === 3) { //元 
                    tempnum2 = parseInt(Number(tempnum) / 100);
                } else if (fzy && fzy === 4) { //百分比
                    tempnum2 = parseFloat(Number(tempnum) * 100).toFixed(2);
                } else if (fzy && fzy === 4.1) { //百分比 一位小数
                    tempnum2 = parseFloat(Number(tempnum) * 100).toFixed(1);
                } else { //保留小数点2位
                    tempnum2 = Number(parseFloat(tempnum).toFixed(2));
                }
                var str = tempnum2.toString();
                var strs = str.split(".");
                if (str.indexOf(".") != -1) {
                    if (strs[1] == "00" || strs[1] == "0") {
                        return strs[0];
                    } else {
                        return tempnum2;
                    }
                } else {
                    return tempnum2;
                }
            }
        }
    },
    browserType: function() {
        var ua = navigator.userAgent;
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
            isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
            isAndroid = ua.match(/(Android)\s+([\d.]+)/),
            isMobile = isIphone || isAndroid;
        if (isMobile) {
            if (ua.indexOf("Alipay") > -1) {
                //alert("zhifubao");
                sfwx = 2;
            } else if (ua.indexOf("MicroMessenger") > -1) {
                //alert("weixin");
                sfwx = 1;
            } else {
                sfwx = 2;
            }
        } else {
            document.getElementsByTagName('html')[0].style.width = 640 + "px";
            if (ua.indexOf("Firefox") > -1 || ua.indexOf("Chrome") > -1) {} else {
                var html = "<div style='width:100%;margin:120px auto;text-align:center;'><p><h1>您使用的浏览器暂不支持本系统!</h1></p>" +
                    "<p><h1>请更换<a href='http://download.firefox.com.cn/releases-sha2/stub/official/zh-CN/Firefox-latest.exe'>Firefox(火狐)浏览器</a>或" +
                    "<a href='http://sw.bos.baidu.com/sw-search-sp/software/1b5bc4ffa7d9b/ChromeStandalone_57.0.2987.133_Setup.exe'>Chrome(谷歌)浏览器。</a>←点击下载</h1></p></div>";
                document.write(html);
            }
        }
    },
    imgCarouselInit: function(aspectRatio) {
        var slider = mui("#slider");
        slider.slider({
            interval: 3500
        });
    },
    rewriteImgSrc: function() {
        $("img").each(function(k, v) {
            var _thisSrc = "";
            if ($(v).attr("src") == undefined || $(v).attr("src") == null) {} else {
                _thisSrc = $(v).attr("src");
            }
            if ($(v).attr("data-src") == undefined || $(v).attr("data-src") == null) {} else {
                _thisSrc = $(v).attr("data-src");
            }
            if (_thisSrc == "") {} else {
                if (_thisSrc.indexOf("data:image") == -1 && _thisSrc.indexOf("http://") == -1 && _thisSrc.indexOf("https://") == -1) {
                    if (_thisSrc != undefined) {} else {
                        _thisSrc = $(v).attr("data-src");
                    }
                    if (_thisSrc.indexOf("img/") != -1) {
                        _thisSrc = _thisSrc.split("img/")[1];
                        $(v).attr("src", cbl.img + _thisSrc);
                    } else {
                        $(v).attr("src", cbl.img + _thisSrc);
                    }
                }
            }
        })
    },
    bodyShow: function() {
        common.rewriteImgSrc();
    },
    showResult: function(resultParam) {
        if (resultParam != undefined && typeof(resultParam) == "object") {
            common.cache.set("resultParam", JSON.stringify(resultParam));
            setTimeout(function() {
                window.location.href = rootDirectory + "pages/views/module/result.html";
            }, 5);
        } else {
            return false;
        }
    },
    appointment: function(ptype) {
        var inputs = $('.datetime_c');
        var type = "date";
        inputs.each(function(i, _input) {
            _input.addEventListener('tap', function() {
                var _self = this;
                if (_self.picker) {
                    _self.picker.show(function(rs) {
                        _self.picker.dispose();
                        _self.picker = null;
                    });
                } else {
                    if (ptype && ptype == 2) {
                        type = "datetime";
                    } else {
                        type = "date";
                    }
                    var options = {
                        "type": type,
                        "beginYear": new Date().getFullYear() - 100,
                        "endYear": new Date().getFullYear() + 1
                    };
                    _self.picker = new mui.DtPicker(options);
                    _self.picker.show(function(rs) {
                        $(_input).val(rs.text);
                        _self.picker.dispose();
                        _self.picker = null;
                    });
                }

            }, false);
        });
    },
    swiperInit: function(id, num, jiange) {
        if (id) {} else {
            layer.open({
                content: '参数不正确[code:20222]',
                skin: 'msg',
                time: 2
            });
            return false;
        }
        if (num) {} else {
            num = 4;
        }
        if (jiange) {} else {
            jiange = 10;
        }
        var swiper = new Swiper(id, {
            slidesPerView: num,
            spaceBetween: jiange
        });
    },
    djsInit: function(time, ob, type) {
        if (ob.attr("ing") && ob.attr("ing") == "ing") {
            layer.open({
                content: '已发送,请勿重复点击[code:10222]',
                skin: 'msg',
                time: 2
            });
        } else {
            hmidjs(time, ob, type);
        }
    },
    sendSIM: function(m, t) {
        if (/^1[34578]\d{9}$/.test(m)) {
            var url = "";
            if (t == 2) {
                url = "oauth/sendMessage2.shtml";
            } else {
                url = "oauth/sendMessage1.shtml";
            }
            r_post_jsons(url, {
                "account": m
            }, function(res) {
                if (res.resultFlag && res.resultFlag == "Y") {
                    layer.open({
                        content: '已发送',
                        skin: 'msg',
                        time: 2
                    });
                } else {
                    var jg = res.resultMessage == undefined ? "" : res.resultMessage;
                    layer.open({
                        content: '请刷新[code:3002]' + jg,
                        skin: 'msg',
                        time: 2
                    });
                }
            });
        } else {
            layer.open({
                content: '手机号格式不正确[code:10222]',
                skin: 'msg',
                time: 2
            });
        }
    },
    choseCarType: function(options) {
        if (options.loadBefore) {
            options.loadBefore || options.loadBefore();
        }
        r_post_jsons("oauth/getcartype.shtml", {
            orgId: common.cache.get("orgid")
        }, function(res) {
            if (res && res.data && res.data.length > 0) {
                var leg = res.data.length;
                var z = [];
                for (var i = 0; i < leg; i++) {
                    var y = {};
                    y.text = res.data[i].carname;
                    y.value = res.data[i].carid;
                    z.push(y);
                }
                options.data = z;
                if (options.loadIng) {
                    options.loadIng(res);
                }
                options.textid = "tcxz_cartype";
                options.title = "请选择车辆品牌";
                common.chosePickerInit_C(options);
            } else {
                layer.open({
                    content: '请刷新[code:3002]' + JSON.stringify(res),
                    skin: 'msg',
                    time: 2
                });
            }
        });
    },
    choseOrgCid: function(options) {
        if (options.loadBefore) {
            options.loadBefore || options.loadBefore();
        }
        r_post_jsons("oauth/getOrgList.shtml", {}, function(res) {
            if (res && res.data && res.data.length > 0) {
                var leg = res.data.length;
                var z = [];
                for (var i = 0; i < leg; i++) {
                    var y = {};
                    y.text = res.data[i].title;
                    y.value = res.data[i].orgid;
                    z.push(y);
                }
                options.data = z;
                if (options.loadIng) {
                    options.loadIng(res);
                }
                if (options.textid) {} else {
                    options.textid = "orgname";
                }
                options.title = "请选择门店";
                options.defaults = common.cache.get("orgname");
                common.chosePickerInit_C(options);
            } else {
                layer.open({
                    content: '请刷新[code:3002]' + JSON.stringify(res),
                    skin: 'msg',
                    time: 2
                });
            }
        });
    },
    chosePickerInit_C: function(options) {
        if (options.data && typeof(options.data) == "object") {
            if (typeof(popc) == "object") {} else {
                popc = new POPC();
            }
            popc.chosePopc(options.id, options);
        } else {
            layer.open({
                content: '请刷新[code:1101]',
                skin: 'msg',
                time: 2
            });
        }
    },
    checkedOrgId: function() {
        if (common.isKong(common.cache.get("orgid"))) {
            if (!common.isKong(urlJson.orgid)) {
                r_post_jsons("oauth/orgIdToName.shtml", {
                    "orgid": urlJson.orgid
                }, function(res) {
                    if (res && res.orgName) {
                        common.cache.set("orgid", urlJson.orgid);
                        common.cache.set("orgname", res.orgName);
                    }
                    wx_titie.titleRewrite(initParams.title);
                });
            } else {
                wx_titie.titleRewrite(initParams.title);
            }
        } else {
            wx_titie.titleRewrite(initParams.title);
        }
    }
}

var wx_titie = {
    titleRewrite: function(title) {
        if (title == undefined) {
            title = initParams.title;
        }
        $("title").html(wxCompany + "-" + title);
        if ($("h2.topback_c.topback_title.topback_center").length > 0) {
            $("h2.topback_c.topback_title.topback_center").html(title);
        }
    }
}
var wxCompanyCid = function(c) {
    if (common.isKong(c)) {
        c = 1;
    }
    r_post_jsons("oauth/orgIdToName.shtml", {
        "orgid": c
    }, function(res) {
        common.cache.set("orgidname", res.orgName);
        wxCompany = common.cache.get("orgidname");
    });
    return common.cache.get("orgidname");
}

var djs;
hmidjs = function(a, ob, type) {
    if (type == undefined) {
        type = 3;
    }
    a = a - 1000;
    var intDiff = a;
    if (intDiff <= 0) {
        clearTimeout(djs);
        ob.html("发送验证码");
        ob.removeAttr('ing');
        return false;
    } else {
        ob.attr("ing", "ing");
    }
    var day = Math.floor(intDiff / (1000 * 60 * 60 * 24));
    var hour = Math.floor(intDiff / (1000 * 60 * 60)) /*- (day * 24)*/ ;
    var minute = Math.floor(intDiff / (1000 * 60)) - (day * 24 * 60) - ((hour - (day * 24)) * 60);
    var second = Math.floor(intDiff / 1000) - (day * 24 * 60 * 60) - ((hour - (day * 24)) * 60 * 60) - (minute * 60);
    if (day <= 9) day = '0' + day;
    if (hour <= 9) hour = '0' + hour;
    if (minute <= 9) minute = '0' + minute;
    if (second <= 9) second = '0' + second;
    if (type == 1) {
        var html = '<span>' + second.toString() + '秒后可重发</span>';
    } else if (type == 2) {
        var html = '<span>' + minute.toString() + '</span>:<span>' + second.toString() + '</span>';
    } else if (type == 3) {
        var html = '<span>' + hour.toString() + '</span>:<span>' + minute.toString() + '</span>:<span>' + second.toString() + '</span>';
    } else {
        var html = '<span>' + hour.toString() + '</span>:<span>' + minute.toString() + '</span>:<span>' + second.toString() + '</span>';
    }
    ob.html(html);
    djs = setTimeout(function() {
        hmidjs(a, ob, type);
    }, 1000);
}
r_post = function(url, datas, callback) {
    if (callback == null) {
        callback = function(result) {
            layer.open({
                content: result.message,
                skin: 'msg',
                time: 2
            });
            return true;
        };
    }
    var load = layer.open({
        type: 2,
        content: '加载中'
    });
    $.ajax(baseUrl + url, {
        data: datas,
        cache: false,
        dataType: 'json',
        type: 'post',
        timeout: 360000,
        success: function(result) {
            layer.close(load);
            if (result && (result.user_status == 300 || result.login_status == 300)) {
                window.location.href = rootDirectory + "pages/views/login_register/register.html" + "?state=" + window.location.href;
                return;
            } else if (result && (result.user_status == 350 || result.login_status == 350)) {
                window.location.href = wx_sq_href + "&state=" + window.location.href + "#wechat_redirect";
                return;
            } else {
                callback(result);
            }
        },
        error: function(xhr, type, errorThrown) {
            layer.close(load);
            layer.open({
                content: '网络错误[in-error]' + xhr,
                skin: 'msg',
                time: 2
            });
            return 0;
        }
    });
}
post_catch_wxlogin = function() {
    if (common.isKong(common.cache.get("unid"))) {
        $("html").hide();
        $("body").hide();
        window.location.href = wx_sq_href + "&state=" + window.location.href + "#wechat_redirect";
        return;
    } else {
        r_post_jsons("oauth/weixinlogin.shtml", {
            "unionId": common.cache.get("unid")
        }, function(res) {
            if (res && res != undefined && res.unionid != undefined) {
                common.cache.set("wxMemberInfo", JSON.stringify(res));
                common.cache.set("unid", res.unionid);
                common.cache.set("usid", res.userid);
                window.location.href = window.location.href;
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
}
r_post_jsons = function(url, datas, callback) {
    var load = layer.open({
        type: 2,
        content: '加载中'
    });
    $.ajax(baseUrl + url, {
        data: JSON.stringify(datas),
        cache: false,
        async: false,
        dataType: 'json',
        type: 'post',
        timeout: 360000,
        contentType: "application/json",
        success: function(result) {
            //alert(JSON.stringify(result));
            if (url == "file/upload/addPhoto.shtml") {
                //alert(JSON.stringify(result));
            }
            layer.close(load);
            if ((result && result.resultFlag == "N") && (result && result.resultCode != "200")) {
                var msg = result.resultMessage != undefined ? result.resultMessage : "";
                layer.open({
                    content: '请刷新[code:3002]' + msg,
                    skin: 'msg',
                    time: 2
                });
                return false;
            } else {
                if (window.location.href.indexOf("file://") == -1) {
                    if (result && (result.user_status == 300 || result.login_status == 300)) {
                        layer.open({
                            content: '网络错误' + JSON.stringify(result),
                            skin: 'msg',
                            time: 2
                        });
                        return false;
                    } else if (result && (result.user_status == 350 || result.login_status == 350)) {
                        post_catch_wxlogin();
                    } else {
                        callback(result);
                    }
                }
            }
        },
        error: function(xhr, type, errorThrown) {
            layer.close(load);
            layer.open({
                content: '网络错误' + JSON.stringify(xhr),
                skin: 'msg',
                time: 2
            });
            return false;
        }
    });
}
$.fn.serializeDOMArray = function() {
    var params = [];
    var s = {};
    if (this.get(0).tagName == "FORM") {
        params = this.serializeArray();
    } else {
        this.wrap('<form id="NotRepeatId"></form>');
        params = $("#NotRepeatId").serializeArray();
        this.insertAfter($("#NotRepeatId"));
        $("#NotRepeatId").remove();
    }
    $.each(params, function(i, v) {
        s[v.name] = decodeURIComponent(v.value);
    });
    return s;
}
$.fn.selectTextInputVal = function() {
    var params = [];
    var s = {};
    s.key_values = [];
    this.find("input").each(function(a, b) {
        _thisInput = $(b);
        if (_thisInput.attr("name") != undefined && _thisInput.attr("name").length >= 1 && _thisInput.attr("type") != undefined) {
            var _thisInputName = _thisInput.attr("name");
            var _thisInputType = _thisInput.attr("type");
            var _thisColValue = "";
            if (_thisInputType == "text" || _thisInputType == "number" || _thisInputType == "tel" || _thisInputType == "email") {
                s[_thisInputName] = _thisInput.val();
                _thisColValue = _thisInput.val();
            } else if (_thisInputType == "radio") {
                s[_thisInputName] = $("input[name=" + _thisInputName + "]:checked").val();
                _thisColValue = $("input[name=" + _thisInputName + "]:checked").val();
            } else if (_thisInputType == "checkbox") {
                var chk_value = [];
                $('input[name=' + _thisInputName + ']:checked').each(function() {
                    chk_value.push($(this).val());
                });
                s[_thisInputName] = chk_value;
                _thisColValue = chk_value;
            } else {
                s[_thisInputName] = _thisInput.val();
                _thisColValue = _thisInput.val();
            }
            var _thisLabelName = _thisInput.attr("lname");
            if (_thisLabelName != undefined && _thisLabelName.length >= 1) {
                if (_thisInputType == "checkbox" || _thisInputType == "radio") {
                    if (_thisInput.is(':checked')) {
                        _thisColValue = "ygx"; //yi gou xuan
                    } else {
                        _thisColValue = "wgx" //wei gou xuan
                    }
                }
                s.key_values.push({
                    "colName": _thisLabelName,
                    "colValue": _thisColValue,
                    "colKey": _thisInputName,
                    "colType": _thisInputType
                });
                delete s[_thisInputName];
            }
        }
    });
    this.find("textarea").each(function(a, b) {
        _thisTextarea = $(b);
        var _thisInputName = _thisTextarea.attr("name");
        var _thisColValue = "";
        s[_thisInputName] = _thisTextarea.val();
        _thisColValue = _thisTextarea.val();
        var _thisLabelName = _thisTextarea.attr("lname");
        if (_thisLabelName != undefined && _thisLabelName.length >= 1) {
            s.key_values.push({
                "colName": _thisLabelName,
                "colValue": _thisColValue,
                "colKey": _thisInputName,
                "colType": "textarea"
            });
            delete s[_thisInputName];
        }
    });
    this.find("select").each(function(a, b) {
        _thisSelect = $(b);
        if (_thisSelect.attr("name") != undefined && _thisSelect.attr("name").length > 1) {
            s[_thisSelect.attr("name")] = _thisSelect.find("option:selected").val();
            var _thisLabelName = _thisSelect.attr("lname");
            if (_thisLabelName != undefined && _thisLabelName.length >= 1) {
                s.key_values.push({
                    "colName": _thisLabelName,
                    "colValue": _thisSelect.find("option:selected").val(),
                    "colKey": _thisSelect.attr("name"),
                    "colType": "select"
                });
                delete s[_thisSelect.attr("name")];
            }
        }
    });
    if (s.key_values.length > 0) {} else {
        delete s.key_values;
    }
    return s;
}
var PULL = {
    opt: {
        callback: function() {},
        url: "",
        dataParams: {},
        type: "down",
        pageNo: 1,
        pageSize: 10,
        pullrefresh: "#pullrefresh",
        h_martop: 0,
        nrk: $(".nrk-mui-scroll")
    },
    init: function(_options) {
        mui.init();
        if (_options && typeof(_options) == "object") {
            if (_options.h_martop && typeof(_options.h_martop) == "number") {
                PULL.opt.h_martop = _options.h_martop;
            }
            if (_options.url) {
                PULL.opt.url = _options.url;
            }
            if (_options.dataParams && typeof(_options.dataParams) == "object") {
                PULL.opt.dataParams = _options.dataParams;
            }
            if (_options.callback && typeof(_options.callback) == "function") {
                PULL.opt.callback = _options.callback;
            }
            if (_options.id) {
                PULL.opt.pullrefresh = _options.id;
            }
            PULL.rewriteHtml();
        }
    },
    pulldownRefresh: function() {
        PULL.opt.pageNo = 1;
        PULL.opt.type = "down";
        PULL.ajaxList();
    },
    pullupRefresh: function() {
        PULL.opt.pageNo = PULL.opt.pageNo + 1;
        PULL.opt.type = "up";
        PULL.ajaxList();
    },
    ajaxList: function() {
        var data = {};
        data = PULL.opt.dataParams;
        data.pageNo = PULL.opt.pageNo;
        data.pageSize = PULL.opt.pageSize;
        r_post_jsons(PULL.opt.url, data, function(res) {
            if (res) {
                var _html = PULL.opt.callback(res);
                if (PULL.opt.type == "first") {
                    PULL.opt.nrk.html(_html);
                    setTimeout(function() {
                        mui(PULL.opt.pullrefresh).pullRefresh(pro).endPulldownToRefresh();
                        mui(PULL.opt.pullrefresh).pullRefresh(pro).refresh(true);
                        mui(PULL.opt.pullrefresh).pullRefresh(pro).endPullupToRefresh((res.rows.length < PULL.opt.pageSize));
                    }, 1500);
                } else if (PULL.opt.type == "down") {
                    setTimeout(function() {
                        PULL.opt.nrk.html(_html);
                        mui(PULL.opt.pullrefresh).pullRefresh(pro).endPulldownToRefresh();
                        mui(PULL.opt.pullrefresh).pullRefresh(pro).refresh(true);
                        mui(PULL.opt.pullrefresh).pullRefresh(pro).endPullupToRefresh((res.rows.length < PULL.opt.pageSize));
                    }, 1500);
                } else if (PULL.opt.type == "up") {
                    setTimeout(function() {
                        mui(PULL.opt.pullrefresh).pullRefresh(pro).endPullupToRefresh((res.rows.length < PULL.opt.pageSize));
                        if (res.rows.length < 1) {
                            _html = '';
                        }
                        PULL.opt.nrk.append(_html);
                    }, 1500);
                }
                layer.closeAll();
            } else {
                layer.open({
                    content: '请重新刷新[code:3002]' + JSON.stringify(res),
                    skin: 'msg',
                    time: 2
                });
                return false;
            }
        });
    },
    rewriteHtml: function() {
        if ($(PULL.opt.pullrefresh) && $(PULL.opt.pullrefresh).length > 0) {
            //$("#pullrefresh").html('<div class="mui-scroll"><div id="mui-scroll"></div></div>');
            //$(PULL.opt.pullrefresh).remove();
        } else {
            var _id = PULL.opt.pullrefresh.toString().split("#")[1];
            var html = '<div id="' + _id + '" class="mui-content mui-scroll-wrapper"><div class="mui-scroll"><div class="nrk-mui-scroll"></div></div></div>';
            $("body").append(html);
        }
        $(PULL.opt.pullrefresh).css("margin-top", PULL.opt.h_martop + "px");
        PULL.opt.nrk = $(".nrk-mui-scroll");
        mui.init({
            pullRefresh: pro
        });
        PULL.opt.type = "first";
        PULL.ajaxList();
    }
}
var pro = {
    container: PULL.opt.pullrefresh,
    down: {
        callback: PULL.pulldownRefresh
    },
    up: {
        contentrefresh: '正在加载...',
        callback: PULL.pullupRefresh
    }
};
$(function() {
    try {
        /*if (hrefUrl.indexOf("views/index.html") == -1) {
            common.initCommonHeardHtml();
        }*/
        //common.initCommonHeardHtml();

        //common.browserType();
        common.goTiaoZhuanPage();
        common.wkf_stopPage();
        //common.checkedOrgId();
        common.pageInit();
    } catch (e) {
        alert("请重新打开[联系管理员]" + JSON.stringify(e));
        console.log(e);
    }
});