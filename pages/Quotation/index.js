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
    content: {}, // 用于保存当前页面所需字典变了
  },
  handlerGobackClick(delta) {
    const pages = getCurrentPages();
    if (pages.length >= 2) {
      wx.navigateBack({
        delta: 1
      });
    } else {
      wx.switchTab({
        url: '../Home/index'
      })
    }
  },
  handlerGohomeClick() {
    wx.switchTab({
      url: '../Home/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initLanguage();
    if (typeof this.getTabBar === 'function' &&this.getTabBar()) {
      this.getTabBar().setData({
        selected:2
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
    //中英文切换
    switchLanguage() {
      //切换当前版本，即修改公共变量中的version
      languageUtil.changLanguage()
      this.initLanguage()
    },
    //初始化语言
    initLanguage() {
      //获取当前小程序语言版本所对应的字典变量
      var lang = languageUtil.languageVersion()
      // console.log(lang)
      this.setData({
        content: lang
      })
      wx.setNavigationBarTitle({
        title: lang.lang.page.quotationtitle
      })
      // console.log(typeof this.getTabBar === 'function' &&this.getTabBar());
      if (typeof this.getTabBar === 'function' &&this.getTabBar()) {
        this.getTabBar().setData({
          list:lang.lang.toolbar.list //赋值
        })
      }
    },
})