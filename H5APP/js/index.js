var url="";
$(function() {
	$.init();
	url = window.location.href;
	//alert(url);
	if(url.indexOf("index.html") == -1) {
		//alert("fei-index");
	} else {
		$(".row div").height($(".row div").width());
		if(window.plus) {
			plusReady();
		} else {
			document.addEventListener("plusready", plusReady, false);
		}
	}
})

function plusReady() {
	if(url.indexOf("index.html") != -1) {
		plus.key.removeEventListener('backbutton',function(){},false);
		plus.key.addEventListener('backbutton', function() {
			if(confirm('确认退出？')) {
				plus.runtime.quit();
			}
		}, false);
	} else {
		plus.key.removeEventListener('backbutton',function(){},false);
		plus.key.addEventListener('backbutton', function() {
			history.go(-1);
		}, false);
	}
}

// 拍照
function getImage() {
	console.info("开始拍照：");
	var cmr = plus.camera.getCamera();
	cmr.captureImage(function(p) {
		console.info("成功：" + p);
		plus.io.resolveLocalFileSystemURL(p, function(entry) {
			createItem(entry);
		}, function(e) {
			console.info("读取拍照文件错误：" + e.message);
		});
	}, function(e) {
		console.info("失败：" + e.message);
	}, {
		filename: "_doc/camera/",
		index: 1
	});
}
var i = 1;
// 录像
function getVideo() {
	console.info("开始录像：");
	var cmr = plus.camera.getCamera();
	cmr.startVideoCapture(function(p) {
		console.info("成功：" + p);
		plus.io.resolveLocalFileSystemURL(p, function(entry) {
			//createItem(entry);
		}, function(e) {
			console.info("读取录像文件错误：" + e.message);
		});
	}, function(e) {
		console.info("失败：" + e.message);
	}, {
		filename: "_doc/camera/",
		index: i
	});
}

function actionNotice(data) {
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
	$('#succ_msg').remove();
	var screen_width = $(window).width() / 2 - 300 / 2;
	var screen_height = $(window).height() / 2 - 40 / 2;
	var html = '<div id="succ_msg" style="_position:absolute;display:none;padding: 15px;position:fixed;top:' + screen_height + 'px;z-index:9999999999;width:300px;left:' + screen_width + 'px;border-radius: 4px;background-color: ' + params.bgcolor + ';border-color: #BCE8F1;color:' + params.fontcolor + ' ;font-size:0.7rem;line-height:26px;text-align:left;">' + params.msg + '</div>';
	$('body').append(html);
	$("#succ_msg").show(500);
	setTimeout(function() {
		$("#succ_msg").hide(500);
	}, params.time);
}

function ajaxJsCssInit(data){
	for(i=0;i<data.length;i++){
		$.ajax({
		  url: data[i].url,
		  dataType: "script",
		  success: function(response){
		  }
		});
	}
}
