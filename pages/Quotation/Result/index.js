// pages/Quotation/Result/index.js
const languageUtils = require('../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showEmail: false,
    reference: 'QSPPOT342782'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  copyReference() {
    wx.setClipboardData({
      data: this.data.reference,
      success() {
        wx.showToast({
          title: languageUtils.languageVersion().lang.page.copyInfo.success2,
          icon: 'none',
          mask: true,
          duration: 2000
        })
      }
    })
  },

  sendEmail() {
    this.setData({
      showEmail: true
    })
  },

  closeEmail() {
    this.setData({
      showEmail: false
    })
  },

  sendEmails(e) {
    wx.showLoading({
      title: languageUtil.languageVersion().lang.page.load.send,
      mask: true
    })
  },

  toHome() {
    wx.reLaunch({
      url: '/pages/Home/index',
    })
  },

  toBook() {
    wx.showToast({
      title: languageUtils.languageVersion().lang.page.load.functionIsUnderDevelopment,
      icon: 'none',
      mask: true,
      duration: 2000
    })
  }
})