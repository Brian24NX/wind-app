// pages/Quotation/Others/SpotOn/index.js
const languageUtils = require('../../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link: 'https://www.cma-cgm.com/my-cma-cgm/prices/instant-quote-spoton'
  },

  copy() {
    wx.setClipboardData({
      data: this.data.link,
      success() {
        wx.showToast({
          title: languageUtils.languageVersion().lang.page.copyInfo.success,
          mask: true,
          icon: 'none'
        })
      }
    })
  }
})