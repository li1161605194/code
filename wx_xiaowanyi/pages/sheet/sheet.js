Page({
  data: {
    scConfig: {}
  },
  onLoad: function () {
    var that = this;
    var scmj = require('../../data/font/shicimingju.js');
    
    var scdata = scmj.getContent("shiCiMingJu").toString().split("|");
    var scleg = scdata.length;
    var scTempArray = [];
    for (var i = 0; i < 100; i++) {
      var scTempJson = {};
      var temp = scdata[i].toString().split("____");
      scTempJson.content = temp[0];
      scTempJson.name = temp[1].toString().split("《")[0];
      scTempJson.title = temp[1].toString().split("《")[1].toString().split("》")[0];
      scTempArray.push(scTempJson);
    }
    that.setData({
      scConfig: scTempArray
    })
  }
})
