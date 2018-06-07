layui.use('table', function() {
    var table = layui.table;
    
    //展示已知数据
    table.render({
        elem: '#test',
        cols: [
            [{
                field: 'id',
                title: 'ID',
                width: 80,
                sort: true
            }, {
                field: 'username',
                title: '用户名',
                width: 120
            }, {
                field: 'email',
                title: '邮箱',
                minWidth: 150
            }, {
                field: 'sign',
                title: '签名',
                minWidth: 160
            }, {
                field: 'sex',
                title: '性别',
                width: 80
            }, {
                field: 'city',
                title: '城市',
                width: 100
            }, {
                field: 'experience',
                title: '积分',
                width: 80,
                sort: true
            }]
        ],
        data: []
            //,skin: 'line' //表格风格
            ,
        even: true
            //,page: true //是否显示分页
            //,limits: [5, 7, 10]
            //,limit: 5 //每页默认显示的数量
    });
});