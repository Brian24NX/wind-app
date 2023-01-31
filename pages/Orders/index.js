// pages/Orders/index.js
var languageUtil = require('../../utils/languageUtils')
const dayjs = require("dayjs");
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
    showRemind: false,
    loading: true,
    noData: false,
    list: [],
    results: [],
    showSearch: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initLanguage()
    if (options.showSearch) {
      this.setData({
        showSearch: false
      })
    }
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

  searchList() {
    const _this = this
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
    const huoguiStr = this.data.shipmentRef.replaceAll(' ', '')
    const huogui = (huoguiStr.charAt(huoguiStr.length - 1) === ',' ? huoguiStr.substr(0, huoguiStr.length - 2) : huoguiStr).split(',')
    var reg = /[A-Z]{3}[UJZ][0-9]{7}$/;
    const checkRes = []
    huogui.forEach(item => {
      checkRes.push(reg.test(item.trim()))
    })
    if (checkRes.length > 1 && checkRes.filter(i => i).length !== checkRes.length) {
      wx.showToast({
        title: _this.data.verifyInfo.only,
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
      limit: 100,
      businessPartnerCodes: []
    }
    if (wx.getStorageSync('access_token') && wx.getStorageSync('partnerList').length) {
      obj.businessPartnerCodes = wx.getStorageSync('partnerList').map(i => i.code)
    }
    this.setData({
      loading: true,
      noData: false,
      list: []
    })
    shipmentTracking(obj).then(res => {
      this.setData({
        loading: false
      })
      const data = res.data;
      if (!data) {
        this.setData({
          noData: true
        })
        return
      }
      let containers = []
      // console.log("Order组件==>", containers, data.map(d => d.shipmentRef))
      this.setData({
        results: data.map(d => d.shipmentRef)
      })

      data.forEach(route => {
        // console.log("遍历data==>", route.data)
        if (route.data && route.data.length) {
          containers = containers.concat(route.data)
        }
      })

      containers.forEach(item => {
        const movements = JSON.parse(JSON.stringify(item.movement)).reverse()
        item.movement = []

        if (!wx.getStorageSync('access_token') && (item.containerRef === '' || item.equipmentSize === '')) {
          this.setData({
            noData: true
          })
        }

        movements.forEach(move => {
          if (!(move.eventClassifierCode === 'PLN' && dayjs(move.eventDateTime).isBefore(dayjs(), 'second')) && move.eventDateTime) {
            item.movement.push(move)
          }
        })
      })

      const length = containers.filter(item => item.movement.length).length
      if (!length) {
        this.setData({
          noData: true
        })
      }
      this.setData({
        list: containers
      })
    })
  }
})