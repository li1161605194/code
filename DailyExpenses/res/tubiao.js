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
        month: ''
    });
    //$(".bill_zk").css("min-height", zH + "px");
})

var chazhangInit = {
    findBillList: function(data) {
        data.uid = window.localStorage.getItem("uid");
        $.ajax({
            url: originName + '/DailyExpenses/php/tubiao.php',
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
                var d = data[i];
                html += '<div date="' + d.t + '" class="tb_c_zk"><div class="tb_c_bjk">';
                html += '<div class="tb_c_t_k"><span class="tb_c_t">' + d.t + '</span></div>';
                html += '<div class="tb_c_xq_k">';
                if (common.numberNullUndefind(d.zongshouru) > 0 && d.zongshouruNum > 0) {
                    html += '<span class="tb_c_xq_c yi">收入：<em class="tb_cem yi">' + common.numberNullUndefind(d.zongshouru) + '</em>元' +
                        '---共<em class="tb_cem yi">' + d.zongshouruNum + '</em>笔</span>';
                }
                if (common.numberNullUndefind(d.zongzhichu) > 0 && d.zongzhichuNum > 0) {
                    html += '<span class="tb_c_xq_c er">支出：<em class="tb_cem er">' + common.numberNullUndefind(d.zongzhichu) + '</em>元' +
                        '---共<em class="tb_cem er">' + d.zongzhichuNum + '</em>笔</span>';
                }
                if (common.numberNullUndefind(d.zongjiechu) > 0 && d.zongjiechuNum > 0) {
                    html += '<span class="tb_c_xq_c san">借出：<em class="tb_cem san">' + common.numberNullUndefind(d.zongjiechu) + '</em>元' +
                        '---共<em class="tb_cem san">' + d.zongjiechuNum + '</em>笔</span>';
                }
                if (common.numberNullUndefind(d.zongjieru) > 0 && d.zongjieruNum > 0) {
                    html += '<span class="tb_c_xq_c si">借入：<em class="tb_cem si">' + common.numberNullUndefind(d.zongjieru) + '</em>元' +
                        '---共<em class="tb_cem si">' + d.zongjieruNum + '</em>笔</span>';
                }
                html += '</div></div></div>';
            }
            $(".tb_nrk").html(html);
            setTimeout(function() {
                functionInitClick();
            }, 123);
        } else {
            $(".tb_nrk").html('<span class="meiyoutishi">没有符合条件的数据</span>');
            layer.msg("没有符合条件的数据");
        }
    }
}

functionInitClick = function() {
    $(".tb_c_zk").each(function(k, v) {
        $(v).on("click", function(e) {
            if ($(this).attr("show") && $(this).attr("show") == "show") {
                $(this).attr("show", "hide");
                $(this).find(".xq_zk").remove();
            } else {
                var date = $(this).attr("date");
                findBillDetailList(date, $(this));
                $(this).attr("show", "show");
            }
        });
    });
}

findBillDetailList = function(date, _this) {
    $.ajax({
        url: originName + '/DailyExpenses/php/detail_yi.php',
        type: 'POST',
        dataType: 'json',
        data: {
            data: {
                date: date
            }
        },
        success: function(res) {
            if (res.resultCode && res.resultCode == "Y") {
                console.info(_this);
                if (res.dataList && res.dataList.length > 0) {
                    var leg = res.dataList.length;
                    var html = '';
                    for (var i = 0; i < leg; i++) {
                        var d = res.dataList[i];
                        var paytypeordatype = common.keyCorrespondingValue(billDaType, d.datype);
                        if (d.datype == 2) {
                            paytypeordatype = "通过" + common.keyCorrespondingValue(billPayTypeCommonzhey, d.paytype) + "支付";
                        }
                        html += '<div class="xq_zk"><div class="xq_dwk"><div class="xq_bjk">' +
                            '<p class="xq_sm"><em class="xq_emc yi">' + (i + 1) + '、' + d.remark + '</em><em class="xq_emc er">' + paytypeordatype + '</em>' +
                            '<em class="xq_emc yi"></em><em class="xq_emc san">' + common.numberNullUndefind(d.bmoney) + '元</em>' +
                            '<em class="xq_emc si"></em><em class="xq_emc wu"></em></p>' +
                            '</div></div></div>';
                    }
                    _this.append(html);
                }
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
    yijiText: "年份",
    yijiKey: "year",
    yijiImg: "../res/img/meishi3.png",
    defaultValue: "2018",
    dataList: [{
        erjiText: "2017"
    }, {
        erjiText: "2018"
    }, {
        erjiText: "2019"
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