// pages/Orders/index.js
var languageUtil = require('../../utils/languageUtils')
import {
  shipmentTracking
} from '../../api/modules/home';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    verifyInfo: {},
    shipmentRef: '',
    dataLength: null,
    detail: null,
    showRemind: false,
    loading: true,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initLanguage()
    if (options.str) {
      this.setData({
        shipmentRef: options.str
      })
      this.getHuoGuiResult()
    }
  },

  initLanguage() {
    //获取当前小程序语言版本所对应的字典变量
    var lang = languageUtil.languageVersion()
    lang.lang.page.queryRes.language = lang.lang.page.langue
    wx.setNavigationBarTitle({
      title: lang.lang.page.queryRes.topTitle,
    })
    this.setData({
      languageContent: lang.lang.page.queryRes,
      verifyInfo: lang.lang.page.verifyInfo
    })
  },

  deleteValue() {
    this.setData({
      shipmentRef: '',
      showRemind: true,
      huiguiType: 1
    })
  },

  changeHuoguiValue(e) {
    //去掉空格和大写问题
    let value = e.detail.value.toUpperCase()
    let regvalue = value.trim()
    this.setData({
      shipmentRef: value
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
      const arr = value2.split(',').map(item=>item.trim())
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

  searchList() {
    if (this.data.showRemind) {
      const remindMsg = this.data.huiguiType === 1 ? this.data.verifyInfo.required : this.data.huiguiType === 2 ? this.data.verifyInfo.gswx : this.data.huiguiType === 3 ? this.data.verifyInfo.more3 : this.data.verifyInfo.chongfu
      wx.showToast({
        title: remindMsg,
        icon: 'none',
        mask: true,
        duration: 3000
      })
      return
    }
    this.getHuoGuiResult()
  },

  getHuoGuiResult() {
    let obj = {
      shipmentRef: this.data.shipmentRef,
      eqpid: ''
    }
    this.setData({
      loading: true
    })
    shipmentTracking(obj).then(res => {
      this.setData({
        loading: false
      })
      const data = res.data;
      if (!data.length || (data.length === 1 && !data[0].data)) {
        this.setData({
          dataLength: 0,
          list: data
        })
      } else {
        const dataLength = data.filter(u => u.data).length;
        if (!dataLength) {
          this.setData({
            dataLength: 0,
            list: data
          })
          return
        }
        if (data.length === 1 && data[0].data.routes.length === 1 && data[0].data.routes[0].containers.length === 1) {
          this.setData({
            dataLength: 1,
            detail: data[0].data.routes[0].containers[0],
            list: data
          })
        } else {
          this.setData({
            dataLength: 2,
            list: data
          })
        }
      }
    })
  }
})