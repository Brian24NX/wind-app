// pages/query/index.js
const app = getApp();
var languageUtil = require('../../utils/languageUtils')
const utils = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {}, // 用于保存当前页面所需字典
    load: {},
    navTop: app.globalData.navTop,
    navHeight: app.globalData.navHeight,
    menuList: [{
      style: "330rpx",
      icon: '/assets/img/menu/D&D@2x.png',
      isNew: true,
      label: 'ddCharges',
      url: '/packagePrice/pages/calculatedCharges/index',
      needLogin: true
    },
    {
      style: "330rpx",
      icon: '/assets/img/menu/gzfl@2x.png',
      isNew: false,
      label: 'gzfl',
      url: '/packagePrice/pages/DNDCharge/index',
      // url: '/packagePrice/pages/DDCharges/Search/index',
      needLogin: false
    },
    {
      style: "330rpx",
      icon: '/assets/img/menu/cqcx@2x.png',
      isNew: false,
      label: 'chuanqi',
      type: 2,
      url: '/pages/RouterQuery/index',
      needLogin: false
    }, {
      style: "330rpx",
      icon: '/assets/img/menu/hwzz@2x.png',
      isNew: false,
      label: 'huowu',
      type: 2,
      url: '/pages/Shipment/index',
      needLogin: false
    }, {
      style: "330rpx",
      icon: '/assets/img/menu/gzp1.png',
      isNew: true,
      label: 'gzp',
      type: 2,
      url: '/packageMore/pages/sanctionCheck/list/index',
      needLogin: false
    },
    {
      style: "330rpx",
      icon: '/assets/img/menu/dc@2x.png',
      isNew: false,
      label: 'dingcang',
      url: '/packageBooking/pages/Search/index',
      needLogin: true
    },],
    showRemind: false
  },

  onLoad: function () {
    this.initLanguage();
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  onShareAppMessage: function () { },

  toFunction(e) {
    const index = e.currentTarget.dataset.index
    // 订舱功能升级中
    if (!this.data.menuList[index].url || index === 5) {
      wx.showToast({
        title: this.data.load.functionIsUnderDevelopment,
        icon: 'none'
      })
      return
    }
    if (!this.data.menuList[index].needLogin || (this.data.menuList[index].needLogin && utils.checkAccessToken())) {
      if (this.data.menuList[index].type === 1) {
        wx.switchTab({
          url: this.data.menuList[index].url
        })
      } else {
        wx.navigateTo({
          url: this.data.menuList[index].url,
        })
      }
    } else {
      wx.showToast({
        title: languageUtil.languageVersion().lang.page.load.noLogin,
        icon: 'none',
        mask: true,
        duration: 2000
      })
      setTimeout(() => {
        this.toLogin()
      }, 2000)
    }
  },

  // 去登录
  toLogin() {
    if (wx.getStorageSync('allowLegalTerms') && wx.getStorageSync('phone')) {
      wx.navigateTo({
        url: '/pages/Login/index',
      })
    } else {
      this.setData({
        showRemind: true
      })
      this.getTabBar().setData({
        show: false
      })
    }
  },

  setRemind(e) {
    this.setData({
      showRemind: false
    })
    this.getTabBar().setData({
      show: true
    })
    if (e.detail) {
      wx.navigateTo({
        url: '/pages/Login/index',
      })
    }
  },

  //初始化语言
  initLanguage() {
    //获取当前小程序语言版本所对应的字典变量
    var lang = languageUtil.languageVersion()
    this.setData({
      languageContent: lang.lang.page.queryInfo,
      load: lang.lang.page.load
    })
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        list: lang.lang.toolbar.list //赋值
      })
    }
  },
})