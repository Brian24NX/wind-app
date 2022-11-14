// packageBooking/pages/ModifyParty/index.js
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
      languageContent: languageUtils.languageVersion().lang.page.modifyParty,
      verifyInfo: languageUtils.languageVersion().lang.page.verifyInfo
    })
  },

  save() {
    wx.navigateBack()
  }
})