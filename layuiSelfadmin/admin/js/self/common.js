layui.define(['configBase', 'main', 'layer'], function(exports) {
    var configBase = layui.configBase;
    var layer = layui.layer;
    var main = layui.main;
    var common = {
        post_shtml_json: function(url, data, callback) {
            var load = layer.load(2);
            var _houzui = (url.indexOf(".shtml") != -1) ? "" : '.shtml';
            $.ajax(configBase.posturl + url + _houzui, {
                data: JSON.stringify(data),
                cache: false,
                async: false,
                dataType: 'json',
                type: 'post',
                timeout: 360000,
                contentType: "application/json",
                success: function(result) {
                    //alert(JSON.stringify(result));
                    layer.close(load);
                    if ((result && result.resultFlag == "N") || (result && result.resultCode != "200")) {
                        var msg = result.resultMessage != undefined ? result.resultMessage : "";
                        if (msg == "" || msg == null || msg == undefined) {
                            msg = JSON.stringify(result)
                        }
                        if (result.resultCode == 300) {
                            window.location.href = configBase.pages + "login.html?300";
                        } else if (result.resultCode == 350) {
                            window.location.href = configBase.pages + "login.html?350";
                        } else {
                            layer.msg(msg, {
                                icon: 4
                            });
                            return false;
                        }
                    } else if ((result && result.resultFlag == "Y") && (result && result.resultCode == "200")) {
                        callback(result);
                    } else {
                        layer.msg(JSON.stringify(result), {
                            icon: 4
                        });
                        return false;
                    }
                },
                error: function(xhr, type, errorThrown) {
                    layer.close(load);
                    layer.msg(JSON.stringify(xhr), {
                        icon: 4
                    });
                    return false;
                }
            });
        },
        get_shtml_json: function(url, data, callback) {
            var load = layer.load(2);
            var _houzui = (url.indexOf(".shtml") != -1) ? "" : '.shtml';
            $.ajax(configBase.posturl + url + _houzui, {
                data: JSON.stringify(data),
                cache: false,
                async: false,
                dataType: 'json',
                type: 'get',
                timeout: 360000,
                contentType: "application/json",
                success: function(result) {
                    //alert(JSON.stringify(result));
                    layer.close(load);
                    if ((result && result.resultFlag == "N") || (result && result.resultCode != "200")) {
                        var msg = result.resultMessage != undefined ? result.resultMessage : "";
                        if (msg == "" || msg == null || msg == undefined) {
                            msg = JSON.stringify(result)
                        }
                        if (result.resultCode == 300) {
                            window.location.href = configBase.pages + "login.html?300";
                        } else if (result.resultCode == 350) {
                            window.location.href = configBase.pages + "login.html?350";
                        } else {
                            layer.msg(msg, {
                                icon: 4
                            });
                            return false;
                        }
                    } else if ((result && result.resultFlag == "Y") && (result && result.resultCode == "200")) {
                        callback(result);
                    } else {
                        layer.msg(JSON.stringify(result), {
                            icon: 4
                        });
                        return false;
                    }
                },
                error: function(xhr, type, errorThrown) {
                    layer.close(load);
                    layer.msg(JSON.stringify(xhr), {
                        icon: 4
                    });
                    return false;
                }
            });
        },
        loginOut: function() {
            configBase.selfHeader.find(configBase.selfLoginOut).on('click', function(e) {
                e.stopPropagation();
                common.post_shtml_json("u/logout", {}, function(res) {
                    if (res && res.resultCode == 200) {
                        window.location.href = configBase.pages + "login.html";
                    }
                    event.preventDefault();
                    return false;
                });
            });
        },
        userInfo: function() {
            common.post_shtml_json("user/getMe", {}, function(res) {
                if (res && res.resultCode == 200) {
                    $(configBase.selfUserName).html('<img src="http://t.cn/RCzsdCq" class="layui-nav-img">' + res.token.name + '--' + res.token.usnm);
                } else {
                    window.location.href = configBase.pages + "login.html";
                }
            });
        },
        menuIconJson: function() {
            $.getJSON(configBase.json + "menuIcon.json", "", function(data) {　
                var html = '';
                $.each(data.data, function(i, item) {
                    var _class = 'menuimg_dx_c fa fa-' + item.class;
                    if (i == 0) {
                        html += '<input name="icon" title="<span class=\'' + _class + '\'></span>" type="radio" value="' + item.class + '" checked="">';
                    } else {
                        html += '<input name="icon" title="<span class=\'' + _class + '\'></span>" type="radio" value="' + item.class + '">';
                    }
                });
                $("#menu_icon_zk").html(html);
                main.initHtmlLayui();
                configBase.selfContentBody.find('#menu_icon_zk .layui-unselect.layui-form-radio').on('click', function(event) {
                    $("#menu_icon_zk input").removeAttr('checked');
                    $(this).prev().click();
                });
            });
        }
    };
    exports('common', common);
});