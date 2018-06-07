var limitAllAppoint = configBase.limit; //每页显示数据条数
var currentPageAllAppoint = 1; //当前页数
var dataLength = 0; //数据总条数

var roleList = {
    roleListData: function() {
        common.post_shtml_json("ser/role/findRole", {
            pageSize: limitAllAppoint,
            pageNo: currentPageAllAppoint
        }, function(res) {
            if (res && res.rows) {
                if (currentPageAllAppoint == 1) {
                    roleList.pageSizeNumber(res.total);
                }
                roleList.roleListDataTable(res.rows);
            }
        });
    },
    pageSizeNumber: function(total) {
        dataLength = total;
        laypage.render({
            elem: 'selfpage_content',
            cont: 'selfpage_content',
            count: dataLength,
            limit: configBase.limit,
            limits: configBase.limits,
            layout: ['prev', 'page', 'next', 'count', 'limit'],
            jump: function(obj, first) {
                if (!first) {
                    limitAllAppoint = obj.limit;
                    currentPageAllAppoint = obj.curr;
                    roleList.roleListData();
                }
            }

        });
    },
    roleListDataTable: function(data) {
        table.render({
            elem: '#role_list',
            cols: [
                [{
                    field: 'id',
                    title: 'ID',
                    sort: true
                }, {
                    field: 'orgIdName',
                    title: '角色隶属'
                }, {
                    field: 'name',
                    title: '角色名称'
                }, {
                    field: 'typeName',
                    title: '角色类型'
                }, {
                    field: 'enabledName',
                    title: '角色状态'
                }, {
                    field: 'listorder',
                    title: '角色排序',
                    sort: true
                }, {
                    field: 'remark',
                    title: '角色备注'
                }, {
                    field: 'id',
                    title: '操作',
                    align: 'center',
                    toolbar: '#barDemo'
                }]
            ],
            data: data,
            limit: data.length,
            even: true,
            page: false
        });
    },
    init: function() {
        roleList.roleListData();
    }
};

$(function() {
    roleList.init();
    table.on('tool(role_list)', function(obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('确认删除-' + data.name + '吗?', {
                title: "是否删除"
            }, function(index) {
                common.post_shtml_json("ser/role/deleteRoleById", {
                    ids: data.id
                }, function(res) {
                    if (res && res.resultCode == 200) {
                        layer.msg('删除角色成功');
                        obj.del();
                        layer.close(index);
                    }
                });

            });
        } else if (obj.event === 'edit') {
            layer.alert('编辑行：<br>' + JSON.stringify(data))
        }
    });
});