// packageMore/pages/Faq/index.js
const config = require("../../../config/config")
const languageUtil = require('../../../utils/languageUtils')
import {
  analysis
} from '../../../api/modules/home'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: config[config.dev_env].url,
    language: '',
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
    analysis({
      analysisType: 6,
      operateType: 1,
      statisti: 6
    })
  },

  onShareAppMessage: function () {},
})