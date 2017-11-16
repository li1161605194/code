(function($){
	var carst={
		option:{
			previd:0,
			nowid:0,
			nextid:1
		},
		submit_answer:function(a){
			var x,y,z;
			if(a.previd==""){
				x=$("#"+a.nowid);
				y=$("#"+a.nextid);
			}else{
				x=$("#"+a.nowid);
				y=$("#"+a.nextid);
				z=$("#"+a.previd);
			}
			var user_answer="";
			var real_answer=x.find(".wentidaan").val();
			var type=x.attr("st_type");
			if(type=="xuanze"){
				for(i=0;i<x.find(".jztk_xzbox").size();i++){
					var a=x.find(".jztk_xzbox").eq(i).attr("answer");
					user_answer+=a;
				}
			}else if(type=="duicuo"){
				for(i=0;i<x.find(".jztk_pdbox").size();i++){
					var a=x.find(".jztk_pdbox").eq(i).attr("answer");
					user_answer+=a;
				}
			}
			if(user_answer==""){
				actionNotice({"msg":"您未选择答案"});
			}else{
				x.attr("dt_type","yi");
				x.find('.submitanswer').attr("style","display:none;");
				if(user_answer==real_answer){
					x.attr("dc","dui");
					actionNotice({"msg":"o(≧v≦)o~~好棒!"});
					x.find(".jztk_jieguo").attr("style","");
					x.find(".jztk_jieshi").attr("style","");
					$(".changeshiti").attr("style","");
				}else if(user_answer!=real_answer){
					x.attr("dc","cuo");
					actionNotice({"msg":"答错了~~~"});
					x.find(".jztk_jieguo").attr("style","");
					x.find(".jztk_jieshi").attr("style","");
					$(".changeshiti").attr("style","");
				}
				
			}
		},
		shangyiti:function(){
			$(".peve").off("click").click(function(){
				var x=$("#"+carst.option.nowid);
				var z=$("#"+carst.option.previd);
				var nownum=parseInt(x.attr("initnum"));
				$.car_questions_init(nownum-2<0?"":nownum-2,nownum-1,nownum);
				x.attr("style","display:none;");
				z.attr("style","");
			});
		},
		xiayiti:function(){
			$(".next").off("click").click(function(){
				var x=$("#"+carst.option.nowid);
				var y=$("#"+carst.option.nextid);
				var nownum=parseInt(x.attr("initnum"));
				$.car_questions_init(nownum,nownum+1,nownum+2);
				x.attr("style","display:none;");
				y.attr("style","");
			});
		},
		xuanzebox:function(b){
			$(".xuanxk").off().on("click",function(){
				var id=$("#"+$("div.jztk_kt_common[initnum='"+b+"']").attr("id"));
				if(id.attr("dt_type")=="yi"){

				}else{
					var _this=$(this).find('.jztk_xzbox');
					if(_this.attr("answer")==undefined||_this.attr("answer")==null||_this.attr("answer")==""){
						_this.attr('answer',_this.data("jg"));
						_this.addClass('fa-check-square-o');
						_this.removeClass('fa-square-o');
					}else{
						_this.attr('answer','');
						_this.addClass('fa-square-o');
						_this.removeClass('fa-check-square-o');
					}
				}
			});
		},
		panduanbox:function(b){
			$(".duicuok").off().on("click",function(){
				var id=$("#"+$("div.jztk_kt_common[initnum='"+b+"']").attr("id"));
				if(id.attr("dt_type")=="yi"){

				}else{
					var _this=$(this).find('.jztk_pdbox');
					if(_this.attr("answer")==undefined||_this.attr("answer")==null||_this.attr("answer")==""){
						$(".jztk_pdbox").attr('answer','');
						_this.attr('answer',_this.data("jg"));
						$(".jztk_pdbox").removeClass('fa-circle-o');
						$(".jztk_pdbox").removeClass('fa-dot-circle-o');
						$(".jztk_pdbox").addClass('fa-circle-o');
						_this.removeClass('fa-circle-o');
						_this.addClass('fa-dot-circle-o');
					}else{
						$(".jztk_pdbox").attr('answer','');
						$(".jztk_pdbox").removeClass('fa-circle-o');
						$(".jztk_pdbox").removeClass('fa-dot-circle-o');
						$(".jztk_pdbox").addClass('fa-circle-o');
					}
				}
			});
		},
		init:function(a,b,c){
			if(a===""){
				carst.option.previd='';
				carst.option.nowid=$("div.jztk_kt_common[initnum='"+b+"']").attr("id");
				carst.option.nextid=$('.jztk_kt_common[initnum='+c+']').attr("id");
			}else{
				carst.option.previd=$('.jztk_kt_common[initnum='+a+']').attr("id");
				carst.option.nowid=$('.jztk_kt_common[initnum='+b+']').attr("id");
				carst.option.nextid=$('.jztk_kt_common[initnum='+c+']').attr("id");
			}
			var x,y,z;
			if(a===""){
				x=$("#"+carst.option.nowid);
				y=$("#"+carst.option.nextid);
				var x_dt_type=x.attr("dt_type");
				var y_dt_type=y.attr("dt_type");
				if(x_dt_type=="wei"){
					x.find('.submitanswer').attr("style","");
					$(".changeshiti").attr("style","display:none;");
				}else{
					x.find('.submitanswer').attr("style","display:none;");
					$(".changeshiti").attr("style","");
				}
			}else{
				x=$("#"+carst.option.nowid);
				y=$("#"+carst.option.nextid);
				z=$("#"+carst.option.previd);
				var x_dt_type=x.attr("dt_type");
				var y_dt_type=y.attr("dt_type");
				var z_dt_type=z.attr("dt_type");
				if(x_dt_type=="wei"){
					x.find('.submitanswer').attr("style","");
					$(".changeshiti").attr("style","display:none;");
				}else{
					x.find('.submitanswer').attr("style","display:none;");
					$(".changeshiti").attr("style","");
				}
			}
			var num= parseInt(x.index());
			var nownum=parseInt(x.attr("initnum"));
			if(num==0){
				$("a.peve").attr("style","display:none;");
			}else{
				$("a.peve").attr("style","");
				carst.shangyiti();
			}
			carst.xiayiti();
			$(".submitanswer").off().on("click",function(){
				carst.submit_answer(carst.option);
			});
		}
	}
	$.extend({
		car_questions_init:function(a,b,c){
			carst.init(a,b,c);
			carst.xuanzebox(b);
			carst.panduanbox(b);
		}
	});
})(jQuery); 
