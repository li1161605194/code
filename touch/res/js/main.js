var dx=0,dy=0;
var textstyle="";
$(function() {
	//$("body").append(huanxingcaidan);
    //var isMenuIcon = true;
    //huanxingmenu();

    touch.on('.whbfb', 'touchstart', function(ev){
        $("#num").html("开始");
    });
    /*touch.on('.whbfb', 'swipeleft', function(ev){
        $("#num").html("←");
    });
    touch.on('.whbfb', 'swiperight', function(ev){
        $("#num").html("→");
    });
    touch.on('.whbfb', 'swipeup', function(ev){
        $("#num").html("↑");
    });
    touch.on('.whbfb', 'swipedown', function(ev){
        $("#num").html("↓");
    });
    touch.on('.whbfb', 'hold', function(ev){
        $("#num").html("长按");
    });
    touch.on('.whbfb', 'tap', function(ev){
        $("#num").html("单击");
    });
    touch.on('.whbfb', 'doubletap', function(ev){
        $("#num").html("双击");
    });*/
    touch.on('.whbfb', 'touchend', function(ev){
        $("#num").html("结束");
        ev.preventDefault();
    });

    touch.on('.touch_zimg', 'touchstart', function(ev){
        $("#num").html("开始");
        ev.startRotate();
        ev.preventDefault();
    });
    touch.on('.touch_zimg', 'rotate', function(ev){
        $("#num").html("旋转");
        var jd=ev.rotation;
        this.style.webkitTransform='rotate('+jd+'deg)';

    });

    /*var target=document.getElementsByClassName('touch_zimg');
    touch.on('.touch_zimg', 'drag', function(ev){
        $("#num").html("拖动");
        var lx=dx+ev.x+'px';
        var ly=dy+ev.y+'px';
        this.style.webkitTransform='translate3d('+lx+','+ly+',0)';
    });
    touch.on('.touch_zimg', 'dragend', function(ev){
        $("#num").html("拖动结束");
        dx+ev.x;
        dy+ev.y;
    });*/

})

function huanxingmenu(){
    if (isMenuIcon) {
        $('#menuIcon').show();
        $('#menuIcon .circle').show();
        var items = $('#menuIcon .menuItem');
        for (var i = 0, l = items.length; i < l; i++) {
            items[i].style.left = (50 - 35 * Math.cos(-0.5 * Math.PI + 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
            items[i].style.top = (50 + 35 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
        }
        $('#menuIcon').on('click', function(e) { $('#menuIcon').removeClass('masks');
            e.preventDefault();
            $('#menuIcon .circle').removeClass('open'); });
        $('#menuIcon .a,#menuIcon div').on('click', function(e) { stopBubble(e); })
        $('#menuIcon .center').on('click', function(e) {
            if ($('#menuIcon').hasClass('masks')) { $('#menuIcon').removeClass('masks'); } else { $('#menuIcon').addClass('masks'); }
            e.preventDefault();
            document.querySelector('#menuIcon .circle').classList.toggle('open');
        })
    }
}




function stopBubble(e) {
    // 如果传入了事件对象，那么就是非ie浏览器  
    if (e && e.stopPropagation) {
        //因此它支持W3C的stopPropagation()方法  
        e.stopPropagation();
    } else {
        //否则我们使用ie的方法来取消事件冒泡  
        window.event.cancelBubble = true;
    }
}

var huanxingcaidan='<div id="menuIcon" class="layout" style="">'+
        '<div class="circle">'+
            '<div class="ring">'+
                '<a href="index.html" class="menuItem fa fa-menu-home fa-2x"></a>'+
                '<a href="index.html" class="menuItem fa fa-menu-share fa-2x"></a>'+
                '<a href="index.html" class="menuItem fa fa-menu-search fa-2x"></a>'+
                '<a href="index.html" class="menuItem fa fa-menu-cart fa-2x"></a>'+
                '<a href="index.html" class="menuItem fa fa-menu-member fa-2x"></a>'+
                '<a href="index.html" class="menuItem fa fa-user fa-2x"></a>'+
                '<a href="index.html" class="menuItem fa fa-trash-o fa-2x"></a>'+
                '<a href="index.html" class="menuItem fa fa-star fa-2x"></a>'+
            '</div>'+
            '<a href="javascript:void(0)" class="center "></a>'+
        '</div>'+
    '</div>';
