// pages/Login/index.js
const utils = require('../../utils/util')
import {
  customerProfile
} from '../../api/modules/home'
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

  getMessage(e) {
    // console.log(e)
    const data = e.detail.data[0]
    wx.setStorageSync('access_token', data.access_token)
    wx.setStorageSync('expires_time', utils.setExpiresTime(data.expires_in))
    customerProfile({
      token: wx.getStorageSync('access_token')
    }).then(res => {
      console.log(res)
      wx.setStorageSync('userInfo', res.data)
    })
  }
})