var nowUrl = window.location.href;
var pnHref = window.location.pathname;
var hnHref = window.location.hash;
var snHref = window.location.search;
$(function() {
    var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        isAndroid = ua.match(/(Android)\s+([\d.]+)/),
        isMobile = isIphone || isAndroid;
    if (isMobile) {
        //window.location.href = "http://ecbfive.jdlwlkj.com";
    } else {
        $("#headerhtml.cb_index_top_bjkzk").html(headerhtml);
        $("#wu.cb_index_bottom_bjk").html(footerhtml);
        $("ul.cb_index_top_dwk_ul_menu.er li").removeClass('xuanz');
        $(document).on('click', "ul.cb_index_top_dwk_ul_menu.er li.cb_index_top_dwk_ul_menu_li", function() {
            var _this = $(this);
            _this.parent().find('li').removeClass('xuanz');
            _this.addClass('xuanz');
            var menu = _this.attr('menu');
            var yon = _this.attr('yon');
            if (yon == "2") {
            	if(pnHref.indexOf("/news/mtbd/") != -1){
            		window.parent.location.href="/"+ menu;
            		return false;
            	}
                window.parent.location.href = "/" + menu;
                return false;
            } else {
                if (pnHref.indexOf("index.html") == -1) {
                    if (pnHref == "/") {
                        $("html,body").animate({ scrollTop: $(menu).offset().top - 130 }, 1100);
                        return false;
                    }
                    window.parent.location.href = "/index.html" + menu;
                    return false;
                } else {
                    $("html,body").animate({ scrollTop: $(menu).offset().top - 130 }, 1100);
                }
            }
        });
        var posmenu = "";
        if (nowUrl.split("#")[1]) {
            posmenu = nowUrl.split("#")[1];
            var pos = $("#" + posmenu).offset().top;
            if (posmenu.indexOf("yi") != -1) {
                pos = -600;
            }
            $("html,body").animate({ scrollTop: pos  - 130 }, 1000);
        }
        if (pnHref == "/" || pnHref.indexOf("index.html") != -1) {
            indexPageInit();
        } else if (pnHref.indexOf("aboutUs.html") != -1) {
            aboutPageInit();
        } else if (pnHref.indexOf("newsList.html") != -1) {
            newsPageInit();
        } else if (pnHref.indexOf("tradingArea.html") != -1) {
            areaPageInit();
        } else if (pnHref.indexOf("/news/mtbd/") != -1) {
			$("ul.cb_index_top_dwk_ul_menu.er li").eq(4).addClass('xuanz');
        }
    }
})
hashSlied = function() {
    if (window.location.hash != "") {
        $("html,body").animate({ scrollTop: $(window.location.hash).offset().top - 130 }, 1100);
    }
}
indexPageInit = function() {
    if (window.location.hash != "") {
        $("ul.cb_index_top_dwk_ul_menu.er li").removeClass('xuanz');
        if (window.location.hash == "#yi") {
            $("ul.cb_index_top_dwk_ul_menu.er li").eq(0).addClass('xuanz');
        } else if (window.location.hash == "#er") {
            $("ul.cb_index_top_dwk_ul_menu.er li").eq(1).addClass('xuanz');
        } else if (window.location.hash == "#liu") {
            $("ul.cb_index_top_dwk_ul_menu.er li").eq(3).addClass('xuanz');
        }
    }else{
    	$("ul.cb_index_top_dwk_ul_menu.er li").eq(0).addClass('xuanz');
    }
    $(document).on("mouseover", ".index_cpfwli_common", function() {
        $(this).find("span").addClass("xuanz");
    });
    $(document).on("mouseleave", ".index_cpfwli_common", function() {
        $(this).find("span").removeClass("xuanz");
    });
}
aboutPageInit = function() {
    $("ul.cb_index_top_dwk_ul_menu.er li").eq(5).addClass('xuanz');
    if(snHref!=""&&snHref.length=="5"){
    	if(snHref.indexOf("?gsjj")!=-1||snHref.indexOf("?gltd")!=-1||snHref.indexOf("?lxwm")!=-1){
	    	$(".cb_aus_common_nrdwk").removeClass('xuanz');
	    	var _this=$("."+snHref.substring(1,snHref.length));
		    _this.addClass('xuanz');
		    var xuanz=$("a[menu="+snHref.substring(1,snHref.length)+"]");
		    $(".cb_aus_up_dwk").css("background-image","url(../img/aus/"+xuanz.attr('imgnum')+".png)");
	    	xuanz.parent().find('a').removeClass('xuanz');
	    	xuanz.addClass('xuanz');
	    }
    }
}
newsPageInit = function() {
    $("ul.cb_index_top_dwk_ul_menu.er li").eq(4).addClass('xuanz');
    if (nowUrl.indexOf("/news/mtbd/") != -1) {
        $('#newslist').attr('src', $('#newslist').attr('src'));
        $("#mtbdlistk").show();
        var ifarmenewslist = $('#newslist').contents().find('body #dwzk');
        $('#mtbdlistk').height(ifarmenewslist.height() + 150);
    }
}
areaPageInit = function() {
    $("ul.cb_index_top_dwk_ul_menu.er li").eq(2).addClass('xuanz');
    var $citypicker3 = $('#city-picker3');
    $citypicker3.citypicker({
        province: '---- 所在省 ----',
        city: '---- 所在市 ----',
        district: '---- 所在区 ----'
    });
    $('#reset').click(function () {
        $citypicker3.citypicker('reset');
    });
    $('#destroy').click(function () {
        $citypicker3.citypicker('destroy');
    });
}
windowLocation = function() {
    nowUrl = window.location.href;
    pnHref = window.location.pathname;
    hnHref = window.location.hash;
    snHref = window.location.search;
}
var headerhtml = '<div class="cb_index_top_bjk yi">' +
    '<div class="cb_index_top_dwk yi">' +
    '<ul class="cb_index_top_dwk_ul_menu yi common_db">' +
    '<li menu="" class="cb_index_top_dwk_ul_menu_li common_db"><span class="index_top_icoimg_common dibst index_img_common yi"></span><span class="index_top_icoimgsm_common dibst">帮助中心</span></li>' +
    '<li menu="" class="cb_index_top_dwk_ul_menu_li common_db"><span class="index_top_icoimg_common dibst index_img_common er"></span><span class="index_top_icoimgsm_common dibst">4000789785</span></li>' +
    '<li menu="" class="cb_index_top_dwk_ul_menu_li common_db"><span class="index_top_icoimg_common dibst index_img_common san"></span><span class="index_top_icoimgsm_common dibst">登录</span></li>' +
    '</ul>' +
    '</div>' +
    '</div>' +
    '<div class="cb_index_top_bjk er">' +
    '<div class="cb_index_top_dwk er">' +
    '<a href="/"><div class="cb_index_top_dwk_img_logo common_db"></div></a>' +
    '<ul class="cb_index_top_dwk_ul_menu er common_db">' +
    '<li yon="1" menu="#yi" class="cb_index_top_dwk_ul_menu_li common_db keclick xuanz">首页</li>' +
    '<li yon="1" menu="#er" class="cb_index_top_dwk_ul_menu_li common_db keclick">产品服务</li>' +
    '<li yon="2" menu="tradingArea.html" class="cb_index_top_dwk_ul_menu_li common_db keclick">商圈入驻</li>' +
    '<li yon="1" menu="#liu" class="cb_index_top_dwk_ul_menu_li common_db keclick">行业方案</li>' +
    '<li yon="2" menu="newsList.html" class="cb_index_top_dwk_ul_menu_li common_db keclick">资讯中心</li>' +
    '<li yon="2" menu="aboutUs.html" class="cb_index_top_dwk_ul_menu_li common_db keclick">关于我们</li>' +
    '</ul>' +
    '<div class="cb_index_top_dwk_img_tel common_db" alt="4000-789-785"></div>' +
    '</div>' +
    '</div>';
var footerhtml = '<div class="footer_bjkzk">' +
    '<div class="footer_dwk">' +
    '<ul class="footerulyi">' +
    '<li class="footerliyi common_db tcst" style="width:26%;">' +
    '<div class="footerleftimg"></div>'+
    '<span class="dbst" style="font-size:20px;line-height: 44px; margin-top:10px;">4000-789-785</span>' +
    '<span class="dbst">周一至周日9:00--18:00</span>' +
    '</li>' +
    '<li class="footerliyi common_db" style="width:50%;">' +
    '<ul class="footeruler common_db" style="width:33%;">' +
    '<li class="footerlier da">关于</li>' +
    '<li class="footerlier"><a href="/aboutUs.html">关于卡券</a></li>' +
    '<li class="footerlier"><a href="/aboutUs.html?lxwm">联系我们</a></li>' +
    '<li class="footerlier"><a href="/newsList.html">卡券资讯</a></li>' +
    '</ul>' +
    '<ul class="footeruler common_db" style="width:33%;">' +
    '<li class="footerlier da">合作</li>' +
    '<li class="footerlier"><a href="/tradingArea.html">商圈入驻</a></li>' +
    '<li class="footerlier"><a href="/tradingArea.html">渠道合作</a></li>' +
    '<li class="footerlier"><a href="/tradingArea.html">服务商申请</a></li>' +
    '</ul>' +
    '<ul class="footeruler common_db" style="width:33%;">' +
    '<li class="footerlier da">帮助</li>' +
    '<li class="footerlier">使用教程</li>' +
    '<li class="footerlier">产品问答</li>' +
    '<li class="footerlier">服务热线</li>' +
    '</ul>' +
    '</li>' +
    '<li class="footerliyi common_db" style="width:24%;">' +
    '<div class="footererweimaimg"></div>' +
    '</li>' +
    '</ul>' +
    '<div class="footer_dizhik">' +
    '<p class="tcst">地址：河南郑州郑东新区金水东路东风南路绿地新都会六号楼12B</p>' +
    '<p class="tcst">河南云卡网络科技有限公司<a style="color: #d7d7d7;" href="http://www.yunkavip.com">www.yunkavip.com</a>版权所有   豫ICP备16011235号-1</p>' +
    '</div>' +
    '</div>' +
    '</div>';
