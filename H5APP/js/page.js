$(function(){
	url = window.location.href;
	if(window.plus) {
		plusReady();
	} else {
		document.addEventListener("plusready", plusReady, false);
	}
	if(url.indexOf("lxwy.html")!=-1){
		$(document).on("touchstart",".lxwy-pzk",function(){
			$("#layermbox1").css("display","block");
		});
		$(document).on("touchstart",".sec-pwz-commom.qx",function(){
			$("#layermbox1").css("display","none");
		});
	}else if(url.indexOf("hht.html")!=-1){
		$(document).on("touchstart",".jiu-gong-ge-bohaok div.col-33",function(){
			$(".hht-hmk-delimg").css("display","block");
			var _this=$(this);
			var src=_this.find("img").attr("src");
			_this.find("img").attr("src",src.substring(0,src.length-4)+"_on.png");
			$(".hht-hmk-hm").html($(".hht-hmk-hm").html()+_this.attr("datanum"));
		});
		$(document).on("touchend",".jiu-gong-ge-bohaok div.col-33",function(){
			var _this=$(this);
			var src=_this.find("img").attr("src");
			_this.find("img").attr("src",src.substr(0,src.length-7)+".png");
		});
		$(document).on("click",".hht-hmk-delimg",function(){
			var num=$(".hht-hmk-hm").html();
			if(num.length==1){
				$(".hht-hmk-hm").html("");
				$(".hht-hmk-delimg").css("display","none");
			}else{
				$(".hht-hmk-hm").html(num.substring(0,num.length-1));
			}
		});
		$(document).on("click",".hht-baohao",function(){
			$("#layermbox1").css("display","block");
		});
		$(document).on("click",".sec-pwz-commom.qx",function(){
			$("#layermbox1").css("display","none");
		});
		$(document).on("click",".hht-helpusek",function(){
			actionNotice({msg:"拨号规则:栋号+单元号+房号<br>(栋号,单元号不足两位前加0,房号不足四位前加0)<br>例:1栋2单元305室,就是:01020305",time:5500})
		});
	}else if(url.indexOf("kmjl.html")!=-1){
		pullDownAction ();
	}
	
})



var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;

var shangxia="shang";
function pullDownAction () {
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		shangxia="shang";
		count=1;
		lastIndex=0;
		ajaxLoadKmjlListJson();
		//myScroll.refresh();		//数据加载完成后，调用界面更新方法   Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 10);	// <-- Simulate network congestion, remove setTimeout from production!
}

function pullUpAction () {
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		shangxia="xia";
		lastIndex++;
		ajaxLoadKmjlListJson();
		//myScroll.refresh();		// 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 10);	// <-- Simulate network congestion, remove setTimeout from production!
}

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;
	myScroll = new iScroll('wrapper', {
		scrollbarClass: 'myScrollbar', /* 重要样式 */
		useTransition: true, /* 此属性不知用意，本人从true改为false */
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
			}
		},
		onScrollMove: function () {
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';				
				pullDownAction();	// Execute custom function (ajax call?)
				$("#pullDown").css("display","block");
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';				
				pullUpAction();	// Execute custom function (ajax call?)
			}
		}
	});
	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

var lastIndex=0;
var itemsPerLoad=6;
var count=1;
function ajaxLoadKmjlListJson(){
	$.ajax({
	  url: "../json/kmjl.json?0",
	  dataType: "json",
	  success: function(response){
	  	var data=response;
	  	var cardHTML='';
	  	if(data.length<1){
	  		return false;
	  	}
	  	if(count==1){
	  		$('.card-container').html("");
	  	}
	  	var dl=data.length;
	  	if(dl<((lastIndex+1)*itemsPerLoad)){
	  	
	  	}else{
	  		dl=((lastIndex+1)*itemsPerLoad);
	  	}
	  	for(i=lastIndex*itemsPerLoad;i<dl;i++){
	  		cardHTML += '<div class="card">' +
		                          '<div style="font-size:0.65rem" class="card-header">'+data[i].date+'--'+data[i].time+'<span style="float:right">打开方式:'+data[i].type+'</span></div>' +
		                          '<div class="card-content">' +
		                            '<div style="font-size:0.8rem" class="card-content-inner">序列号:'+ count++ +'---'+data[i].des+'</div>' +
		                          '</div>' +
		                      '</div>';
	  	}
	  	if(shangxia=="shang"){
	  		$('.card-container').html(cardHTML);
	  	}else if(shangxia=="xia"){
	  		$('.card-container').append(cardHTML);
	  	}
	  	myScroll.refresh();
	  	
	  }
	});
}



      



