// components/legalTermsRemind/index.js
const languageUtils = require('../../utils/languageUtils')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    languageContent: {}
  },

  attached() {
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.legalTermsRemind
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toLegalTerms() {
      wx.navigateTo({
        url: '/pages/legalTerms/index',
      })
    },
    allow() {
      wx.setStorageSync('allowLegalTerms', true)
      this.triggerEvent('setRemind', true)
    },
    refuse() {
      wx.removeStorageSync('allowLegalTerms')
      this.triggerEvent('setRemind', false)
    }
  }
})