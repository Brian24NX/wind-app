// pages/my/index.js
const app = getApp();
var languageUtil = require('../../utils/languageUtils')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navTop: app.globalData.navTop,
    navHeight: app.globalData.navHeight,
    languageContent: {}, // 用于保存当前页面所需字典
    changeLanguage: {},
    load: {}
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
      load: lang.lang.page.load,
      changeLanguage: {
        changLanguage: lang.lang.page.changeLanguage,
        sure: lang.lang.page.sure,
        cancel: lang.lang.page.cancel
      }
    })
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        list: lang.lang.toolbar.list //赋值
      })
    }
  },

  //中英文切换
  switchLanguage() {
    //切换当前版本，即修改公共变量中的version
    const _this = this
    wx.showModal({
      cancelColor: '#666666',
      title: _this.data.changeLanguage.changLanguage,
      cancelText: _this.data.changeLanguage.cancel,
      confirmColor: '#2D75FF',
      confirmText: _this.data.changeLanguage.sure,
      success(res) {
        if (res.confirm) {
          languageUtil.changLanguage()
          wx.reLaunch({
            url: '/pages/Home/index',
          })
        }
      }
    })
  }
})