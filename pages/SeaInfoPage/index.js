// pages/SeaInfoPage/index.js

var languageUtils = require('../../utils/languageUtils')




Page({

  /**
   * Page initial data
   */
  data: {
    languageContent: {}, // 用于保存当前页面所需字典
    seaReward: {},
    foldRate: true,
    foldRate2: true,
    foldRate3: true,
    foldRate4: true,




  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad() {
    this.initLanguage();
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.seaReward.seaRewardInformation
    })

  },

    // 折叠
  zhedie(e) {
    this.setData({
      [e.currentTarget.dataset.type]: !this.data[e.currentTarget.dataset.type]
    })
  },

  onClick1() {
    wx.showToast({
      title: 'Function coming soon, stay tuned',
      icon: 'none'
    })
    return
  },

  onClick2() {
    wx.switchTab({
      url: '/pages/Quotation/Search/index',
    })
  },

  initLanguage() {
    //获取当前小程序语言版本所对应的字典变量
    var lang = languageUtils.languageVersion()
    this.setData({
      languageContent: lang.lang.page.userCenter,
      seaReward: lang.lang.page.seaReward
    })
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        list: lang.lang.toolbar.list //赋值
      })
    }
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})