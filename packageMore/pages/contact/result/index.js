// packageMore/pages/contact/result/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTop: app.globalData.navTop,
    navHeight: app.globalData.navObj
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  // 返回
  back() {
    wx.navigateBack()
  },

  // 联系我们
  callme(e) {
    const phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },

  // 复制邮箱
  copyEmail(e) {
    const email = e.currentTarget.dataset.email
    wx.setClipboardData({
      data: email,
    })
  }
})