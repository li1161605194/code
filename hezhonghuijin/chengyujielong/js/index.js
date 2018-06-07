'use strict'
const opt = {
    upright: "",
    hs_num: 9,
    ZW: $("body").width(),
    JGGZK: $("#jgg_zk"),
    JGGDWK: $("#jgg_dwk"),
    JGGBJK: $("#jgg_bjk"),
    SJZDZK: $("#sjzd_zk"),
    SJZDBJK: $("#sjzd_bjk")
}
let szcy = ['按不动兵', '兵厉秣马', '马不蹄停', '停滞不前', '前倨后恭', '恭贺禧新', '新象更万', '万紫千红',
    '红杏出墙', '墙铜铁壁', '壁作上观', '观洞若火'
];
let _yxz_szcy = [];
let _cache_szcy = [];
let _jgg_xy = [];
let CYJL = {
    init: function() {
        CYJL.build_jgg_html();
        window.onresize = function() {
            opt.ZW = $("body").width();
            CYJL.init();
        };
    },
    snum_w_h: function() {
        let _zw = opt.ZW;
        _zw = parseInt(_zw / opt.hs_num) - 1;
        return _zw;
    },
    array_szcy: function() {
        let leg = szcy.length;
        leg = Math.floor(Math.random() * leg);
        if ($.inArray(szcy[leg], _yxz_szcy) == -1) {
            _yxz_szcy.push(szcy.splice(leg, 1)[0]);
            return szcy[leg];
        } else {
            if (_yxz_szcy.length == 12) {
                return false;
            } else {
                return CYJL.array_szcy();
            }
        }
    },
    build_jgg_html: function() {
        let _zw = CYJL.snum_w_h();
        let html = '',
            _style = "width:" + _zw + "px;height:" + _zw + "px;line-height:" + _zw + "px;background-color:#000;color:#fff;";
        for (let h = 0; h < opt.hs_num; h++) {
            for (let s = 0; s < opt.hs_num; s++) {
                let _xy = '' + h + '' + s + '';
                html += '<div id="xgg_' + _xy + '" style="' + _style + '" class="xgg_c"></div>';//(' + _xy + ')
            }
        }
        opt.JGGBJK.html(html);
        setTimeout(function() {
            CYJL.suiji_szcy_init();
        }, 111);
    },
    suiji_szcy_build: function(_xy, _type) {
        if (_type) {
            let _xy_szcy = [];
            let _x_temp = _xy[0];
            let _y_temp = _xy[1];
            if (_type.indexOf("up") != -1) {
                opt.upright = "up";
                return _xy_szcy = [_xy, (parseInt(_x_temp) + 1) + "" + _y_temp, (parseInt(_x_temp) + 2) + "" + _y_temp, (parseInt(_x_temp) + 3) + "" + _y_temp];
            } else if (_type.indexOf("right") != -1) {
                opt.upright = "right";
                return _xy_szcy = [_xy, _x_temp + "" + (parseInt(_y_temp) + 1), _x_temp + "" + (parseInt(_y_temp) + 2), _x_temp + "" + (parseInt(_y_temp) + 3)];
            } else {
                CYJL.suiji_szcy_init();
                return false;
            }
        }
    },
    panduan_szcy_upright: function(_xy) {
        if ($.inArray(_xy, _jgg_xy) == -1) {
            let _zw = CYJL.snum_w_h();
            let _init_szcy = CYJL.array_szcy();
            if (_init_szcy) {
                _jgg_xy.push(_xy);
                let _type = "";
                if (parseInt(_xy[0]) + 4 <= 9) {
                    _type += "up";
                }
                if (parseInt(_xy[1]) + 4 <= 9) {
                    _type += "right";
                }
                if (_type != "") {
                    let _style_wz = "width:" + _zw + "px;height:" + _zw + "px;line-height:" + _zw + "px;background-color:#fff;color:#000;";
                    let _xy_szcy = CYJL.suiji_szcy_build(_xy, _type);
                    for (let i = 0; i < 4; i++) {
                        _jgg_xy.push(_xy_szcy[i]);
                        $("#xgg_" + _xy_szcy[i]).html(_init_szcy[i]).attr("style", _style_wz);
                    }
                    CYJL.suiji_szcy_init();
                    /*let _init_szcy_temp = CYJL.array_szcy();
                    if (_init_szcy_temp != _init_szcy && _init_szcy_temp.indexOf(_init_szcy[i]) != -1) {
                        let _leg_temp = _init_szcy_temp.indexOf(_init_szcy[i]);
                        if (opt.upright == "up") {
                            CYJL.panduan_szcy_upright((parseInt(_xy_szcy[i][0]) - _leg_temp) + "" + _xy_szcy[i][1]);
                        } else if (opt.upright == "right") {
                            CYJL.panduan_szcy_upright(_xy_szcy[i][0] + "" + (parseInt(_xy_szcy[i][1]) - _leg_temp));
                        }
                    }*/
                } else {
                    CYJL.suiji_szcy_init();
                    return false;
                }
            }
        } else {
            CYJL.suiji_szcy_init();
            return false;
        }
    },
    suiji_szcy_init: function() {
        let _h = Math.floor(Math.random() * opt.hs_num);
        let _s = Math.floor(Math.random() * opt.hs_num);
        let _xy = '' + _h + '' + _s + '';
        CYJL.panduan_szcy_upright(_xy);
    }
}
$(function() {
    CYJL.init();
});