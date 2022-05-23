// pages/baseInfo/index.js
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
      title: languageUtils.languageVersion().lang.page.baseInfo.title,
    })
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.baseInfo
    })
  },

  // 退出
  exit() {
    wx.showModal({
      cancelColor: '#666666',
      title: _this.data.changeLanguage.changLanguage,
      cancelText: _this.data.changeLanguage.cancel,
      confirmColor: '#2D75FF',
      confirmText: _this.data.changeLanguage.sure,
      success(res) {
        if (res.confirm) {
          languageUtil.changLanguage()
          wx.reLaunch({
            url: '/pages/Home/index',
          })
        }
      }
    })
  }
})