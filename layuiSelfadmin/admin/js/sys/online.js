var onlineList = {
    onlineListData: function() {
        common.post_shtml_json("ser/sys/staffOnline", {}, function(res) {
            if (res && res.rows) {
                onlineList.onlineListDataTable(res.rows);
            }
        });
    },
    onlineListDataTable: function(data) {
        table.render({
            elem: '#online_list',
            cols: [
                [{
                    field: 'id',
                    title: 'ID',
                    sort: true
                }, {
                    field: 'usnm',
                    title: '用户名',
                    templet: function(d) {
                        return main.t.kong(d.usnm);
                    }
                }, {
                    field: 'mobile',
                    title: '手机号'
                }, {
                    field: 'name',
                    title: '角色名称'
                }, {
                    field: 'birthday',
                    title: '生日',
                    sort: true
                }, {
                    field: 'createTime',
                    title: '注册时间',
                    sort: true
                }, {
                    field: 'host',
                    title: '登录IP'
                }, {
                    field: 'lastloginTime',
                    title: '最后登录时间',
                    sort: true
                }, {
                    field: 'lastloginIp',
                    title: '最后登录IP'
                }, {
                    field: 'status',
                    title: '用户类别',
                    templet: function(d) {
                        return main.t.userStatus(d.status, d);
                    }
                }, {
                    field: 'sex',
                    title: '性别',
                    templet: function(d) {
                        return main.t.sex(d.sex, d);
                    }
                }, {
                    field: 'loginNo',
                    title: '登录序号',
                    sort: true
                }, {
                    field: 'remark',
                    title: '备注'
                }]
            ],
            data: data,
            limit: data.length,
            even: true,
            page: {
                limit: configBase.limit,
                limits: configBase.limits,
                layout: ['limit', 'count', 'prev', 'page', 'next'],
            }
        });
    },
    init: function() {
        onlineList.onlineListData();
    }
};
$(function() {
    onlineList.init();
})