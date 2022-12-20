// packagePrice/pages/calculatedCharges/index.js
const app = getApp();
var languageUtil = require('../../../utils/languageUtils')
const utils = require('../../../utils/util')
const dayjs = require("dayjs")
import {
  freightContainerSearch,
  calculatedCharge
} from '../../api/modules/price';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {}, // 用于保存当前页面所需字典
    verifyInfo: {},
    language: 'zh',
    isShow: false,
    result: [],
    tabList: [{
      id: 'byShipment'
    }, {
      id: 'byContainer'
    }],
    actived: 'byShipment',
    containers: [],
    huoGuiValue: '',
    showRemind: false,
    showRemind2: false,
    showDelete1: false,
    showDelete2: false,
    // 日期组件
    showDatePopup: false,
    currentDate: null,
    date: '',
    errTip: '',
    noContainer: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initLanguage();
    this.setData({
      date: this.getDate()
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  //初始化语言
  initLanguage() {
    const language = languageUtil.languageVersion().lang.page
    wx.setNavigationBarTitle({
      title: language.NewDDCharges.title,
    })
    //获取当前小程序语言版本所对应的字典变量
    this.setData({
      languageContent: language.NewDDCharges,
      verifyInfo: language.verifyInfo
    })
  },

  // 切换搜索类型
  changeSearchTab(e) {
    this.setData({
      actived: e.currentTarget.dataset.type,
      huoGuiValue: '',
      errTip: '',
      showRemind: false,
      showRemind2: false,
      containers: [],
      result: [],
      noContainer: false
    })
  },

  onChange(event) {
    this.setData({
      result: event.detail
    });
  },

  getDate() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    month = month < 10 ? ('0' + month) : month;
    let day = now.getDate();
    day = day < 10 ? ('0' + day) : day
    return year + '-' + month + '-' + day;
  },

  openPopup(e) {
    if (e.currentTarget.dataset.type === '1' || e.currentTarget.dataset.type === '2') {
      const date = this.data.date.replaceAll('-', '/')
      this.setData({
        currentDate: new Date(date).getTime(),
        showDatePopup: true
      })
      return
    }
    this.setData({
      popupType: e.currentTarget.dataset.type,
      columns: e.currentTarget.dataset.type === '1' ? this.data.searchlist : this.data.weeklist,
      valueKey: e.currentTarget.dataset.type === '1' ? 'method' : 'weeks',
      defaultIndex: e.currentTarget.dataset.type === '1' ? this.data.search : this.data.week - 1,
      showPopup: true
    })
  },

  closeDate() {
    this.setData({
      showDatePopup: false
    })
  },

  confirmDate(e) {
    this.setData({
      date: dayjs(e.detail).format('YYYY-MM-DD'),
      showDatePopup: false
    })
  },

  searchResult() {
    this.setData({
      noContainer: false
    })
    if (!this.data.huoGuiValue) {
      this.setData({
        showRemind2: true,
        showRemind: false
      })
      return
    }
    var reg = /^[0-9a-zA-Z]*$/g;
    // 不包含，类型的数据
    if (!reg.test(this.data.huoGuiValue)) {
      this.setData({
        showRemind2: false,
        showRemind: true
      })
      return
    }
    freightContainerSearch({
      bookingReference: this.data.huoGuiValue,
      range: 1
    }).then(res => {
      this.setData({
        containers: res.data,
        noContainer: !res.data.length
      })
    })

  },

  clearInput() {
    this.setData({
      huoGuiValue: '',
      showRemind2: false,
      showRemind: false
    })
  },

  setHuoGui(e) {
    //去掉空格和大写问题
    let value = e.detail.value.toUpperCase()
    let regvalue = value.trim()
    this.setData({
      huoGuiValue: regvalue,
      showRemind: false,
      showRemind2: false
    })
  },

  calculatedCharges() {
    this.setData({
      errTip: ''
    })
    let params = {}
    if (this.data.actived === 'byShipment') {
      params = {
        shippingCompany: '0001',
        req: {
          chargeCalculationDate: this.data.date,
          containers: this.data.result,
          shipmentReference: [this.data.huoGuiValue]
        }
      }
    } else {
      // 不包含，类型的数据
      console.log(this.data.huoGuiValue)
      if (!this.data.huoGuiValue) {
        this.setData({
          showRemind2: true,
          showRemind: false
        })
        return
      }
      var reg = /^[0-9a-zA-Z]*$/g;
      // 不包含，类型的数据
      if (!reg.test(this.data.huoGuiValue)) {
        this.setData({
          showRemind2: false,
          showRemind: true
        })
        return
      }
      params = {
        shippingCompany: '0001',
        req: {
          chargeCalculationDate: this.data.date,
          containers: [this.data.huoGuiValue],
          shipmentReference: []
        }
      }
    }
    calculatedCharge(params).then(res => {
      console.log(res)
      if (res.data && res.data.length) {
        wx.setStorageSync('calculatedChargeResult', res.data)
      } else {
        wx.removeStorageSync('calculatedChargeResult')
      }
      wx.navigateTo({
        url: '/packagePrice/pages/calculatedChargeResult/index',
      })
    }, err => {
      this.setData({
        errTip: err.message
      })
    })
  },
})