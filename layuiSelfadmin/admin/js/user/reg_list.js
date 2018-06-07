var onlineList = {
    onlineListData: function() {
        common.post_shtml_json("ser/user/userList", {}, function(res) {
            if (res && res.rows) {
                onlineList.onlineListDataTable(res.rows);
            }
        });
    },
    onlineListDataTable: function(data) {
        table.render({
            elem: '#reg_list',
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
                    field: 'name',
                    title: '名称',
                    templet: function(d) {
                        return main.t.kong(d.name);
                    }
                }, {
                    field: 'mobile',
                    title: '手机号',
                    templet: function(d) {
                        return main.t.kong(d.mobile);
                    }
                }, {
                    field: 'qq',
                    title: 'QQ',
                    templet: function(d) {
                        return main.t.kong(d.qq);
                    }
                }, {
                    field: 'email',
                    title: '电子邮箱',
                    templet: function(d) {
                        return main.t.kong(d.email);
                    }
                }, {
                    field: 'wx',
                    title: '微信',
                    templet: function(d) {
                        return main.t.kong(d.wx);
                    }
                }, {
                    field: 'birthday',
                    title: '生日',
                    templet: function(d) {
                        return main.t.kong(d.birthday);
                    }
                }, {
                    field: 'sex',
                    title: '性别',
                    templet: function(d) {
                        return main.t.sex(d.sex, d);
                    }
                }, {
                    field: 'createTime',
                    title: '注册时间',
                    templet: function(d) {
                        return main.t.kong(d.createTime);
                    }
                }, {
                    field: 'status',
                    title: '用户类别',
                    templet: function(d) {
                        return main.t.userStatus(d.status, d);
                    }
                }, {
                    field: 'remark',
                    title: '备注',
                    templet: function(d) {
                        return main.t.kong(d.remark);
                    }
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
});