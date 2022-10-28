// pages/setLanguage/index.js
const languageUtils = require('../../utils/languageUtils')
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
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.setLanguage.title
    })
    this.setData({
      language: languageUtils.languageVersion().lang.page.langue
    })
  },


  //中英文切换
  switchLanguage(e) {
    const language = e.currentTarget.dataset.language
    if (language === this.data.language) return
    //切换当前版本，即修改公共变量中的version
    languageUtils.changLanguage(language)
    wx.reLaunch({
      url: '/pages/Home/index',
    })
  }
})