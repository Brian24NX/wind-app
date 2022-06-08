// pages/business/index.js
const app = getApp();
var languageUtil = require('../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTop: app.globalData.navTop,
    navHeight: app.globalData.navHeight,
    languageContent: {}, // 用于保存当前页面所需字典变了
    load: {}
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initLanguage();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&this.getTabBar()) {
      this.getTabBar().setData({
        selected:2
      })
    }
  },
  
    //初始化语言
    initLanguage() {
      //获取当前小程序语言版本所对应的字典变量
      var lang = languageUtil.languageVersion()
      this.setData({
        languageContent: lang.lang.page.quotation,
        load: lang.lang.page.load
      })
      if (typeof this.getTabBar === 'function' &&this.getTabBar()) {
        this.getTabBar().setData({
          list:lang.lang.toolbar.list //赋值
        })
      }
    },
})