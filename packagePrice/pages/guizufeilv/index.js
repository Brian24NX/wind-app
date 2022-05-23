// packagePrice/pages/guizufeilv/index.js
const languageUtils = require('../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    verifyInfo: {},
    language: 'zh',
    country: '',
    countryName: '',
    activeNames: 0,
    defaultIndex: 0,
    showPopup: false,
    valueKey: '',
    columns: [],
    showEmail: false,
    sendInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.interLanguage()
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

  interLanguage() {
    const language = languageUtils.languageVersion()
    this.setData({
      languageContent: language.lang.page.guizufeilv,
      language: language.lang.page.langue,
      verifyInfo: language.lang.page.verifyInfo
    })
    wx.setNavigationBarTitle({
      title: language.lang.page.guizufeilv.navBarTitle,
    })
  },

  // 切换展开数据
  onChange(e) {
    this.setData({
      activeNames: e.detail
    })
  },

  openPopup() {
    this.setData({
      showPopup: true
    })
  },

  onConfirm(e) {

  },

  onClose() {
    this.setData({
      showPopup: false
    })
  },

  // 预览
  preview(e) {
    const item = e.currentTarget.dataset.item
    wx.showLoading({
      title: languageUtils.languageVersion().lang.page.load.loading,
      mask: true
    })
    wx.downloadFile({
      url: item.filepath,
      success(filePath) {
        wx.hideLoading()
        wx.openDocument({
          filePath: filePath.tempFilePath,
          showMenu: true
        })
      },
      fail(err) {
        wx.hideLoading()
        wx.showToast({
          title: err.errMsg,
          icon: 'none',
          duration: 3000
        })
      }
    })
  },

  // 下载
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
    const language = languageUtil.languageVersion();
    wx.showLoading({
      title: language.lang.page.load.send,
      mask: true
    })
    sendEmail({
      fileName: this.data.businessDetail.emailPath,
      receiveMailAccount: e.detail
    }).then(() => {
      wx.showToast({
        title: language.lang.page.load.sendSuccess,
        icon: 'none',
        mask: true
      })
      this.setData({
        showEmail: false
      })
    })
  }
})