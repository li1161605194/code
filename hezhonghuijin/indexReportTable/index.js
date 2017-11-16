$(function() {
    initIndexPie(data);
    $(".xuanze_c").click(function() {
        $(".xuanze_c").removeClass("xuanz");
        $(this).addClass("xuanz");
        if ($(this).attr("type") == "ju") {
            initIndexPie(data, 1);
        } else {
            initIndexPie(data, 2);
        }
    })

})

initIndexPie = function(data, type) {
    data = data;
    var a_leg = data.length;
    if (a_leg > 0) {
        var html = '<div class="zk_c">' +
            '<div class="touk1"><span class="tou_s1">公司</span></div>' +
            '<div class="touk"><span class="tou_s">销售台次</span></div>' +
            '<div class="touk"><span class="tou_s">销售差价</span></div>' +
            '<div class="touk"><span class="tou_s">维修产值</span></div>' +
            '<div class="touk"><span class="tou_s">维修毛利率</span></div>' +
            '<div class="touk"><span class="tou_s">台均销售费用</span></div>' +
            '<div class="touk"><span class="tou_s">万元产值费用</span></div>' +
            '<div class="touk"><span class="tou_s">销售台次</span></div>' +
            '<div class="touk"><span class="tou_s">销售差价</span></div>' +
            '<div class="touk"><span class="tou_s">维修产值</span></div>' +
            '<div class="touk"><span class="tou_s">维修产值</span></div>' +
            '</div>';
        for (var i = 0; i < a_leg; i++) {
            html += '<div class="zk_c">';
            html += '<div class="y_name_c"><span class="yns_c">' + data[i].name + '</span></div>';
            if (type == undefined || type == 1) {
                html += indexPieDataListHtmlBar(data[i].data);
            } else {
                html += indexPieDataListHtmlPie(data[i].data);
            }
            html += '</div>';
        }
        $("#indexPie").html(html);
    }
}
indexPieDataListHtmlBar = function(listData) {
    var a_leg = listData.length;
    if (a_leg > 0) {
        var html = '';
        for (var j = 0; j < a_leg; j++) {
            var wcl = ((parseFloat(listData[j].sjs) / parseFloat(listData[j].jhs)) * 100).toFixed(1);
            var wcl_h = wcl > 100 ? 100 : wcl;
            var zbj_bc = '#ff9191';
            var duicuo='';
            if (wcl < 50) {
                zbj_bc = '#73ce55';
                duicuo='background-image: url(dui.png);';
            } else {
                duicuo='background-image: url(cuo.png);';
                zbj_bc = '#ff9191';
            }
            html += '<div class="x_zk_c">';
            html += '<div class="zbjk_bc" style="background-color:' + zbj_bc + ';">';
            //html += '<span class="xlie_c lb_name">' + listData[j].name + '</span>';
            html += '<span class="xlie_c" style="color:#fff;">计划数:' + listData[j].jhs + '</span>';
            html += '<div style="background-color: #cdc9c9;" class="jhzk_c">';
            html += '<div class="bgimg_c" style="' + duicuo + '"></div>';
            html += '<div class="sjzk_c" style="background-color: #007cb9;height:' + wcl_h + 'px;">';
            html += '<span class="xlie_c sjs_c" style="color:#fff;line-height:' + wcl_h + 'px;">实际数:' + listData[j].sjs + '</span>';
            html += '</div></div>';
            html += '<span class="xlie_c" style="color:#fff;">完成率:' + parseFloat(Number(wcl)).toFixed(1) + '%</span>';
            html += '</div></div>';
        }
        return html;
    }
}
indexPieDataListHtmlPie = function(listData) {
    var a_leg = listData.length;
    if (a_leg > 0) {
        var html = '';
        for (var j = 0; j < a_leg; j++) {
            var wcl = ((parseFloat(listData[j].sjs) / parseFloat(listData[j].jhs)) * 100).toFixed(1);
            var pr = '';
            var pl = '';
            var zbj_c = '#ff9191';
            if (wcl <= 50) {
                pr = 'transform:rotate(' + parseFloat(Number(wcl) * 3.6) + 'deg)';
            } else {
                pr = 'transform:rotate(180deg)';
                pl = 'transform:rotate(' + parseFloat(Number(wcl) - 50) * 3.6 + 'deg)';
            }
            if (wcl < 50) {
                zbj_c = '#73ce55';
            } else {
                zbj_c = '#ff9191';
            }
            html += '<div class="x_zk_c">';
            //html += '<span class="xlie_c lb_name">' + listData[j].name + '</span>';
            html += '<span class="xlie_c" style="color:#000;">计划数:' + listData[j].jhs + '</span>';
            html += '<div class="circle_wh" style="background-color:' + zbj_c + ';">';
            html += '<div class="circle">';
            html += '<div class="pie_left" style="' + pl + '"><div class="left"></div></div>';
            html += '<div class="pie_right" style="' + pr + '"><div class="right"></div></div>';
            html += '<div class="mask" style="color:#000;" title="完成率:' + wcl + '%"><span><em class="wclem">' + wcl + '%</em></span></div>';
            html += '</div></div>';
            html += '<span class="xlie_c" style="color:#000;">实际数:' + listData[j].sjs + '</span>';
            html += '</div>';
        }
        return html;
    }
}








var data = [{
    name: "合众集团",
    data: [{
        name: "销售台次",
        jhs: 100,
        sjs: 199
    }, {
        name: "销售差价",
        jhs: 145,
        sjs: 100
    }, {
        name: "维修产值",
        jhs: 167,
        sjs: 100
    }, {
        name: "维修毛利率",
        jhs: 111,
        sjs: 100
    }, {
        name: "台均销售费用",
        jhs: 215,
        sjs: 100
    }, {
        name: "万元产值费用",
        jhs: 316,
        sjs: 100
    }, {
        name: "全年税前利润",
        jhs: 186,
        sjs: 100
    }]
}, {
    name: "合众汇源",
    data: [{
        name: "销售台次",
        jhs: 231,
        sjs: 100
    }, {
        name: "销售差价",
        jhs: 521,
        sjs: 100
    }, {
        name: "维修产值",
        jhs: 234,
        sjs: 100
    }, {
        name: "维修毛利率",
        jhs: 178,
        sjs: 100
    }]
}, {
    name: "合众明德",
    data: [{
        name: "销售台次",
        jhs: 144,
        sjs: 100
    }, {
        name: "销售差价",
        jhs: 313,
        sjs: 100
    }, {
        name: "维修产值",
        jhs: 256,
        sjs: 100
    }, {
        name: "维修毛利率",
        jhs: 532,
        sjs: 100
    }, {
        name: "台均销售费用",
        jhs: 215,
        sjs: 100
    }, {
        name: "万元产值费用",
        jhs: 316,
        sjs: 100
    }, {
        name: "销售台次",
        jhs: 144,
        sjs: 100
    }, {
        name: "销售差价",
        jhs: 313,
        sjs: 100
    }, {
        name: "维修产值",
        jhs: 256,
        sjs: 100
    }, {
        name: "维修产值",
        jhs: 256,
        sjs: 100
    }]
}]