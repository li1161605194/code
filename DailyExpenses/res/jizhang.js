var zd_datype, zd_paytype;
$(function() {
    common.goBackNavbarLeft();
    jizhangInit.inputDateTime();
    zd_datype = $("#jz_type_temp");
    var yi_sq = zd_datype.initScreen({
        boxId: "#screenQuery",
        queryType: 2,
        defaultXuanz: 1,
        searchBoxs: [{
            menuText: "账单类型",
            dataList: czArray
        }],
        querenfunc: function(data) {
            var type = common.keyCorrespondingValue(billTypeCommonzhey, data.type);
            $("#jz_type_temp").val(type);
            $("#jz_da_type").val(data.yiji[0]);
            $("#jz_type").val(data.type);
            if (data.yiji[0] == 2) {
                $("#sf_jz_paytype").css("display", "block");
            } else {
                $("#sf_jz_paytype").css("display", "none");
            }
        }
    });
    $(document).on('click', '#jz_type_temp', function() {
        yi_sq.showScreenQuery(zd_datype);
    });
    zd_paytype = $("#jz_paytype_temp");
    var er_sq = zd_paytype.initScreen({
        boxId: "#screenQuery_paytype",
        queryType: 2,
        defaultXuanz: 0,
        searchBoxs: [{
            menuText: "支付方式",
            dataList: paytypeArray
        }],
        querenfunc: function(data) {
            var type = common.keyCorrespondingValue(billPayTypeCommonzhey, data.type);
            $("#jz_paytype_temp").val(type);
            $("#jz_paytype").val(data.type);
        }
    });
    $(document).on('click', '#jz_paytype_temp', function() {
        er_sq.showScreenQuery(zd_paytype);
    });
    $("#jz_time").val(common.nowDateTime());
    $(".jz_add").click(function() {
        if (feiNullUndefind($("#jz_time").val())) {
            layer.msg("账单日期时间不能为空");
            return false;
        }
        if (feiNullUndefind($("#jz_da_type").val())) {
            layer.msg("账单类型不能为空");
            return false;
        } else {
            if ($("#jz_da_type").val() == 2 && feiNullUndefind($("#jz_paytype").val())) {
                layer.msg("支付方式不能为空");
                return false;
            }
        }
        if (feiNullUndefind($("#jz_type").val())) {
            layer.msg("账单类型不能为空");
            return false;
        }
        if (feiNullUndefind($("#jz_account").val())) {
            layer.msg("账单金额不能为空");
            return false;
        } else {
            if (isNaN($("#jz_account").val())) {
                layer.msg("账单金额必须为数字");
                return false;
            }
        }
        insertBill();
    })
});

function feiNullUndefind(a) {
    if (a == "" || a == null || a == undefined) {
        return true;
    } else {
        return false;
    }
}
var dataParams = {};
var jizhangInit = {
    inputDateTime: function() {
        var now = new Date(),
            min = new Date(now.getFullYear() - 2, now.getMonth() + 1, now.getDate());
        max = new Date(now.getFullYear() + 4, now.getMonth() + 1, now.getDate());
        var instance = mobiscroll.date('#jz_time', {
            lang: 'zh',
            display: 'bottom',
            max: max,
            min: min,
            theme: 'ios',
            dateFormat: 'yy-mm-dd'
        });

    }
}

function insertBill() {
    $.ajax({
        url: originName + '/DailyExpenses/php/jizhang.php',
        type: 'POST',
        dataType: 'json',
        data: {
            data: {
                da_type: $("#jz_da_type").val(),
                type: $("#jz_type").val(),
                paytype: $("#jz_paytype").val(),
                money: $("#jz_account").val(),
                date: $("#jz_time").val(),
                remark: $("#jz_remark").val()
            }
        },
        success: function(res) {
            if (res.resultCode && res.resultCode == "Y") {
                layer.msg("账单记录成功");
                $("input").val("");
                $("#jz_time").val(common.nowDateTime());
            } else {
                layer.msg(res.error);
            }
        },
        error: function(res) {
            layer.msg(res.error);
        }
    });

}

var czArray = [{
    yijiText: "收入",
    yijiKey: "type",
    yijiValue: "1",
    yijiImg: "../res/img/meishi1.png",
    dataList: [{
        erjiText: "工资",
        erjiValue: "11"
    }, {
        erjiText: "兼职",
        erjiValue: "12"
    }, {
        erjiText: "红包",
        erjiValue: "13"
    }, {
        erjiText: "奖励",
        erjiValue: "14"
    }, {
        erjiText: "其他",
        erjiValue: "15"
    }]
}, {
    yijiText: "支出",
    yijiValue: "2",
    yijiKey: "type",
    defaultValue: "22",
    yijiImg: "../res/img/meishi2.png",
    dataList: [{
        erjiText: "服饰穿戴",
        erjiValue: "21"
    }, {
        erjiText: "食材餐饮",
        erjiValue: "22"
    }, {
        erjiText: "交通通勤",
        erjiValue: "23"
    }, {
        erjiText: "生活缴费",
        erjiValue: "24"
    }, {
        erjiText: "日用百货",
        erjiValue: "25"
    }, {
        erjiText: "化妆美容",
        erjiValue: "26"
    }, {
        erjiText: "娱乐游玩",
        erjiValue: "29"
    }, {
        erjiText: "红包",
        erjiValue: "27"
    }, {
        erjiText: "其他",
        erjiValue: "28"
    }]
}, {
    yijiText: "借出",
    yijiValue: "3",
    yijiKey: "type",
    yijiImg: "../res/img/meishi3.png",
    dataList: [{
        erjiText: "应收款",
        erjiValue: "31"
    }]
}, {
    yijiText: "借入",
    yijiValue: "4",
    yijiKey: "type",
    yijiImg: "../res/img/meishi4.png",
    dataList: [{
        erjiText: "外欠款",
        erjiValue: "41"
    }]
}]

var paytypeArray = [{
    yijiText: "支付方式",
    yijiKey: "type",
    yijiValue: "1",
    defaultValue: "11",
    yijiImg: "../res/img/meishi1.png",
    dataList: [{
        erjiText: "现金",
        erjiValue: "11"
    }, {
        erjiText: "支付宝",
        erjiValue: "11.1"
    }, {
        erjiText: "微信",
        erjiValue: "11.2"
    }, {
        erjiText: "银行卡",
        erjiValue: "12"
    }, {
        erjiText: "信用卡",
        erjiValue: "13"
    }, {
        erjiText: "蚂蚁花呗",
        erjiValue: "14"
    }, {
        erjiText: "京东白条",
        erjiValue: "15"
    }, {
        erjiText: "其他",
        erjiValue: "16"
    }]
}]