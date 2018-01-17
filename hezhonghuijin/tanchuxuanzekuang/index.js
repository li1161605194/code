window.onload = function() {
    var popc = new POPC();
    popc.chosePopc("danxuan_an", {
        callback: function(data) {
            console.info(data);
        },
        clickli: function(li) {
            console.info(li);
        },
        mode: 1,
        chose: 1,
        title: "请选择交通方式",
        data: [{
            text: "飞机"
        }, {
            text: "汽车"
        }, {
            text: "火车"
        }, {
            text: "轮船"
        }, {
            text: "地铁"
        }, {
            text: "高铁"
        }]
    });
    popc.chosePopc("duoxuan_an", {
        callback: function(data) {
            console.info(data);
        },
        mode: 3,
        lr_margin: 60,
        chose: 2,
        title: "请选择买票类型",
        data: [{
            text: "飞机1"
        }, {
            text: "汽车2"
        }, {
            text: "火车3"
        }, {
            text: "轮船4"
        }, {
            text: "地铁5"
        }, {
            text: "高铁6"
        }]
    });

}