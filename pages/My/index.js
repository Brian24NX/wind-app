// pages/my/index.js
const app = getApp();
const languageUtils = require('../../utils/languageUtils')
const utils = require('../../utils/util')
import {
  customerProfile
} from '../../api/modules/home'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navTop: app.globalData.navTop,
    navHeight: app.globalData.navObj,
    languageContent: {}, // 用于保存当前页面所需字典
    dashboardList: [{
      label: 'shipment',
      url: '/packageDashboard/pages/shipment/list/index',
      icon: '/assets/img/myAccount/shipment@2x.png'
    }, {
      label: 'document',
      url: '/packageDashboard/pages/document/index',
      icon: '/assets/img/myAccount/document@2x.png'
    }],
    needLogin: false,
    userInfo: {},
    showRemind: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.initLanguage();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (utils.checkAccessToken()) {
      let userInfo = wx.getStorageSync('userInfo')
      if (!userInfo) {
        customerProfile({
          token: wx.getStorageSync('access_token')
        }).then(res => {
          let userInfo = res.data[0].customer
          if (userInfo) {
            wx.setStorageSync('userInfo', userInfo)
            if (userInfo.lastName && userInfo.firstName) {
              userInfo.avatar = userInfo.lastName.substr(0, 1) + userInfo.firstName.substr(0, 1)
            }
            this.setData({
              userInfo
            })
          }
        })
      } else {
        if (userInfo.lastName && userInfo.firstName) {
          userInfo.avatar = userInfo.lastName.substr(0, 1) + userInfo.firstName.substr(0, 1)
        }
        this.setData({
          userInfo
        })
      }
      this.setData({
        needLogin: false
      })
    } else {
      this.setData({
        needLogin: true,
        userInfo: {}
      })
    }
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  },

  //初始化语言
  initLanguage() {
    //获取当前小程序语言版本所对应的字典变量
    var lang = languageUtils.languageVersion()
    this.setData({
      languageContent: lang.lang.page.userCenter,
    })
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        list: lang.lang.toolbar.list //赋值
      })
    }
  },

  // 去登录
  toLogin() {
    if (wx.getStorageSync('allowLegalTerms')) {
      wx.navigateTo({
        url: '/pages/Login/index',
      })
    } else {
      this.setData({
        showRemind: true
      })
    }
  },

  toBaseInfo() {
    wx.navigateTo({
      url: '/pages/baseInfo/index',
    })
  },

  // 我的概览
  toDashboard(e) {
    if (this.data.needLogin) {
      wx.showToast({
        title: languageUtils.languageVersion().lang.page.load.noLogin,
        icon: 'none',
        duration: 3000
      })
      setTimeout(() => {
        if (wx.getStorageSync('allowLegalTerms')) {
          wx.navigateTo({
            url: '/pages/Login/index',
          })
        } else {
          this.setData({
            showRemind: true
          })
        }
      }, 3000)
      return
    }
    if (e.currentTarget.dataset.url) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    } else {
      wx.showToast({
        title: languageUtils.languageVersion().lang.page.load.functionIsUnderDevelopment,
        icon: 'none'
      })
    }
  },

  // 设置语言
  setLanguage() {
    wx.navigateTo({
      url: '/pages/setLanguage/index',
    })
  },

  // 隐私政策
  legalTerms() {
    wx.navigateTo({
      url: '/pages/legalTerms/index',
    })
  },

  setRemind(e) {
    this.setData({
      showRemind: false
    })
    if (e.detail) {
      wx.navigateTo({
        url: '/pages/Login/index',
      })
    }
  }
})