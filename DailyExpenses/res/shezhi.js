$(function() {
    common.goBackNavbarLeft();
    $(".login_out").click(function() {
        layer.confirm('确认退出?', {
            btn: ['忍心退出', '再等等'] //按钮
        }, function() {
            localStorage.clear();
            $.ajax({
                url: window.location.origin + '/DailyExpenses/php/login.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    data: {
                        type: "loginout"
                    }
                },
                success: function(res) {
                    if (res.resultCode && res.resultCode == "Y") {
                        layer.msg(res.msg);
                    } else {
                        layer.msg(res.error);
                    }
                },
                error: function(res) {
                    layer.msg(res.error);
                }
            });
            window.location.href = originName + '/login.html?v_' + Math.random();
        }, function() {

        });
    });
});