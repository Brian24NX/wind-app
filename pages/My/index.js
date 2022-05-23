// pages/my/index.js
const app = getApp();
var languageUtils = require('../../utils/languageUtils')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navTop: app.globalData.navTop,
    navHeight: app.globalData.navObj,
    languageContent: {}, // 用于保存当前页面所需字典
    dashboardList: [{
      label: 'shipment',
      url: '',
      icon: '/assets/img/myAccount/shipment@2x.png'
    }, {
      label: 'document',
      url: '/packageDashboard/pages/document/index',
      icon: '/assets/img/myAccount/document@2x.png'
    }]
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
    var lang = languageUtils.languageVersion()
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

  // 我的概览
  toDashboard(e) {
    if (e.currentTarget.dataset.url) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    } else {
      wx.showToast({
        title: languageUtils.languageVersion().lang.page.load.functionIsUnderDevelopment,
        icon: 'none'
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