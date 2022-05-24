// packagePrice/pages/chargeFinderResult/index.js
const languageUtils = require('../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    typeList: ['main', 'other'],
    current: 'main'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initLanguage()
  },

  initLanguage() {
    const language = languageUtils.languageVersion()
    this.setData({
      languageContent: language.lang.page.chargeFinder
    })
    wx.setNavigationBarTitle({
      title: language.lang.page.chargeFinder.detailTitle
    })
  },

  changeType(e) {
    this.setData({
      current: e.currentTarget.dataset.type
    })
  }
})