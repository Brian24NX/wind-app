// packageDashboard/pages/shipment/list/index.js
const languageUtils = require('../../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    keyword: '',
    typeList: ['shipment', 'container'],
    current: 'shipment'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initLanguage()
  },

  initLanguage() {
    const language = languageUtils.languageVersion()
    this.setData({
      languageContent: language.lang.page.shipment
    })
    wx.setNavigationBarTitle({
      title: language.lang.page.shipment.title,
    })
  },

  setInput(e) {
    this.setData({
      keyword: e.detail.value
    })
  },

  deleteValue() {
    this.setData({
      keyword: ''
    })
    this.search()
  },

  changeType(e) {
    this.setData({
      current: e.currentTarget.dataset.type
    })
  },

  search() {},
})