// packageMore/pages/Faq/index.js
const config = require("../../../config/config")
const languageUtil = require('../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: config[config.dev_env].url,
    language: 'cn',
    needBottom: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.homeInfo.onlineServices
    })
    this.setData({
      language: languageUtil.languageVersion().lang.page.langue
    })
    if (getApp().globalData.isPhoneX) {
      this.setData({
        needBottom: '1'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

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

  }
})