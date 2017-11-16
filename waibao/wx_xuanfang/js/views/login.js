opt = {
	mo: $("input[name=mo]"),
	code: $("input[name=code]"),
	idNo: $("input[name=idNo]"),
	send_sms: $("#send_sms"),
	registerMember: $("#registerMember")
}

validChineseIDCard = function(id) {
	function rid18(id) {
		if(!/^\d{17}[\dxX]$/.test(id)) {
			return false;
		}
		var modcmpl = function(m, i, n) {
				return(i + n - m % i) % i;
			},
			f = function(v, i) {
				return v * (Math.pow(2, i - 1) % 11);
			},
			s = 0;
		for(var i = 0; i < 17; i++) {
			s += f(+id.charAt(i), 18 - i);
		}
		var c0 = id.charAt(17),
			c1 = modcmpl(s, 11, 1);
		return c0 - c1 === 0 || (c0.toLowerCase() === 'x' && c1 === 10);
	}

	function rid15(id) {
		var pattern = /^[1-9]\d{5}(\d{2})(\d{2})(\d{2})\d{2}[\dxX]$/,
			matches, y, m, d, date;
		matches = id.match(pattern);
		if(matches == null)
			return false;
		y = +('19' + matches[1]);
		m = +matches[2];
		d = +matches[3];
		date = new Date(y, m - 1, d);
		return(date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d);
	}
	return rid18(id);
}

validatemobile = function(mobile) {
	var myreg = /^1[34578]\d{9}$/;
	if(mobile.length == 0 || mobile.length != 11 || !myreg.test(mobile)) {
		return false;
	} else {
		return true;
	}
}
hmidjs = function(a, ob, type) {
	if(type == undefined) {
		type = 3;
	}
	a = a - 1000;
	var intDiff = a;
	if(intDiff <= 0) {
		ob.html("发送验证码");
		ob.removeAttr('disabled');
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
		var html = '<span>' + second.toString() + '秒后可重发</span>';
	} else if(type == 2) {
		var html = '<span>' + minute.toString() + '</span>:<span>' + second.toString() + '</span>';
	} else if(type == 3) {
		var html = '<span>' + hour.toString() + '</span>:<span>' + minute.toString() + '</span>:<span>' + second.toString() + '</span>';
	} else {
		var html = '<span>' + hour.toString() + '</span>:<span>' + minute.toString() + '</span>:<span>' + second.toString() + '</span>';
	}
	ob.html(html);
	setTimeout(function() {
		hmidjs(a, ob, type);
	}, 1000);
}
var loginJs = {
	init: function() {
		opt.send_sms.click(function() {
			if(validatemobile(opt.mo.val())) {
				opt.send_sms.attr("disabled", "disabled");
				var time = 60 * 1000;
				hmidjs(time, opt.send_sms, 1);
				r_post_jsons("ran/msg/send_sms", {
					"mo": opt.mo.val(),
					"ty": 0
				}, function(res) {
					if(res.resultCode == 1) {
						opt.code.attr("db_code", res.objectData);
					}
				});
			} else {
				layer.open({
					content: '请输入正确的手机号码',
					skin: 'msg',
					time: 2
				});
			}
		});
		opt.registerMember.click(function() {
			if(validatemobile(opt.mo.val())) {
				if(opt.code.val() == opt.code.attr("db_code")) {
					if(validChineseIDCard(opt.idNo.val())) {
						r_post_jsons("ran/wechat_login", {
							"mo": opt.mo.val(),
							"idNo": opt.idNo.val(),
							"code": opt.code.val()
						}, function(res) {
							if(res.resultCode == 1) {
								if(urlJson.m == 1) {
									window.location.href = rootDirectory + "pages/views/brief.html";
								} else if(urlJson.m == 2) {
									//如果用户已经能够选过房，再次进入这个页面，将直接跳转到订单页面
									if(res.objectData.status == 2) {
										window.location.href = rootDirectory + 'pages/users/result.html?id=' + res.objectData.roomId;
									} else if(res.objectData.status == 0) {
										window.location.href = rootDirectory + 'pages/views/chose_house.html?mo=' + opt.mo.val();
									}
								} else if(urlJson.m == 3) {
									//如果用户已经能够选过房，再次进入这个页面，将直接跳转到订单页面
									if(res.objectData.status == 2) {
										window.location.href = rootDirectory + 'pages/users/result.html?id=' + res.objectData.roomId;
									} else if(res.objectData.status == 0) {
										window.location.href = rootDirectory + 'pages/views/chose_house.html?mo=' + opt.mo.val();
									}
								} else if(urlJson.m == 4) {
									window.location.href = rootDirectory + 'pages/users/house_ridgepole_type_summary.html?mo=' + opt.mo.val();
								} else {
									layer.open({
										content: '请重新登录',
										skin: 'msg',
										time: 2
									});
								}
							} else {
								layer.open({
									content: '用户名或密码错误',
									skin: 'msg',
									time: 2
								});
							}
						});
					} else {
						layer.open({
							content: '请输入正确的身份证号码',
							skin: 'msg',
							time: 2
						});
					}
				} else {
					layer.open({
						content: '验证码不正确',
						skin: 'msg',
						time: 2
					});
				}
			} else {
				layer.open({
					content: '请输入正确的手机号码',
					skin: 'msg',
					time: 2
				});
			}
		});
	}
}

$(function() {
	common.initCommonHeardHtml();
	loginJs.init();
	common.bodyShow();
});