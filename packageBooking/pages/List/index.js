// packageBooking/pages/List/index.js
const languageUtils = require('../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    fromLabel: 'SHANGHAI, CN',
    toLabel: 'SINGAPORE, SG',
    routings: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.bookingDetail.title,
    })
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.bookingDetail,
      language: languageUtils.languageVersion().lang.page.langue,
      routings: wx.getStorageSync('bookingRoutings')
    })
  },

  selectLine(e) {
    wx.navigateTo({
      url: '/packageBooking/pages/Detail/index?index=' + e.currentTarget.dataset.index,
    })
  }
})