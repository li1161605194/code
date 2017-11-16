$(function() {
    //$(".page").css("min-height",$("body").height()+"px");
    
    touch.on('.page', 'touchstart', function(ev){
        
    });
    touch.on('.page', 'swipeup', function(ev){
        pageUpDown.position.up($(this));
    });
    touch.on('.page', 'swipedown', function(ev){
        pageUpDown.position.down($(this));
    });
})

var pageUpDown={
    css3:{
        up:function(a){
            var _this=a;
            _this.removeClass("animated slideInUp");
            var page_dqnum=_this.data("page");
            var next_pagenum=page_dqnum=="4"?"1": parseInt(page_dqnum)+1;
            $(".page-"+next_pagenum).removeClass("hide");
            _this.addClass("animated slideOutUp");
            setTimeout(function(){
                _this.addClass("hide");
                _this.removeClass("animated slideOutUp");
                $(".page-"+next_pagenum).addClass("animated slideInUp");
            },1000);
        },
        down:function(a){
            var _this=a;
            _this.removeClass("animated slideInDown");
            var page_dqnum=_this.data("page");
            var next_pagenum=page_dqnum=="1"?"4": parseInt(page_dqnum)-1;
            _this.addClass("animated slideOutDown");
            setTimeout(function(){
                _this.addClass("hide");
                _this.removeClass("animated slideOutDown");
                $(".page-"+next_pagenum).removeClass("hide");
                $(".page-"+next_pagenum).addClass("animated slideInDown");
            },1000);
        }
    },
    position:{
        up:function(a){
            var _this=a;
            var dq_height=_this.height();
            var page_dqnum=_this.data("page");
            var next_pagenum=page_dqnum=="4"?"1": parseInt(page_dqnum)+1;
            var next_height=$(".page-"+next_pagenum).height();
            $(".page-"+next_pagenum).css("top",dq_height+"px");
            $(".page-"+next_pagenum).removeClass("hide");
            _this.animate({top: -dq_height+"px"},1000);
            $(".page-"+next_pagenum).animate({top: "0px"},1000);
            setTimeout(function(){
                _this.addClass("hide");
                _this.animate({top: "0px"});
            },1000);
        },
        down:function(a){
            var _this=a;
            var dq_height=_this.height();
            var page_dqnum=_this.data("page");
            var next_pagenum=page_dqnum=="1"?"4": parseInt(page_dqnum)-1;
            var next_height=$(".page-"+next_pagenum).height();
            $(".page-"+next_pagenum).css("top",-next_height+"px");
            $(".page-"+next_pagenum).removeClass("hide");
            _this.animate({top: next_height+"px"},1000);
            $(".page-"+next_pagenum).animate({top: "0px"},1000);
            setTimeout(function(){
                _this.addClass("hide");
                _this.animate({top: "0px"});
            },1000);
        }
    }
}

