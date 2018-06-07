var opt = {
    slider: $("#slider")
};
var indexJs = {
    calculationHeight: function() {
        setTimeout(function() {
            $(".index_chose_car_zk").css("min-height", $("#index_chose_carw").height());
            $("#order_chose_car").css("min-height", $("#index_chose_carw").height());
        }, 123);
        window.onresize = function() {
            indexJs.calculationHeight();
        };
    },
    showSlides: function() {
        var res = {
            data: [{
                "title": "banner1",
                "thumb": "http://m.hzqcjt.com/file/photo/1/d9a21cd5b53f4c4083c366e0439e449b.jpg",
                "url": "#"
            }, {
                "title": "banner1",
                "thumb": "http://m.hzqcjt.com/file/photo/1/d9a21cd5b53f4c4083c366e0439e449b.jpg",
                "url": "#"
            }, {
                "title": "banner1",
                "thumb": "http://m.hzqcjt.com/file/photo/1/d9a21cd5b53f4c4083c366e0439e449b.jpg",
                "url": "#"
            }]
        }
        var leg = res.data.length;
        var html = "";
        for (var a = 0; a < leg; a++) {
            html += '<div class="swiper-slide"><a href="' + res.data[a].url + '"><img src="' + res.data[a].thumb + '"></a></div>';
        }
        opt.slider.html(html);
        setTimeout(function() {
            var swiper = new Swiper('.swiper-container', {
                autoplay: {
                    delay: 3500
                },
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                }
            });
        }, 1)
    },
    init: function(params, callback) {
        indexJs.showSlides();
        indexJs.calculationHeight();
        vm = avalon.define({
            $id: cbl.vm
        });
        if (callback && typeof(callback) == "function") {
            callback || callback();
        }
    }
};
$(function() {
    common.initCommonFooterHtml();
    indexJs.init({}, common.bodyShow());
});