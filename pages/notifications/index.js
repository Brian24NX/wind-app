// pages/my/index.js
const app = getApp();
const languageUtils = require('../../utils/languageUtils')
import {
  querySubscribe,
  addSubscribe,
  updateSubscribe,
  deleteSubscribe
} from '../../api/modules/notifications';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    navTop: app.globalData.navTop,
    navHeight: app.globalData.navObj,
    languageContent: {}, // 用于保存当前页面所需字典
    ccgid: "",
    openid: "",
    newSubs: [{
      id: 1,
      name: "booking",
      flag: 0,
      isFlag: false,
      isSubscribed: false,
    },
    {
      id: 2,
      name: "vgm",
      flag: 0,
      isFlag: false,
      isSubscribed: false,
    },
    {
      id: 3,
      name: "eta",
      flag: 0,
      isFlag: false,
      isSubscribed: false,
    },
    {
      id: 4,
      name: "container",
      flag: 0,
      isFlag: false,
      isSubscribed: false,
    },
    {
      id: 5,
      name: "invoice",
      flag: 0,
      isFlag: false,
      isSubscribed: false,
    },
    {
      id: 6,
      name: "eir",
      flag: 0,
      isFlag: false,
      isSubscribed: false,
    }
    ],
    getSubs: [],
    formData: {
      id: 0,
      flag: 0,
      isSubscribed: false
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.toLogin();
    this.initLanguage();
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.manageNotifications.title
    })
    this.setData({
      ccgid: wx.getStorageSync('ccgId'),
      openid: wx.getStorageSync('openId')
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync('ccgId')) {
      this.getSubscribeData();
    }
  },

  //初始化语言
  initLanguage() {
    //获取当前小程序语言版本所对应的字典变量
    var lang = languageUtils.languageVersion()
    this.setData({
      languageContent: lang.lang.page.manageNotifications,
    })
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        list: lang.lang.toolbar.list //赋值
      })
    }
  },

  // 去登录
  toLogin() {
    if (!wx.getStorageSync('ccgId')) {
      wx.showToast({
        title: languageUtils.languageVersion().lang.page.load.noLogin,
        icon: 'none',
        mask: true,
        duration: 2000
      })
      wx.removeStorageSync('expires_time')
      wx.removeStorageSync('access_token')
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/Login/index',
        })
      }, 500)
    }
  },

  //获取用户订阅数据
  getSubscribeData() {
    querySubscribe({
      ccgId: wx.getStorageSync('ccgId'),
      openId: wx.getStorageSync('openId')
    }).then(res => {
      if (res.data.length > 0) {
        this.setData({
          getSubs: res.data,
          ccgid: wx.getStorageSync('ccgId'),
          openid: wx.getStorageSync('openId')
        })

        this.data.getSubs.forEach(sub => {
          let index = this.data.newSubs.findIndex((item) => sub.subscribe === item.id);
          let key = "newSubs[" + index + "]"
          this.setData({
            [key]: {
              id: sub.subscribe,
              flag: sub.flag,
              isFlag: sub.flag > 0 ? true : false,
              isSubscribed: true,
            }
          })
        });
      }
    }, () => {
      this.getSubscribeData()
    })
  },

  //新增订阅数据
  addSubscribeData() {
    if (this.data.ccgid && this.data.openid) {
      addSubscribe({
        ccgid: this.data.ccgid,
        openid: this.data.openid,
        flag: this.data.formData.flag,
        subscribe: this.data.formData.id,
      }).then(res => {
        this.setData({
          getSubs: res.data
        })
      }, () => {
        this.addSubscribe()
      })
    } else {
      wx.showToast({
        title: languageUtils.languageVersion().lang.page.load.noLogin,
        icon: 'none',
        mask: true,
        duration: 2000
      })
      wx.removeStorageSync('expires_time')
      wx.removeStorageSync('access_token')
      setTimeout(() => {
        this.toLogin()
      }, 500)
    }
  },

  //修改订阅数据
  updateSubscribeData() {
    if (this.data.ccgid && this.data.openid) {
      updateSubscribe({
        ccgid: this.data.ccgid,
        openid: this.data.openid,
        flag: this.data.formData.flag,
        subscribe: this.data.formData.id,
      }).then(res => {
        console.log('修改订阅', res.message)
      }, () => {
        this.addSubscribe()
      })
    } else {
      wx.showToast({
        title: languageUtils.languageVersion().lang.page.load.noLogin,
        icon: 'none',
        mask: true,
        duration: 2000
      })
      wx.removeStorageSync('expires_time')
      wx.removeStorageSync('access_token')
      setTimeout(() => {
        this.toLogin()
      }, 500)
    }
  },

  //删除订阅数据
  deleteSubscribeData() {
    if (this.data.ccgid && this.data.openid) {
      deleteSubscribe({
        ccgId: this.data.ccgid,
        openId: this.data.openid,
        subscribe: this.data.formData.id,
      }).then(res => {
        this.setData({
          'formData.isSubscribed': false,
          'formData.flag': 0,
        })
      }, () => {
        this.addSubscribe()
      })
    } else {
      wx.showToast({
        title: languageUtils.languageVersion().lang.page.load.noLogin,
        icon: 'none',
        mask: true,
        duration: 2000
      })
      wx.removeStorageSync('expires_time')
      wx.removeStorageSync('access_token')
      setTimeout(() => {
        this.toLogin()
      }, 500)
    }
  },

  switchChange(e) {
    let recordKey = "newSubs[" + e.target.id + "]"
    this.setData({
      formData: {
        id: Number(e.target.id) + 1,
        isSubscribed: e.detail,
        flag: this.data.formData.flag,
      },
      [recordKey]: {
        id: Number(e.target.id) + 1,
        flag: e.detail ? this.data.formData.flag : 0,
        isFlag: e.detail ? this.data.formData.flag > 0 ? true : false : false,
        isSubscribed: e.detail,
      }
    })

    //打开开关新增，关闭删除
    if (e.detail) {
      this.addSubscribeData()
    } else {
      this.deleteSubscribeData()
    }
  },

  checkChange(e) {
    let recordKey1 = "newSubs[" + e.target.id + "].flag"
    let recordKey2 = "newSubs[" + e.target.id + "].isFlag"
    this.setData({
      formData: {
        id: Number(e.target.id) + 1,
        flag: e.detail ? 1 : 0,
        isSubscribed: this.data.newSubs[e.target.id].isSubscribed,
      },
      [recordKey1]: e.detail ? 1 : 0,
      [recordKey2]: e.detail,
    })

    if (this.data.formData.isSubscribed) {
      this.updateSubscribeData()
    }
  },

  copy() {
    const url = 'https://www.cma-cgm.com/ebusiness/subscription/dashboard'
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
  }
})