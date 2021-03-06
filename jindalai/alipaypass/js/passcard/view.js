// Generated by CoffeeScript PHP 1.3.1
(function () {
    var Collection, InfoUnit, Operation, OperationText, Pass, flipedClass, flipedProperty, scrollToShow, _ref,isAlipayVerify,
        __bind = function (fn, me) {
            return function () {
                return fn.apply(me, arguments);
            };
        };

    _ref = window.models, Pass = _ref.Pass, Collection = _ref.Collection, InfoUnit = _ref.InfoUnit, Operation = _ref.Operation, OperationText = _ref.OperationText;

    flipedClass = 'pass-fliped';

    flipedProperty = 'atBack';
    var qrcode = null;
    Pass.mixin({
        init: function () {
            this.showBack = ko.observable(false);
            this[flipedProperty] = this.showBack();
            this.initTooltip();
            return this.currentOperation = ko.observable(0);
        },
        className: function () {
            var type;
            type = (function () {
                switch (this.type()) {
                    case 'eventTicket':
                        return 'ticket';
                    case 'boardingPass':
                        return 'travel';
                    default:
                        return this.type();
                }
            }).call(this);
            return ("pass-type-" + type + " pass-type-" + type + "-" + (this.product())) + (this[flipedProperty] ? " " + flipedClass : '');
        },
		changePassView:function(){
			var className = this.className();
			$("#pass").removeClass(function(){
				var cls = $(this).attr("class").split(" ");
				var retCls = "";
				$.each(cls,function(i,n){
					if(n.indexOf("pass-type-") > -1){
						retCls += n + " ";
					}
				});
				return retCls;
			});
			$("#pass").addClass(className);
		},
        toggleFace: function () {
            return this.showBack(!this.showBack());
        },
        vScrollDependency: function () {
            this.locations.items();
            return this.backFields.items();
        },
		initTooltip:function(){
            var showEl = $("#pass [data-pass-range]"),
                tooltipEl = showEl.next(".tooltip");
            //初始化tooltip，并加入一些埋点
            if(tooltipEl.length == 0){
                showEl.tooltip("show").each(function(i){
                    var name = $(this).attr("data-pass-range");
                    $(this).next(".tooltip").attr('data-tooltip',"range").attr("href",name)
                    .find(".tooltip-inner").css({cursor:"pointer"});
                });
            }
			showEl.tooltip('hide');
        },
        submit: function () {
            html2canvas($(".pass-container"), {
                onrendered: function(canvas) {
                    document.body.appendChild(canvas);
                    $(canvas).attr("id",'temp');
                    var a=document.getElementById("temp");
                    var b=a.toDataURL();
                    $("body").append('<img style="display:none" src='+b+' />')
                }
            });
            var data = model.export(), data2 = {
                icon: data.icon,
                logo: data.logo,
                strip: data.strip,
                content: JSON.stringify(data.content)
            };
            for(i=0;i<data.content["evoucherInfo"]["operation"].length;i++){
                if(data.content["evoucherInfo"]["operation"][i].format=="qrcode"){
                    data.content["evoucherInfo"]["operation"][i].message="$"+data.content["evoucherInfo"]["operation"][i].message+"$";
                    data.content["evoucherInfo"]["operation"][i].altText="$"+data.content["evoucherInfo"]["operation"][i].altText+"$";
                }
                if(data.content["evoucherInfo"]["operation"][i].format=="barcode"){
                    data.content["evoucherInfo"]["operation"][i].message="$"+data.content["evoucherInfo"]["operation"][i].message+"$";
                    data.content["evoucherInfo"]["operation"][i].altText="$"+data.content["evoucherInfo"]["operation"][i].altText+"$";
                }
            }
            $("#card-json").val(JSON.stringify(data.content));
			var tempId = $("input[name=tempId]").val();
            //var url = '${base}/front/coupons_establish!save.action?jsonParam='+JSON.stringify(data.content);
            $.ajax({
                type:"post",
                url:"${base}/front/coupons_establish!save.action",
                data:{"jsonParam":JSON.stringify(data.content)},
                dataType:"json",
                success:function(res){
                    console.info(res);
                },
                error:function(status){
                    console.info(status);
                }
            });
            /*$.post(url, data2, function (data) {
                console.info(data);
            }, 'json');*/
        }
    });

    scrollToShow = function (elem, duration) {
        var eh, et, scrollTop, wh,wt;
        if (duration == null) {
            duration = 300;
        }
        if (!elem.length) {
            return;
        }
        /*wh = $(".main-container").innerHeight();
        eh = elem.outerHeight();*/
        et = elem[0].offsetTop;
		/*$('#edit').scrollTop(et);
        scrollTop = wh > eh ? et - (wh - eh) / 2 : et - wh;*/
        if (et > 0) {
            return $('#edit').animate({
                scrollTop: et
            }, duration);
        }
    };

    Collection.mixin({
        className: function () {
            return "items items-" + (this.items().length);
        },
        focusAdded: function (element) {
            return $(element).find('input:text').first().focus();
        },
        animateAdded: function (element, index, model) {
            var elem;
            if (model.sorting) {
                return;
            }
            elem = $(element);
            scrollToShow(elem, 300);
            return elem.hide().slideDown(300);
        },
        removeWithAnimation: function (element, index, model) {
            var elem;
            if (element.nodeType !== 1) {
                element.parentNode.removeChild(element);
                return;
            }
            elem = $(element);
            if (!(model instanceof OperationText)) {
                if (elem.is(':last-child:not(:first-child)')) {
                    scrollToShow(elem.prev(), 300);
                }
            }
            return elem.slideUp(300, function () {
                return elem.remove();
            });
        }
    });

    InfoUnit.mixin({
        className: function (index, collection) {
            var ret;
            ret = 'item';
            if (index === 0) {
                ret += ' item-first';
            }
            if (index + 1 === collection.items().length && index > 0) {
                ret += ' item-last';
            }
            return ret += " it-" + (this.type());
        }
    });
    Operation.mixin({
        init: function () {
            var _this = this;
            this.itemLabel = ko.computed(__bind(function () {
                switch (_this.format()) {
                    case 'text':
//            return _this.label();
                    default:
                        return _this.altText();
                }
            }, _this));
            this.itemContent = ko.computed(__bind(function () {
                if (_this.format() !== 'text') {
                    return _this.altText();
                }
            }, _this));
            this.itemQRCode = this.itemBarCode = ko.computed(__bind(function () {
                return _this.format() == 'qrcode' || _this.format() == 'barcode' ? _this.messageText() : '';
            }, _this));
        },
        className: function () {
            return "item op-" + (this.format());
        }
    });

}).call(this);
