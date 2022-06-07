// pages/legalTerms/index.js
const languageUtils = require('../../utils/languageUtils')
const config = require("../../config/config")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: config[config.dev_env].url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.userCenter.legalTerms
    })
  }
})