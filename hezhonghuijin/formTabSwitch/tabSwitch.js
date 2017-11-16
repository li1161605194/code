(function() {
    var $, _this, _TabSwitch, _options, _geZhongCaoZuo, maxNum, minNum = 0,
        nowEqNum, tabClass, tabS_sptab, formW;
    $ = jQuery;
    $.fn.extend({
        tabSwitch: function(options) {
            _this = $(this);
            return new TabSwitch(_this, options, 1).init(options)
        },
        tabSwitchNext: function(options) {
            return _TabSwitch.next();
        },
        tabSwitchPrev: function(options) {
            return _TabSwitch.prev();
        },
        tabSwitchShow: function(showNum) {
            return _TabSwitch._show(showNum);
        },
        getTabSwitchShowIndex: function(showNum) {
            return _TabSwitch._getTabSwitchShowIndex(showNum);
        }
    });
    TabSwitch = (function(_this, options, type) {
        _TabSwitch = this;
        _commonProcessingMethod = commonProcessingMethod;
        TabSwitch.prototype.init = function(options) {
            $("head").append('<style type="text/css">' +
                'div.tabSwitchChoice{width:100%;margin: 20px 0px; clean:both;}' +
                'span.tabS_sptab{display:inline-block;margin-right:20px;border-radius: 4px;background-color: #ccc;color: #fff;padding:5px 0px 5px 10px;font-size:14px;cursor: pointer;}' +
                'span.tabS_sptab.xuanz,span.tabS_sptab:hover{background-color: #1AB394;}' +
                'div.tabOperation{width:100%;clean:both;overflow: hidden;}' +
                'span.operationsp{display:inline-block; float: right; width:80px; margin-right:20px;border-radius: 4px;color: #fff;padding:5px 10px; text-align: center;font-size:14px;cursor: pointer;background-color: #1AB394;}' +
                '</style>');
            _options = {

            };
            if (typeof(options) == "object" && options && options != null && options != undefined) {
                _options.className = options.className || "tabSwitchTag";
                _options.tabNum = options.tabNum || 1;
                _options.tabDiVId = options.tabDiVId || "tabSwitchChoice";
                _options.tabName = options.tabName || [];
                _options.showTabChoiceSpan = options.showTabChoiceSpan || false;
                _options.tabChoiceClick = options.tabChoiceClick || false;
                _options.operaBtnHide = options.operaBtnHide || false;
                _options.operationDiv = options.operationDiv || "tabOperation";
                _options.nextBtnId = options.nextBtnId || "tabNext";
                _options.prevBtnId = options.prevBtnId || "tabPrev";
                _options.confirmBtnId = options.confirmBtnId || "tabCancl";
                _options.cancleBtnId = options.cancleBtnId || "tabClose";
                _options.operaFunPrev = options.operaFunPrev || _commonProcessingMethod.operaFunPrev;
                _options.operaFunNext = options.operaFunNext || _commonProcessingMethod.operaFunNext;
                _options.operaFunChanging = options.operaFunChanging || _commonProcessingMethod.operaFunChanging;
                _options.operaFunConfirm = options.operaFunConfirm || _commonProcessingMethod.operaFunConfirm;
                _options.operaFunConfirming = options.operaFunConfirming || _commonProcessingMethod.operaFunConfirming;
                _options.operaFunCancle = options.operaFunCancle || _commonProcessingMethod.operaFunCancle;
            }
            var tabSwitchTag = _this.find("." + _options.className) || null;
            if (tabSwitchTag == null) {
                //console.error("没有发现设置的操作 类名 .tabSwitchTag");
            } else {
                formW = _this.width();
                tabClass = $("." + _options.className);
                var tabSwitchTagSize = tabSwitchTag.size();
                maxNum = tabSwitchTagSize;
                nowEqNum = _options.tabNum - 1;
                if (_options.showTabChoiceSpan) {
                    this.bulidTabDiv();
                }
                for (var i = 0; i < tabSwitchTagSize; i++) {
                    tabClass.eq(i).attr({
                        "style": "display:none;",
                        "eqNum": i
                    });
                }
                _commonProcessingMethod.showTabSwitchDiv(nowEqNum);
            }
        };
        TabSwitch.prototype.bulidTabDiv = function() {
            if (_options.tabName.length > 0) {
                if (_options.tabName.length != maxNum) {
                    //console.error("设置的tab切换表头内的名字和块页面数不匹配 将自定义设置 页面1 页面2");
                    for (var i = 1; i <= maxNum; i++) {
                        _options.tabName.push("页面" + i);
                    }
                }
            } else {
                //console.info("没有发现设置的tab切换表头内的名字  将自定义设置 页面1 页面2");
                for (var i = 1; i <= maxNum; i++) {
                    _options.tabName.push("页面" + i);
                }
            }
            if (_this.find("#" + _options.tabDiVId).length == 1) {
                var tabDiVId = $("#" + _options.tabDiVId);
                _commonProcessingMethod._bulidTabDiv(tabDiVId);
            } else {
                //console.info("没有发现或是设置的tab切换表头 ID名 #tabSwitchChoice 将自定义加载");
                _this.prepend('<div id="tabSwitchChoice"></div>');
                var tabDiVId = $("#tabSwitchChoice");
                _commonProcessingMethod._bulidTabDiv(tabDiVId);
            }
            if (_options.operaBtnHide) {
                if (_this.find("#" + _options.operationDiv).length == 1) {
                    var operationDivId = $("#" + _options.operationDivId);
                    _commonProcessingMethod._bulidOperationDiv(operationDivId);
                } else {
                    //console.info("没有发现或是设置的tab切换表头 ID名 #tabSwitchChoice 将自定义加载");
                    _this.append('<div id="tabOperation"></div>');
                    var operationDivId = $("#tabOperation");
                    _commonProcessingMethod._bulidOperationDiv(operationDivId);
                }
            }
        };
        TabSwitch.prototype._show = function(showNum) {
            showNum = showNum ? showNum > 0 && showNum <= maxNum ? showNum : 1 : 1;
            _commonProcessingMethod.showTabSwitchDiv(showNum - 1);
            return _options;
        };
        TabSwitch.prototype.next = function() {
            if (nowEqNum < (maxNum - 1)) {
                _commonProcessingMethod.showTabSwitchDiv(parseInt(nowEqNum) + 1);
            } else {
                //console.error("最后一个");
            }
            return _options;
        };
        TabSwitch.prototype.prev = function() {
            if (nowEqNum > 0) {
                _commonProcessingMethod.showTabSwitchDiv(parseInt(nowEqNum) - 1);
            } else {
                //console.error("第一个");
            }
            return _options;
        };
        TabSwitch.prototype._getTabSwitchShowIndex = function(){
            return nowEqNum;
        }
    });
    var commonProcessingMethod = {
        showTabSwitchDiv: function(showNum) {
            if (showNum === null || showNum === undefined || showNum === "") {
                showNum = nowEqNum;
            }
            showNum = parseInt(showNum);
            tabClass.eq(nowEqNum).attr({
                "style": "display:none;"
            });
            nowEqNum = showNum;
            tabClass.eq(nowEqNum).attr({
                "style": "",
                "eqNum": nowEqNum
            });
            if (_options.showTabChoiceSpan) {
                tabS_sptab.removeClass("xuanz");
                tabS_sptab.eq(nowEqNum).addClass("xuanz");
            }
            _options.currentIndex = nowEqNum;
            $("#" + _options.nextBtnId).length == 1 ? nowEqNum == (maxNum - 1) ? $("#" + _options.nextBtnId).hide() : $("#" + _options.nextBtnId).show() : "";
            $("#" + _options.prevBtnId).length == 1 ? nowEqNum === 0 ? $("#" + _options.prevBtnId).hide() : $("#" + _options.prevBtnId).show() : "";
        },
        _bulidTabDiv: function(tabDiVId) {
            tabDiVId.addClass("tabSwitchChoice");
            for (var i = 0; i < _options.tabName.length; i++) {
                var html = '<span nowEqNum="' + i + '" class="tabS_sptab">' + _options.tabName[i] + '</span>';
                tabDiVId.append(html);
            }
            var tempW = (formW / (_options.tabName.length)) - 30;
            tabS_sptab = $("span.tabS_sptab");
            tabS_sptab.width(tempW);
            tabS_sptab.eq(nowEqNum).addClass("xuanz");
            if (_options.tabChoiceClick) {
                tabS_sptab.off();
                $(tabS_sptab).on("click", function(e) {
                    e = e || window.event;
                    commonProcessingMethod.showTabSwitchDiv($(e.target).attr("nowEqNum"));
                });
            }
        },
        _bulidOperationDiv: function(operationDivId) {
            operationDivId.addClass("tabOperation");
            var operationDivHtml = '<span id="' + _options.cancleBtnId + '" class="operationsp no">取消</span>' +
                '<span id="' + _options.confirmBtnId + '" class="operationsp yes">确认</span>' +
                '<span id="' + _options.nextBtnId + '" class="operationsp updown">下一步</span>' +
                '<span id="' + _options.prevBtnId + '" class="operationsp updown">上一步</span>';
            operationDivId.append(operationDivHtml);
            $("#" + _options.prevBtnId).on("click", function(e) {
                e = e || window.event;
                if (_options.operaFunChanging(_options, e)) {
                    _TabSwitch.prev();
                    _options.operaFunPrev(_options, e);
                }
            });
            $("#" + _options.nextBtnId).on("click", function(e) {
                e = e || window.event;
                if (_options.operaFunChanging(_options, e)) {
                    _TabSwitch.next();
                    _options.operaFunNext(_options, e);
                }
            });
            $("#" + _options.confirmBtnId).on("click", function(e) {
                e = e || window.event;
                if (_options.operaFunConfirming(_options, e)) {
                    _options.operaFunConfirm(_options, e);
                }
            });
            $("#" + _options.cancleBtnId).on("click", function(e) {
                e = e || window.event;
                _options.operaFunCancle(_options, e);
            });
        },
        operaFunPrev: function(param, _event) {
            //console.info("prev");
        },
        operaFunNext: function(param, _event) {
            //console.info("next");
        },
        operaFunChanging: function(param, _event) {
            return true;
        },
        operaFunConfirm: function(param, _event) {
            //console.info("yes");
        },
        operaFunConfirming: function(param, _event) {
            return true;
        },
        operaFunCancle: function(param, _event) {
            //console.info("no");
        }
    }
}).call(this)