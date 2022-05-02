// pages/query/index.js
const app = getApp();
var languageUtil = require('../../utils/languageUtils')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {}, // 用于保存当前页面所需字典
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
      url: ''
    }, {
      icon: '/assets/img/menu/gzfl@2x.png',
      isNew: false,
      label: 'gzfl',
      url: ''
    }, {
      icon: '/assets/img/menu/cxfl@2x.png',
      isNew: false,
      label: 'cxfl',
      url: ''
    }]
  },
  onShow: function() {
    this.initLanguage();
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
        title: '功能升级中，敬请期待！',
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
      languageContent: lang.lang.page.queryInfo
    })
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        list: lang.lang.toolbar.list //赋值
      })
    }
  },
})