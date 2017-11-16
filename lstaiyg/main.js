$(function() {
	$(".zminh").css("min-height",$(window).height()+"px");
	dateTime();
});


dateTime = function() {
    var strDate = new Date('2016-02-14 20:00:00');
    var nowDate = new Date();
    var timeNum = nowDate - strDate;
    var intDiff = timeNum;
	var day = Math.floor(intDiff / (1000 * 60 * 60 * 24));
	var hour = Math.floor(intDiff / (1000 * 60 * 60)) - (day * 24) ;
	var minute = Math.floor(intDiff / (1000 * 60)) - (day * 24 * 60) - (hour  * 60);
	var second = Math.floor(intDiff / 1000) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
	if (day <= 9) day = '0' + day;
	if (hour <= 9) hour = '0' + hour;
	if (minute <= 9) minute = '0' + minute;
	if (second <= 9) second = '0' + second;
	var html = day.toString() + '天' + hour.toString() + '小时' + minute.toString() + '分钟' + second.toString() + '秒';
	$(".loveDateTime").html(html);
	setTimeout(function(){
		dateTime();
	},1000);
}