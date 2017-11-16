(function ($) {
    $.fn.treeview = function (options) {
    	var $ele = $(this);
    	var defaults = {  
    		free:{
    			_listname: 'nodes',  
            	_labelname: 'text' 
    		},
    		icon: "glyphicon plus-square",
			selectedIcon: "glyphicon check-square-o",
			color: "#000000",
			backColor: "#FFFFFF",
			href: "#node-1",
			selectable: true,
			state: {
				checked: true,
				disabled: true,
				expanded: true,
				selected: true
			},
			tags: ['available']
        };  
        options = $.extend({}, defaults, options);  

        forlisttree = function(options){
	    	var data=options.data;
			if(!options.data){return ''}
		    var html='<ul class="treeul">';
		    for(var i=0;i<options.data.length;i++){
		        html+='<li class="yijili treeli"><span class="fa fa-minus-square treeico"></span><span class="fa fa-square-o treeico"></span>'+options.data[i][options.free.name];
		        if(getDom(options.data[i][options.free.listname])==""){}else{
			        html+=getDom(options.data[i][options.free.listname]);
			    }
		        html+='</li>';
		    };
		    html+='</ul>';
		    $ele.html(html);
	    },
	    getDom = function(data) {
		    if (!data) {return ''}
			if(data.length>0){
			    var html='<ul class="treeul">';
			    for(var i=0;i<data.length;i++){
			        html+='<li class="treeli"><span class="fa fa-minus-square treeico"></span><span class="fa fa-square-o treeico"></span>'+data[i][options.free.name];
			        if(getDom(data[i][options.free.listname])==""){}else{
				        html+=getDom(data[i][options.free.listname]);
				    }
			        html+='</li>';
			    };
			    html+='</ul>';
		    	return html;
			}else{
				return "";
			}
		}

		forlisttree(options);
	}; 
})(jQuery);


































