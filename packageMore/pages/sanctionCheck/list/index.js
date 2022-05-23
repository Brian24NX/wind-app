// packageMore/pages/sanctionCheck/list/index.js
const languageUtils = require('../../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    keyword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.sanction.title,
    })
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.sanction
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

  // 详情
  toDetail(e) {
    wx.navigateTo({
      url: `/packageMore/pages/sanctionCheck/detail/index?id=${e.currentTarget.dataset.id}`
    })
  }
})