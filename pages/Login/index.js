// pages/Login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  getMessage(e) {
    // console.log(e)
    const data = e.detail.data[0]
    wx.showToast({
      title: data.access_token,
      icon: 'none'
    })
  }
})