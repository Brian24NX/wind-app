// packagePrice/pages/DNDCharge/index.js
var languageUtil = require('../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentType: 1,
    languageContent: {}
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.DDP
    })
  },

  changeType(e) {
    this.setData({
      currentType: Number(e.currentTarget.dataset.type)
    })
  }
})