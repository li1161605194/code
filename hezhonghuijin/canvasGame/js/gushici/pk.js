randomTopic = function() {
    var type = parseInt(Math.random() * 2);
    var scTempJson = {};
    if (type === 0) {
        var scdata = shiCiMingJu.toString().split("|");
        var scleg = scdata.length;
        var sjs = parseInt(Math.random() * scleg);
        var temp = scdata[sjs].toString().split("____");
        scTempJson.content = temp[0];
        scTempJson.name = temp[1].toString().split("《")[0];
        scTempJson.title = temp[1].toString().split("《")[1].toString().split("》")[0];
        scTempJson.type = 0;
        if (temp[0].indexOf("，") != -1) {
            var a = temp[0].split("，");
            if (a == 2) {
                var typesx = parseInt(Math.random() * 2);
                if (typesx == 0) {
                    scTempJson.question = temp[0].split("，")[0];
                    scTempJson.answer = temp[0].split("，")[1];
                    scTempJson.type = 2;
                } else {
                    scTempJson.question = temp[0].split("，")[1];
                    scTempJson.answer = temp[0].split("，")[0];
                    scTempJson.type = 3;
                }
            }
        }
    } else if (type === 1) {
        var scleg2 = baike.length;
        var sjs2 = parseInt(Math.random() * scleg2);
        var temp2 = baike[sjs2];
        scTempJson.question = temp2.question;
        scTempJson.answer = temp2.answer;
        scTempJson.type = 1;
    }
    return scTempJson;
}
tm_init = function() {
    var s = randomTopic();
    var msg = [];
    if (s.type == 0) {
        msg = ["tm", "问:" + s.content + "的题目和作者是谁", s.title + "--" + s.name];
    } else if (s.type == 2) {
        msg = ["tm", "问:" + s.question + "的下一句是", s.answer + "--" + s.title + "--" + s.name];
    } else if (s.type == 3) {
        msg = ["tm", "问:" + s.question + "的上一句是", s.answer + "--" + s.title + "--" + s.name];
    } else if (s.type == 1) {
        msg = ["tm", s.question, s.answer];
    }
    msg.push(onlyid_form);
    _pr.pushchannel({
        channel: pushid_to,
        message: msg,
        succfun: function() {
            $(".qdan.qd").html("我会!我抢答").removeAttr("yqd");
            $("#wtda").hide();
            $("#xyt").hide();
            $("#pkstar").hide();
            $("#dqtiqu").show();
            $("#wttm").html(msg[1] + "？");
            $("#wtda").html("答案:" + msg[2]);
        }
    });
}
var _pr, qdsj = 999999999999999;
$(function() {
    if (urlJson.pkid) {
        pushid_to = urlJson.pkid;
    }
    if (urlJson.pksf && urlJson.pksf == "tzz") {
        $("#pkstar").show();
    } else if (urlJson.pksf && urlJson.pksf == "btz") {

    }

    _pr = new RECEPUSH({});
    _pr.init();
    $("#pkstar").click(function(e) {
        tm_init();
    });
    $("#xyt").click(function(event) {
        tm_init();
    });
    _pr.receivechannel({
        channel: onlyid_form,
        receiveMessage: function(msg) {
            if (typeof(msg) == "object" && msg[0] == "tm") {
                $(".qdan.qd").html("我会!我抢答").removeAttr("yqd");
                $("#wtda").hide();
                $("#xyt").hide();
                $("#pkstar").hide();
                $("#dqtiqu").show();
                $("#wttm").html(msg[1] + "？");
                $("#wtda").html("答案:" + msg[2]);
            } else if (typeof(msg) == "object" && msg[0] == "qdsj") {
                if (parseInt(qdsj) >= parseInt(msg[1])) {
                    $(".qdan.qd").html("不好意思!对方手太快了!请判断对方告诉你的答案").attr("yqd", "yqd"); //.attr("disabled", "disabled")
                    $("#wtda").show();
                    $("#xyt").show();
                } else {

                }
            }
        }
    });
    $(".qdan.qd").click(function(event) {
        if ($(".qdan.qd").attr("yqd") && $(".qdan.qd").attr("yqd") == "yqd") {
            $(".qdan.qd").html("不好意思!对方手太快了!请判断对方告诉你的答案");
            $("#wtda").show();
            $("#xyt").show();
        } else {
            qdsj = new Date().getTime();
            $(".qdan.qd").html("恭喜你抢到了,请告诉对手答案!");
            $(".qdan.qd").attr("yqd", "yqd");
            _pr.pushchannel({
                channel: pushid_to,
                message: ["qdsj", qdsj],
                succfun: function() {}
            });
        }
    });
})