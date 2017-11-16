$(function() {
    /*var pageIndex = 1,
        pageTotal = $('.page').length,
        towards = { up: 1, right: 2, down: 3, left: 4 },
        isAnimating = false,
        pagenum = 7; 
    document.addEventListener('touchmove', function(event) {
        event.preventDefault();
    }, false);
    touch.on($(document), 'swipeup', function(ev) {
        if (isAnimating) return;
        if (pageIndex < pageTotal) {
            pageIndex += 1;
        } else {
            pageIndex = 1;
        };
        pageMove(towards.up);
    });
    touch.on($(document), 'swipedown', function(ev) {
        if (isAnimating) return;
        if (pageIndex > 1) {
            pageIndex -= 1;
        } else {
            pageIndex = pageTotal;
        };
        pageMove(towards.down);
    });
    function pageMove(tw) {
        var lastPage;
    if(tw=='1'){
        if(pageIndex==1){
            lastPage = ".page-"+pageTotal;
        }else{
            lastPage = ".page-"+(pageIndex-1);
        }
        
    }else if(tw=='3'){
        if(pageIndex==pageTotal){
            lastPage = ".page-1";
        }else{
            lastPage = ".page-"+(pageIndex+1);
        }
        
    }

    var nowPage = ".page-"+pageIndex;
    
    switch(tw) {
        case towards.up:
            outClass = 'pt-page-moveToTop';
            inClass = 'pt-page-moveFromBottom';
            break;
        case towards.down:
            outClass = 'pt-page-moveToBottom';
            inClass = 'pt-page-moveFromTop';
            break;
    }
    isAnimating = true;
    
    $(nowPage).removeClass("hide");
    $(lastPage).addClass(outClass);
    $(nowPage).addClass(inClass);
    if(pageIndex==pagenum)
    {
        $(".pt-page-moveIconUp").hide();
    }
    else
    {
        $(".pt-page-moveIconUp").show();
    }
    setTimeout(function(){

        $(lastPage).removeClass('page-current');
        $(lastPage).removeClass(outClass);
        $(lastPage).addClass("hide");
        $(nowPage).addClass('page-current');
        $(nowPage).removeClass(inClass);

        isAnimating = false;
    },600);
    }*/
    $(".bfb").height($(".bfb").width()*3/4);
    //$(".h100bfb").height(window.innerHeight);
    $(".h100bfb").css("min-height",window.innerHeight+"px");
});


