//menuli开始
$(document).ready(function() {
    query.initScreen({
        boxId: "#screenQuery",
        searchBoxs: [{
            menuText: "查看图表",
            dataList: [{
                yijiText: "图表",
                yijiKey: "reportName",
                yijiImg: "images/meishi1.png",
                dataList: [{
                    erjiType: 2,
                    erjiText: "售后数据"
                }, {
                    erjiText: "售后产值",
                    erjiValue: "shcz"
                }, {
                    erjiText: "售后毛利",
                    erjiValue: "shml"
                }, {
                    erjiText: "售后毛利率",
                    erjiValue: "shmll"
                }, {
                    erjiType: 2,
                    erjiText: "财务数据"
                }, {
                    erjiText: "维修工单数",
                    erjiValue: "wxgds"
                }, {
                    erjiText: "维修台次",
                    erjiValue: "wxtc"
                }, {
                    erjiText: "维修产值",
                    erjiValue: "wxcz"
                }]
            }, {
                yijiText: "公司",
                yijiKey: "companyId",
                yijiImg: "images/meishi2.png",
                dataList: [{
                    erjiText: "合众汇金",
                    erjiValue: "1"
                }, {
                    erjiText: "合众明德",
                    erjiValue: "1"
                }, {
                    erjiText: "巩义合众汇金",
                    erjiValue: "1"
                }, {
                    erjiText: "信阳合众汇金",
                    erjiValue: "1"
                }, {
                    erjiText: "信阳合众致信",
                    erjiValue: "1"
                }, {
                    erjiText: "合众汇圆",
                    erjiValue: "1"
                }]
            }, {
                yijiText: "年份",
                yijiKey: "year",
                yijiImg: "images/meishi3.png",
                dataList: [{
                    erjiText: "2017"
                }]
            }, {
                yijiText: "月份",
                yijiKey: "month",
                yijiImg: "images/meishi4.png",
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
            }]
        }]
    });
    $('.datetimeDate').mobiscroll().date({
        dateFormat: 'yyyy-mm-dd',
        theme: "bootstrap",
        lang: "zh",
        display: "bottom",
        mode: "scroller",
        demo: "datetimeDate"
    });
    $(".datetimeDate").click(function() {
        $(this).mobiscroll('show');
        return false;
    })
});