var editMenu = {
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
        html += '<option value="' + data.id + '">' + /*level_num + "级菜单" +*/ editMenu.fengeMMM(level_num) + data.name + '</option>';
        if (now_nodes.length > 0) {
            level_num = parseInt(level_num) + 1;
            for (var b = 0; b < now_nodes.length; b++) {
                if (now_nodes[b].nodes.length > 0) {
                    html += editMenu.nodesListFor(now_nodes[b], level_num);
                } else {
                    html += '<option value="' + now_nodes[b].id + '">' + /*level_num + "级菜单" +*/ editMenu.fengeMMM(level_num) + now_nodes[b].name + '</option>';
                }
            }
        }
        return html;
    },
    menuParentInit: function() {
        common.post_shtml_json("ser/user/menuAllToTree", {}, function(res) {
            if (res && res.rows.length > 0) {
                menuData = res.rows;
                var html = '';
                for (var a = 0; a < res.rows.length; a++) {
                    html += editMenu.nodesListFor(res.rows[a], 1);
                }
                $("#menu_parent").html('<option value="">请选择修改的菜单</option>' + html);
                main.initHtmlLayui();
            } else {

            }
        });
    },
    getMenuTreeData: function(id) {
        common.post_shtml_json("ser/user/findMenu", {
            id: id
        }, function(res) {
            if (res) {
                vm.menuID = res.menu.id;
                vm.name = res.menu.name;
                vm.url = res.menu.url;
                vm.listorder = res.menu.listorder;
            }
        });
    },
    vmInit: function() {
        vm = avalon.define({
            $id: configBase.vm,
            toggle: false,
            menuID: "",
            name: "",
            url: "",
            listorder: ""
        });
        form.on('select(parentId)', function(data) {
            //console.log(data);
            if (data.value != "") {
                vm.toggle = true;
                editMenu.getMenuTreeData(data.value);
            } else if (data.value == "") {
                vm.toggle = false;
            }
        });
    },
    init: function() {
        common.menuIconJson();
        editMenu.menuParentInit();
        editMenu.vmInit();
        form.on('submit(menu-add)', function(data) {
            common.post_shtml_json("ser/user/updateMenu", data.field, function(res) {
                if (res && res.resultCode == 200) {
                    editMenu.menuParentInit();
                    layer.msg("修改成功!");
                    vm.toggle = false;
                    tab.tabRefresh("menu/edit", 1);
                }
            });
            return false;
        });
        document.onkeydown = function(event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 13) { // enter 键
                $("#menu_edit_submit").click();
            }
        };
    }
};

$(function() {
    editMenu.init();
});