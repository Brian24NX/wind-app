// pages/query/index.js
const app = getApp();
var languageUtil = require('../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {}, // 用于保存当前页面所需字典变了
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
    if (typeof this.getTabBar === 'function' &&this.getTabBar()) {
      this.getTabBar().setData({
        selected:1
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
      console.log(lang)
      this.setData({
        content: lang
      })
      wx.setNavigationBarTitle({
        title: lang.lang.toolbar.list[1].text
      })
      console.log(typeof this.getTabBar === 'function' &&this.getTabBar());
      if (typeof this.getTabBar === 'function' &&this.getTabBar()) {
        this.getTabBar().setData({
          list:lang.lang.toolbar.list //赋值
        })
      }
    },
})