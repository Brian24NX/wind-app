// pages/Login/index.js
const utils = require('../../utils/util')
import {
  ccgId
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
    ccgId({
      token: data.access_token
    }).then(res=>{
      wx.setStorageSync('ccgId', res.data)
    })
  }
})