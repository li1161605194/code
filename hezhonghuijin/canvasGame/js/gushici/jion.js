var _pr;
$(function() {
    _pr = new RECEPUSH({});
    _pr.init();
    $(document).on("click", ".kspk", function(e) {
        var _this = $(this);
        var pkid = _this.attr("pkid");
        _pr.pushchannel({
            channel: pkid,
            message: [onlyid_form, "fqtz"],
            succfun: function() {

            }
        });
    });
    _pr.pushchannel({
        channel: "jion",
        message: onlyid_form,
        succfun: function() {

        }
    });
    _pr.receivechannel({
        channel: onlyid_form,
        receiveMessage: function(msg) {
            if (typeof(msg) == "object" && msg[1] == "fqtz") {
                fqtz(msg);
            }
            if (typeof(msg) == "object" && msg[1] == "jstzksdz") {
                jstzksdz(msg);
            }
            if (typeof(msg) == "object" && msg[1] == "jjtzgl") {
                jjtzgl(msg);
            }
        }
    });
    _pr.receivechannel({
        channel: "jion",
        receiveMessage: function(msg) {
            if (msg == onlyid_form) {} else {
                $("#lbul").append('<li class="lbli">' +
                    '<span class="nwname">' + msg + '</span>' +
                    '<span class="kspk" pkid="' + msg + '">开始PK</span>' +
                    '</li>');
            }
        }
    });
});

jstzksdz = function(msg) {
    window.location.href = "pk.html?pksf=tzz&pkid=" + msg[0];
}
jjtzgl = function(msg) {
    layer.open({
        content: '对方有点胆小!拒绝了~~~',
        skin: 'msg',
        time: 3
    });
    return false;
}
fqtz = function(msg) {
    layer.open({
        content: '您是否相信自己的智商？',
        btn: ['相当相信', '我笨!不接受'],
        yes: function(index) {
            _pr.pushchannel({
                channel: msg[0],
                message: [onlyid_form, "jstzksdz"],
                succfun: function() {
                    window.location.href = "pk.html?pksf=btz&pkid=" + msg[0];
                }
            });
            layer.close(index);
        },
        no: function(index) {
            _pr.pushchannel({
                channel: msg[0],
                message: [onlyid_form, "jjtzgl"],
                succfun: function() {

                }
            });
            layer.close(index);
        }
    });
}