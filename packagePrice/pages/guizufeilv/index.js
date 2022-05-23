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
    columns: []
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  interLanguage() {
    const language = languageUtils.languageVersion()
    this.setData({
      languageContent: language.lang.page.guizufeilv,
      language: language.lang.page.langue,
      verifyInfo: language.lang.page.verifyInfo
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
  }
})