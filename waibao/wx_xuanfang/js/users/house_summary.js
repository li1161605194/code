opt = {
	houseTotalCount: $("#houseTotalCount"),
	houseRemainCount: $("#houseRemainCount")
}
var houseListJs = {
	init: function() {
		if(urlJson.h==1){
			$(".user_tips").hide();
			$(".house_summary_tips").css("marginTop","30px");
		}else{
			$(".user_tips").show();
		}
		houseListJs.showOverDateTips();
		houseListJs.getHouseSummary();
	},
	showOverDateTips: function() {
		if(urlJson.m == 1) {
			var layindex = layer.open({
				content: "很抱歉，活动时间已过",
				btn: ['我知道了'],
				yes: function(index) {
					layer.close(layindex);
				}
			});

		}
	},
	getHouseSummary: function() {
		r_post_jsons("ran/we_act/summary", {
			t: urlJson.t
		}, function(res) {
			if(res.resultCode == 1) {
				if(res.objectData != null) {
					$(".user_info_type").html(res.objectData.typeName);
					opt.houseTotalCount.html(res.objectData.totalCount);
					opt.houseRemainCount.html(res.objectData.remainCount);
					var data = res.objectData.ridgeSummary;
					var html = '';
					for(var a = 0; a < data.length; a++) {
						html += "<li data=\"" + data[a].ridgepole + "\" class=\"tzpage\" rel=\"users/house_list.html?no=" + data[a].ridgepole + "\">" + data[a].ridgepole + "栋 剩<em>" + data[a].remainCount + "</em>套</li>"
					}
					$(".ridge_container").html(html);
					setTimeout(function() {
						houseListJs.updateSummary();
					}, 5000);
				} else {
					//opt.houseListzk.html('');
					layer.open({
						content: "该类型暂无房源",
						skin: 'msg',
						time: 2
					});
				}
			} else {
				layer.open({
					content: res.errorMsg,
					skin: 'msg',
					time: 2
				});
				return false;
			}
		});
	},

	updateSummary: function() {
		r_post_jsons("ran/we_act/summary", {
			t: urlJson.t
		}, function(res) {
			if(res.resultCode == 1) {
				if(res.objectData != null) {

					opt.houseRemainCount.html(res.objectData.remainCount);
					var data = res.objectData.ridgeSummary;
					var html = '';
					for(var a = 0; a < data.length; a++) {
						$($(".ridge_container li em")[a]).html(data[a].remainCount);
					}
					setTimeout(function() {
						houseListJs.updateSummary();
					}, 5000);
				} else {
					layer.open({
						content: "该类型暂无房源",
						skin: 'msg',
						time: 2
					});
				}
			} else {
				layer.open({
					content: res.errorMsg,
					skin: 'msg',
					time: 2
				});
				return false;
			}
		});
	}
}

$(function() {
	common.initCommonHeardHtml();
	houseListJs.init();
	common.bodyShow();
});