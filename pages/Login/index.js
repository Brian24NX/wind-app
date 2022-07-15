// pages/Login/index.js
const utils = require('../../utils/util')
const config = require('../../config/config')
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
  onLoad() {},

  getMessage(e) {
    const data = e.detail.data[0]
    console.log(data)
    if (!data.status) {
      wx.setStorageSync('access_token', data[0].access_token)
      wx.setStorageSync('expires_time', utils.setExpiresTime(data[0].expires_in))
      let userInfo = data[0].customer
      if (data[0].profilerights && data[0].profilerights.length) {
        wx.setStorageSync('partnerCode', data[0].profilerights[0].partner.code)
      }
      if (userInfo) {
        wx.setStorageSync('ccgId', userInfo.ccgId)
        userInfo.lastName = userInfo.lastName ? userInfo.lastName.toLocaleUpperCase() : ''
        if (userInfo.lastName && userInfo.firstName) {
          userInfo.avatar = userInfo.firstName.substr(0, 1) + userInfo.lastName.substr(0, 1)
        }
        wx.setStorageSync('userInfo', userInfo)
      }
    }
  }
})