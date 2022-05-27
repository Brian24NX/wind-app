// pages/baseInfo/index.js
const languageUtils = require('../../utils/languageUtils')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    exitContent: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.baseInfo.title,
    })
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.baseInfo,
      exitContent: languageUtils.languageVersion().lang.page.exit
    })
  },

  // 退出
  exit() {
    const _this = this
    wx.showModal({
      cancelColor: '#666666',
      title: _this.data.exitContent.title,
      cancelText: _this.data.exitContent.cancel,
      confirmColor: '#2D75FF',
      confirmText: _this.data.exitContent.sure,
      success(res) {
        if (res.confirm) {
          wx.reLaunch({
            url: '/pages/Home/index',
          })
        }
      }
    })
  }
})