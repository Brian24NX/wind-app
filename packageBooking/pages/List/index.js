// packageBooking/pages/List/index.js
const languageUtils = require('../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    fromLabel: 'SHANGHAI, CN',
    toLabel: 'SINGAPORE, SG'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.bookingDetail.title,
    })
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.bookingDetail
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  selectLine() {
    wx.navigateTo({
      url: '/packageBooking/pages/Detail/index',
    })
  }
})