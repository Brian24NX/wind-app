// pages/my/index.js
const app = getApp();
const languageUtils = require('../../utils/languageUtils')
const utils = require('../../utils/util')
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
      url: '/packageDashboard/pages/shipment/list/index',
      icon: '/assets/img/myAccount/shipment@2x.png'
    }, {
      label: 'document',
      url: '/packageDashboard/pages/document/index',
      icon: '/assets/img/myAccount/document@2x.png'
    }],
    needLogin: false,
    userInfo: {}
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
    if (utils.checkAccessToken()) {
      this.setData({
        needLogin: false,
        userInfo: wx.getStorageSync('userInfo')
      })
    } else {
      this.setData({
        needLogin: true,
        userInfo: {}
      })
      wx.showToast({
        title: languageUtils.languageVersion().lang.page.load.noLogin,
        icon: 'none',
        mask: true,
        duration: 3000
      })
      setTimeout(()=>{
        wx.navigateTo({
          url: '/pages/Login/index'
        })
      }, 3000)
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
        list: lang.lang.toolbar.list, //赋值
        selected: 3
      })
    }
  },

  // 去登录
  toLogin() {
    wx.navigateTo({
      url: '/pages/Login/index',
    })
  },

  toBaseInfo() {
    wx.navigateTo({
      url: '/pages/baseInfo/index',
    })
  },

  // 我的概览
  toDashboard(e) {
    if (this.data.needLogin) {
      wx.navigateTo({
        url: '/pages/Login/index',
      })
      return
    }
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
  },

  // 隐私政策
  legalTerms() {
    wx.navigateTo({
      url: '/pages/legalTerms/index',
    })
  }
})