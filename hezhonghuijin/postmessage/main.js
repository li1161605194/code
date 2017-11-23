let goEasy;
class ChatRomm {
    constructor() {
        this.appkey = 'BC-c277a47659194c2ebd0ce76290d4ffc9'
    }
    init() {
        goEasy = new GoEasy({
            appkey: this.appkey,
            onConnected: function() {
                //console.log("成功连接GoEasy。");
            },
            onDisconnected: function() {
                //console.log("与GoEasy连接断开。");
            },
            onConnectFailed: function(error) {
                console.log("与GoEasy连接失败，错误编码：" + error.code + "错误信息：" + error.content);
            }
        });
    }
    send() {
        var msg = $("#send_text").val();
        if (msg.length && msg.length != undefined && msg.length > 0) {
            goEasy.publish({
                channel: "all",
                message: msg + pd + ziji,
                onSuccess: function() {
                    $("#send_text").val('');
                    //console.log("消息发布成功。");
                },
                onFailed: function(error) {
                    console.log("消息发送失败，错误编码：" + error.code + " 错误信息：" + error.content);
                }
            });
        }
    }
    subscribe() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        let datetime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        goEasy.subscribe({
            channel: "my_channel",
            onMessage: function(message) {
                let msg = message.content;
                let up_ziji = $(".text_ul").find("li").last().attr("ziji");
                if (up_ziji == msg.split(pd)[1]) {
                    if (msg.split(pd)[1] == ziji) {
                        $(".text_ul").append('<li ziji="' + msg.split(pd)[1] + '" class="text_li ziji"><p class="msgwz">' + msg.split(pd)[0] + '</p></li>')
                    } else {
                        $(".text_ul").append('<li ziji="' + msg.split(pd)[1] + '" class="text_li"><p class="msgwz">' + msg.split(pd)[0] + '</p></li>')
                    }
                } else {
                    if (msg.split(pd)[1] == ziji) {
                        $(".text_ul").append('<li ziji="' + msg.split(pd)[1] + '" class="text_li ziji"><p class="msguser">' + datetime + ':我</p><p class="msgwz">' + msg.split(pd)[0] + '</p></li>')
                    } else {
                        $(".text_ul").append('<li ziji="' + msg.split(pd)[1] + '" class="text_li"><p class="msguser">匿名' + ziji + ':' + datetime + '</p><p class="msgwz">' + msg.split(pd)[0] + '</p></li>')
                    }
                }
            },
            onSuccess: function() {
                //console.log("Channel订阅成功。");
            },
            onFailed: function(error) {
                console.log("Channel订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
            }
        });
        goEasy.subscribe({
            channel: "all",
            onMessage: function(message) {
                let msg = message.content;
                let up_ziji = $(".text_ul").find("li").last().attr("ziji");
                if (up_ziji == msg.split(pd)[1]) {
                    if (msg.split(pd)[1] == ziji) {
                        $(".text_ul").append('<li ziji="' + msg.split(pd)[1] + '" class="text_li ziji"><p class="msgwz">' + msg.split(pd)[0] + '</p></li>')
                    } else {
                        $(".text_ul").append('<li ziji="' + msg.split(pd)[1] + '" class="text_li"><p class="msgwz">' + msg.split(pd)[0] + '</p></li>')
                    }
                } else {
                    if (msg.split(pd)[1] == ziji) {
                        $(".text_ul").append('<li ziji="' + msg.split(pd)[1] + '" class="text_li ziji"><p class="msguser">' + datetime + ':我</p><p class="msgwz">' + msg.split(pd)[0] + '</p></li>')
                    } else {
                        $(".text_ul").append('<li ziji="' + msg.split(pd)[1] + '" class="text_li"><p class="msguser">匿名' + ziji + ':' + datetime + '</p><p class="msgwz">' + msg.split(pd)[0] + '</p></li>')
                    }
                }
            },
            onSuccess: function() {
                //console.log("Channel订阅成功。");
            },
            onFailed: function(error) {
                console.log("Channel订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
            }
        });
    }
}

const pd = "$^#&#^$";
let ziji = new Date().getTime().toString();
ziji = ziji.substring(ziji.length - 5, ziji.length);

$(function() {
    let chatroom = new ChatRomm();
    chatroom.init();
    chatroom.subscribe();
    $("#send_btn").click(function(event) {
        chatroom.send();
    });
})