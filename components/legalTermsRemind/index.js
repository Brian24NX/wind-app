// components/legalTermsRemind/index.js
const languageUtils = require('../../utils/languageUtils')
import {
  getUserPhoneNumber
} from '../../api/modules/home'

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
    languageContent: {},
    userCenter: {},
    phoneNumber: '',
  },

  attached() {
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.legalTermsRemind,
      userCenter: languageUtils.languageVersion().lang.page.userCenter,
      phoneNumber: wx.getStorageSync('phone')
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toLogin() {
      this.triggerEvent("toLogin")
    },
    toLegalTerms() {
      wx.navigateTo({
        url: '/pages/legalTerms/index',
      })
    },
    refuse() {
      wx.removeStorageSync('allowLegalTerms')
      this.triggerEvent('setRemind', false)
    },
    onGetPhoneNumber(e) {
      wx.setStorageSync('allowLegalTerms', true)
      this.triggerEvent('setRemind', true)
      if (e.detail.errMsg === "getPhoneNumber:ok") {
        getUserPhoneNumber({
          code: e.detail.code
        }).then(res => {
          this.setData({
            phoneNumber: res.data
          })
          wx.setStorageSync('phone', res.data)
          this.toLogin()
        }).catch(err => {
          console.error(err)
          this.toLogin()
        });
      } else if (e.detail.errMsg === "getPhoneNumber:fail user deny") {
        wx.showModal({
          title: this.data.userCenter.refusedTitle,
          content: this.data.userCenter.refusedText,
          showCancel: false,
          confirmText: this.data.userCenter.refusedButton
        })
      }
    },

  }
})