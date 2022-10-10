// packageMore/pages/about/index.js
const languageUtil = require('../../../utils/languageUtils')
import {
  analysis
} from '../../../api/modules/home'
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
    analysis({
      analysisType: 6,
      operateType: 1,
      statisti: 5
    })
  },

  onShareAppMessage: function () {},

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