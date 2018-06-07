var taskList = {
    taskListData: function() {
        common.post_shtml_json("ser/task/taskList", {}, function(res) {
            if (res && res.data) {
                taskList.taskListDataTable(res.data);
            }
        });
    },
    taskListDataTable: function(data) {
        table.render({
            elem: '#task_list',
            cols: [
                [{
                    field: 'id',
                    title: 'ID',
                    sort: true
                }, {
                    field: 'jobName',
                    title: '任务名称',
                    templet: function(d) {
                        return main.t.kong(d.jobName);
                    }
                }, {
                    field: 'level',
                    title: '任务级别'
                }, {
                    field: 'jobGroup',
                    title: '任务分组'
                }, {
                    field: 'jobStatus',
                    title: '任务状态'
                }, {
                    field: 'cronExpression',
                    title: '表达式'
                }, {
                    field: 'beanClass',
                    title: '包名类名'
                }, {
                    field: 'isConcurrent',
                    title: '是否同步'
                }, {
                    field: 'springId',
                    title: 'springBean'
                }, {
                    field: 'methodName',
                    title: '调用方法'
                }, {
                    field: 'description',
                    title: '任务描述'
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
        taskList.taskListData();
    }
};
$(function() {
    taskList.init();
})