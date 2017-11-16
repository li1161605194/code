//index.js
//获取应用实例
var app = getApp();

Page({
  data: {
    motto: 'Hello ',
    userInfo: {},
    res: {},
    imgUrls: [
      
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    circular: true
  },
  onLoad: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //console.info(userInfo);
      that.setData({
        userInfo: userInfo
      })
      const wx_userinfo_all = require('../../data/wx_userinfo_all.js');
      that.setData({
        res: wx_userinfo_all.getContent(userInfo.nickName)
      })
      const wx_main = require('../../data/wx_main.js');
      that.setData({
        imgUrls: wx_main.getContent("swiperimg")
      })
    })
  }
}
)

