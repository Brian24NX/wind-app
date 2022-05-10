// packageMore/pages/about/index.js
const languageUtil = require('../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.homeInfo.about
    })
  },

  copy() {
    wx.setClipboardData({
      data: 'https://www.cma-cgm.com/about/the-group',
      success() {
        wx.showToast({
          title: languageUtil.languageVersion().lang.page.copyInfo.success,
          icon: 'none'
        })
      }
    })
  }
})