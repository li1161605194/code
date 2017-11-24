// Generated by CoffeeScript PHP 1.3.1
(function () {
    var AppData, Base, Collection, InfoUnit, Location, Operation, OperationText,OperationImg, Pass, _super, _super1, _super2, _super3, _super4, _super5, _super6,_super7
        __extends = function (child, parent) {
            for (var key in parent) {
                if ({}.hasOwnProperty.call(parent, key)) child[key] = parent[key];
            }
            function ctor() {
                this.constructor = child;
            }

            ctor.prototype = parent.prototype;
            child.prototype = new ctor;
            child.__super__ = parent.prototype;
            return child;
        },
        __bind = function (fn, me) {
            return function () {
                return fn.apply(me, arguments);
            };
        };

    Base = (function () {

        Base.name = 'Base';

        Base.mixin = function (props) {
            var array, initFn, key, val;
            initFn = false;
            for (key in props) {
                val = props[key];
                if (key !== 'init') {
                    this.prototype[key] = val;
                } else {
                    initFn = val;
                }
            }
            if (initFn) {
                array = this.initializers || (this.initializers = []);
                return array.push(initFn);
            }
        };

        function Base() {
            var fn, _i, _len, _ref;
            if (typeof this.init === "function") {
                this.init.apply(this, arguments);
            }
            _ref = this.constructor.initializers || [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                fn = _ref[_i];
                fn.apply(this, arguments);
            }
        }

        return Base;

    })();

    Pass = (function (_super) {

        __extends(Pass, _super);

        Pass.name = 'Pass';

        function Pass() {
            return Pass.__super__.constructor.apply(this, arguments);
        }

        Pass.prototype.init = function (data) {
            var ainfo, einfo, info,fileInfo,merchant,platform,isAlipayVerify;
            info = data.content.evoucherInfo;
            einfo = info.einfo;
            ainfo = data.content.appInfo || {};
			fileInfo = data.content.fileInfo;
			merchant = data.content.merchant;
			platform = data.content.platform;
            this.type = ko.observable(info.type);
            this.product = ko.observable(info.product);
            this.startDate = ko.observable(info.startDate);
            this.endDate = ko.observable(info.endDate);
            this.logo = ko.observable(data.logo || '');
            this.strip = ko.observable(data.strip || '');
            this.icon = ko.observable(data.icon || '');
            this.logoText = ko.observable(einfo.logoText);
			this.title = ko.observable(einfo.logoText);
            this.secondLogoText = ko.observable(einfo.secondLogoText);
            this.backgroundColor = ko.observable(data.content.style.backgroundColor || '');
			this.canShare = ko.observable(fileInfo.canShare);
			this.minfo = ko.observable(merchant.minfo);
			this.mname = ko.observable(merchant.mname);
			this.mtel = ko.observable(merchant.mtel);
			this.webServiceUrl = ko.observable(platform.webServiceUrl);
			this.alipayVerify = ko.observableArray(data.content.alipayVerify || []);
			if(this.alipayVerify().length){
				isAlipayVerify = "true"
			}else{
				isAlipayVerify = "false";
			}
			// 赠送ta人使用
			this.canPresent = ko.observable((fileInfo.canPresent==undefined)?true:fileInfo.canPresent);
            // 支持打车功能
            this.supportTaxi = ko.observable((fileInfo.supportTaxi==undefined)?true:fileInfo.supportTaxi);
            this.taxiSchemaUrl = ko.observable(fileInfo.taxiSchemaUrl || '');
			 
			this.isAlipayVerify = ko.observable(isAlipayVerify);
            this.headFields = new Collection(InfoUnit, einfo.headFields, 1);
            this.primaryFields = new Collection(InfoUnit, einfo.primaryFields, 2);
            this.secondaryFields = new Collection(InfoUnit, einfo.secondaryFields, 4);
            this.auxiliaryFields = new Collection(InfoUnit, einfo.auxiliaryFields, 4);
            this.backFields = new Collection(InfoUnit, einfo.backFields);
            this.operation = new Collection(Operation, info.operation, 4);
            this.locations = new Collection(Location, info.locations);
            this.appName = ko.observable(ainfo.label || '');
            this.appInfo = ko.observable(ainfo.message || '');
            this.appData = new AppData(ainfo.app || {});
            this.data = data;
            return this.data = this.export();
        };

        Pass.prototype["export"] = function () {
            var ainfo, data, einfo, info;
            data = $.extend(true, {}, this.data);
            info = data.content.evoucherInfo;
            einfo = info.einfo;
            ainfo = data.content.appInfo || {};
            info.type = this.type();
            info.product = this.product();
            info.startDate = this.startDate();
            info.endDate = this.endDate();
            data.logo = this.logo();
            data.strip = this.strip();
            data.icon = this.icon();
            einfo.logoText = this.logoText();
			info.title = einfo.logoText; //todo 这里影响了业务，后续去掉。
            einfo.secondLogoText = this.secondLogoText();
            data.content.style.backgroundColor = this.backgroundColor();
			data.content.fileInfo.canShare = this.canShare();
			data.content.merchant.minfo = this.minfo();
			data.content.merchant.mname = this.mname();
			data.content.merchant.mtel = this.mtel();
			data.content.platform.webServiceUrl = this.webServiceUrl();
			data.content.alipayVerify = (function(pass){
				//自由定制时，返回空数组
				if(pass.isAlipayVerify() == "false"){
					return [];
				}
				return pass.alipayVerify();
			})(this);
			
			// 赠送ta人使用
			data.content.fileInfo.canPresent = this.canPresent();

            // 支持打车功能
            data.content.fileInfo.supportTaxi = this.supportTaxi();
            data.content.fileInfo.taxiSchemaUrl = this.taxiSchemaUrl();
			
            einfo.headFields = this.headFields["export"]();
            einfo.primaryFields = this.primaryFields["export"]();
            einfo.secondaryFields = this.secondaryFields["export"]();
            einfo.auxiliaryFields = this.auxiliaryFields["export"]();
            einfo.backFields = this.backFields["export"]();
            info.operation = this.operation["export"]();
            info.locations = this.locations["export"]();
            ainfo.label = this.appName();
            ainfo.message = this.appInfo();
            ainfo.app = this.appData["export"]();
            return data;
        };

        Pass.prototype.changed = function () {
            var different;
            different = function (a, b, p) {
                var i, k;
                if ($.type(a) !== $.type(b)) {
                    return true;
                }
                if ($.isArray(a)) {
                    if (a.length !== b.length) {
                        return true;
                    }
                    i = a.length;
                    while (!(--i < 0)) {
                        if (different(a[i], b[i], p.concat([i]))) {
                            return true;
                        }
                    }
                } else if ($.isPlainObject(a)) {
                    for (k in a) {
                        if (different(a[k], b[k], p.concat([k]))) {
                            return true;
                        }
                    }
                } else if (a !== b && p.join('.') !== 'content.evoucherInfo.type') {
                    return true;
                }
                return false;
            };
            return different(this.data, this["export"](), []);
        };

        return Pass;

    })(Base);

    Collection = (function (_super1) {

        __extends(Collection, _super1);

        Collection.name = 'Collection';

        function Collection() {
            return Collection.__super__.constructor.apply(this, arguments);
        }

        Collection.prototype.init = function (klass, array, limit) {
            var data,
                _this = this;
            if (array == null) {
                array = [];
            }
            if (limit == null) {
                limit = Infinity;
            }
            this.items = ko.observableArray((function () {
                var _i, _len, _results;
                _results = [];
                for (_i = 0, _len = array.length; _i < _len; _i++) {
                    data = array[_i];
                    _results.push(new klass(data));
                }
                return _results;
            })());
            this.limit = limit;
            this.append = __bind(function (tp) {
                return _this.items.push(new klass(tp || {}));
            }, _this);
            this.insert = __bind(function (ref) {
                var idx;
                idx = _this.items.indexOf(ref);
                return _this.items.splice(idx + 1, 0, new klass({}));
            }, _this);
            return this.remove = __bind(function (obj) {
                return _this.items.remove(obj);
            }, _this);
        };

        Collection.prototype["export"] = function () {
            var item, _i, _len, _ref, _results;
            _ref = this.items();
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                item = _ref[_i];
                _results.push(item["export"]());
            }
            return _results;
        };

        return Collection;

    })(Base);

    InfoUnit = (function (_super2) {

        __extends(InfoUnit, _super2);

        InfoUnit.name = 'InfoUnit';

        function InfoUnit() {
            return InfoUnit.__super__.constructor.apply(this, arguments);
        }

        InfoUnit.prototype.init = function (data) {
            this.key = ko.observable(data.key || '');
            this.value = ko.observable(data.value || '');
            this.label = ko.observable(data.label || '');
            return this.type = ko.observable(data.type || 'text');
        };

        InfoUnit.prototype["export"] = function () {
            return {
                key: this.key(),
                value: this.value(),
                label: this.label(),
                type: this.type()
            };
        };

        return InfoUnit;

    })(Base);

    Operation = (function (_super3) {

        __extends(Operation, _super3);

        Operation.name = 'Operation';

        function Operation() {
            return Operation.__super__.constructor.apply(this, arguments);
        }

        Operation.prototype.init = function (data) {
            var array, dict, text,messageImg,defaultFormat;
            this.messageEncoding = ko.observable(data.messageEncoding || 'utf-8');
            this.format = ko.observable(data.format || '');
            this.altText = ko.observable(data.altText || '');
			//文字核销
            array = [];
            if (data.format === 'text') {
                array = data.message;
            }
            if (!array.length) {
                array.push({});
            }
            this.messageArray = new Collection(OperationText, array);
			//启动应用
            dict = {};
            if (data.format === 'app') {
                dict = data.message || {};
            }
            this.messageDict = new AppData(dict);
			//图片核销
			messageImg = {};
			if(data.format === 'img'){
				messageImg = data.message || {};
			}
			this.messageImg = new OperationImg(messageImg);
			text = '';
			//其他核销
            if (data.format !== 'text' && data.format !== 'app' && data.format !== 'img') {
                text = data.message || '';
            }
            return this.messageText = ko.observable(text);
        };

        Operation.prototype["export"] = function () {
            return {
                message: (function () {
                    switch (this.format()) {
                        case 'text':
                            return this.messageArray["export"]();
                        case 'app':
                            return this.messageDict["export"]();
						case 'img':
							return this.messageImg["export"]();
                        default:
                            return this.messageText();
                    }
                }).call(this),
                messageEncoding: this.messageEncoding(),
                format: this.format(),
                altText: this.altText()
//      ,label: this.label()
            };
        };

        return Operation;

    })(Base);

    OperationText = (function (_super4) {

        __extends(OperationText, _super4);

        OperationText.name = 'OperationText';

        function OperationText() {
            return OperationText.__super__.constructor.apply(this, arguments);
        }

        OperationText.prototype.init = function (data) {
            this.label = ko.observable(data.label || '');
            return this.value = ko.observable(data.value || '');
        };

        OperationText.prototype["export"] = function () {
            return {
                label: this.label(),
                value: this.value()
            };
        };

        return OperationText;

    })(Base);

    AppData = (function (_super5) {
        var defaults;

        __extends(AppData, _super5);

        AppData.name = 'AppData';

        function AppData() {
            return AppData.__super__.constructor.apply(this, arguments);
        }

        defaults = {
            android_appid: '',
            android_launch: '',
            android_download: '',
            ios_appid: '',
            ios_launch: '',
            ios_download: ''
        };

        AppData.prototype.init = function (data) {
            var key, val, _results;
            _results = [];
            for (key in defaults) {
                val = defaults[key];
                _results.push(this[key] = ko.observable(data[key] || val));
            }
            return _results;
        };

        AppData.prototype["export"] = function () {
            var key, ret, val;
            ret = {};
            for (key in defaults) {
                val = defaults[key];
                ret[key] = this[key]();
            }
            return ret;
        };

        return AppData;

    })(Base);

    Location = (function (_super6) {
        var defaults;

        __extends(Location, _super6);

        Location.name = 'Location';

        defaults = {
            altitude: '',
            longitude: '',
            latitude: '',
            tel: '',
            addr: '',
            relevantText: ''
        };

        function Location(data) {
            var key, val;
            for (key in defaults) {
                val = defaults[key];
                this[key] = ko.observable(data[key] || val);
            }
        }

        Location.prototype["export"] = function () {
            var key, ret, val;
            ret = {};
            for (key in defaults) {
                val = defaults[key];
                ret[key] = this[key]();
            }
            return ret;
        };

        return Location;

    })(Base);

	OperationImg = (function (_super5) {
		var defaults;

		__extends(OperationImg, _super5);

		OperationImg.name = 'OperationImg';

		function OperationImg() {
			return OperationImg.__super__.constructor.apply(this, arguments);
		}

		defaults = {
			img: '',
			target: ''
		};

		OperationImg.prototype.init = function (data) {
			var key, val, _results;
			_results = [];
			for (key in defaults) {
				val = defaults[key];
				_results.push(this[key] = ko.observable(data[key] || val));
			}
			return _results;
		};

		OperationImg.prototype["export"] = function () {
			var key, ret, val;
			ret = {};
			for (key in defaults) {
				val = defaults[key];
				ret[key] = this[key]();
			}
			return ret;
		};

		return OperationImg;

	})(Base);

    window.models = {
        Collection: Collection,
        InfoUnit: InfoUnit,
        Operation: Operation,
        OperationText: OperationText,
        AppData: AppData,
        Location: Location,
        Pass: Pass
    };

}).call(this);
