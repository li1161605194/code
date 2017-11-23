// 解决IE6不缓存背景图片问题
if(!window.XMLHttpRequest) {
	document.execCommand("BackgroundImageCache", false, true);
}

// 添加收藏夹
function addFavorite(url, title) {
	if (document.all) {
		window.external.addFavorite(url, title);
	} else if (window.sidebar) {
		window.sidebar.addPanel(title, url, "");
	}
}

// html字符串转义
function htmlEscape(htmlString) {
	htmlString = htmlString.replace(/&/g, '&amp;');
	htmlString = htmlString.replace(/</g, '&lt;');
	htmlString = htmlString.replace(/>/g, '&gt;');
	htmlString = htmlString.replace(/'/g, '&acute;');
	htmlString = htmlString.replace(/"/g, '&quot;');
	htmlString = htmlString.replace(/\|/g, '&brvbar;');
	return htmlString;
}

// 设置Cookie
function setCookie(name, value) {
	var expires = (arguments.length > 2) ? arguments[2] : null;
	document.cookie = name + "=" + encodeURIComponent(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ";path=" + shopxx.base;
}

// 获取Cookie
function getCookie(name) {
	var value = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (value != null) {
		return decodeURIComponent(value[2]);
    } else {
		return null;
	}
}

function getAllCookie(name){
	var map = new Map();
    var arr = document.cookie.split("; ");
    for(var i=0,len=arr.length;i<len;i++){
        var item = arr[i].split("=");
        if(item[0].startWith(name)){
        	map.put(item[0], item[1]);
        }
    }
    return map;
}

String.prototype.startWith=function(str){  
    if(str==null||str==""||this.length==0||str.length>this.length)  
      return false;  
    if(this.substr(0,str.length)==str)  
      return true;  
    else  
      return false;  
    return true;  
}  
String.prototype.endWith=function(str){  
    if(str==null||str==""||this.length==0||str.length>this.length)  
      return false;  
    if(this.substring(this.length-str.length)==str)  
      return true;  
    else  
      return false;  
    return true;  
}  

function Map(){
	this.container = new Object();
}


Map.prototype.put = function(key, value){
	this.container[key] = value;
}


Map.prototype.get = function(key){
	return this.container[key];
}


Map.prototype.keySet = function() {
	var keyset = new Array();
	var count = 0;
	for (var key in this.container) {
		// 跳过object的extend函数
		if (key == 'extend') {
			continue;
		}
		keyset[count] = key;
		count++;
	}
	return keyset;
}


Map.prototype.size = function() {
	var count = 0;
	for (var key in this.container) {
		// 跳过object的extend函数
		if (key == 'extend'){
			continue;
		}
		count++;
	}
	return count;
}


Map.prototype.remove = function(key) {
	delete this.container[key];
}

// 删除cookie
function removeCookie(name) {
	var expires = new Date();
	expires.setTime(expires.getTime() - 1000 * 60);
	setCookie(name, "", expires);
}

// 浮点数加法运算
function floatAdd(arg1, arg2) {
	var r1, r2, m;
	try{
		r1 = arg1.toString().split(".")[1].length;
	} catch(e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch(e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	return (arg1 * m + arg2 * m) / m;
}

// 浮点数减法运算
function floatSub(arg1, arg2) {
	var r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch(e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch(e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2));
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

// 浮点数乘法运算
function floatMul(arg1, arg2) {
	var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length;
	} catch(e) {}
	try {
		m += s2.split(".")[1].length;
	} catch(e) {}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

// 浮点数除法运算
function floatDiv(arg1, arg2) {
	var t1 = 0, t2 = 0, r1, r2;    
	try {
		t1 = arg1.toString().split(".")[1].length;
	} catch(e) {}
	try {
		t2 = arg2.toString().split(".")[1].length;
	} catch(e) {}
	with(Math) {
		r1 = Number(arg1.toString().replace(".", ""));
		r2 = Number(arg2.toString().replace(".", ""));
		return (r1 / r2) * pow(10, t2 - t1);
	}
}

// 设置数值精度
function setScale(value, scale, roundingMode) {
	if (roundingMode.toLowerCase() == "roundhalfup") {
		return (Math.round(value * Math.pow(10, scale)) / Math.pow(10, scale)).toFixed(scale);
	} else if (roundingMode.toLowerCase() == "roundup") {
		return (Math.ceil(value * Math.pow(10, scale)) / Math.pow(10, scale)).toFixed(scale);
	} else {
		return (Math.floor(value * Math.pow(10, scale)) / Math.pow(10, scale)).toFixed(scale);
	}
}

$().ready( function() {
	
	var $body;
	var dialogIdNumber = 0;
	var dialogZIndex = 100;
	var messageIdNumber = 0;
	
	$.dialog = function (settings) {
		
		var dialogId;
		
		if (settings.id != null) {
			dialogId = settings.id;
		} else {
			dialogId = "dialog" + dialogIdNumber;
			dialogIdNumber ++;
		}
		if (settings.content == null) {
			settings.content = "";
		}
		if (settings.width == null || settings.width == "auto") {
			settings.width = 320;
		}
		if (settings.height == null) {
			settings.height = "auto";
		}
		
		if ($body == null) {
			$body = $("body");
		}
		
		var dialogHtml = "";
		
		if (settings.modal == true) {
			dialogHtml += '<div id="dialogOverlay' + dialogId + '" class="dialogOverlay"></div>';
		}
		
		if (settings.className != null) {
			dialogHtml += '<div id="' + dialogId + '" class="baseDialog ' + settings.className + '"><div class="dialogWrap"></div><div class="dialogMain">';
		} else {
			dialogHtml += '<div id="' + dialogId + '" class="baseDialog"><div class="dialogWrap"></div><div class="dialogMain">';
		}
		
		if (settings.title != null) {
			dialogHtml += '<div id="dialogTitle' + dialogId + '" class="dialogTitle">' + settings.title + '</div><div id="dialogClose' + dialogId + '" class="dialogClose"></div>';
		} else {
			dialogHtml += '<div id="dialogClose' + dialogId + '" class="dialogClose"></div>';
		}
		
		if (settings.type != null) {
			dialogHtml += '<div id="dialogContent' + dialogId + '" class="dialogContent dialog' + settings.type + 'Icon">' + settings.content + '</div>';
		} else {
			dialogHtml += '<div id="dialogContent' + dialogId + '" class="dialogContent">' + settings.content + '</div>';
		}
		
		if (settings.ok != null || settings.cancel != null) {
			dialogHtml += '<div id="dialogButtonArea' + dialogId + '" class="dialogButtonArea">';
		}
		
		if (settings.ok != null) {
			dialogHtml += '<input type="button" id="dialogOk' + dialogId + '" class="formButton" value="' + settings.ok + '" hidefocus="true" />';
		}
		
		if (settings.cancel != null) {
			dialogHtml += '<input type="button" id="dialogCancel' + dialogId + '" class="formButton" value="' + settings.cancel + '" hidefocus="true" />';
		}
		
		if (settings.ok != null || settings.cancel != null) {
			dialogHtml += '</div>';
		}
		
		if(!window.XMLHttpRequest) {
			dialogHtml += '<iframe id="dialogIframe' + dialogId + '" class="dialogIframe"></iframe>';
		}
		
		dialogHtml += '</div></div>';
		
		$body.append(dialogHtml);
		
		var dialogX;
		var dialogY;
		
		var $dialogOverlay = $("#dialogOverlay" + dialogId);
		var $dialog = $("#" + dialogId);
		var $dialogTitle = $("#dialogTitle" + dialogId);
		var $dialogClose = $("#dialogClose" + dialogId);
		var $dialogOk = $("#dialogOk" + dialogId);
		var $dialogCancel = $("#dialogCancel" + dialogId);
		
		$dialog.css({"width": settings.width, "height": settings.height, "margin-left": - parseInt(settings.width / 2), "z-index": dialogZIndex ++});
		
		if(!window.XMLHttpRequest) {
			var $dialogIframe = $("#dialogIframe" + dialogId);
			$dialogIframe.css({"width": $dialog.width() + 20, "height": $dialog.height() + 20});
		}
		
		function dialogClose() {
			$dialogOverlay.remove();
			$dialog.remove();
		}
		
		if (settings.autoCloseTime != null) {
			setTimeout(dialogClose, settings.autoCloseTime);
		}
		
		$dialogClose.click( function() {
			if ($.isFunction(settings.cancelCallback)) {
				if (settings.cancelCallback.apply() != false) {
					dialogClose();
				}
			} else {
				dialogClose();
			}
		});
		
		$dialogOk.click( function() {
			if ($.isFunction(settings.okCallback)) {
				if (settings.okCallback.apply() != false) {
					dialogClose();
				}
			} else {
				dialogClose();
			}
		});
		
		$dialogCancel.click( function() {
			if ($.isFunction(settings.cancelCallback)) {
				if (settings.cancelCallback.apply() != false) {
					dialogClose();
				}
			} else {
				dialogClose();
			}
		});
		
		$dialogTitle.mousedown(function (event) {
			$dialog.css({"z-index": dialogZIndex ++});
			var offset = $(this).offset();
			if(!window.XMLHttpRequest) {
				dialogX = event.clientX - offset.left + 6;
				dialogY = event.clientY - offset.top + 6;
			} else {
				dialogX = event.pageX - offset.left + 6;
				dialogY = event.pageY - offset.top + 6;
			}
			
			$(document).bind("mousemove", function(event) {
				$dialog.css({"top": event.clientY - dialogY, "left": event.clientX - dialogX, "margin": 0});
			});
			return false;
		});
		
		$(document).mouseup(function() {
			$(document).unbind("mousemove");
		});
		
		$dialog.keypress(function(event) {
			if(event.keyCode == 13) {
				if ($.isFunction(settings.okCallback)) {
					if (settings.okCallback.apply() != false) {
						dialogClose();
					}
				} else {
					dialogClose();
				}
			}  
		});
		
		$dialogOverlay.show();
		$dialog.show();
		$dialog.focus();
		
		return dialogId;
	}
	
	$.closeDialog = function (dialogId) {
		var $dialogOverlay = $("#dialogOverlay" + dialogId);
		var $dialog = $("#" + dialogId);
		
		$dialogOverlay.remove();
		$dialog.remove();
	}
	
	$.message = function (settings) {
	
		if (settings.content == null) {
			settings.content = "";
		}
		
		if ($body == null) {
			$body = $("body");
		}
		
		var messageId = "message" + messageIdNumber;
		messageIdNumber ++;
		
		var messageHtml;
		
		if (settings.type != null) {
			messageHtml = '<div id="' + messageId + '" class="baseMessage"><div class="messageContent message' + settings.type + 'Icon">' + settings.content + '</div></div>';
		} else {
			messageHtml = '<div id="' + messageId + '" class="baseMessage"><div class="messageContent">' + settings.content + '</div></div>';
		}
		
		$body.append(messageHtml);
		
		var $message = $("#" + messageId);
		
		$message.css({
            //设置弹出层距离左边的位置
        	left: ($("body").width() - $message.width()) / 2 - 20 + "px",
            //设置弹出层距离上面的位置
        	top: ($(window).height() - $message.height()) / 2 + "px",
        	"z-index": "9999"
        }).show();
		
		setTimeout(function() {
				$message.remove();
		}, 2000);
		
		return messageId;
	}
	jQuery.fn.center = function(loaded) {
		var obj = this;
		body_width = parseInt($(window).width());
		body_height = parseInt($(window).height());
		block_width = parseInt(obj.width());
		block_height = parseInt(obj.height());

		left_position = parseInt((body_width / 2) - (block_width / 2) + $(window).scrollLeft());
		if (body_width < block_width) {
			left_position = 0 + $(window).scrollLeft();
		};

		top_position = parseInt((body_height / 2) - (block_height / 2) + $(window).scrollTop());
		if (body_height < block_height) {
			top_position = 0 + $(window).scrollTop();
		};

		if (!loaded) {

			obj.css({
				'position': 'absolute'
			});
			obj.css({
				'z-index': '1002'
			});

			obj.css({
				'top': ($(window).height() - $('#LoginBox').height()) * 0.5,
				'left': left_position
			});
			$(window).bind('resize', function() {
				obj.center(!loaded);
			});
			$(window).bind('scroll', function() {
				obj.center(!loaded);
			});

		} else {
			obj.stop();
			obj.css({
				'position': 'absolute'
			});
			obj.css({
				'opacity': '1'
			});
			obj.animate({
				'top': top_position
			}, 200, 'linear');
		}
	}
});