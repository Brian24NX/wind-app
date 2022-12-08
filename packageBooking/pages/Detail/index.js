// packageBooking/pages/Detail/index.js
const languageUtils = require("../../../utils/languageUtils")
const utils = require('../../../utils/util')
import {
  bookOfficeList
} from '../../api/modules/booking';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    verifyInfo: {},
    showOffice: false,
    officeList: [],
    showOfficeDelete: false,
    routeSelected: null,
    commodityList: [],
    partyList: [],
    currentPaymentType: 'Prepaid',
    vasList: [],
    preferredBookingOffice: null,
    bookingNumber: 1,
    currentStep: 'first',
    haulageType: 'door',
    transportModeList: [{
      id: 'Road',
      icon: '/assets/img/booking/truck.png'
    }, {
      id: 'Rail',
      icon: '/assets/img/booking/rail.png'
    }, {
      id: 'RailRoad',
      icon: '/assets/img/booking/railTruck.png'
    }, {
      id: 'Barge',
      icon: '/assets/img/booking/barge.png'
    }, {
      id: 'BargeRoad',
      icon: '/assets/img/booking/brageTruck.png'
    }, {
      id: 'RailBarge',
      icon: '/assets/img/booking/trainBarge.png'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.bookingDetail.bookingDetail,
    })
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.bookingDetail,
      verifyInfo: languageUtils.languageVersion().lang.page.verifyInfo,
      routeSelected: wx.getStorageSync('bookingRoutings')[options.index]
    })
  },

  addCommodity() {
    wx.navigateTo({
      url: '/packageBooking/pages/Commodity/index',
    })
  },

  addParty() {
    wx.navigateTo({
      url: '/packageBooking/pages/Party/index',
    })
  },

  setPartyData(partyList) {
    this.setData({
      partyList
    })
  },

  changeOffice: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showOfficeDelete: !!data,
      showOffice: false,
      officeList: []
    })
    if (data.length < 2) {
      return
    }
    this.getOffices(data)
  }, 800),

  getOffices(data) {
    this.setData({
      showOffice: true
    })
    bookOfficeList({
      agencyName: data,
      shippingCompany: '0001'
    }, true).then(res => {
      this.setData({
        showOffice: false
      })
      if (res.data.length) {
        this.setData({
          officeList: res.data || []
        })
      }
    }, () => {
      this.getOffices(data)
    })
  },
  
  chooseOffice(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      officeList: [],
      preferredBookingOffice: {
        code: this.data.officeList[index].agency.code,
        name: this.data.officeList[index].agency.name + ';' + this.data.officeList[index].city.name + ';' + this.data.officeList[index].city.code
      }
    })
  },

  deleteValue(e) {
    const type = e.currentTarget.dataset.type
    if (type === 'showOfficeDelete') {
      this.setData({
        showOfficeDelete: false,
        preferredBookingOffice: null
      })
    }
  },
  
  toModifyParty() {
    wx.navigateTo({
      url: '/packageBooking/pages/ModifyParty/index',
    })
  },

  reduce() {
    if (this.data.bookingNumber < 2) return
    this.setData({
      bookingNumber: --this.data.bookingNumber
    })
  },

  add() {
    if (this.data.bookingNumber > 98) return
    this.setData({
      bookingNumber: ++this.data.bookingNumber
    })
  },

  setInputValue(e) {
    this.setData({
      bookingNumber: Number(e.detail.value) || 1
    })
  },

  changePaymentType(e) {
    this.setData({
      currentPaymentType: e.currentTarget.dataset.type
    })
  },

  confirmLuXian() {
    this.setData({
      currentStep: 'second'
    })
    wx.pageScrollTo({
      duration: 300,
      scrollTop: 0
    })
  }
})