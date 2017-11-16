var hrefName = window.location.origin;
$(function() {
    loginStatu();
    $("body").css({
        "height": $(window).height() + "px",
        "min-height": $(window).height() + "px"
    });
    $("#submit_goin").click(function() {
        if ($("#user_name").val() == "" || $("#user_password").val() == "") {
            layer.msg("用户名或密码不能为空");
        } else {
            postuserinfo();
        }
    });
    $("#page_load").click(function() {
        window.location.href = hrefName + '/login.html?v_' + Math.random();
    });
})

function loginStatu() {
    $.ajax({
        url: window.location.origin + '/DailyExpenses/php/login.php',
        type: 'POST',
        dataType: 'json',
        data: {
            data: {
                type: "loginagin"
            }
        },
        success: function(res) {
            if (res.resultCode && res.resultCode == "Y") {
                document.getElementById("show").src = hrefName + res.href + "?v=" + Math.random(9);
                $(".zlogink").remove();
            } else {
                layer.msg(res.error);
            }
        },
        error: function(res) {
            layer.msg(res.error);
        }
    });

}

function postuserinfo() {
    $.ajax({
        url: window.location.origin + '/DailyExpenses/php/login.php',
        type: 'POST',
        dataType: 'json',
        data: {
            data: {
                type: "login",
                user_name: $("#user_name").val(),
                user_password: base64Md5Sha1($("#user_password").val()),
                user_code: base64Md5Sha1($("#user_code").val())
            }
        },
        success: function(res) {
            if (res.resultCode && res.resultCode == "Y") {
                document.getElementById("show").src = hrefName + res.href + "?v=" + Math.random(9);
                $(".zlogink").remove();
            } else {
                layer.msg(res.error);
            }
        },
        error: function(res) {
            layer.msg(res.error);
        }
    });

}

base64Md5Sha1 = function(a) {
    var base = new Base64();
    return hex_sha1(md5(base.encode(a)));
}