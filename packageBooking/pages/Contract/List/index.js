// packageBooking/pages/Contract/List/index.js
const languageUtil = require('../../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromLabel: 'BOSTON, NA',
    fromCode: 'US',
    toLabel: 'SHANGHAI',
    toCode: 'CN'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.qutationResult.title2
    })
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.qutationResult,
      language: languageUtil.languageVersion().lang.page.langue
    })
  },
})