layui.define(['configBase', 'lang', 'main', 'common'], function(exports) {
    var configBase = layui.configBase;
    var main = layui.main;
    var lang = layui.lang;
    var common = layui.common;
    var topNavigationTextHtml = '';
    var tab = {
        topNavigationText: function(_this) {
            if (_this.hasClass('layui-nav-item')) {
                return topNavigationTextHtml;
            } else if (_this.hasClass('menu_list_name') || _this.hasClass('tzpage_c')) {
                topNavigationTextHtml = '<a href="javascript:void(0);">' + _this.text() + '</a>' + topNavigationTextHtml;
                tab.topNavigationText(_this.parent());
            } else if (_this.prev().hasClass('menu_list_name') || _this.prev().hasClass('tzpage_c')) {
                topNavigationTextHtml = '<a href="javascript:void(0);">' + _this.prev().text() + '</a>' + topNavigationTextHtml;
                tab.topNavigationText(_this.parent());
            } else {
                tab.topNavigationText(_this.parent());
            }
        },
        leftMenuChangeHtmlUrl: function(_this) {
            configBase.selfLeftMenu.find('.layui-this').removeClass('layui-this');
            _this.parent().addClass('layui-this');
            var _url = _this.data("url");
            var _er_wz, _san_wz = _this.text();
            var dh_notes = '';
            if (_san_wz == lang.HOMENAME) {
                dh_notes = '<span class="layui-breadcrumb tips_menu" lay-separator="/" lay-filter="breadcrumb">' +
                    '<a href="javascript:void(0);">' + lang.HOMENAME + '</a><span lay-separator="">/</span>' +
                    '<a href="javascript:void(0);">' + lang.NAME + '</a>' +
                    '</span>';
            } else {
                tab.topNavigationText(_this);
                dh_notes = '<span class="layui-breadcrumb tips_menu" lay-separator="/" lay-filter="breadcrumb">' + topNavigationTextHtml + '</span>';
            }
            main.getHtml(_url, function(res) {
                configBase.selfContentBody.html('');
                configBase.selfContentBody.html(dh_notes + res);
                main.initLinkScript();
                main.initHtmlLayui();
            });
        },
        pushStatePopstate: function(_this) {
            var url = _this.data("url");
            var _wz = _this.text();
            var title = lang.NAME + "-" + _wz;
            if (url == "" || url == "/" || url.toString().length < 3) {
                url = "home/home";
            }
            var stateObject = {
                url: url
            };
            var _url = (url.indexOf(".html") != -1) ? url.split(".html")[0] : url;
            var newUrl = configBase.pages + "index.html#/" + _url;
            history.pushState(stateObject, null, newUrl);
        },
        clickTabChangeType: function(_this, type) {
            if (type && type == 1) {
                tab.pushStatePopstate(_this);
            } else if (type && type == 2) {

            }
            tab.initVmBarHtml();
            tab.leftMenuChangeHtmlUrl(_this);
        },
        clickTabChange: function() {
            $(document).on('click', '.layui-nav-item a.tzpage_c', function(event) {
                tab.clickTabChangeType($(this), 1);
            });
        },
        tabRefreshParentsClick: function(_a) {
            if (_a && _a.data("url") == "home/home") {
                return false;
            }
            if (_a.parent().parent().prev("a.menu_list_name").length > 0 && !_a.parent().parent().prev("a.menu_list_name").parent().hasClass('layui-nav-itemed')) {
                _a.parent().parent().prev("a.menu_list_name").click();
                if (_a.parent().parent().prev("a.menu_list_name").parent().hasClass('layui-nav-item')) {
                    return false;
                } else {
                    tab.tabRefreshParentsClick(_a.parent().parent().prev("a.menu_list_name"));
                }
            } else {}
        },
        openLeftMenu: function(url) {
            if (url != undefined && url != null && url != "" && url.toString().length > 3) {
                var _a = configBase.selfLeftMenu.find("a.tzpage_c[data-url='" + url + "']");
                if (_a && _a.length > 0) {
                    tab.tabRefreshParentsClick(_a);
                    //_a.click();
                    tab.clickTabChangeType(_a, 2);
                } else {
                    tab.tabRefresh("home/home");
                }
            } else {
                tab.tabRefresh("home/home");
            }
        },
        tabRefresh: function(url, againLoadInitMenu) {
            if (againLoadInitMenu) {
                tab.initLeftMenu(function() {
                    tab.openLeftMenu(url);
                });
            } else {
                tab.openLeftMenu(url);
            }
        },
        initVmBarHtml: function() {
            topNavigationTextHtml = '';
            vm = '';
        },
        initHeader: function() {
            main.getHtml('modules/header.html', function(res) {
                configBase.selfHeader.html(res);
                common.loginOut();
                common.userInfo();
                main.initHtmlLayui();
            });
        },
        initLeftMenuHtmlLi: function(data) {
            var html = '';
            var now_nodes = data.nodes;
            for (var b = 0; b < now_nodes.length; b++) {
                if (now_nodes[b].nodes.length > 0) {
                    var _h = '';
                    _h += '<dd><a class="menu_list_name" href="javascript:void(0);">' + now_nodes[b].name + '</a><dl class="layui-nav-child">';
                    _h += tab.initLeftMenuHtmlLi(now_nodes[b]);
                    _h += '</dl></a></dd>';
                    html += _h;
                } else {
                    html += '<dd><a class="tzpage_c" data-url="' + now_nodes[b].url + '" href="javascript:void(0);">' + now_nodes[b].name + '</a></dd>';
                }
            }
            return html;
        },
        initLeftMenu: function(callback) {
            common.post_shtml_json("user/londMenuTree", {}, function(res) {
                if (res && res.resultCode == 200) {
                    var leg = res.menuTree.length;
                    var html = '';
                    for (var a = 0; a < leg; a++) {
                        var _icon = '';
                        if (res.menuTree[a].icon) {
                            _icon = '<i style="font-size: 18px; margin-left: -10px; margin-right: 6px;" class="fa fa-' + res.menuTree[a].icon + '"></i>';
                        }
                        html += '<li class="layui-nav-item"><a class="menu_list_name" style="font-size: 18px;" href="javascript:void(0);">' + _icon + res.menuTree[a].name + '</a><dl class="layui-nav-child">';
                        html += tab.initLeftMenuHtmlLi(res.menuTree[a]);
                        html += '</dl></a></li>';
                    }
                    html = '<ul class="layui-nav layui-nav-tree" lay-filter="selfLeft">' +
                        '<li class="layui-nav-item layui-this"><a id="home_home" class="tzpage_c" data-url="home/home" href="javascript:void(0);" style="font-size: 18px;">' +
                        '<i style="font-size: 18px; margin-left: -10px; margin-right: 6px;" class="fa fa-home"></i>' + lang.HOMENAME + '</a></li>' + html + '</ul>';
                    configBase.selfLeftMenu.html(html);
                    main.initHtmlLayui();
                    if (callback) {
                        callback();
                    } else {
                        tab.leftMenuChangeHtmlUrl(configBase.selfLeftMenu.find('#home_home'));
                    }
                }
            });
        },
        initFooter: function() {
            main.getHtml('modules/footer.html', function(res) {
                configBase.selfuiFooter.html(res);
                main.initHtmlLayui();
            });
        }
    };
    tab.initHeader();
    tab.initLeftMenu();
    tab.initFooter();
    tab.clickTabChange();
    exports('tab', tab);
});

/*window.addEventListener('popstate', function(event) {
    console.log(document.location)
});*/