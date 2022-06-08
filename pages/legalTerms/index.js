// pages/legalTerms/index.js
const languageUtils = require('../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.legalTerms.title
    })
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.legalTerms
    })
  },

  copy(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.url,
      success() {
        wx.showToast({
          title: languageUtils.languageVersion().lang.page.copyInfo.success,
          icon: 'none',
          duration: 3000
        })
      }
    })
  }
})