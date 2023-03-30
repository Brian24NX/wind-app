// components/needLogin/index.js
const languageUtils = require('../../utils/languageUtils')
const config = require('../../config/config')

import {
  bindPhone,
  checkPhoneBind,
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
    phoneNumber: ''
  },

  attached() {
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.load,
      userCenter: languageUtils.languageVersion().lang.page.userCenter,
      phoneNumber: wx.getStorageSync('phone')
    })

    //检查是否绑定手机号
    let openId = wx.getStorageSync('openId')
    let phone = wx.getStorageSync('phone')
    let account = wx.getStorageSync('account')

    if (openId && phone && account) {
      this.checkBindStatus()
    } else {
      if (!openId) {
        wx.login({
          success(res) {
            wx.request({
              url: config[config.dev_env].url + '/api/miniapp/wx/user/login?code=' + res.code,
              success(data) {
                wx.setStorageSync('openId', data.data.data)
              }
            })
          }
        })
        this.checkBindStatus()
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toLogin() {
      this.triggerEvent("toLogin")
    },
    copy() {
      const url = 'https://www.cma-cgm.com/ebusiness/registration/information'
      wx.setClipboardData({
        data: url,
        success() {
          wx.showToast({
            title: languageUtils.languageVersion().lang.page.copyInfo.success,
            icon: 'none',
            mask: true,
            duration: 2000
          })
        }
      })
    },
    onGetPhoneNumber(e) {
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
    checkBindStatus() {
      let openId = wx.getStorageSync('openId')
      let phone = wx.getStorageSync('phone')
      let account = wx.getStorageSync('account')

      checkPhoneBind({
        "account": account,
        "openId": openId,
        "phoneNumber": phone
      }).then(res => {
        if (res.data === "2") {
          bindPhone({
            "account": account,
            "openId": openId,
            "phoneNumber": phone
          }).then(res => {
            console.log('成功绑定手机')
            wx.setStorageSync('bindDate', new Date())
            wx.setStorageSync('phone', phone)
          }).catch(err => {
            console.error(err)
          })
        }
      })
    },
  }
})
