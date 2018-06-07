var addRole = {
    roleOrgList: function() {
        common.post_shtml_json("ser/org/getOrgList", {}, function(res) {
            if (res && res.rows.length > 0) {
                var html = '';
                for (var a = 0; a < res.rows.length; a++) {
                    html += '<option value="' + res.rows[a].id + '">' + res.rows[a].name + '</option>';
                }
                $("#role_org").html(html);
                main.initHtmlLayui();
            } else {

            }
        });
    },
    init: function() {
        addRole.roleOrgList();
        form.on('submit(menu-add)', function(data) {
            common.post_shtml_json("ser/role/addRole", data.field, function(res) {
                if (res && res.resultCode == 200) {
                    layer.msg("添加成功!");
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
}

$(function() {
    addRole.init();
});