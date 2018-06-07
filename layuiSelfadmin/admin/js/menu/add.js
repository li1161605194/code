var addMenu = {
    fengeMMM: function(level_num) {
        var mmm = "***";
        for (var a = 0; a < level_num; a++) {
            mmm += "***";
        }
        return mmm;
    },
    nodesListFor: function(data, level_num) {
        var html = '';
        var now_nodes = data.nodes;
        html += '<option value="' + data.id + '">' + /*level_num + "级菜单" +*/ addMenu.fengeMMM(level_num) + data.name + '</option>';
        if (now_nodes.length > 0) {
            level_num = parseInt(level_num) + 1;
            for (var b = 0; b < now_nodes.length; b++) {
                if (now_nodes[b].nodes.length > 0) {
                    html += addMenu.nodesListFor(now_nodes[b], level_num);
                } else {
                    html += '<option value="' + now_nodes[b].id + '">' + /*level_num + "级菜单" +*/ addMenu.fengeMMM(level_num) + now_nodes[b].name + '</option>';
                }
            }
        }
        return html;
    },
    menuParentInit: function() {
        common.post_shtml_json("ser/user/menuAllToTree", {}, function(res) {
            if (res && res.rows.length > 0) {
                var html = '';
                for (var a = 0; a < res.rows.length; a++) {
                    html += addMenu.nodesListFor(res.rows[a], 1);
                }
                $("#menu_parent").html('<option value="0">*根级目录</option>' + html);
                main.initHtmlLayui();
            } else {

            }
        });
    },
    init: function() {
        common.menuIconJson();
        addMenu.menuParentInit();
        form.on('submit(menu-add)', function(data) {
            common.post_shtml_json("ser/user/addMenu", data.field, function(res) {
                if (res && res.resultCode == 200) {
                    addMenu.menuParentInit();
                    layer.msg("添加成功!");
                    tab.tabRefresh("menu/add", 1);
                }
            });
            return false;
        });
        document.onkeydown = function(event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 13) { // enter 键
                $("#menu_add_submit").click();
            }
        };
    }
};
$(function() {
    addMenu.init();
});