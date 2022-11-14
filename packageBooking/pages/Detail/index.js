// packageBooking/pages/Detail/index.js
const languageUtils = require("../../../utils/languageUtils")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    verifyInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.bookingDetail.bookingDetail,
    })
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.bookingDetail,
      verifyInfo: languageUtils.languageVersion().lang.page.verifyInfo
    })
  },
  
  toModifyParty() {
    wx.navigateTo({
      url: '/packageBooking/pages/ModifyParty/index',
    })
  }
})