// pages/my/index.js
const app = getApp();
var languageUtil = require('../../utils/languageUtils')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navTop: app.globalData.navTop,
    navHeight: app.globalData.navObj,
    languageContent: {}, // 用于保存当前页面所需字典
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.initLanguage();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  },

  //初始化语言
  initLanguage() {
    //获取当前小程序语言版本所对应的字典变量
    var lang = languageUtil.languageVersion()
    // console.log(lang)
    this.setData({
      languageContent: lang.lang.page.userCenter,
    })
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        list: lang.lang.toolbar.list //赋值
      })
    }
  },

  // 设置语言
  setLanguage() {
    wx.navigateTo({
      url: '/pages/setLanguage/index',
    })
  }
})