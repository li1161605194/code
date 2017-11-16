var goEasySend = new GoEasy({
    appkey: "BC-c277a47659194c2ebd0ce76290d4ffc9",
    onConnected: function() {
        console.info("成功连接GoEasy。");
    },
    onDisconnected: function() {
        console.info("与GoEasy连接断开。");
    },
    onConnectFailed: function(error) {
        console.info("与GoEasy连接失败，错误编码：" + error.code + "错误信息：" + error.content);
    }
});
var goEasyReceive = new GoEasy({
    appkey: "BS-3e4d6c3cf9834766ae81b000d172343e",
    onConnected: function() {
        console.info("成功连接GoEasy。");
    },
    onDisconnected: function() {
        console.info("与GoEasy连接断开。");
    },
    onConnectFailed: function(error) {
        console.info("与GoEasy连接失败，错误编码：" + error.code + "错误信息：" + error.content);
    }
});

var searchParse;
$(function() {
    initDomStyleFunction();
    searchParse = UC.searchParse();
    $("#sendMessage").click(function() {
        var message = $("#message").val();
        goEasySend.publish({
            channel: searchParse.sendId,
            message: message,
            onSuccess: function() {
                var img = searchParse.sendId == "lst" ? "1" : "2";
                var html = '<div class="ltnr_right ltnr_c"><span class="ltnrwz_c ltnrwz_right">' + message + '</span>' +
                    '<img class="lttximg_c img_right" src="../img/say/' + img + '.jpg" /></div>';
                $(".ltnrk").append(html);
                $('.ltnrk').scrollTop($('.ltnrk')[0].scrollHeight);
                $("#message").focus();
                $("#message").val('');
                $("#message").select();
            },
            onFailed: function(error) {
                console.info("消息发送失败，错误编码：" + error.code + " 错误信息：" + error.content);
            }
        });
    });
    goEasyReceive.subscribe({
        channel: searchParse.receiveId,
        onMessage: function(message) {
            var img = searchParse.receiveId == "lst" ? "1" : "2";
            var html = '<div class="ltnr_left ltnr_c"><img class="lttximg_c img_left" src="../img/say/' + img + '.jpg" />' +
                '<span class="ltnrwz_c ltnrwz_left">' + message.content + '</span></div>';
            $(".ltnrk").append(html);
            $('.ltnrk').scrollTop($('.ltnrk')[0].scrollHeight);
        },
        onSuccess: function() {
            console.info("Channel订阅成功。");
        },
        onFailed: function(error) {
            console.info("Channel订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
        }
    });
});

initDomStyleFunction = function() {
    var _h = window.innerHeight;
    var _w = window.innerWidth;
    $(".ltzk").height(_h);
    var top_h = $(".titlezk").height();
    var bottom_h = $(".sendzk").height();
    //$(".ltzk").width(_w);
    $(".ltnrk").height(_h - top_h - bottom_h - 24);
    $('.ltnrk').scrollTop($('.ltnrk')[0].scrollHeight);
    $("#message").click(function() {
        $(".sendzk").css("position", "fixed");
    }).blur(function() {
        $(".sendzk").css("position", "absolute");
    }).focus(function() {
        $(".sendzk").css("position", "fixed");
    });
}
