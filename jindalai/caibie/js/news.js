$(function(){
	$("#dwzk.newsdetail").before(newshesderhtml).after(newsfooterhtml);
})

var newshesderhtml='<div style="height:388px;">'+
'<iframe id="newsheader" name="newsheader" src="newsheader.html" style="overflow:hidden;"'+
'scrolling="yes" frameborder="no" width="100%" height="100%"></iframe></div>';
var newsfooterhtml='<div style="height:180px;">'+
'<iframe id="newsfooter" name="newsfooter" src="newsfooter.html" style="overflow:hidden;"'+
'scrolling="yes" frameborder="no" width="100%" height="100%"></iframe></div>';