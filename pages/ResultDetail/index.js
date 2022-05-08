// pages/ResultDetail/index.js
const languageUtil = require('../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    detail: {},
    routingDetails: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.routeDetails.title,
    })
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.routeDetails,
      language: languageUtil.languageVersion().lang.page.langue
    })
    this.dealData()
  },

  dealData() {
    const data = wx.getStorageSync('details')
    this.setData({
      detail: data,
      routingDetails: data.routingDetails
    })
  }
})