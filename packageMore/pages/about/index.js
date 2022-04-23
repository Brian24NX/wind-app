// packageMore/pages/about/index.js
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
    wx.setNavigationBarTitle({
      title: '关于达飞'
    })
  },

  copy() {
    wx.setClipboardData({
      data: 'https://www.cma-cgm.com/about/the-group',
      success() {
        wx.showToast({
          title: '已复制，请前往手机浏览器打开',
          icon: 'none'
        })
      }
    })
  }
})