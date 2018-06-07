var limitAllAppoint = configBase.limit; //每页显示数据条数
var currentPageAllAppoint = 1; //当前页数
var dataLength = 0; //数据总条数
var logsList = {
    logsListData: function() {
        common.post_shtml_json("ser/log/findLogs", {
            pageSize: limitAllAppoint,
            pageNo: currentPageAllAppoint
        }, function(res) {
            if (res && res.rows) {
                if (currentPageAllAppoint == 1) {
                    logsList.pageSizeNumber(res.total);
                }
                logsList.logsListDataTable(res.rows);
            }
        });
    },
    pageSizeNumber: function(total) {
        dataLength = total;
        laypage.render({
            elem: 'selfpage_content',
            count: dataLength,
            limit: limitAllAppoint,
            limits: configBase.limits,
            layout: ['prev', 'page', 'next', 'count', 'limit'],
            jump: function(obj, first) {
                if (!first) {
                    limitAllAppoint = obj.limit;
                    currentPageAllAppoint = obj.curr;
                    logsList.logsListData();
                }
            }
        });
    },
    logsListDataTable: function(data) {
        table.render({
            elem: '#logs_list',
            cols: [
                [{
                    field: 'id',
                    title: 'ID',
                    sort: true
                }, {
                    field: 'userName',
                    title: '用户名',
                    templet: function(d) {
                        return main.t.kong(d.userName);
                    }
                }, {
                    field: 'status',
                    title: '用户类型',
                    templet: function(d) {
                        return main.t.userStatus(d.status, d);
                    }
                }, {
                    field: 'gmtCreated',
                    title: '操作时间',
                    sort: true
                }, {
                    field: 'ipAddress',
                    title: 'IP地址'
                }, {
                    field: 'modelName',
                    title: '操作模块'
                }, {
                    field: 'typeName',
                    title: '操作类型'
                }, {
                    field: 'message',
                    title: '操作说明'
                }]
            ],
            data: data,
            limit: data.length,
            even: true,
            page: false
        });
    },
    init: function() {
        logsList.logsListData();
    }
};
$(function() {
    logsList.init();
});