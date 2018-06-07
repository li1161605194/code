var pageNum = 1,
    nowPageNum = 0,
    totalPageNum = 0;
$(function() {
    common.goBackNavbarLeft();
    chazhangInit.inputDateTime();
    chazhangInit.findBillList({
        pageNum: pageNum
    });
    $(document).on('click', '.navbar-nav.navbar-right', function() {
        $("#jz_time").val(common.nowDateTime());
        var tgLayer = layer.open({
            type: 1,
            title: '添加',
            shadeClose: true,
            shade: 0.8,
            area: ['100%', '100%'],
            content: $("#add_darizi")
        });
    });
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
    $(".jz_add").click(function() {
        if (feiNullUndefind($("#jz_time").val())) {
            layer.msg("日期时间不能为空");
            return false;
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

function insertBill() {
    $.ajax({
        url: originName + '/DailyExpenses/php/darizi_add.php',
        type: 'POST',
        dataType: 'json',
        data: {
            data: {
                date: $("#jz_time").val(),
                remark: $("#jz_remark").val()
            }
        },
        success: function(res) {
            if (res.resultCode && res.resultCode == "Y") {
                layer.msg("记录成功");
                $("input").val("");
                layer.closeAll();
                chazhangInit.findBillList({
                    pageNum: 1
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

var chazhangInit = {
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
    },
    findBillList: function(data) {
        data.uid = window.localStorage.getItem("uid");
        $.ajax({
            url: originName + '/DailyExpenses/php/darizi.php',
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
                layer.msg(JSON.stringify(res));
            }
        });
    },
    findBillListCZ: function() {
        var dataParams = {};
        dataParams.pageNum = pageNum;
        chazhangInit.findBillList(dataParams);
    },
    billInfoListHtml: function(data, res) {
        if (data != undefined && data.length && data.length > 0) {
            var d_leg = data.length;
            var html = '',
                yuceshijian = '';
            for (var i = 0; i < d_leg; i++) {
                var jiangeshijian = "",
                    imgnum = "1",
                    dates = 27,
                    sj = '';
                sj = data[i].shijian.split(" ")[0];
                if (i == (d_leg - 1)) {} else {
                    dates = Math.floor(((new Date(sj).getTime() - new Date(data[i + 1].shijian).getTime())) / (1000 * 60 * 60 * 24));
                    jiangeshijian = '周期:<span style="color:red;font-size:1.8rem;vertical-align: baseline;">' + dates + '</span>天';
                }
                if (dates == 26 || dates == 27 || dates == 28) {
                    imgnum = "5";
                } else if (dates == 25 || dates == 29) {
                    imgnum = "6";
                } else if (dates == 24 || dates == 30) {
                    imgnum = "7";
                } else if (dates == 23 || dates == 31) {
                    imgnum = "8";
                }
                html += '<div class="bill_dwk_c"><div class="billcz_dwc"><div class="bill_nr_c">' +
                    '<span class="bill_nr_lie_c yi"><img src="../res/img/darizi/2700' + imgnum + '.png" class="bill_img" /></span>' +
                    '<span class="bill_nr_lie_c er">' +
                    '<span class="bill_nrlie_c yi"><em class="bill_account">' + sj + '</em><em class="bill_date">' + jiangeshijian + '</em></span>' +
                    '<span class="bill_nrlie_c er"><em style="width:100%;text-align:left;" class="bill_remark">' + data[i].remark + '</em></span>' +
                    '</span></div>' +
                    '<div class="bill_cz_r_zk" bid="' + data[i].id + '"><span class="bill_r_del" bid="' + data[i].id + '">删除</span></div>' +
                    '<div class="bill_hdzz_dwk"></div>' +
                    '</div></div>';
            }
            var d = new Date(data[0].shijian.split(" ")[0]);
            d.setDate(d.getDate() + 27);
            var m = d.getMonth() + 1;
            var stime = d.getFullYear() + '-' + m + '-' + d.getDate();
            $(".bill_nrk").html('<div class="bill_dwk_c" style="position: fixed;z-index: 10;height: 3.5rem;"><div class="billcz_dwc"><div class="bill_nr_c">' +
                '<p style="height: 3.4rem;line-height: 3.4rem;font-size:1.2rem;color:#333;">预估下个(27天)周期为:<span style="color:green;font-size:1.6rem;vertical-align: baseline;">' + stime + '</span>,'+
                '还剩:<span style="color:green;font-size:1.6rem;vertical-align: baseline;">' + Math.floor(((new Date(stime).getTime() - new Date().getTime())) / (1000 * 60 * 60 * 24)) + '</span>天</p>' +
                '</div></div></div><div style="margin-bottom:3.5rem;height: 1px;width: 100%;"></div>' + html);
            setTimeout(function() {
                swipeLeftRight();
            }, 123);
        } else {
            nowPageNum = 0;
            totalPageNum = 0;
            pageNum = 1;
            $(".bill_nrk").html('<span class="meiyoutishi">没有符合条件的数据</span>');
            layer.msg("暂无数据");
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