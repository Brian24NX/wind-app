// pages/Shipment/index.js
const languageUtil = require('../../utils/languageUtils')
const utils = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {}, // 用于保存当前页面所需字典
    verifyInfo: {},
    showRemind: false,
    huiguiType: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initLanguage();
  },

  clearInput() {
    this.setData({
      huoGuiValue: '',
      showRemind: false,
      huiguiType: 1
    })
  },

  setHuoGui(e) {
    //去掉空格和大写问题
    let value = e.detail.value.toUpperCase()
    let regvalue = value.trim()
    this.setData({
      huoGuiValue: value
    })
    if (!value) {
      this.setData({
        showRemind: true,
        huiguiType: 1
      })
      return
    }
    var reg = /^([ ]*[A-z0-9]+([\,\，]*)){0,3}$/;
    // 不包含，类型的数据
    if (!reg.test(regvalue)) {
      this.setData({
        // huoGuiValue: value,
        showRemind: true,
        huiguiType: value.split(',').length > 3 ? 3 : 2
      })
      return
    }
    const value2 = (value.substr(value.length - 1, 1) === ',' || value.substr(value.length - 1, 1) === '，') ? value.substr(0, value.length - 1) : value
    if (value2.split(',').length >= 2 && value2.split(',').length <= 3) {
      const arr = value2.split(',').map(item => item.trim())
      var newArr = arr.filter(function (value, index, self) {
        return self.indexOf(value) === index;
      });
      if (newArr.length !== arr.length) {
        this.setData({
          showRemind: true,
          huiguiType: 4
        })
        return
      }
    }
    this.setData({
      showRemind: false
    })
  },

  // 货物追踪
  toHuoWu() {
    if (this.data.showRemind) {
      return
    }
    if (!this.data.huoGuiValue) {
      this.setData({
        showRemind: true,
        huiguiType: 1
      })
      return
    }
    wx.navigateTo({
      url: `/pages/Orders/index?str=${this.data.huoGuiValue.replaceAll(' ', '')}`
    })
  },

  //初始化语言
  initLanguage() {
    //获取当前小程序语言版本所对应的字典变量
    var lang = languageUtil.languageVersion()
    wx.setNavigationBarTitle({
      title: lang.lang.page.homeInfo.TRACKING
    })
    this.setData({
      languageContent: lang.lang.page.homeInfo,
      verifyInfo: lang.lang.page.verifyInfo
    })
  },
})