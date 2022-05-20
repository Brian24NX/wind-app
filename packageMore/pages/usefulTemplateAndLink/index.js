// packageMore/pages/usefulTemplateAndLink/index.js
const languageUtils = require('../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    keyword: '',
    current: 'template',
    typeList: ['template', 'link'],
    showEmail: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.useful.title,
    })
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.useful
    })
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

  // 切换类型
  changeType(e) {
    this.setData({
      current: e.currentTarget.dataset.type
    })
  },

  // 输入框
  setInput(e) {
    this.setData({
      keyword: e.detail.value
    })
  },

  // 删除
  deleteValue() {
    this.setData({
      keyword: ''
    })
  },

  // 搜索
  search() {},

  // 发送邮件
  sendEmail() {
    this.setData({
      showEmail: true
    })
  },

  sendEmails() {

  },

  closeEmail() {
    this.setData({
      showEmail: false
    })
  },

  // 复制
  copy(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.value,
      success() {
        wx.showToast({
          title: languageUtils.languageVersion().lang.page.copyInfo.success,
          icon: 'none'
        })
      }
    })
  }
})