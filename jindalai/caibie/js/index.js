$(function(){
	var nowUrl=window.location.href;
	var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
    isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
    isAndroid = ua.match(/(Android)\s+([\d.]+)/),
    isMobile = isIphone || isAndroid;
    if (isMobile) {
        window.location.href="http://ecbfive.jdlwlkj.com";
    } else {
    	$("#wu.cb_index_bottom_bjk").html(footerhtml);
	    if(nowUrl.indexOf("aboutUs")!=-1||nowUrl.indexOf("/news/mtbd/")!=-1){
	    	var temperjicandan="gsjj";
	    	if(nowUrl.split("?")[1]){
				temperjicandan=nowUrl.split("?")[1];
	    	}else{
	    		if(nowUrl.indexOf("/news/mtbd/")!=-1){
	    			temperjicandan="mtbd";
	    		}else{
		    		temperjicandan="gsjj";
		    	}
	    	}
		    if(temperjicandan=="mtbd"){
    			$('#newslist').attr('src', $('#newslist').attr('src'));
    			$("#mtbdlistk").show();
    			var ifarmenewslist=$('#newslist').contents().find('body #dwzk');
    			$('#mtbdlistk').height(ifarmenewslist.height()+150);
    		}
	    	$("a.keclick").removeClass('xuanz');
		    $("a[menu="+temperjicandan+"]").addClass('xuanz');
		    $(".cb_aus_common_nrdwk").removeClass('xuanz');
		    $("."+temperjicandan).addClass('xuanz');
	    	if(nowUrl.indexOf("/news/mtbd/")!=-1){
	    		$(document).on('click','.cb_aus_up_menu_dwk a.keclick',function(){
		    		if($(this).attr('menu')=="gsjj"){
		    			top.document.location.href="../../aboutUs.html?gsjj";
		    		}else if($(this).attr('menu')=="mtbd"){
		    			top.document.location.href="../../aboutUs.html?mtbd";
		    		}
		    	});
	    	}else{
		    	$(document).on('click','.cb_aus_up_menu_dwk a.keclick',function(){
		    		$("#menuFrame").css('display','none');
		    		$('.cb_aus_content_dwk').css({'height':'auto','background':"inherit"});
		    		$("a.keclick").removeClass('xuanz');
		    		$(this).addClass('xuanz');
		    		$(".cb_aus_common_nrdwk").removeClass('xuanz');
		    		$("."+$(this).attr('menu')).addClass('xuanz');
		    		if($(this).attr('menu')=="mtbd"){
		    			$('#newslist').attr('src', $('#newslist').attr('src'));
		    			$("#mtbdlistk").show();
		    			var ifarmenewslist=$('#newslist').contents().find('body #dwzk');
		    			$('#mtbdlistk').height(ifarmenewslist.height()+150);
		    		}
		    	});
		    }
	    }else{}
	    $(".fullSlide").height(window.innerHeight-65<700?window.innerHeight-65:700);
	    /*window.onresize = function(){
	    	$(".fullSlide").height(window.innerHeight-65);
	    }*/
	    var posmenu="";
	    if(nowUrl.split("#")[1]){
			posmenu=nowUrl.split("#")[1];
		    var pos = $("#"+posmenu).offset().top;
			if(posmenu.indexOf("yi")!=-1){
				pos=0;
			}
		    $("html,body").animate({scrollTop: pos-60}, 1000);
		}
		$(document).on('click',"ul li.cb_index_top_dwk_ul_menu_li",function(){
			var _this=$(this);
			if(nowUrl.indexOf("index")==-1){
				if(nowUrl.indexOf("/news/mtbd/")!=-1){
					top.document.location.href="../../"+_this.attr('menu');
				}
				window.location.href=_this.attr('menu');
				return false;
			}
			if(_this.attr('menu').indexOf(".html")!=-1){
				if(nowUrl.indexOf("/news/mtbd/")!=-1){
					top.document.location.href="../../"+_this.attr('menu');
				}
				window.location.href=_this.attr('menu');
				return false;
			}
			var menu=_this.attr('menu').split("#")[1];
			var pos = $("#"+menu).offset().top;
			if(menu.indexOf("yi")!=-1){
				pos=0;
			}
		    $("html,body").animate({scrollTop: pos-60}, 1000);
		    return false;
		});
	}
})


var footerhtml='<div class="cb_index_bottom_dwk">'+
			'<div class="cb_index_bottom_dwk_commonk" style="margin:0 auto;">'+
				'<p style="margin:30px 30px 0px 0px;">地址：河南郑州郑东新区金水东路东风南路绿地新都会12B层<br>'+
				'Copyright(c)河南菜碑网络科技有限公司 豫ICP备16011235号-1</p>'+

				'<div style="margin:40px 0px 0px 0px;" class="cb_index_bottom_dwk_commonk_imgyi common_fll"></div>'+
				'<div style="margin:40px 2px 0px 2px;" class="cb_index_bottom_dwk_commonk_imgxian common_fll"></div>'+
				'<p  style="margin:40px 0px 0px 0px;line-height:22px;">4000-789-785<br>周一至周五 9:00--18:00</p>'+
				'<div style="margin:40px 0px 0px 30px;" class="cb_index_bottom_dwk_commonk_imger common_fll"></div>'+
				'<div style="margin:40px 2px 0px 2px;" class="cb_index_bottom_dwk_commonk_imgxian common_fll"></div>'+
				'<p style="margin:40px 30px 0px 0px;line-height:22px;">客服QQ:3506586904<br>周一至周五 9:00--18:00</p>'+

				'<img style="margin:20px 0px 0px 0px;" src="img/bottom_ewm.png">'+
			'</div>'+
		'</div>';