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
    noContainer: false,
    noMore: false,
    page: 1,
    minDate: new Date().setFullYear(new Date().getFullYear() - 2),
    maxDate: new Date().setFullYear(new Date().getFullYear() + 7)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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
      result: event.detail,
      showRemind3: false
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

  getMoreContainer() {
    if (this.data.noMore) return
    this.setData({
      page: ++this.data.page
    })
    this.getContainerList()
  },

  searchResult() {
    this.setData({
      noContainer: false,
      containers: [],
      result: [],
      noMore: false,
      page: 1
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
    this.getContainerList()
  },

  getContainerList() {
    freightContainerSearch({
      bookingReference: this.data.huoGuiValue,
      range: this.data.page
    }).then(res => {
      if (res.data && res.data.length) {
        this.setData({
          containers: this.data.containers.concat(res.data.filter(i => i.containerNumber))
        })
      }
      if (!res.data || !res.data.length || res.data.length < 50) {
        this.setData({
          noMore: true
        })
      }
      if (this.data.page === 1 && (!res.data || !res.data.length)) {
        this.setData({
          noContainer: true
        })
      }
    })
  },

  clearInput() {
    this.setData({
      huoGuiValue: '',
      showRemind3: false,
      showRemind2: false,
      showRemind: false,
      result: [],
      containers: []
    })
  },

  chooseAll() {
    this.setData({
      showRemind3: false
    })
    if (this.data.result.length === this.data.containers.length) {
      this.setData({
        result: []
      })
    } else {
      this.setData({
        result: this.data.containers.map(i => i.containerNumber)
      })
    }
  },

  setHuoGui(e) {
    //去掉空格和大写问题
    let value = e.detail.value.toUpperCase()
    let regvalue = value.trim()
    this.setData({
      huoGuiValue: regvalue,
      showRemind: false,
      showRemind2: false,
      showRemind3: false,
      result: [],
      containers: []
    })
  },

  calculatedCharges() {
    this.setData({
      errTip: ''
    })
    let params = {}
    if (this.data.actived === 'byShipment') {
      if (!this.data.result.length) {
        this.setData({
          showRemind3: true
        })
        return
      }
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
      if (err.code === '422' || err.message === 'Response status code does not indicate success: 400 (Bad Request).') {
        this.setData({
          errTip: 'No match found: your ref is incorrect or no charges were raised at this date.'
        })
      } else {
        this.setData({
          errTip: err.message
        })
      }
    })
  },
})