// pages/Quotation/Others/Remind/index.js
const languageUtil = require('../../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    language: 'zh'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      language: languageUtil.languageVersion().lang.page.langue
    })
  },
})