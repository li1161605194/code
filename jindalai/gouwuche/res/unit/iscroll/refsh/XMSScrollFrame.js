/*
	//方法名，请按照字母排序
	//日期为最后修改日期
	//在PC端使用时，合并到项目的xmsCore中去。
	
	支持的方法：
	
	//xmsCore的调用方法：
	2016/03/02 xmsCore.xmsFrameInit
	
 */

(function(window){
	
 window.xmsCore = {};
 xmsCore = window.xmsCore;
 
    if(!$.fn.extend){
        //Zepto中，$.fn中没有extend方法，这里进行重定义
        //做一层代理
        $.fn.extend = function(obj){
            $.extend($.fn,obj);
        };
	}
	//Zepto中，没有outerWidth和outerHeight
	$.fn.extend({
        outerWidth:function(){
            //计算添加了margin的width。
            // Zepto: width() = width + padding
            // jQuery: width() = width
            // jQuery: outerWidth() = width + padding
            var obj = $(this).eq(0);
            
            return obj.width()+parseInt(obj.css("margin-left"))+parseInt(obj.css("margin-right"));
        },
        outerHeight:function(){
            var obj = $(this).eq(0);
            
            return obj.height()+parseInt(obj.css("margin-top"))+parseInt(obj.css("margin-bottom"));
        }
    });
	
	//xmsFrameInit用于初始化页面的显示区域
	//该方法，需要支持固定的页面结构。
	function xmsFrameInit(){
        /**
            * 该方法，是在固定结构的情况下，进行的初始化，
            * 所以，不需要传入其他的额外参数
		*/
 
        var header = $(".frame-header"),
            indicator = $(".frame-indicator"),
            content = $(".frame-content"),
            footer = $(".frame-footer"),
            top = header.outerHeight() + indicator.outerHeight(),
            bottom = footer.outerHeight(),
            height = 0;
 
        content.css({
             top : top,
             bottom : bottom
             });
 
        height = content.height();
 
        //设置子元素的最低高度
        content.children().eq(0).css({
            "min-height":(height+1)
        });
 
        //如果不这么设置，那么在弹出键盘时
        //在一些浏览器中，会把footer部分，
        //顶到键盘上面去，所以~~
        footer.css({
            top :top + height
        });
 
	}
	xmsCore.xmsFrameInit = xmsFrameInit;
	
	//XMSScrollFrame下拉刷新功能和到底部加载
	//单个页面，只能初始化一次。
	function XMSScrollFrame(scrollId,options){
        /**
            * options为初始化IScroll时所使用的参数对象
            * 基于iScroll v5.1.3，参数请参考：http://iscrolljs.com/
            * 也可以参考本地文件：readme/iscroll5-API
  
            * options扩展了四个属性，其他都是IScroll自带的属性
            * downFn:function(){},
                //downFn为下拉触发时，执行的回调。
            * upFn:function(){},
                //upFn为上拉触发时，执行的回调。
            * downStatus : true,
            下拉刷新是否开启，开启之后，
            下拉时，才会执行下拉刷新
            默认开启
            * upStatus : true,
            上拉刷新是否开启
            默认开启
		*/
 
        //开始错误判断
        if(!scrollId || !options || ( typeof options != "object")){
            throw new TypeError("在初始化XMSScrollFrame时，传入的参数有误，请确认！");
        }
 
        //必须要使用new关键字
        if(!(this instanceof XMSScrollFrame)){
            return new XMSScrollFrame(scrollId,options);
        }
 
        //一个页面，下拉刷新的初始化，只能使用一次，所以
        //如果发现初始化两次的情况，直接处理掉。
        if(XMSScrollFrame.instanced === true){
            throw new TypeError("XMSScrollFrame方法，在每个页面，只会被初始化一次，请确认！");
        }
 
        //初始一些参数，该参数，会用于IScroll的初始化
        this.initOption(options);
 
        var myScroll = new IScroll(scrollId, options);
 
        //容器
        this.wrapper = $(myScroll.wrapper);
        //把myScroll实例，保存到本实例的myScroll属性中去。
        this.myScroll = myScroll;
 
        //加载初始化事件处理机制
        this.initEvent(myScroll);
 
        //加载是否，显示上拉下拉模块的显示
        //关闭或者打开上拉或者下拉功能的初始化
        this.downSwitch(options.downStatus);
        this.upSwitch(options.upStatus);
 
        //把一个静态属性置为true，表示该方法，已经被实例化，
        //该实例，每个页面只能实例化一次
        XMSScrollFrame.instanced = true;
 
	}
	
	//初始化一些信息
	XMSScrollFrame.prototype.initOption = function(options){
        //初始化一些默认的数据
 
        options.probeType = 3;
        options.bounce = true;
 
        if(options.downStatus === false){
            options.downStatus = false;
        }else{
            options.downStatus = true;
        }
 
        if(options.upStatus === false){
            options.upStatus = false;
        }else{
            options.upStatus = true;
        }
 
	};
	
	XMSScrollFrame.prototype.initEvent = function(myScroll){
 
        //加载下拉刷新的模块
        this.slideDown(myScroll);
 
        //加载上拉刷新的模块
        this.slideUp(myScroll);
 
	};
	
	XMSScrollFrame.prototype.slideDown = function(myScroll){
 
        var wrapper = this.wrapper,
            options = myScroll.options,
            loadClass = "frame-scroll-load",
            loaddingClass = "frame-scroll-loadding",
            downDiv = wrapper.find(".frame-scroll-down-ele"),
            downFn = options.downFn,
            isLoadding = "",
            divHeight = 0,
            defaultCSS = null,
            loaddingCSS = null,
            that = this;
 
        //如果没有找到对应的下拉的元素，那么就...
        if(!downDiv.size()){
            return false;
        }
 
        //保存该DIV
        this.downDiv = downDiv;
 
        divHeight = downDiv.outerHeight();
        defaultCSS = {
            "top":(0-divHeight)+"px",
            "position":"absolute"
        };
        loaddingCSS = {
            "position":"relative",
            "top":"0"
        };
 
        downDiv.css(defaultCSS);
 
        //设置一个观察者，供外部加载成功之后，调用该方法
        downDiv.on("slideSucc",_slideSucc);
        function _slideSucc(){
            downDiv.removeClass(loaddingClass).css(defaultCSS);
            myScroll.refresh();
        }
 
        //当正在处于滚动状态时
        myScroll.on("scroll",_scroll);
        function _scroll(){
            var y = this.y,
                load = false;
 
            //如果为正在加载状态，则不再执行下面的动作。
            //并且在scrollEnd时，再次归为该值。
            if(isLoadding){
                return false;
            }
 
            load = downDiv.hasClass(loadClass);
 
            if(y >= divHeight){
                !load && downDiv.addClass(loadClass);
                return "";
            }else if(y < divHeight && y > 0){
                load && downDiv.removeClass(loadClass);
                return "";
            }
        }
 
        //当可能触发了下拉刷新时的回调处理
        myScroll.on("slideDown",_slideDown);
        function _slideDown(){
            var y = this.y;
 
            //如果正在loadding，那么不做其他的处理
            if(isLoadding || false === options.downStatus || !downDiv.hasClass(loadClass) || downDiv.hasClass(loaddingClass)){
                return "";
            }
 
            if( y > divHeight ){
                isLoadding = "down";
 
                downDiv.removeClass(loadClass).addClass(loaddingClass);
 
                this.scrollTo(0,y-divHeight,1,{fn:function(){
                    downDiv.css(loaddingCSS);
                    return 1;
                }});
 
                if(typeof downFn == "function"){
                    downFn.call(that,downDiv);
                }
 
            }
        }
 
        //当滚动停止时
        myScroll.on("scrollEnd",_scrollEnd);
        function _scrollEnd(){
            if(isLoadding){
                myScroll.refresh();
                isLoadding = "";
            }
            //当end执行时，表示已经不需要该属性了
        }
 
	};
	
	XMSScrollFrame.prototype.slideUp = function(myScroll,upObj){
 
        var wrapper = this.wrapper,
            options = myScroll.options,
            loadClass = "frame-scroll-load",
            loaddingClass = "frame-scroll-loadding",
            upDiv = wrapper.find(".frame-scroll-up-ele"),
            upFn = options.upFn,
            isLoadding = "",
            divHeight = 0,
            defaultCSS = null,
            loaddingCSS = null,
            that = this;
 
        if(!upDiv.size()){
            return false;
        }
 
        this.upDiv = upDiv;
        divHeight = upDiv.outerHeight();
        defaultCSS = {
            "bottom":(0-divHeight)+"px",
            "position":"absolute"
        };
        loaddingCSS = {
            "position":"relative",
            "bottom":"0"
        };
 
        upDiv.css(defaultCSS);
 
        //设置一个观察者，供外部加载成功之后，调用该方法
        upDiv.on("slideSucc",_slideSucc);
        function _slideSucc(){
            upDiv.removeClass(loaddingClass).css(defaultCSS);
            myScroll.refresh();
            isLoadding = "";
        }
 
        myScroll.on("scroll",_scroll);
        function _scroll(){
            var maxY = this.maxScrollY - this.y,
                load = upDiv.hasClass(loadClass);
 
            //如果为正在加载状态，则不再执行下面的动作。
            //并且在scrollEnd时，再次归为该值。
 
            if(isLoadding){
                return false;
            }
 
            if(maxY >= divHeight){
                !load && upDiv.addClass(loadClass);
                return "";
            }else if(maxY < divHeight && maxY >=0){
                load && upDiv.removeClass(loadClass);
                return "";
            }
        }
 
        myScroll.on("slideUp",_slideUp);
        function _slideUp(){
            var y = this.y,
                maxY = this.maxScrollY;
 
            //如果正在loadding，那么不做其他的处理
            if(isLoadding || false === options.upStatus || !upDiv.hasClass(loadClass) || upDiv.hasClass(loaddingClass)){
                return "";
            }
 
            if( maxY - y > divHeight ){
 
                //更改className
                isLoadding = "up";
                upDiv.removeClass(loadClass).addClass(loaddingClass).css(loaddingCSS);
                this.scrollTo(0, this.maxScrollY-divHeight, options.bounceTime, options.bounceEasing);
 
                if(typeof upFn == "function"){
                    upFn.call(that,upDiv);
                }
            }
        }
 
        myScroll.on("scrollEnd",_scrollEnd);
        function _scrollEnd(){
            if(isLoadding){
                myScroll.refresh();
                isLoadding = "";
            }
            //当end执行时，表示已经不需要该属性了
        }
 
	};
	
	XMSScrollFrame.prototype.downSwitch = function(status){
        var options = this.myScroll.options,
            downDiv = this.downDiv;
 
        if(status === false){
            options.downStatus = false;
        }else{
            options.downStatus = true;
        }
 
        //对下拉的模块，做显示隐藏
        if(downDiv){
            if(status === false){
                downDiv.hide();
            }else{
                //downDiv.show();
            }
        }
	};
	
	XMSScrollFrame.prototype.upSwitch = function(status){
        var options = this.myScroll.options,
            upDiv = this.upDiv || "";
 
        if(status === false){
            options.upStatus = false;
        }else{
            options.upStatus = true;
        }
 
        //对上拉的模块，做显示隐藏
        if(upDiv){
            if(status === false){
                upDiv.hide();
            }else{
                //upDiv.show();
            }
        }
 
	};
	
	//当下拉或者上拉去load新的信息，会有一个特殊的样式
	//当load信息完成后，要恢复原来的样式，
	//那么使用，下面方法，恢复一下
	XMSScrollFrame.prototype.downSucc = function(){
        var downDiv = this.downDiv || "";
        if(downDiv){
            downDiv.trigger("slideSucc");
        }
	};
	
	//上拉，加载成功之后，触发该方法。
	XMSScrollFrame.prototype.upSucc = function(){
        var upDiv = this.upDiv || "";
        if(upDiv){
            upDiv.trigger("slideSucc");
        }
	};
	
	xmsCore.XMSScrollFrame = XMSScrollFrame;
	
	
 })(window);