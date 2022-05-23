// packageDashboard/pages/shipment/detail/index.js
const languageUtils = require('../../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    documentContent: {},
    typeList: ['detailContainer', 'info', 'document'],
    current: 'detailContainer'
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
      languageContent: language.lang.page.shipment,
      documentContent: language.lang.page.document
    })
    wx.setNavigationBarTitle({
      title: language.lang.page.shipment.detailTitle,
    })
  },

  changeType(e) {
    this.setData({
      current: e.currentTarget.dataset.type
    })
  }
})