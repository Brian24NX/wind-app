// pages/SeaInfoPage/index.js
// const languageUtil = require('../../../utils/languageUtils')


Page({

  /**
   * Page initial data
   */
  data: {
    // languageContent: {}
    foldRate: true,
    foldRate2: true,
    foldRate3: true,
    foldRate4: true,




  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad() {
    // const languages = languageUtil.languageVersion().lang.page
    // this.setData({
    //   languageContent: languages.SeaRewardInfo,
    // })

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