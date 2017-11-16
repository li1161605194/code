var tempnum=1;
$(function(){

	if (window.plus) {
        plusReady2();
    } else {
        document.addEventListener("plusready", plusReady2, false);
    }

	/*  点击好友  单个聊天  */
	$(document).on("click",".userroom",function(){
		$(".webim-contact-wrapper").hide();
		$(".webim-chatwindow ").show();
		tempnum=2;
	});

	/*   点击菜单栏 消息好友   */
	$(document).on("click","#friends",function(){
		$(".webim-contact-wrapper").show();
		$(".webim-chatwindow ").hide();
		tempnum=1;
	});

	/*  点击菜单栏  消息群组   */
	$(document).on("click","#groups",function(){
		$(".webim-contact-wrapper").show();
		$(".webim-chatwindow ").hide();
		tempnum=1;
	});

	$(".q").val(localStorage.getItem("usernameqqq"));
	$(".a").val(localStorage.getItem("passwoedqqq"));
	setTimeout(function(){
		$(".z").click();
	},10);

})

function plusReady2() {
    plus.key.removeEventListener('backbutton', function() {}, false);
    plus.key.addEventListener('backbutton', function() {
		if(tempnum==1){
			window.history.go(-1);
		}else{
			$(".webim-contact-wrapper").show();
			$(".webim-chatwindow ").hide();
			tempnum=1;
		}
    }, false);
}