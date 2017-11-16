opt = {
	ch_bgimg: $(".ch_bgimg"),
	star_chose_house: $('#star_chose_house'),
	houseStar: $("#houseStar"),
	houseNum: $("#houseNum"),
	houseTime: $("#houseTime"),
	tips: $("#tips"),
	tipsIknow: $("#tipsIknow")
}
var lottery, houseNum, lxsj = 0;
var choseHouseJs = {
	init: function() {
		opt.ch_bgimg.css("min-height", zH - 42);
		choseHouseJs.getHouseNumTime();
		choseHouseJs.showTips();
		$(document).on("click", opt.tipsIknow, function(e) {
			layer.closeAll();
			choseHouseJs.paomadeng();
		});
		opt.star_chose_house.click(function() {
			if(opt.houseStar.attr("disabled") == "disabled") {

			} else {
				opt.houseStar.attr("disabled", "disabled");
				opt.houseStar.html("抽房中。。。");
				lottery.speed = 100;
				roll();
				setTimeout(function() {
					clearTimeout(houseNum);
					r_post_jsons("ran/ord/run", {
						"mo": urlJson.mo
					}, function(res) {
						if(res.resultCode == 1) {
							var _h = res.objectData;
							opt.houseStar.attr("disabled", "disabled").html("已选过");
							layer.open({
								content: '恭喜您，抽中' + _h.ridgepole + "号楼" + _h.unit + "单元" + _h.roomNo + "--" + _h.houseDesc,
								btn: ['查看详情'],
								yes: function(index) {
									window.location.href = rootDirectory + "pages/users/result.html?id=" + _h.id;
								}
							});
						} else {
							layer.open({
								content: res.errorMsg,
								skin: 'msg',
								time: 2
							});
							opt.houseStar.removeAttr("disabled");
							opt.houseStar.html("开始");
							return false;
						}
					});
				}, 5000);
				return false;
			}
		});
	},
	showTips: function() {
		layer.open({
			type: 1,
			content: opt.tips.html(),
			anim: 'up',
			style: 'position:fixed; top:20px; left:5%; width: 90%; height: ' + (zH - 60) + 'px; ' +
				'padding:10px 0; border:none;border-radius:6px;'
		});
	},
	getHouseNumTime: function() {
		r_post_jsons("ran/we_act/remain_count", {}, function(res) {
			if(res) {
				opt.houseNum.html(res.objectData.remainsCount);
				$(".user_type").html("提示：您是" + res.objectData.type + "类用户仅可选" + res.objectData.type + "类房源");
				var minutes = parseInt(res.objectData.minutes) * 60 * 1000;
				var starTime = parseFloat(res.objectData.startDate);
				if((starTime - parseFloat(new Date().getTime())) > 0) {
					common.bodyShow();
					opt.houseStar.attr("disabled", "disabled");
					opt.houseTime.html("00:00:00");
					choseHouseJs.timeDJS((starTime - parseFloat(new Date().getTime())), opt.houseStar);
				} else {
					opt.houseStar.removeAttr("disabled").html("开始");
					starTime = (starTime + minutes) - parseFloat(new Date().getTime());
					if(starTime > 0) {
						common.bodyShow();
						choseHouseJs.getHouseNum();
						choseHouseJs.timeDJS(starTime, opt.houseTime);
					} else {
						opt.houseStar.attr("disabled", "disabled").html("选房已结束");
						opt.houseTime.html("00:00:00");
						window.location.href = rootDirectory + "pages/users/house_summary.html?m=1";
					}
				}
			}
		});
	},
	getHouseNum: function() {
		r_post_jsons("ran/we_act/remain_count", {}, function(res) {
			if(res) {
				opt.houseNum.html(res.objectData.remainsCount);
				lxsj = 6666;
				houseNum = setTimeout(function() {
					choseHouseJs.getHouseNum();
				}, lxsj);
			}
		});
	},
	timeDJS: function(a, ob, type) {
		if(type == undefined) {
			type = 3;
		}
		a = a - 1000;
		var intDiff = a;
		if(intDiff <= 0) {
			choseHouseJs.getHouseNumTime();
			return false;
		}
		var day = Math.floor(intDiff / (1000 * 60 * 60 * 24));
		var hour = Math.floor(intDiff / (1000 * 60 * 60)) /*- (day * 24)*/ ;
		var minute = Math.floor(intDiff / (1000 * 60)) - (day * 24 * 60) - ((hour - (day * 24)) * 60);
		var second = Math.floor(intDiff / 1000) - (day * 24 * 60 * 60) - ((hour - (day * 24)) * 60 * 60) - (minute * 60);
		if(day <= 9) day = '0' + day;
		if(hour <= 9) hour = '0' + hour;
		if(minute <= 9) minute = '0' + minute;
		if(second <= 9) second = '0' + second;
		if(type == 1) {
			var html = second.toString() + '秒';
		} else if(type == 2) {
			var html = minute.toString() + ':' + second.toString();
		} else if(type == 3) {
			var html = hour.toString() + ':' + minute.toString() + ':' + second.toString();
		} else {
			var html = hour.toString() + ':' + minute.toString() + ':' + second.toString();
		}
		ob.html(html);
		setTimeout(function() {
			choseHouseJs.timeDJS(a, ob, type);
		}, 1000);
	},
	paomadeng: function() {
		lottery.init('lottery');
	}
}

$(function() {
	common.initCommonHeardHtml();
	choseHouseJs.init();
});

lottery = {
	index: -1, //当前转动到哪个位置，起点位置
	count: 0, //总共有多少个位置
	timer: 0, //setTimeout的ID，用clearTimeout清除
	speed: 20, //初始转动速度
	times: 0, //转动次数
	cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
	prize: -1, //中奖位置
	init: function(id) {
		if($('#' + id).find('.lottery-unit').length > 0) {
			$lottery = $('#' + id);
			$units = $lottery.find('.lottery-unit');
			this.obj = $lottery;
			this.count = $units.length;
			$lottery.find('.lottery-unit.lottery-unit-' + this.index).addClass('active');
		};
	},
	roll: function() {
		var index = this.index;
		var count = this.count;
		var lottery = this.obj;
		$(lottery).find('.lottery-unit.lottery-unit-' + index).removeClass('active');
		index += 1;
		if(index > count - 1) {
			index = 0;
		};
		$(lottery).find('.lottery-unit.lottery-unit-' + index).addClass('active');
		this.index = index;
		return false;
	},
	stop: function(index) {
		this.prize = index;
		return false;
	}
};

function roll() {
	lottery.times += 1;
	lottery.roll(); //转动过程调用的是lottery的roll方法，这里是第一次调用初始化
	if(lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
		clearTimeout(lottery.timer);
		lottery.prize = -1;
		lottery.times = 0;
	} else {
		if(lottery.times < lottery.cycle) {
			lottery.speed -= 10;
		} else if(lottery.times == lottery.cycle) {
			var index = Math.random() * (lottery.count) | 0; //静态演示，随机产生一个奖品序号，实际需请求接口产生
			lottery.prize = index;
		} else {
			if(lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
				lottery.speed += 110;
			} else {
				lottery.speed += 20;
			}
		}
		if(lottery.speed < 40) {
			lottery.speed = 40;
		};
		lottery.timer = setTimeout(roll, lottery.speed); //循环调用
	}
	return false;
}