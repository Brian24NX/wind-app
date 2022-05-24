// pages/query/index.js
const app = getApp();
var languageUtil = require('../../utils/languageUtils')

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
      icon: '/assets/img/menu/dc@2x.png',
      isNew: true,
      label: 'dingcang',
      url: ''
    }, {
      icon: '/assets/img/menu/cqcx@2x.png',
      isNew: false,
      label: 'chuanqi',
      url: '/pages/RouterQuery/index'
    }, {
      icon: '/assets/img/menu/hwzz@2x.png',
      isNew: false,
      label: 'huowu',
      url: '/pages/Shipment/index'
    }, {
      icon: '/assets/img/menu/gzp@2x.png',
      isNew: true,
      label: 'gzp',
      url: '/packageMore/pages/sanctionCheck/list/index'
    }, {
      icon: '/assets/img/menu/gzfl@2x.png',
      isNew: false,
      label: 'gzfl',
      url: '/packagePrice/pages/guizufeilv/index'
    }, {
      icon: '/assets/img/menu/cxfl@2x.png',
      isNew: false,
      label: 'cxfl',
      url: '/packagePrice/pages/chargeFinder/index'
    }]
  },

  onLoad: function() {
    this.initLanguage();
  },

  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  toFunction(e) {
    const index = e.currentTarget.dataset.index
    if (!this.data.menuList[index].url) {
      wx.showToast({
        title: this.data.load.functionIsUnderDevelopment,
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: this.data.menuList[index].url,
    })
  },
  
  //初始化语言
  initLanguage() {
    //获取当前小程序语言版本所对应的字典变量
    var lang = languageUtil.languageVersion()
    // console.log(lang)
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