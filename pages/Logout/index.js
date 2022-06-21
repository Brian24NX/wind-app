// pages/logout/index.js
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

  back() {
    wx.removeStorageSync('access_token')
    wx.removeStorageSync('expires_time')
    wx.removeStorageSync('userInfo')
    wx.removeStorageSync('ccgId')
    setTimeout(()=>{
      wx.reLaunch({
        url: '/pages/Home/index',
      })
    }, 1500)
  }
})