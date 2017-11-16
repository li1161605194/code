require.config({　　　
	paths: {　　　　　　
		"jquery": "../unit/jquery.min"　　
	}
});
define(['jquery'], function($) {　　　　　　　
	return {
		getMaxHeight: function(elms) {
			var maxHeight = 0;
			elms.each(function() {
				var height = $(this).height();
				if(height > maxHeight) {
					maxHeight = height;
				}
			});
			return maxHeight;
		},
		　
		getMaxWidth: function(elms) {
			var maxWidth = 0;
			elms.each(function() {
				var width = $(this).width();
				if(width > maxWidth) {
					maxWidth = width;
				}
			});
			return maxWidth;
		},
		　　
		highlight: function(ele, keys) {
			var reg = new RegExp("(" + keys.replace(/,/, "|") + ")", "g");
			ele.innerHTML = ele.innerHTML.replace(reg, "<font color=\"red\">$1</font>");
		},
		unhighlight: function(ele) {
			ele.innerText = ele.innerText;
		},
		actionNotice: function(data) {
			var params = {};
			params.msg = "操作执行";
			params.time = 3000;
			params.fontcolor = "#3A87ADe";
			params.bgcolor = "#D9EDF7";
			if(data) {
				$.each(data, function(i) {
					params[i] = data[i];
				});
			} else {

			}
			$('#succ_msg').clearQueue().remove();
			var screen_width = $(window).width() / 2 - 300 / 2;
			var screen_height = $(window).height() / 2 - 40 / 2;
			var html = '<div id="succ_msg" style="_position:absolute;display:none;padding: 15px;position:fixed;top:' + screen_height + 'px;z-index:9999999999;width:300px;left:' + screen_width + 'px;border-radius: 4px;background-color: ' + params.bgcolor + ';border-color: #BCE8F1;color:' + params.fontcolor + ' ;font-size:14px;line-height:26px;text-align:center;font-weight:bold;">' + params.msg + '</div>';
			$('body').append(html);
			$("#succ_msg").fadeIn(500);
			setTimeout(function() {
				$("#succ_msg").fadeOut(500);
			}, params.time);
		},
		iebugcookeis: function(url) {
			//ie浏览器缓存机制 ajax取值bug 解决方法
			if((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) {
				url = url + "?" + Math.random(88888);
			} else {

			}
			return url;
		},
		transferNumChinese: function(input,elms) {
			input = input.toString();
			var danwei = Array("", "拾", "佰", "仟", "万", "拾", "佰", "仟", "亿");
			var inputvalue = parseInt(input);
			var l = input.length;
			var a = new Array(l);
			var b = new Array(l);
			var result = "";
			for(var i = 0; i < l; i++) {
				a[i] = input.substr(i, 1);
				var zhnum="";
				switch (a[i]){
					case "0":
						zhnum="零";
						break;
					case "1":
						zhnum="壹";
						break;
					case "2":
						zhnum="贰";
						break;
					case "3":
						zhnum="叁";
						break;
					case "4":
						zhnum="肆";
						break;
					case "5":
						zhnum="伍";
						break;
					case "6":
						zhnum="陆";
						break;
					case "7":
						zhnum="柒";
						break;
					case "8":
						zhnum="捌";
						break;
					case "9":
						zhnum="玖";
						break;
					default:
						zhnum="零"
						break;
				}
				b[i] = zhnum;
				result += b[i] + danwei[l - i - 1];
			}
			return elms.val(result + "元整");
		},
		preventDefault:function(event){
			if(event.preventDefault){
				event.preventDefault();
			}else{
				event.returnValue=false;
			}
		},
		stopPropagation:function(event){
			if(event.stopPropagation){
				event.stopPropagation();
			}else{
				event.cancelBubble=true;
			}
		},
		postFromAjax:function(data){
			var params = {};
			params.url = "http://www.360dididai.com/market/search-notes";
			params.dataoaram = {
				loan_type:0,
				page:0,
				page_size:2
			};
			params.successfunction = "";
			params.errorfunction = "";
			if(data) {
				$.each(data, function(i) {
					params[i] = data[i];
				});
			} else {

			}
		}　　
	};　　
});