// packageBooking/pages/Contract/Search/index.js
var languageUtil = require('../../../utils/languageUtils')
const utils = require('../../../utils/util')
const dayjs = require("dayjs");
import {
  fuzzySearch,
  getAllNetworkPoint
} from '../../../api/modules/home';
import {
  bookingQuotationList
} from '../../api/modules/booking';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {}, // 用于保存当前页面所需字典变了
    language: 'zh',
    verifyInfo: {},
    showPol: false,
    showPod: false,
    // 收货地
    placeOfOrigin: '',
    placeOfOriginLabel: '',
    receiptHaulage: '',
    // 起运港
    portOfLoadingLabel: "",
    portOfLoading: "",
    // 卸货港
    portOfDischargeLabel: "",
    portOfDischarge: "",
    // 目的地
    finalPlaceOfDelivery: '',
    finalPlaceOfDeliveryLabel: '',
    deliveryHaulage: '',
    placeOfReceiptList: [],
    pollist: [],
    podlist: [],
    placeOfDeliveryList: [],
    searchOn: '',
    searchOnLabel: '',
    searchList: [],
    simulationDate: '',
    reference: '',
    shippingCompany: '',
    showRemind1: false,
    showRemind2: false,
    showRemind3: false,
    showRemind4: false,
    showRemind5: false,
    showDelete1: false,
    showDelete2: false,
    showDelete3: false,
    showDelete4: false,
    showPopup: false,
    defaultIndex: 0,
    showDatePopup: false,
    currentDate: null,
    showPlaceOfReceipt: false,
    showPlaceOfDelivery: false,
    showPoR: false,
    showPoDe: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.initLanguage();
    this.setData({
      simulationDate: this.getDate()
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  addPlaceOfReceipt() {
    this.setData({
      showPlaceOfReceipt: true
    })
  },

  addPlaceOfDelivery() {
    this.setData({
      showPlaceOfDelivery: true
    })
  },

  checkAccessToken(callback) {
    if (!utils.checkAccessToken()) {
      wx.showToast({
        title: languageUtil.languageVersion().lang.page.load.noLogin,
        icon: 'none',
        mask: true,
        duration: 2500
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/Login/index',
        })
      }, 2500)
    } else {
      if (callback) {
        callback()
      }
    }
  },

  //初始化语言
  initLanguage() {
    //获取当前小程序语言版本所对应的字典变量
    var lang = languageUtil.languageVersion()
    wx.setNavigationBarTitle({
      title: lang.lang.page.booking.title,
    })
    this.setData({
      languageContent: lang.lang.page.booking,
      language: languageUtil.languageVersion().lang.page.langue,
      verifyInfo: languageUtil.languageVersion().lang.page.verifyInfo
    })
    if (languageUtil.languageVersion().lang.page.langue === 'en') {
      this.setData({
        searchList: [{
          id: 1,
          method: "Departure"
        }, {
          id: 2,
          method: "Arrival"
        }],
        searchOn: 1,
        searchOnLabel: 'Departure'
      })
    } else {
      this.setData({
        searchList: [{
          id: 1,
          method: "离港"
        }, {
          id: 2,
          method: "到港"
        }],
        searchOn: 1,
        searchOnLabel: '离港'
      })
    }
  },

  //获取收货地的接口处理
  changePlaceOfReceipt: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showDelete1: !!data,
      showPoR: false,
      placeOfReceiptList: []
    })
    if (data.length < 2) {
      return
    }
    this.getPorData(data)
  }, 800),

  getPorData(data) {
    this.setData({
      showPoR: true
    })
    getAllNetworkPoint({
      searchStr: data
    }, true).then(res => {
      this.setData({
        showPoR: false
      })
      if (res.data != '') {
        res.data.forEach(item => item.ActualName = item.ActualName.replaceAll(' ', ""))
        this.setData({
          placeOfReceiptList: res.data || []
        })
      }
    }, () => {
      this.getPorData(data)
    })
  },

  //获取起运港的接口处理
  changepol: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showDelete2: !!data,
      showRemind1: false,
      showRemind2: false,
      showPol: false,
      pollist: []
    })
    if (data.length < 2) {
      return
    }
    this.getPolData(data)
  }, 800),

  getPolData(data) {
    this.setData({
      showPol: true
    })
    fuzzySearch({
      searchStr: data
    }, true).then(res => {
      this.setData({
        showPol: false
      })
      if (res.data != '') {
        this.setData({
          pollist: res.data || []
        })
      }
    }, () => {
      this.getPolData(data)
    })
  },

  //获取卸货港的接口处理
  changepod: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showDelete3: !!data,
      showRemind3: false,
      showRemind4: false,
      showPod: false,
      podlist: []
    })
    if (data.length < 2) {
      return
    }
    this.getPodData(data)
  }, 800),

  getPodData(data) {
    this.setData({
      showPod: true
    })
    fuzzySearch({
      searchStr: data
    }, true).then(res => {
      this.setData({
        showPod: false
      })
      if (res.data != '') {
        this.setData({
          podlist: res.data || []
        })
      }
    }, () => {
      this.getPodData(data)
    })
  },

  //获取目的地的接口处理
  changePlaceOfDelivery: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showDelete4: !!data,
      showPoDe: false,
      placeOfDeliveryList: []
    })
    if (data.length < 2) {
      return
    }
    this.getPooData(data)
  }, 800),

  getPooData(data) {
    this.setData({
      showPoDe: true
    })
    getAllNetworkPoint({
      searchStr: data
    }, true).then(res => {
      this.setData({
        showPoDe: false
      })
      if (res.data != '') {
        res.data.forEach(item => item.ActualName = item.ActualName.replaceAll(' ', ""))
        this.setData({
          placeOfDeliveryList: res.data || []
        })
      }
    }, () => {
      this.getPorData(data)
    })
  },

  deleteValue(e) {
    const type = e.currentTarget.dataset.type
    if (type === '1') {
      this.setData({
        placeOfOrigin: '',
        placeOfOriginLabel: '',
        receiptHaulage: '',
        showDelete1: false
      })
    } else if (type === '2') {
      this.setData({
        portOfLoadingLabel: '',
        portOfLoading: '',
        pollist: [],
        showDelete2: false,
        showRemind1: false,
        showRemind2: false
      })
    } else if (type === '3') {
      this.setData({
        portOfDischargeLabel: '',
        portOfDischarge: '',
        podlist: [],
        showDelete3: false,
        showRemind3: false,
        showRemind4: false
      })
    } else if (type === '4') {
      this.setData({
        finalPlaceOfDelivery: '',
        finalPlaceOfDeliveryLabel: '',
        deliveryHaulage: '',
        showDelete4: false
      })
    } else if (type === '4') {
      this.setData({
        reference: ''
      })
    }
  },

  // 收货地
  choosePlaceOfReceipt(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      placeOfOriginLabel: this.data.placeOfReceiptList[index].ActualName,
      placeOfOrigin: this.data.placeOfReceiptList[index].Code,
      receiptHaulage: this.data.placeOfReceiptList[index].PlaceType,
      placeOfReceiptList: [],
    })
  },

  // 起始港选择
  changepolname(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      portOfLoadingLabel: this.data.pollist[index].point,
      portOfLoading: this.data.pollist[index].pointCode,
      pollist: [],
    })
  },

  // 卸货港
  changepodname(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      portOfDischargeLabel: this.data.podlist[index].point,
      portOfDischarge: this.data.podlist[index].pointCode,
      podlist: []
    })
  },

  // 目的地
  choosePlaceOfDelivery(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      finalPlaceOfDeliveryLabel: this.data.placeOfDeliveryList[index].ActualName,
      finalPlaceOfDelivery: this.data.placeOfDeliveryList[index].Code,
      deliveryHaulage: this.data.placeOfDeliveryList[index].PlaceType,
      placeOfDeliveryList: [],
    })
  },

  openPopup(e) {
    if (e.currentTarget.dataset.type === '2') {
      const date = this.data.simulationDate.replaceAll('-', '/')
      this.setData({
        currentDate: new Date(date).getTime(),
        showDatePopup: true
      })
    } else if (e.currentTarget.dataset.type === '1') {
      const defaultIndex = this.data.searchList.findIndex(item => item.id === this.data.searchOn)
      this.setData({
        defaultIndex: defaultIndex > -1 ? defaultIndex : 0,
        showPopup: true
      })
    }
  },

  onClose() {
    this.setData({
      columns: [],
      valueKey: '',
      showPopup: false
    })
  },

  onConfirm(e) {
    this.setData({
      searchOn: e.detail.id,
      searchOnLabel: e.detail.method
    })
    this.onClose()
  },

  closeDate() {
    this.setData({
      showDatePopup: false
    })
  },

  confirmDate(e) {
    this.setData({
      simulationDate: dayjs(e.detail).format('YYYY-MM-DD'),
      showDatePopup: false
    })
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

  setReference(e) {
    this.setData({
      reference: e.detail.value,
      showRemind5: false
    })
  },

  // 提交搜索
  submit() {
    if (this.data.showDelete2) {
      this.setData({
        showRemind1: false
      })
      var reg = /^([ ]*[A-z0-9]+([\,\.\-\;]*)){2,}$/;
      if (this.data.portOfLoadingLabel) {
        if (!reg.test(this.data.portOfLoadingLabel)) {
          this.setData({
            showRemind2: true
          })
        } else {
          this.setData({
            showRemind2: false
          })
        }
      } else {
        this.setData({
          showRemind1: false,
          showRemind2: true
        })
      }
    } else {
      this.setData({
        showRemind1: true,
        showRemind2: false
      })
    }

    if (this.data.showDelete3) {
      this.setData({
        showRemind3: false
      })
      if (this.data.portOfDischargeLabel) {
        if (!reg.test(this.data.portOfDischargeLabel)) {
          this.setData({
            showRemind4: true
          })
        } else {
          this.setData({
            showRemind4: false
          })
        }
      } else {
        this.setData({
          showRemind4: true
        })
      }
    } else {
      this.setData({
        showRemind3: true,
        showRemind4: false
      })
    }
    if (!this.data.reference) {
      this.setData({
        showRemind5: true
      })
    } else {
      this.setData({
        showRemind5: false
      })
    }
    if (this.data.showRemind1 || this.data.showRemind2 || this.data.showRemind3 || this.data.showRemind4 || this.data.showRemind5) return
    this.checkAccessToken(() => {
      this.getQuotationList()
    })
  },

  getQuotationList() {
    bookingQuotationList({
      portOfLoading: this.data.portOfLoading,
      portOfDischarge: this.data.portOfDischarge,
      placeOfDelivery: this.data.placeOfOrigin || '',
      placeOfReceipt: this.data.finalPlaceOfDelivery || '',
      journeyDate: this.data.simulationDate,
      journeyType: this.data.searchOn === 1 ? "True" : "False",
      agreementReference: this.data.reference,
      shippingCompany: '0001'
    }).then(res => {
      console.log(res)
      if (res.data && res.data.routings && res.data.routings.length) {
        wx.setStorageSync('bookingRoutings', res.data.routings)
        wx.setStorageSync('containers', res.data.commodities.preferedContainerTypes.concat(res.data.commodities.containerTypes))
      }
      wx.redirectTo({
        url: '/packageBooking/pages/List/index',
      })
    })
  },

  reset() {
    this.setData({
      showPol: false,
      showPod: false,
      placeOfOrigin: '',
      placeOfOriginLabel: '',
      receiptHaulage: '',
      // 起运港
      portOfLoading: "",
      portOfLoadingLabel: "",
      // 卸货港
      portOfDischarge: "",
      portOfDischargeLabel: "",
      finalPlaceOfDelivery: '',
      finalPlaceOfDeliveryLabel: '',
      pollist: [],
      podlist: [],
      simulationDate: this.getDate(),
      searchOn: 1,
      searchOnLabel: this.data.searchList[0].method,
      showRemind1: false,
      showRemind2: false,
      showRemind3: false,
      showRemind4: false,
      showRemind5: false,
      showDelete1: false,
      showDelete2: false,
      showDelete3: false,
      showDelete4: false,
      reference: ''
    })
  }
})