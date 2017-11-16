var zW = $(window).width();
var zH = $(window).height();

var common = {
	cache: {
		set: function(k, v) {
			if(typeof(localStorage === 'object') && window.localStorage) {
				window.localStorage.setItem(ca + k + cb, v);
			} else {
				layer.open({
					content: '请联系管理员[code:6666]',
					skin: 'msg',
					time: 2
				});
				return false;
			}
			//window.localStorage.setItem(ca + k + cb, v);
		},
		get: function(k) {
			if(typeof(localStorage === 'object') && window.localStorage) {
				return window.localStorage.getItem(ca + k + cb);
			} else {
				layer.open({
					content: '请联系管理员[code:6666]',
					skin: 'msg',
					time: 2
				});
				return false;
			}
			//return window.localStorage.getItem(ca + k + cb);
		}
	},
	isKong: function(data) {
		if(data == null || data == undefined || data == "null" || data == "undefined" || (data == "" && typeof(data) != "object")) {
			return true;
		} else {
			return false;
		}
	},
	//公共初始化 页面高度  布局
	pageInit: function() {
		$("body").css({
			"height": zH + "px",
			"min-height": zH + "px"
		});
		$(".page_bd").css({
			"height": zH + "px",
			"min-height": zH + "px"
		});
	},
	//点击 元素 跳转元素绑定的页面 参数传递attr
	goTiaoZhuanPage: function() {
		$(document).on("click", ".tzpage", function(e) {
			var _this = $(this);
			if(_this.attr("rel") && _this.attr("rel").length > 1) {
				var rel = _this.attr("rel");
				window.location.href = rootDirectory + "pages/" + rel;
			} else {
				/*layer.open({
				    content: '该功能暂未开放!',
				    skin: 'msg',
				    time: 2
				});*/
				return false;
			}
		});
	},
	//点击左箭头返回上一级页面   
	goBackNavbarLeft: function() {
		$(document).on("click", ".navbar-left", function(e) {
			window.history.back();
		});
		$(document).on("click", ".goBackPage", function(e) {
			window.history.back();
		});
	},
	goBackNavbarRight: function(func) {
		$(document).on('click', '.navbar-nav.navbar-right', function(event) {
			func($(this));
		});
	},
	//yyyy-mm-dd hh:mm:ss
	nowDateTime: function(type) {
		function changeTen(s) {
			return s < 10 ? '0' + s : s;
		}
		var myDate = new Date();
		var nowDate = myDate.getFullYear() + '-' + changeTen(myDate.getMonth() + 1) + "-" + changeTen(myDate.getDate());
		var nowTime = changeTen(myDate.getHours()) + ':' + changeTen(myDate.getMinutes()) + ":" + changeTen(myDate.getSeconds());
		if(type == 1 || type == undefined) {
			return nowDate + " " + nowTime;
		} else if(type == 2) {
			return nowDate;
		} else if(type == 3) {
			return nowTime;
		} else {
			return nowDate + " " + nowTime;
		}
	},
	indexFooterTabbar: function() {
		$(document).on("click", ".weui-tabbar__item", function(e) {
			var rel = $(this).attr("rel");
			window.location.href = rootDirectory + "pages/" + rel;
		});
	},
	numberNullUndefind: function(num, fzy) {
		var tempnum = num;
		if(num === "" || num === null || num === undefined || !isFinite(num) || num == "NaN" || num == "Infinity") {
			return tempnum = 0;
		} else {
			if(isNaN(num)) {
				return tempnum = 0;
			} else {
				var tempnum2 = 0;
				if(fzy && fzy === 1) { //万元
					tempnum2 = Number(parseFloat(tempnum) / 100 / 10000).toFixed(2);
				} else if(fzy && fzy === 1.1) { //万元 一位小数
					tempnum2 = Number(parseFloat(tempnum) / 100 / 10000).toFixed(1);
				} else if(fzy && fzy === 11) { //千元
					tempnum2 = parseInt(parseFloat(tempnum) / 100 / 1000);
				} else if(fzy && fzy === 12) { //百元
					tempnum2 = parseInt(parseFloat(tempnum) / 100 / 100);
				} else if(fzy && fzy === 13) { //十元
					tempnum2 = parseInt(parseFloat(tempnum) / 100 / 10);
				} else if(fzy && fzy === 2) { //后台传回原值
					tempnum2 = parseFloat(Number(tempnum)).toFixed(2);
				} else if(fzy && fzy === 2.1) { //后台传回原值 一位小数
					tempnum2 = parseFloat(Number(tempnum)).toFixed(1);
				} else if(fzy && fzy === 3) { //元 
					tempnum2 = parseInt(Number(tempnum) / 100);
				} else if(fzy && fzy === 4) { //百分比
					tempnum2 = parseFloat(Number(tempnum) * 100).toFixed(2);
				} else if(fzy && fzy === 4.1) { //百分比 一位小数
					tempnum2 = parseFloat(Number(tempnum) * 100).toFixed(1);
				} else { //保留小数点2位
					tempnum2 = Number(parseFloat(tempnum).toFixed(2));
				}
				var str = tempnum2.toString();
				var strs = str.split(".");
				if(str.indexOf(".") != -1) {
					if(strs[1] == "00" || strs[1] == "0") {
						return strs[0];
					} else {
						return tempnum2;
					}
				} else {
					return tempnum2;
				}
			}
		}
	},
	browserType: function() {
		var ua = navigator.userAgent;
		var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
			isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
			isAndroid = ua.match(/(Android)\s+([\d.]+)/),
			isMobile = isIphone || isAndroid;
		if(isMobile) {
			if(ua.indexOf("Alipay") > -1) {
				//alert("zhifubao");
				sfwx = 2;
			} else if(ua.indexOf("MicroMessenger") > -1) {
				//alert("weixin");
				sfwx = 1;
			} else {
				sfwx = 2;
				/*if (isAndroid) {
				    var html = "<div style='width:100%;margin:120px auto;text-align:left;text-indent: 28px;'><p><h1 style='font-size: 14px;'>尊敬的用户,为了给您带来更好的使用体验,请用支付宝或微信复制链接或扫描二维码打开本商场,因此带来的不便请见谅。</h1></p>" +
				        "<p><h1 style='font-size: 14px;'>若手机未安装<a href='http://gdown.baidu.com/data/wisegame/d037fbd83788f3df/zhifubao_113.apk'>支付宝</a>或" +
				        "<a href='http://dldir1.qq.com/weixin/android/weixin6513android1100.apk'>微信。</a>←请点击安装</h1></p></div>";
				    document.write(html);
				} else if (isIphone) {
				    var html = "<div style='width:100%;margin:120px auto;text-align:left;text-indent: 28px;'><p><h1 style='font-size: 14px;'>尊敬的用户,为了给您带来更好的使用体验,请用支付宝或微信复制链接或扫描二维码打开本商场,因此带来的不便请见谅。</h1></p>" +
				        "<p><h1 style='font-size: 14px;'>若手机未安装<a href='https://itunes.apple.com/cn/app/zhi-fu-bao-zhifubao-kou-bei/id333206289?mt=8'>支付宝</a>或" +
				        "<a href='https://itunes.apple.com/cn/app/wei-xin/id414478124?mt=8'>微信。</a>←请点击安装</h1></p></div>";
				    document.write(html);
				}*/
			}
		} else {
			document.getElementsByTagName('html')[0].style.width = 640 + "px";
			if(ua.indexOf("Firefox") > -1 || ua.indexOf("Chrome") > -1) {} else {
				var html = "<div style='width:100%;margin:120px auto;text-align:center;'><p><h1>您使用的浏览器暂不支持本系统!</h1></p>" +
					"<p><h1>请更换<a href='http://download.firefox.com.cn/releases-sha2/stub/official/zh-CN/Firefox-latest.exe'>Firefox(火狐)浏览器</a>或" +
					"<a href='http://sw.bos.baidu.com/sw-search-sp/software/1b5bc4ffa7d9b/ChromeStandalone_57.0.2987.133_Setup.exe'>Chrome(谷歌)浏览器。</a>←点击下载</h1></p></div>";
				document.write(html);
			}
		}
	},
	imgCarouselInit: function(aspectRatio) {
		var slider = mui("#slider");
		slider.slider({
			interval: 3500
		});
	},
	initCommonHeardHtml: function(type, rightClass, rightFun) {
		if(rightClass == undefined) {
			rightClass = "fa-bars";
		}
		var html = '';
		if(type == undefined || type == 1) {
			html = '<header class="navbar navbaryi">' +
				'<h2 class="navbar-title navbar-center"></h2>' +
				'</header>';
		} else if(type && type == 2.1) {
			html = '<header class="navbar navbaryi">' +
				'<h2 class="navbar-title navbar-center"></h2>' +
				'<div class="navbar-nav navbar-left"><a href="#" class="navbar-nav-item"><span style="color: #fff;" class="fa fa-chevron-left navbar-icon navbar-icon-sibling-of-title"></span><span class="navbar-nav-title"></span></a></div>' +
				'</header>';
		} else if(type && type == 2.2) {
			html = '<header class="navbar navbaryi">' +
				'<h2 class="navbar-title navbar-center"></h2>' +
				'<div class="navbar-nav navbar-right"><a class="navbar-nav-item"><span style="color: #fff;" class="fa ' + rightClass + ' navbar-icon"></span></a></div>' +
				'</header>';
		} else if(type && type == 3) {
			html = '<header class="navbar navbaryi">' +
				'<h2 class="navbar-title navbar-center"></h2>' +
				'<div class="navbar-nav navbar-left"><a href="#" class="navbar-nav-item"><span style="color: #fff;" class="fa fa-chevron-left navbar-icon navbar-icon-sibling-of-title"></span><span class="navbar-nav-title"></span></a></div>' +
				'<div class="navbar-nav navbar-right"><a class="navbar-nav-item"><span style="color: #fff;" class="fa ' + rightClass + ' navbar-icon"></span></a></div>' +
				'</header>';
		}
		$(".weui-tab").prepend(html);
		//$(".weui-tab_panel").prepend('<div class="navbarhmt"></div>');
		$(".weui-tab_panel").prepend('<div class="navbarhmtzw"></div>');
		if(type == 2.1 || type == 3) {
			common.goBackNavbarLeft();
		}
		if(rightClass != undefined && rightFun != undefined && typeof(rightFun) == "function") {
			common.goBackNavbarRight(rightFun);
		}
		wx_titie.titleRewrite(initParams.title);
	},
	bodyShow: function() {
		if(!common.isKong(isIphone)) {
			$("div.navbar-nav.navbar-left").remove();
		}
		$("html").css({
			"opacity": 1
		});
		$("body").css({
			"opacity": 1
		});
		if(sfwx == 4) {
			document.getElementsByTagName('html')[0].style.width = 640 + "px";
			document.getElementsByTagName('body')[0].style.width = 640 + "px";
		}
	}
}

var wx_titie = {
	titleRewrite: function(title) {
		$("title").html(wxCompany + "-" + title);
		$("h2.navbar-title.navbar-center").html('<img class="loginimg_c" src="' + rootDirectory +
			'img/logoimg.jpg">' + wxCompany + ' - ' + title);
	}
}

r_post_jsons = function(url, datas, callback) {
	if(baseUrl == undefined) {
		baseUrl = "http://e.mapstar.com.cn:85/";
	}
	/*var load = layer.open({
		type: 2,
		content: '加载中'
	});*/
	$.ajax(baseUrl + url, {
		data: JSON.stringify(datas),
		cache: false,
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 360000, //超时时间设置为5秒；
		contentType: "application/json",
		success: function(result) {
			//alert(JSON.stringify(result));
			//layer.close(load);
			callback(result);
		},
		error: function(xhr, type, errorThrown) {
			//layer.close(load);
			layer.open({
				content: '网络错误[in-error]',
				skin: 'msg',
				time: 2
			});
			return false;
		}
	});
}
$.fn.serializeDOMArray = function() {
	var params = [];
	var s = {};
	if(this.get(0).tagName == "FORM") {
		params = this.serializeArray();
	} else {
		this.wrap('<form id="NotRepeatId"></form>');
		params = $("#NotRepeatId").serializeArray();
		this.insertAfter($("#NotRepeatId"));
		$("#NotRepeatId").remove();
	}
	$.each(params, function(i, v) {
		s[v.name] = decodeURIComponent(v.value);
	});
	return s;
}

$(function() {
	mui.init({
		swipeBack: true
	});
	common.pageInit();
	common.browserType();
	common.goTiaoZhuanPage();
});