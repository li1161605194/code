var listMenu = {
    listTreeInit: function() {
        $('#nestable').nestable({
            group: 2
        });
        $('#nestable').nestable('collapseAll');
        $('#nestable').find('div.dd-handle').on('mouseover', function(event) {
            var _t = $(this);
            _t.find('i.list_tree_img_c').show();
            _t.find('i.up').hide();
            _t.find('i.down').hide();
            if (_t.parent().prev().hasClass('dd-item')) {
                _t.find('i.up').show();
            }
            if (_t.parent().next().hasClass('dd-item')) {
                _t.find('i.down').show();
            }
        }).on('mouseleave', function(event) {
            $(this).find('i.list_tree_img_c').hide();
        });
        $('#nestable').find('div.dd-handle i.down').on('click', function(event) {
            var _t = $(this);
            var data = _t.parent().data("param");
            data = main.strToJson(data);
            var _down = _t.parent().parent().next().find('div.dd-handle').eq(0);
            var data_down = _down.data("param");
            data_down = main.strToJson(data_down);
            layer.confirm('确认将-' + data.name + '-下调到-' + data_down.name + '-之下吗?', {
                title: "是否下调"
            }, function(index) {
                common.post_shtml_json("ser/user/updateMenuListorder", {
                    old: {
                        id: data.id,
                        listorder: data_down.listorder
                    },
                    new: {
                        id: data_down.id,
                        listorder: data.listorder
                    }
                }, function(res) {
                    if (res && res.resultCode == 200) {
                        layer.close(index);
                        layer.msg("下调成功!");
                        tab.tabRefresh("menu/list", 1);
                    }
                });
            });
        });
        $('#nestable').find('div.dd-handle i.up').on('click', function(event) {
            var _t = $(this);
            var data = _t.parent().data("param");
            data = main.strToJson(data);
            var _down = _t.parent().parent().prev().find('div.dd-handle').eq(0);
            var data_down = _down.data("param");
            data_down = main.strToJson(data_down);
            layer.confirm('确认将-' + data.name + '-上调到-' + data_down.name + '-之上吗?', {
                title: "是否上调"
            }, function(index) {
                common.post_shtml_json("ser/user/updateMenuListorder", {
                    old: {
                        id: data.id,
                        listorder: data_down.listorder
                    },
                    new: {
                        id: data_down.id,
                        listorder: data.listorder
                    }
                }, function(res) {
                    if (res && res.resultCode == 200) {
                        layer.close(index);
                        layer.msg("上调成功!");
                        tab.tabRefresh("menu/list", 1);
                    }
                });
            });
        });
        $('#nestable').find('div.dd-handle i.add').on('click', function(event) {
            var data = $(this).parent().data("param");
            data = main.strToJson(data);
            tab.tabRefresh("menu/add");
        });
        $('#nestable').find('div.dd-handle i.edit').on('click', function(event) {
            var data = $(this).parent().data("param");
            data = main.strToJson(data);
            tab.tabRefresh("menu/edit");
        });
        $('#nestable').find('div.dd-handle i.lock').on('click', function(event) {
            var data = $(this).parent().data("param");
            data = main.strToJson(data);
            var _enabled = data.enabled;
            var tips_wz = _enabled == 1 ? "禁用" : "启用";
            layer.confirm('确认' + tips_wz + '-' + data.name + '吗?', {
                title: "是否" + tips_wz
            }, function(index) {
                common.post_shtml_json("ser/user/updateMenu", {
                    id: data.id,
                    enabled: _enabled == 1 ? 0 : 1
                }, function(res) {
                    if (res && res.resultCode == 200) {
                        layer.close(index);
                        layer.msg(tips_wz + '菜单成功');
                        tab.tabRefresh("menu/list", 1);
                    }
                });
            });
        });
        $('#nestable').find('div.dd-handle i.del').on('click', function(event) {
            var data = $(this).parent().data("param");
            data = main.strToJson(data);
            var _enabled = data.enabled;
            layer.confirm('确认删除-' + data.name + '吗?', {
                title: "是否删除"
            }, function(index) {
                common.post_shtml_json("ser/user/delMenu", {
                    id: data.id
                }, function(res) {
                    if (res && res.resultCode == 200) {
                        layer.close(index);
                        layer.msg("删除成功!");
                        tab.tabRefresh("menu/list", 1);
                    }
                });
            });
        });
    },
    nodesListFor: function(data) {
        var data_no_nodes = JSON.stringify(data);
        data_no_nodes = JSON.parse(data_no_nodes);
        delete data_no_nodes.nodes;
        var html = '';
        var now_nodes = data.nodes;
        var cz_img = '' +
            '<i class="down fa list_tree_img_c fa-arrow-circle-down"></i>' +
            '<i class="up fa list_tree_img_c fa-arrow-circle-up"></i>' +
            '<i class="add fa list_tree_img_c fa-plus-square"></i>' +
            '<i class="edit fa list_tree_img_c fa-edit"></i>';
        if (data.enabled == 1) {
            cz_img += '<i class="lock fa list_tree_img_c fa-unlock-alt"></i>';
        } else {
            cz_img += '<i class="lock fa list_tree_img_c fa-lock"></i>';
        }
        if (now_nodes.length > 0) {

        } else {
            cz_img += '<i class="del fa list_tree_img_c fa-window-close"></i>';
        }
        html += '<li class="dd-item" data-id="' + data.id + '">';
        if (now_nodes.length > 0) {
            html += '<div data-param="' + main.jsonToStr(data_no_nodes) + '" class="dd-handle">' + data.name + cz_img + '</div><ol class="dd-list">';
            for (var b = 0; b < now_nodes.length; b++) {
                html += listMenu.nodesListFor(now_nodes[b]);
            }
            html += '</ol>';
        } else {
            html += '<div data-param="' + main.jsonToStr(data_no_nodes) + '" class="dd-handle">' + data.name + cz_img + '</div>';
        }
        html += '</li>';
        return html;
    },
    menuParentInit: function() {
        common.post_shtml_json("ser/user/menuAllToTree", {}, function(res) {
            if (res && res.rows.length > 0) {
                var html = '';
                for (var a = 0; a < res.rows.length; a++) {
                    html += listMenu.nodesListFor(res.rows[a]);
                }
                $("#nestable").html('<ol class="dd-list">' + html + '</ol>');
                main.initHtmlLayui();
                listMenu.listTreeInit();
            } else {

            }
        });
    },
    init: function() {
        listMenu.menuParentInit();
    }
};
$(function() {
    listMenu.init();
});