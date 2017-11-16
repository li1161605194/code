$(".close").click(function() {
	$(".meng1").hide(); 
	$(".meng2").hide();
});
$(".rule_down").click(function() {
	$(".meng_rule").show();
});
$(".rule_up").click(function() {
	$(".meng_rule").hide();
});
$(function() {
	var rotateTimeOut = function() {
		$("#rotate").rotate({
			angle: 0,
			animateTo: 2160,
			duration: 8000,
			callback: function() {
				nativeAlert("","网络超时，请检查您的网络设置！");
			}
		})
	};
	// var bRotate = false;
	var rotateFn = function(awards, angles, txt, item) {
		// bRotate = !bRotate;
		$("#rotate").stopRotate();
		$("#rotate").rotate({
			angle: 0,
			animateTo: angles + 3600,
			duration: 5000,
			callback: function() {
				$(".top_msg").html("运气爆棚！");
				$(".prize_img").attr('src', 'http://apk.kjduobao.com/kjad/turntable20161020/images/'+awards+'.png');
				$(".prize_msg span").html(txt);
				$(".meng1").css('display', 'block');
			}
		})
	};
	// var item;
	// var checked = 0;
	function rotate() {
		var item = rnd(0,2);
		numb1 = rnd(300, 340);
		numb2 = rnd(240, 280);
		numb3 = rnd(180, 220);
		numb4 = rnd(120, 160);
		numb5 = rnd(60, 100);
		numb6 = rnd(0, 40);
		switch (item) {
		case 0:
			rotateFn(0, numb1, "路虎");
			break;
		case 1:
			rotateFn(5, numb6, "iphone7");
			break
		case 2:
			rotateFn(4, numb5, "保时捷");
			break;
		case 3:
			rotateFn(3, numb4, "1000元购物卡");
			break;
		case 4:
			rotateFn(2, numb3, "小米平衡车");
			break;
		case 5:
			rotateFn(1, numb2, "iPad Pro");
			break;
		}
	}
	$(".btn").click(function() {
		rotate();
	});
});
function rnd(n, m) {
	return Math.floor(Math.random() * (m - n + 1) + n)
}
