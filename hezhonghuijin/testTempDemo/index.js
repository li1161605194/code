var callbackData = [{
    y: "2017",
    m: "10",
    d: "12",
    h: "08",
    i: "00"
}, {
    y: "2017",
    m: "10",
    d: "12",
    h: "08",
    i: "30"
}, {
    y: "2017",
    m: "10",
    d: "12",
    h: "09",
    i: "00"
}, {
    y: "2017",
    m: "10",
    d: "13",
    h: "08",
    i: "00"
}, {
    y: "2017",
    m: "10",
    d: "13",
    h: "09",
    i: "00"
}, {
    y: "2017",
    m: "11",
    d: "12",
    h: "08",
    i: "00"
}, {
    y: "2017",
    m: "11",
    d: "13",
    h: "08",
    i: "00"
}, {
    y: "2017",
    m: "12",
    d: "15",
    h: "09",
    i: "00"
}, {
    y: "2018",
    m: "12",
    d: "15",
    h: "09",
    i: "00"
}];

var zData = [];
for (var a = 0; a < callbackData.length; a++) {
    var y = callbackData[a].y;
    var m = callbackData[a].m;
    var d = callbackData[a].d;
    var h = callbackData[a].h;
    var i = callbackData[a].i;
    if (zData[y]) {} else {
        zData[y] = [];
    }
    if (zData[y][m]) {} else {
        zData[y][m] = [];
    }
    if (zData[y][m][d]) {} else {
        zData[y][m][d] = [];
    }
    if (zData[y][m][d][h]) {
        zData[y][m][d][h].push(i);
    } else {
        zData[y][m][d][h] = [i];
    }
}
console.log(zData)

/*zData.forEach(function(yele, yindex) {
    console.log("年" + yindex);
    zData[yindex].forEach(function(mele, mindex) {
        console.log("月" + mindex);
        zData[yindex][mindex].forEach(function(dele, dindex) {
            console.log("日" + dindex);
        });
    });
});*/
//elem :下标   index: 元素数值数组
zData.map(function(yindex, yelem) {
    console.log(yelem);
    zData[yelem].map(function(mindex, melem) {
        console.log(melem);
        zData[yelem][melem].map(function(dindex, delem) {
            console.log(delem);
            zData[yelem][melem][delem].map(function(hindex, helem) {
                console.log(helem);
            });
        });
    });
});