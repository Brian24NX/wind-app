// pages/query/index.js
const app = getApp();
var languageUtil = require('../../utils/languageUtils')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {}, // 用于保存当前页面所需字典变了
    navTop: app.globalData.navTop,
    navHeight: app.globalData.navHeight,
    menuList: [{
      icon: '/assets/img/menu/dc@2x.png',
      isNew: true,
      label: '订舱',
      url: ''
    }, {
      icon: '/assets/img/menu/cqcx@2x.png',
      isNew: false,
      label: '船期查询',
      url: '/pages/RouterQuery/index'
    }, {
      icon: '/assets/img/menu/hwzz@2x.png',
      isNew: false,
      label: '货物追踪',
      url: ''
    }, {
      icon: '/assets/img/menu/gzp@2x.png',
      isNew: true,
      label: '管制品查询',
      url: ''
    }, {
      icon: '/assets/img/menu/gzfl@2x.png',
      isNew: false,
      label: '柜租费率',
      url: ''
    }, {
      icon: '/assets/img/menu/cxfl@2x.png',
      isNew: false,
      label: '查询费率',
      url: ''
    }]
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
      title: lang.lang.userCenter.querytitle
    })
    console.log(typeof this.getTabBar === 'function' && this.getTabBar());
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        list: lang.lang.toolbar.list //赋值
      })
    }
  },
})