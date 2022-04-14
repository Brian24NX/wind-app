// pages/ResultDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    routingDetails: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '详情',
    })
    this.dealData()
  },

  dealData() {
    const data = wx.getStorageSync('details')
    this.setData({
      detail: data,
      routingDetails: data.routingDetails
    })
  }
})