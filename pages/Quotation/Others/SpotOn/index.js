// pages/Quotation/Others/SpotOn/index.js
const languageUtil = require('../../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link: 'https://www.cma-cgm.com/my-cma-cgm/prices/instant-quote-spoton',
    languageContent: {},
    language: 'zh'
  },

  onLoad(options) {
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.qutationResult,
      language: languageUtil.languageVersion().lang.page.langue
    })
  },

  copy() {
    wx.setClipboardData({
      data: this.data.link,
      success() {
        wx.showToast({
          title: languageUtil.languageVersion().lang.page.copyInfo.success,
          mask: true,
          icon: 'none'
        })
      }
    })
  }
})