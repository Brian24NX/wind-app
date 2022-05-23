// packageDashboard/pages/document/index.js
const languageUtils = require('../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    keyword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initLanguage()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  initLanguage() {
    const language = languageUtils.languageVersion()
    this.setData({
      languageContent: language.lang.page.document
    })
    wx.setNavigationBarTitle({
      title: language.lang.page.document.title,
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

  search() {},

  sendEmail(e) {
    this.setData({
      showEmail: true,
      sendInfo: e.currentTarget.dataset.item
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
    sendEmail({
      fileName: this.data.businessDetail.emailPath,
      receiveMailAccount: e.detail
    }).then(() => {
      wx.showToast({
        title: languageUtil.languageVersion().lang.page.load.sendSuccess,
        icon: 'none',
        mask: true
      })
      this.setData({
        showEmail: false
      })
    })
  }
})