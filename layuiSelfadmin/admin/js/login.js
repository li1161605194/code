layui.use(['form', 'common', 'configBase'], function() {
    var form = layui.form,
        layer = layui.layer,
        configBase = layui.configBase,
        common = layui.common
        //自定义验证规则
    form.verify({
        pass: [/(.+){4,12}$/, '密码必须4到12位']
    });

    //监听提交
    form.on('submit(LAY-user-login-submit)', function(data) {
        data.field.pswd = $.md5(data.field.usnm + "#" + data.field.pswd);
        common.post_shtml_json("u/staffLogin", data.field, function(res) {
            if (res && res.resultCode == 200) {
                window.location.href = configBase.pages + "index.html";
            }
        });
        return false;
    });
    document.onkeydown = function(event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) { // enter 键
            $("#login_submit").click();
        }
    };

});