var opt = {
    "slider": $("#slider"),
    "show_car_yi": $("#show_car_yi"),
    "show_active_yi": $("#show_active_yi")
}
var indexJs = {
    init: function() {
        indexJs.showSlides();
        indexJs.showCarLevelYi();
        indexJs.showActiveList();
    },
    showSlides: function() {
        r_post_jsons("public/findSlide.shtml", {
            slideId: 1
        }, function(res) {
            //alert(JSON.stringify(res));
            if (res && res != undefined && res.data != undefined) {
                var leg = res.data.length;
                var html = "";
                for (var a = 0; a < leg; a++) {
                    if (a == 0) {
                        html += '<div class="mui-slider-item mui-slider-item-duplicate"><a href="' + res.data[leg - 1].url + '"><img src="' + baseUrl + res.data[leg - 1].thumb + '"></a></div>';
                        html += '<div class="mui-slider-item"><a href="' + res.data[a].url + '"><img src="' + baseUrl + res.data[a].thumb + '"></a></div>';
                    } else if (a == (leg - 1)) {
                        html += '<div class="mui-slider-item"><a href="' + res.data[a].url + '"><img src="' + baseUrl + res.data[a].thumb + '"></a></div>';
                        html += '<div class="mui-slider-item mui-slider-item-duplicate"><a href="' + res.data[0].url + '"><img src="' + baseUrl + res.data[0].thumb + '"></a></div>';
                    } else {
                        html += '<div class="mui-slider-item"><a href="' + res.data[a].url + '"><img src="' + baseUrl + res.data[a].thumb + '"></a></div>';
                    }
                }
                opt.slider.html('<div class="mui-slider-group mui-slider-loop">' + html + '</div>');
                common.imgCarouselInit(0.4959183673469388);
            } else {
                layer.msg("请重新刷新[code:3002]", {
                    icon: 5
                });
                return false;
            }
        });
    },
    showCarLevelYi: function() {
        var orgid = common.cache.get("orgid");
        r_post_jsons("oauth/showcarbrand.shtml", {
            "orgid": orgid
        }, function(res) {
            //alert(JSON.stringify(res));
            if (res && res != undefined && res.data != undefined) {
                var leg = res.data.length;
                var html = "";
                for (var a = 0; a < leg; a++) {
                    html += '<a href="javascript:;" rel="views/show_car/show_car_list.html?carName=' + res.data[a].name + '&typeid=' + res.data[a].id + '" class="weui-grid tzpage">' +
                        '<div class="weui-grid__icon"><img src="../../img/index/car.jpg" alt=""></div>' +
                        '<p class="weui-grid__label">' + res.data[a].name + '</p></a>';
                }
                opt.show_car_yi.html(html);
            } else {
                layer.open({
                    content: '请重新刷新[code:3002]',
                    skin: 'msg',
                    time: 2
                });
                return false;
            }
        });
    },
    showActiveList: function() {
        r_post_jsons("oauth/findactivitylist.shtml", {}, function(res) {
            if (res) {
                //alert(JSON.stringify(res));
                var leg = res.data.length;
                var html = "";
                for (var a = 0; a < leg; a++) {
                    html += '<a href="javascript:void(0);" rel="views/active/active_detail.html?id=' + res.data[a].id + '" class="tzpage weui-media-box weui-media-box_appmsg">' +
                        '<div class="weui-media-box__hd">' +
                        '<img class="weui-media-box__thumb" src="../../img/index/hd1.jpg" alt="">' +
                        '</div>' +
                        '<div class="weui-media-box__bd">' +
                        '<h4 class="weui-media-box__title">' + res.data[a].title + '</h4>' +
                        '<p class="weui-media-box__desc">9月1号-4号,郑州CBD,合众汇金新手促销大优惠</p>' +
                        '</div></a>';
                }
                opt.show_active_yi.html(html);
            } else {
                layer.open({
                    content: '请重新刷新[code:3002]',
                    skin: 'msg',
                    time: 2
                });
                return false;
            }
        });
    }
}

$(function() {
    wxCommon.authorityLevel(2);
    common.initCommonHeardHtml();
    common.initCommonFooterHtml();
    common.footerXuanz(0);
    indexJs.init();
    common.bodyShow();
});