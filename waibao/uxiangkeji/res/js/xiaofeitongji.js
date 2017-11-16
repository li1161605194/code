var option = {
	title: {
		text: '消费统计树状图'
	},
	legend: {
		data: ['消费', '订单量']
	},
	color: ['#3398DB'],
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'line'
		}
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: [{
		type: 'category',
		data: [],
		axisTick: {
			alignWithLabel: true
		}
	}],
	yAxis: [{
		type: 'value'
	}],
	series: [{
		name: '消费',
		type: 'bar',
		barWidth: '20%',
		data: []
	}, {
        name: '订单量',
        type: 'bar',
        barWidth: '20%',
        data: []
    }]
};

barTjtInit = function() {
	$.getJSON('../../json/tongjitu.json', {}, function(res, textStatus) {
        if (res) {
            if (res.JsonArray != undefined && res.JsonArray != null) {
                var leg = res.JsonArray.length;
                var Money = [],
                    MyDate = [],
                    MyDingDanNum = [];
                for (var a = 0; a < leg; a++) {
                    Money.push(res.JsonArray[a].Money);
                    MyDate.push(res.JsonArray[a].MyDate);
                    MyDingDanNum.push(res.JsonArray[a].MyDingDanNum);
                }
                option.series[0].data = Money;
                option.series[1].data = MyDingDanNum;
                option.xAxis[0].data = MyDate;
                var myChart = echarts.init(document.getElementById('main'), 'walden');
                myChart.setOption(option);
            } else {
                layer.msg(res.Error);
            }
        } else {
            layer.msg("请刷新[code:3002]");
        }
    });
	/*r_post_jsons("http://www.fengfei77.com/MyUTServe/TongJiServlet", {
		"Mark": 1,
		"Type": paramInit.paramType,
		"SerachTime": updown_datetime,
		"DSchoolID": parseInt($("#sx_school").val()),
		"DLocationID": parseInt($("#sx_shebeid").val()),
		"DKindID": parseInt($("#sx_shebeil").val())
	}, function(res) {
		if(res) {
			if(res.JsonArray != undefined && res.JsonArray != null) {
				var leg = res.JsonArray.length;
                var Money = [],
                    MyDate = [],
                    MyDingDanNum = [];
                for (var a = 0; a < leg; a++) {
                    Money.push(res.JsonArray[a].Money);
                    MyDate.push(res.JsonArray[a].MyDate);
                    MyDingDanNum.push(res.JsonArray[a].MyDingDanNum);
                }
                option.series[0].data = Money;
                option.series[1].data = MyDingDanNum;
                option.xAxis[0].data = MyDate;
                var myChart = echarts.init(document.getElementById('main'), 'walden');
                myChart.setOption(option);
			} else {
				layer.msg(res.Error);
			}
		} else {
			layer.msg("请刷新[code:3002]");
		}
	});*/
}

$(function() {
	dateTimeType = $("#dateTimeType").val();
	window.onload = function() {
		mouseStop();
		tableSearchInit();
		barTjtInit();
	}
})