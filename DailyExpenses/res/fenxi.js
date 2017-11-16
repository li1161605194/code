var cztj, yi_sq;
$(function() {
    yi_sq = $('.navbar-right');
    cztj = yi_sq.initScreen({
        boxId: "#screenQuery",
        defaultXuanz: 0,
        searchBoxs: [{
            menuText: "筛选条件",
            dataList: czArray
        }]
    });
    common.goBackNavbarLeft();
    $(document).on('click', '.navbar-right', function() {
        var dataParams = cztj.showScreenQuery(yi_sq);
        if (dataParams) {
            chazhangInit.findBillList(dataParams);
        }
    });
    chazhangInit.findBillList({
        year: '2017',
        type: 'fullyear',
        month: ''
    });
    //$(".bill_zk").css("min-height", zH + "px");
})

var chazhangInit = {
    findBillList: function(data) {
        data.uid = window.localStorage.getItem("uid");
        $.ajax({
            url: originName + '/DailyExpenses/php/fenxi.php',
            type: 'POST',
            dataType: 'json',
            data: {
                data: data
            },
            success: function(res) {
                layer.closeAll();
                if (res.resultCode && res.resultCode == "Y") {
                    if (data.type == "fullyear") {
                        chazhangInit.billFullYearHtml(res.dataList, res);
                    } else if (data.type == "allmonth") {
                        chazhangInit.billAllMonthHtml(res.dataList, res);
                    } else if (data.type == "onemonth") {
                        chazhangInit.billOnemonthHtml(res.dataList, res);
                    } else {
                        chazhangInit.billAllMonthHtml(res.dataList, res);
                    }
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
    billFullYearHtml: function(data, res) {
        if (data != undefined && data.length && data.length > 0) {
            var fullYearYi = echarts.init(document.getElementById('fullYearYi'));
            var fullYearEr = echarts.init(document.getElementById('fullYearEr'));
            var fullYearSan = echarts.init(document.getElementById('fullYearSan'));

            fullYearYiOption.title.text = data[0].t + "全年账单总收支占比";
            fullYearYiOption.series[0].data[0].value = common.numberNullUndefind(data[0].zongshouru);
            fullYearYiOption.series[0].data[1].value = common.numberNullUndefind(data[0].zongzhichu);
            fullYearYiOption.series[0].data[2].value = common.numberNullUndefind(data[0].zongjiechu);
            fullYearYiOption.series[0].data[3].value = common.numberNullUndefind(data[0].zongjieru);

            fullYearErOption.title.text = data[0].t + "全年各类型支出占比";
            fullYearErOption.series[0].data[0].value = common.numberNullUndefind(data[0].zcfscd);
            fullYearErOption.series[0].data[1].value = common.numberNullUndefind(data[0].zcsccy);
            fullYearErOption.series[0].data[2].value = common.numberNullUndefind(data[0].zcjttq);
            fullYearErOption.series[0].data[3].value = common.numberNullUndefind(data[0].zcshjf);
            fullYearErOption.series[0].data[4].value = common.numberNullUndefind(data[0].zcrybh);
            fullYearErOption.series[0].data[5].value = common.numberNullUndefind(data[0].zchzmr);
            fullYearErOption.series[0].data[6].value = common.numberNullUndefind(data[0].zchb);
            fullYearErOption.series[0].data[7].value = common.numberNullUndefind(data[0].zcqt);
            fullYearErOption.series[0].data[8].value = common.numberNullUndefind(data[0].zcylyw);

            fullYearSanOption.title.text = data[0].t + "全年支付方式占比";
            fullYearSanOption.series[0].data[0].value = common.numberNullUndefind(data[0].zffsxj);
            fullYearSanOption.series[0].data[1].value = common.numberNullUndefind(data[0].zffszfb);
            fullYearSanOption.series[0].data[2].value = common.numberNullUndefind(data[0].zffswx);
            fullYearSanOption.series[0].data[3].value = common.numberNullUndefind(data[0].zffsyhk);
            fullYearSanOption.series[0].data[4].value = common.numberNullUndefind(data[0].zffsxyk);
            fullYearSanOption.series[0].data[5].value = common.numberNullUndefind(data[0].zffsmyhb);
            fullYearSanOption.series[0].data[6].value = common.numberNullUndefind(data[0].zffsjdbt);
            fullYearSanOption.series[0].data[7].value = common.numberNullUndefind(data[0].zffsqt);

            fullYearYi.setOption(fullYearYiOption);
            fullYearEr.setOption(fullYearErOption);
            fullYearSan.setOption(fullYearSanOption);

        } else {
            $(".tb_nrk").html('<span class="meiyoutishi">没有符合条件的数据</span>');
            layer.msg("没有符合条件的数据");
        }
    }
}



var fullYearYiOption = {
    title: {
        text: '全年账单总收支占比',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{b}: {c}元 ({d}%)"
    },
    series: [{
        type: 'pie',
        radius: '45%',
        center: ['50%', '55%'],
        data: [{
            value: 0,
            name: '收入'
        }, {
            value: 0,
            name: '支出'
        }, {
            value: 0,
            name: '借出'
        }, {
            value: 0,
            name: '借入'
        }]
    }]
};

var fullYearErOption = {
    title: {
        text: '全年各类型支出占比',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{b}: {c}元 ({d}%)"
    },
    series: [{
        type: 'pie',
        radius: '45%',
        center: ['50%', '55%'],
        data: [{
            value: 0,
            name: '服饰穿戴'
        }, {
            value: 0,
            name: '食材餐饮'
        }, {
            value: 0,
            name: '交通通勤'
        }, {
            value: 0,
            name: '生活缴费'
        },{
            value: 0,
            name: '日用百货'
        }, {
            value: 0,
            name: '化妆美容'
        }, {
            value: 0,
            name: '红包'
        }, {
            value: 0,
            name: '其他'
        }, {
            value: 0,
            name: '娱乐游玩'
        }]
    }]
};

var fullYearSanOption = {
    title: {
        text: '全年消费支付方式占比',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{b}: {c}元 ({d}%)"
    },
    series: [{
        type: 'pie',
        radius: '45%',
        center: ['50%', '55%'],
        data: [{
            value: 0,
            name: '现金'
        }, {
            value: 0,
            name: '支付宝'
        }, {
            value: 0,
            name: '微信'
        }, {
            value: 0,
            name: '银行卡'
        },{
            value: 0,
            name: '信用卡'
        }, {
            value: 0,
            name: '蚂蚁花呗'
        }, {
            value: 0,
            name: '京东白条'
        }, {
            value: 0,
            name: '其他'
        }]
    }]
};

var czArray = [{
    yijiText: "年份",
    yijiKey: "year",
    yijiImg: "../res/img/meishi1.png",
    defaultValue: "2017",
    dataList: [{
        erjiText: "2017"
    }]
}, {
    yijiText: "类型",
    yijiKey: "type",
    yijiImg: "../res/img/meishi2.png",
    defaultValue: "fullyear",
    dataList: [{
        erjiText: "整年",
        erjiValue: "fullyear"
    }, {
        erjiText: "各月",
        erjiValue: "allmonth"
    }, {
        erjiText: "单月",
        erjiValue: "onemonth"
    }]
}, {
    yijiText: "月份",
    yijiKey: "month",
    yijiImg: "../res/img/meishi3.png",
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