var managePower = {
    roleCheckInit: function() {
        $('#nestable_role').find('div.dd-handle i.check_role').on('click', function(event) {
            var _t = $(this);
            var data = _t.parent().data("param");
            data = main.strToJson(data);
            if (_t.hasClass('fa-square-o')) {
                $("i.check_role").removeClass('fa-check-square-o').addClass('fa-square-o');
                _t.removeClass('fa-square-o').addClass('fa-check-square-o');
                managePower.menuParentInit(data.id);
            } else {
                _t.removeClass('fa-check-square-o').addClass('fa-square-o');
                $("#nestable_menu").html('');
            }
        });
    },
    roleParentInit: function() {
        common.post_shtml_json("ser/role/findRole", {}, function(res) {
            if (res && res.rows.length > 0) {
                var html = '';
                for (var a = 0; a < res.rows.length; a++) {
                    if (res.rows[a].id == 1) {

                    } else {
                        html += '<li class="dd-item" data-id=""><div data-param="' + main.jsonToStr(res.rows[a]) + '" class="dd-handle">' + res.rows[a].name + '<i class="check_role power_list_tree_img_c fa fa-square-o"></i></div></li>';
                    }
                }
                $("#nestable_role").html('<ol class="dd-list">' + html + '</ol>');
                main.initHtmlLayui();
                $('#nestable_role').nestable({
                    group: 2
                });
                $('#nestable_role').nestable('collapseAll');
                managePower.roleCheckInit();
            } else {

            }
        });
    },
    parentSubgradeCheck: function(_t, type) {
        var _f1 = _t.parent().parent().parent();
        var _f2 = _t.parent().parent().find('i.check_menu');
        if ((type && type == 1) || (type && type == 1.1)) {
            _t.removeClass('fa-square-o').addClass('fa-check-square-o');
            if (_f1.hasClass('dd-list')) {
                _f1.prev().find('i.check_menu').removeClass('fa-square-o').addClass('fa-check-square-o');
                managePower.parentSubgradeCheck(_f1.prev().find('i.check_menu'), 1.1);
            }
            if (type && type == 1) {
                for (var a = 0; a < _f2.length; a++) {
                    _f2.eq(a).removeClass('fa-square-o').addClass('fa-check-square-o');
                }
            }
        } else if ((type && type == 2) || (type && type == 2.1)) {
            _t.removeClass('fa-check-square-o').addClass('fa-square-o');
            var _f3 = _t.parent().parent().parent().find('i.check_menu.fa-check-square-o');
            if (_t.parent().parent().parent().parent().hasClass('dd')) {} else {
                if (_f3 && _f3.length == 0) {
                    _t.parent().parent().parent().prev().find('i.check_menu').removeClass('fa-check-square-o').addClass('fa-square-o');
                    managePower.parentSubgradeCheck(_t.parent().parent().parent().prev().find('i.check_menu'), 2.1);
                }
            }
            if (type && type == 2) {
                for (var a = 0; a < _f2.length; a++) {
                    _f2.eq(a).removeClass('fa-check-square-o').addClass('fa-square-o');
                }
            }
        }
    },
    menuCheckInit: function() {
        $('#nestable_menu').find('div.dd-handle i.check_menu').on('click', function(event) {
            var _t = $(this);
            if (_t.hasClass('fa-square-o')) {
                managePower.parentSubgradeCheck(_t, 1);
            } else {
                managePower.parentSubgradeCheck(_t, 2);
            }
            managePower.menuAndRoleCheck();
        });
    },
    nodesListFor: function(data) {
        var data_no_nodes = JSON.stringify(data);
        data_no_nodes = JSON.parse(data_no_nodes);
        delete data_no_nodes.nodes;
        var html = '';
        var now_nodes = data.nodes;
        var cz_img = '';
        if (data.marker == 1) {
            cz_img = '<i class="check_menu power_list_tree_img_c fa fa-check-square-o"></i>';
        } else {
            cz_img = '<i class="check_menu power_list_tree_img_c fa fa-square-o"></i>';
        }
        html += '<li class="dd-item" data-id="' + data.id + '">';
        if (now_nodes && now_nodes.length && now_nodes.length > 0) {
            html += '<div data-param="' + main.jsonToStr(data_no_nodes) + '" class="dd-handle">' + data.name + cz_img + '</div><ol class="dd-list">';
            for (var b = 0; b < now_nodes.length; b++) {
                html += managePower.nodesListFor(now_nodes[b]);
            }
            html += '</ol>';
        } else {
            html += '<div data-param="' + main.jsonToStr(data_no_nodes) + '" class="dd-handle">' + data.name + cz_img + '</div>';
        }
        html += '</li>';
        return html;
    },
    menuParentInit: function(id) {
        common.post_shtml_json("ser/role/roleToMenuList", {
            rid: id
        }, function(res) {
            if (res && res.data.length > 0) {
                var html = '';
                for (var a = 0; a < res.data.length; a++) {
                    html += managePower.nodesListFor(res.data[a]);
                }
                $("#nestable_menu").html('<ol class="dd-list">' + html + '</ol>');
                main.initHtmlLayui();
                $('#nestable_menu').nestable({
                    group: 2
                });
                $('#nestable_menu').nestable('expandAll');
                managePower.menuCheckInit();
            } else {

            }
        });
    },
    getCheckMenuIds: function() {
        var ids = '';
        var _check = $("i.check_menu.fa-check-square-o");
        for (var a = 0; a < _check.length; a++) {
            var _t = _check.eq(a).parent().data("param");
            _t = main.strToJson(_t);
            ids += _t.id + ",";
        }
        return ids.substring(0, ids.length - 1);
    },
    menuAndRoleCheck: function() {
        var _rid = $("i.check_role.fa-check-square-o").parent().data("param");
        _rid = main.strToJson(_rid);
        common.post_shtml_json("ser/role/addPermissionToRole", {
            rid: _rid.id,
            ids: managePower.getCheckMenuIds()
        }, function(res) {
            if (res && res.resultCode == 200) {
                layer.msg("操作成功");
            } else {

            }
        });
    },
    init: function() {
        managePower.roleParentInit();
    }
};
$(function() {
    managePower.init();
});