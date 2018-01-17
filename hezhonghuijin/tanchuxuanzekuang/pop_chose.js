var POPC = function() {
    var _zw = document.documentElement.clientWidth || document.body.clientWidth;
    var _zh = document.documentElement.clientHeight || document.body.clientHeight;
    POPC = POPC.prototype;
    //clickid触发弹出的元素id
    var _zzid, _popc_zkid, _popc_btzk, _popc_nrzk, _popc_ul, _qxid, _qdid, _rules, _clickid;
    var _options = {};
    POPC.getDataParams = function() {
        var dataParams = [];
        liListFor(function(_li) {
            if (_li.getAttribute("class").indexOf("xuanz") != -1) {
                dataParams.push({
                    text: _li.getElementsByClassName("popc_liwz_text")[0].innerText,
                    value: _li.getAttribute("value")
                });
            }
        }, 2);
        return dataParams;
    };
    POPC.chosePopc = function(clickid, options) {
        if (clickid) {
            addStyle();
            _clickid = clickid;
            document.getElementById(clickid).addEventListener("click", function(e) {
                if (document.getElementById(clickid).hasAttribute("rules")) {
                    _rules = document.getElementById(clickid).getAttribute("rules");
                    document.getElementById(clickid).removeAttribute("rules");
                }
                var _option = {
                    mode: 1, //1:自适应左右边距20px 2:全屏  3:自定义左右边距
                    chose: 1, //1:单选 2:多选
                    title: "请选择",
                    data: [],
                    //jgid: "",//选择结果
                    xuanzimg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAD2UlEQVR4Xu1aTXraMBB9irMvvUFygsIXs3cL3bcnKD1B6AlCT5DcgPQETdc1ha5DPtITJL1B2GPUbxCUP1t/lgHbsEWSZ56e3sxoxFDyHyu5/zgCcGRAyRE4HoFCE6Ax/ADOKvh1cZvkZzEZEIzOcBp1AQQA/4qw3ikPAO8eWmD8GgwV4TR/i7A+KD4AwagCLyLHW+vOlgGA96Mq+KQLsOrWTk+81xjUXorLAHJ+GvWXlN9wNfSlOpdvESSVB7qJzgNjhP5cC+I5kF8ASOxOOCm95Md/I6wHshH5BEDL+VkEKCAAzfsAYH29BK5oAKgEbwuVIgFA2Z0XjSSCF0OKogBASc7ppB8b50shgo3hdzBQyDP8FYEBzfsOwK4MPZ8P548I67X8hkEjxU9wM7eZoChunsxELw6EvBZD1ud+EwT2BeHFTb6KoeZDG+DXdud+c5ZcBw4vFbaK9wqoJt45BrXnuFGHB0BzSGmutIAxYMYYHHeIvE4+AHBJfY5viLy27DKEgDwcBrhSfY4/OPFa+Fl71GHK4QDgQvU1d30VGHcAiHy9KruBTdwRFwkP5OEu2zDYGF4CoLv3F/T8cx3qrY1pDCnhOTOeJyaMMWVtWfMju1R4dhsbUbxeqvaUfTYyJp3wjcG8QPe8uwuDM7pPLwG+3XHheNZmQTrhS+28XRQQN7HUgEimrC4L7Cs9J86bASAyNHJcXZfrsED0754szr0z5/UBWIjc/36bhtkqFjSGt2D4pLHS6hCnzqsBkLWcVJbLWGC7+8yrpRE8fREUMf0KYG2Vn9L/k1hgs/sqRlkaup0IibNOvTbbuLw0JY4FNrufkfPJR2Bm5KQ1Z8ArS3DFtE3jTXef0tuev9HyTmXR2mR5Kizi9I2FWMWzwHz3fyD01VEnBR56tYDoyJBqv7H61oIFJnGfqrrIC1TlrJU9K5P0AFhMMHFg1TLSgsirGVxyOg93SUCZAUCriPyf3tyYagPN0bvp4fiInn+Xdnd15psDQKsKbRhYHwmpZfJXXTpOmYyxA2DxBVNFV1uWuehtmpAOAFotXTm7Gi3+IvKqWYueewBoRe0XGzIKyDs4avLYjUjPgGWEoJcbJFym4khPWaSvOe1c05vlDgDrCKFuYeu5YjfKLQDmIIwxmZ372K6NnUtms9wDsARhpDbF7iZXva7+iGwA0BLG/VJ/AVF2AMhB2Dv1dwNAYp6wf+rvDgD60mrGSFVez99+1a1/bJ2OzPYILExdqx32k/AkobYbAOjrAoQOen66e0an+39I7XHHjukutzsG6Fq043FHAHYM+MF9rvQM+AeFkYNQOWxyBwAAAABJRU5ErkJggg==',
                    lr_margin: 20 //自定义左右边距 容器宽度不得小于220px
                };
                _options = mergeJSON(options, _option);
                init();
            }, false);
        } else {
            alert("缺少关键参数[code:10011]");
        }
    };
    init = function() {
        if (document.getElementById("popc_ul")) {
            document.getElementById("zhezhao_zk").remove();
            document.getElementById("popc_dwzk").remove();
            creatHTML();
        } else {
            creatHTML();
        }
    };
    creatHTML = function() {
        creatPopcBjkHTML();
    };
    addStyle = function() {
        if (document.getElementById("_popc_style")) {} else {
            var style1 = document.createElement('style');
            style1.setAttribute("id", "_popc_style");
            style1.innerHTML = '.zhezhao_zk{display:block; width: 100%;height: 100%; position: fixed;top: 0;right: 0;z-index: 9999;background-color: #000000;opacity: 0.5;}' +
                '.popc_dwzk{display:block; background-color: #FFFFFF;position: fixed;z-index: 999999999;border-radius: 6px;}' +
                '.popc_bjzk{width: 100%;}' +
                '.popc_btzk{width: 100%;height: 40px;line-height: 40px;overflow: hidden;border-radius:  6px 6px 0px 0px;}' +
                '.popc_anc{display: block;height: 40px;line-height: 40px;text-align: center;font-size: 13px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}' +
                '.popc_btwz{float: left; width: 60%;color: #000000;}' +
                '.popc_anc.qx{float: left;width: 20%;background-color: #E0E0E0;color: #959595;}' +
                '.popc_anc.qd{float: right;width: 20%;background-color: #044084;color: #FFFFFF;}' +
                '.popc_nrzk{width: 100%;overflow-y: scroll;border-radius:  0px 0px 6px 6px;}' +
                '.popc_ul{width: 100%;border-radius:  0px 0px 6px 6px;}' +
                '.popc_li{overflow: hidden; width: 100%;height: 39px;line-height: 39px;font-size: 14px;text-align: center;display: block;border-top: solid 1px #CCCCCC;}' +
                '.popc_liwz_text{width: 60%; display: block;float: left;height: 39px;line-height: 39px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-align: center;}' +
                '.popc_li span.popc_xzimgk{display: block;float: right;margin-right:15px;height: 29px;margin-top:5px;width: 29px;}' +
                '.popc_li span.lismimgk{display: block;float: left;margin-left:15px;height: 29px;margin-top:5px;width: 29px;}' +
                '.popc_li img.popc_xzimg{display: block;opacity:0; height: 29px;width: 29px;}' +
                '.popc_li.xuanz img.popc_xzimg{opacity:1;}' +
                '.popc_li img.lismimg{display: block;opacity:0;height: 29px;width: 29px;}';
            document.head.appendChild(style1);
        }
    };
    creatPopcBjkHTML = function() {
        var _zz_div = document.createElement("div");
        _zz_div.setAttribute("class", "zhezhao_zk");
        _zz_div.setAttribute("id", "zhezhao_zk");
        document.getElementsByTagName("body")[0].appendChild(_zz_div);
        var _popc_dwzk = document.createElement("div");
        _popc_dwzk.setAttribute("class", "popc_dwzk");
        _popc_dwzk.setAttribute("id", "popc_dwzk");
        document.getElementsByTagName("body")[0].appendChild(_popc_dwzk);
        _popc_dwzk.innerHTML = '<div class="popc_bjzk"><div class="popc_btzk"><span class="popc_anc qx" id="popc_qx">取消</span>' +
            '<span class="popc_anc popc_btwz">' + _options.title + '</span><span class="popc_anc qd" id="popc_qd">确定</span>' +
            '</div><div class="popc_nrzk" id="popc_nrzk"><ul class="popc_ul" id="popc_ul"></ul></div></div>';
        _zzid = document.getElementById("zhezhao_zk");
        _qxid = document.getElementById("popc_qx");
        _qdid = document.getElementById("popc_qd");
        _popc_zkid = document.getElementById("popc_dwzk");
        _popc_nrzk = document.getElementById("popc_nrzk");
        _popc_ul = document.getElementById("popc_ul");
        creatPopcLiHTML();
    };
    bujudingweiWH = function() {
        _zw = document.documentElement.clientWidth || document.body.clientWidth;
        _zh = document.documentElement.clientHeight || document.body.clientHeight;
        var lr_margin = 20;
        if (_options.mode == 3) {
            if (_options.lr_margin) {
                lr_margin = parseInt(_options.lr_margin);
            }
        } else if (_options.mode == 2) {
            lr_margin = 0;
        }
        if ((_zw - (lr_margin * 2)) < 240) {
            lr_margin = 20;
        }
        _options.lr_margin = lr_margin;
        _popc_zkid.style.width = _zw - (lr_margin * 2) + "px";
        _popc_ul.style.width = _zw - (lr_margin * 2) + "px";
        _popc_zkid.style.left = lr_margin + "px";
        var nr_ul_h = _options.data.length * 40;
        if (nr_ul_h < (_zh - (lr_margin * 2) - 40)) {
            _popc_zkid.style.height = nr_ul_h + 40 + 0 + "px";
            _popc_nrzk.style.height = nr_ul_h + 0 + "px";
            _popc_zkid.style.top = (_zh - nr_ul_h - (lr_margin * 2)) / 2 + "px";
        } else {
            _popc_zkid.style.height = _zh - (lr_margin * 2) + 0 + "px";
            _popc_nrzk.style.height = _zh - (lr_margin * 2) - 40 + "px";
            _popc_zkid.style.top = lr_margin + "px";
        }
    };
    creatPopcLiHTML = function() {
        var lihtml = '';
        for (var a = 0; a < _options.data.length; a++) {
            if (_options.data[a].text) {
                var _v = _options.data[a].value == undefined ? _options.data[a].text : _options.data[a].value;
                var _src = _options.data[a].img == undefined ? "" : _options.data[a].img;
                var _li_sf_xuanz = "popc_li";
                if (_options.jgid != "" && typeof(_options.jgid) == "string") {
                    var _xz_jg = "";
                    if (document.getElementById(_options.jgid).value) {
                        _xz_jg = document.getElementById(_options.jgid).value;
                    } else {
                        _xz_jg = document.getElementById(_options.jgid).innerText;
                    }
                    if (_xz_jg.toString().indexOf(_options.data[a].text) != -1) {
                        _li_sf_xuanz = "popc_li xuanz";
                    }
                    if (_xz_jg.toString() == "" && a == 0 && (_options.defaults == undefined || _options.defaults == "")) {
                        _li_sf_xuanz = "popc_li xuanz";
                    }
                } else {
                    if (a == 0 && (_options.defaults == undefined || _options.defaults == "")) {
                        _li_sf_xuanz = "popc_li xuanz";
                    } else if (_options.defaults != "" && typeof(_options.defaults) == "string") {
                        if (_options.defaults.toString().indexOf(_options.data[a].text) != -1) {
                            _li_sf_xuanz = "popc_li xuanz";
                        }
                    }
                }
                lihtml += '<li value="' + _v + '" class="' + _li_sf_xuanz + '">' +
                    '<span class="lismimgk"><img ' + _src + ' class="lismimg" /></span><span class="popc_liwz_text">' + _options.data[a].text + '</span><span class="popc_xzimgk"><img class="popc_xzimg" src="' + _options.xuanzimg + '" /></span></li>';
            }
        }
        _popc_ul.innerHTML = lihtml;
        bujudingweiWH();
        queding_click_jg();
        quxiao_click_zz();
        choseli_click_xz();
    };
    choseli_click_xz = function() {
        liListFor(function(_li) {
            _li.getElementsByClassName("popc_liwz_text")[0].style.width = _zw - (_options.lr_margin * 2) - 0 - 88 + "px";
            _li.addEventListener("click", function(e) {
                var _t = e || window.event;
                var class_old = this.getAttribute("class");
                if (_options.chose == 1) {
                    liListFor(function(_li) {
                        _li.setAttribute("class", "popc_li");
                    });
                } else if (_options.chose == 2) {

                } else {

                }
                if (class_old.indexOf("xuanz") == -1) {
                    this.setAttribute("class", class_old + " xuanz");
                } else {
                    this.setAttribute("class", "popc_li");
                }
                if (_options.clickli && typeof(_options.clickli) == "function") {
                    _options.clickli(this, POPC.getDataParams());
                }
            }, false);
        });
    };
    queding_click_jg = function() {
        _qdid.addEventListener("click", function(e) {
            var _t = e || window.event;
            var _jg = POPC.getDataParams();
            if (typeof(_jg) == "object" && _jg.length < 1) {

            } else if (typeof(_jg) == "object" && _jg.length >= 1) {
                _options.callback(POPC.getDataParams());
            }
            POPC.hidePopc();
        }, false);
    };
    quxiao_click_zz = function() {
        _zzid.addEventListener("click", function(e) {
            var _t = e || window.event;
            POPC.hidePopc();
        }, false);
        _qxid.addEventListener("click", function(e) {
            var _t = e || window.event;
            POPC.hidePopc();
        }, false);
    };
    POPC.showPopc = function() {
        _zzid.style.display = "block";
        _popc_zkid.style.display = "block";
    };
    POPC.hidePopc = function() {
        if (_rules != undefined && _rules != null) {
            document.getElementById(_clickid).setAttribute("rules", _rules);
        }
        _zzid.style.display = "none";
        _popc_zkid.style.display = "none";
    };
    liListFor = function(fun, type) {
        var _popc_li_z = document.querySelectorAll(".popc_li");
        if (type && type == 2) {
            _popc_li_z = document.querySelectorAll(".popc_li.xuanz");
        }
        for (var a = 0; a < _popc_li_z.length; a++) {
            fun(_popc_li_z[a]);
        }
    }
}

function mergeJSON(minor, main) {
    var z_new_j = {};
    for (var key in minor) {
        if (isJSON(minor[key])) {
            arguments.callee(minor[key], main[key]);
        }
        if (main[key] === undefined) {
            main[key] = minor[key];
            z_new_j[key] = minor[key];
            continue;
        } else if (main[key] != undefined && !isJSON(minor[key])) {
            main[key] = minor[key];
            z_new_j[key] = minor[key];
            continue;
        }
    }
    return main;
}

function isJSON(target) {
    return typeof target == "object" && target.constructor == Object;
}