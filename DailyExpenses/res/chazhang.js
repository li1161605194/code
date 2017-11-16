var pageNum = 1,
    nowPageNum = 0,
    totalPageNum = 0,
    cztj, yi_sq;
$(function() {
    yi_sq = $('.navbar-right');
    cztj = yi_sq.initScreen({
        boxId: "#screenQuery",
        searchBoxs: [{
            menuText: "筛选条件",
            dataList: czArray
        }]
    });
    common.goBackNavbarLeft();
    $(document).on('click', '.navbar-right', function() {
        var dataParams = cztj.showScreenQuery(yi_sq);
        if (dataParams) {
            nowPageNum = 0;
            totalPageNum = 0;
            pageNum = 1;
            dataParams.pageNum = 1;
            pageNum = 1;
            chazhangInit.findBillList(dataParams);
        }
    });
    chazhangInit.findBillList({
        type: "",
        money: "",
        year: "",
        month: "",
        pageNum: pageNum
    });
    //$(".bill_zk").css("min-height", zH + "px");
    $(document).on('click', '#upPage', function() {
        if (nowPageNum == 1) {
            layer.msg("当前已是第一页");
        } else {
            layer.load(0, {
                shade: false
            });
            nowPageNum = nowPageNum - 1;
            pageNum = pageNum - 1;
            $("#pageNum").html('共' + Math.ceil(parseInt(totalPageNum) / 10) + '页—第' + nowPageNum + '页');
            chazhangInit.findBillListCZ();
        }
    });
    $(document).on('click', '#downPage', function() {
        if (nowPageNum == Math.ceil(parseInt(totalPageNum) / 10)) {
            layer.msg("当前已是最后一页");
        } else {
            layer.load(0, {
                shade: false
            });
            nowPageNum = nowPageNum + 1;
            pageNum = pageNum + 1;
            $("#pageNum").html('共' + Math.ceil(parseInt(totalPageNum) / 10) + '页—第' + nowPageNum + '页');
            chazhangInit.findBillListCZ();
        }
    });

});

var chazhangInit = {
    findBillList: function(data) {
        data.uid = window.localStorage.getItem("uid");
        $.ajax({
            url: originName + '/DailyExpenses/php/chazhang.php',
            type: 'POST',
            dataType: 'json',
            data: {
                data: data
            },
            success: function(res) {
                layer.closeAll();
                if (res.resultCode && res.resultCode == "Y") {
                    chazhangInit.billInfoListHtml(res.dataList, res);
                } else {
                    layer.msg(res.error);
                }
            },
            error: function(res) {
                layer.msg(res.error);
            }
        });
    },
    findBillListCZ: function() {
        var dataParams = cztj.getXuanzParams(yi_sq);
        if (dataParams) {
            dataParams.pageNum = pageNum;
            chazhangInit.findBillList(dataParams);
        }
    },
    billInfoListHtml: function(data, res) {
        if (data != undefined && data.length && data.length > 0) {
            var d_leg = data.length;
            var html = '';
            for (var i = 0; i < d_leg; i++) {
                var bill_type = common.keyCorrespondingValue(billTypeCommonzhey, data[i].type);
                var bill_pay_type = "";
                if (!bill_pay_type) {
                    bill_pay_type = "";
                }
                var da_type = data[i].datype;
                var fontColor = "red";
                if (da_type == 1) {
                    fontColor = "green";
                } else if (da_type == 2 || da_type == 4) {
                    fontColor = "red";
                    if (da_type == 2) {
                        bill_type = common.keyCorrespondingValue(billTypeCommonchazhang, data[i].type);
                        bill_pay_type = common.keyCorrespondingValue(billPayTypeCommonzhey, data[i].paytype);
                    }
                } else if (da_type == 3) {
                    fontColor = "yellow";
                }
                var allType = bill_pay_type + bill_type;
                html += '<div class="bill_dwk_c"><div class="billcz_dwc"><div class="bill_nr_c">' +
                    /*'<span class="bill_nr_lie_c yi"><span class="fa fa-car tu_type"></span></span>' +*/
                    '<span class="bill_nr_lie_c yi"><img src="../res/img/200' + da_type + '.png" class="bill_img" /></span>' +
                    '<span class="bill_nr_lie_c er">' +
                    '<span class="bill_nrlie_c yi"><em class="bill_account ' + fontColor + '">' + parseFloat(data[i].bmoney).toFixed(2) + '</em><em class="bill_date">' + data[i].bdate + '</em></span>' +
                    '<span class="bill_nrlie_c er"><em class="bill_type">' + allType + '</em><em class="bill_remark">' + data[i].remark + '</em></span>' +
                    '</span></div>' +
                    '<div class="bill_cz_r_zk" bid="' + data[i].id + '"><span class="bill_r_del" bid="' + data[i].id + '">删除</span></div>' +
                    '<div class="bill_hdzz_dwk"></div>' +
                    '</div></div>';
            }
            if (totalPageNum != parseInt(res.totalNum)) {
                totalPageNum = parseInt(res.totalNum);
                var s = parseInt(res.totalNum);
                s = Math.ceil(s / 10);
                nowPageNum = pageNum;
                if (s > 1) {
                    common.pagingUpDown(s);
                } else {
                    pageNum = 1;
                    nowPageNum = 0;
                    totalPageNum = 0;
                    $(".page_zk").remove();
                }
            }
            $(".bill_nrk").html(html);
            setTimeout(function() {
                swipeLeftRight();
            }, 123);
        } else {
            nowPageNum = 0;
            totalPageNum = 0;
            pageNum = 1;
            $(".bill_nrk").html('<span class="meiyoutishi">没有符合条件的账单</span>');
            layer.msg("暂无账单");
            $(".page_zk").remove();
        }
    }
}

swipeLeftRight = function() {
    $(".bill_hdzz_dwk").each(function(k, v) {
        touch.on(v, 'swipeleft', function(ev) {
            console.info(this);
            var _thisp = $(this).parent();
            _thisp.find(".bill_nr_c").css("transform", "translateX(-22%)");
            _thisp.find(".bill_cz_r_zk").stop().animate({
                right: "0%"
            }, 111);
            ev.preventDefault();
        });
        touch.on(v, 'swiperight', function(ev) {
            console.info(this);
            var _thisp = $(this).parent();
            _thisp.find(".bill_nr_c").css("transform", "translateX(0%)");
            _thisp.find(".bill_cz_r_zk").stop().animate({
                right: "-22%"
            }, 111);
            ev.preventDefault();
        });
    });
    $(".bill_cz_r_zk").each(function(k, v) {
        $(v).on("click", function(e) {
            var bid = $(this).attr("bid");
            window.localStorage.setItem("bid", bid);
            layer.confirm('确认删除该条账单?', {
                btn: ['确认删除', '取消']
            }, function() {
                deleteBillList();
            }, function() {
                window.localStorage.setItem("bid", "");
            });
        });
    });
}

deleteBillList = function() {
    $.ajax({
        url: originName + '/DailyExpenses/php/delete.php',
        type: 'POST',
        dataType: 'json',
        data: {
            data: {
                uid: window.localStorage.getItem("uid"),
                bid: window.localStorage.getItem("bid")
            }
        },
        success: function(res) {
            if (res.resultCode && res.resultCode == "Y") {
                layer.msg("删除成功!");
                pageNum = 1;
                chazhangInit.findBillList({
                    type: "",
                    money: "",
                    year: "",
                    month: "",
                    pageNum: pageNum
                });
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
    yijiText: "账单类型",
    yijiKey: "type",
    yijiImg: "../res/img/meishi1.png",
    multiselect: true,
    jsonorarray: 2,
    dataList: [{
        erjiType: 2,
        erjiText: "收入"
    }, {
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
    }, {
        erjiType: 2,
        erjiText: "支出"
    }, {
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
    }, {
        erjiType: 2,
        erjiText: "借出"
    }, {
        erjiText: "应收款",
        erjiValue: "31"
    }, {
        erjiType: 2,
        erjiText: "借入"
    }, {
        erjiText: "外欠款",
        erjiValue: "41"
    }]
}, {
    yijiText: "账单金额",
    yijiKey: "money",
    yijiImg: "../res/img/meishi2.png",
    unlimited: true,
    dataList: [{
        erjiType: 2,
        erjiText: "区间查询"
    }, {
        erjiText: "0元-100元",
        erjiValue: "0-100"
    }, {
        erjiText: "100元-500元",
        erjiValue: "100-500"
    }, {
        erjiText: "500元-1000元",
        erjiValue: "500-1000"
    }, {
        erjiText: "1000元-5000元",
        erjiValue: "1000-5000"
    }, {
        erjiText: "5000元以上",
        erjiValue: "5000-999999999"
    }, {
        erjiType: 2,
        erjiText: "阶梯查询"
    }, {
        erjiText: "0元-100元",
        erjiValue: "0-100"
    }, {
        erjiText: "0元-500元",
        erjiValue: "0-500"
    }, {
        erjiText: "0元-1000元",
        erjiValue: "0-1000"
    }, {
        erjiText: "0元-5000元",
        erjiValue: "0-5000"
    }, {
        erjiText: "0元-5000元以上",
        erjiValue: "0-999999999"
    }]
}, {
    yijiText: "年份",
    yijiKey: "year",
    yijiImg: "../res/img/meishi3.png",
    unlimited: true,
    dataList: [{
        erjiText: "2017"
    }]
}, {
    yijiText: "月份",
    yijiKey: "month",
    yijiImg: "../res/img/meishi4.png",
    unlimited: true,
    dataList: [{
        erjiText: "1月",
        erjiValue: "01"
    }, {
        erjiText: "2月",
        erjiValue: "02"
    }, {
        erjiText: "3月",
        erjiValue: "03"
    }, {
        erjiText: "4月",
        erjiValue: "04"
    }, {
        erjiText: "5月",
        erjiValue: "05"
    }, {
        erjiText: "6月",
        erjiValue: "06"
    }, {
        erjiText: "7月",
        erjiValue: "07"
    }, {
        erjiText: "8月",
        erjiValue: "08"
    }, {
        erjiText: "9月",
        erjiValue: "09"
    }, {
        erjiText: "10月",
        erjiValue: "10"
    }, {
        erjiText: "11月",
        erjiValue: "11"
    }, {
        erjiText: "12月",
        erjiValue: "12"
    }]
}];