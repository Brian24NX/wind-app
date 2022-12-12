// packageBooking/pages/Detail/index.js
const languageUtils = require("../../../utils/languageUtils")
const utils = require('../../../utils/util')
import {
  bookOfficeList,
  paymentLocationLists,
  fuzzyPointSearch
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
    showFreightPayer: false,
    freightPayerList: [],
    showFreightPayerDelete: false,
    showPaymentLocation: false,
    paymentLocationList: [],
    showPaymentLocationDelete: false,
    routeSelected: null,
    partyList: [],
    vasList: [],
    preferredBookingOffice: null,
    noOfBooking: 1,
    currentStep: '',
    haulageDirectionType: '',
    haulageType: '',
    payment: {
      freightPayment: 'Prepaid',
      freightPayerCode: '',
      freightPayerName: '',
      paymentLocation: {
        code: "",
        name: "",
        countryCode: "",
        countryName: "",
        placeType: ""
      }
    },
    bookingComment: '',
    currentPopup: '',
    columns: [],
    valueKey: '',
    defaultIndex: null,
    isShowPicker: false,
    // =================请求数据start=================
    portOfLoading: null,
    portOfDischarge: null,
    placeOfReceipt: null,
    finalPlaceOfDelivery: null,
    quotationReference: '',
    exportHaulage: null,
    importHaulage: null,
    cargoes: []
    // =================请求数据end=================
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.bookingDetail.bookingDetail,
    })
    this.data.payment.freightPayerCode = wx.getStorageSync('partnerList')[0].code
    this.data.payment.freightPayerName = wx.getStorageSync('partnerList')[0].name
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.bookingDetail,
      verifyInfo: languageUtils.languageVersion().lang.page.verifyInfo,
      routeSelected: wx.getStorageSync('routeSelected'),
      bookingSearchKey: wx.getStorageSync('bookingSearchKey'),
      currentStep: (wx.getStorageSync('bookingSearchKey').placeOfDelivery || wx.getStorageSync('bookingSearchKey').placeOfReceipt) ? 'first' : 'second',
      haulageDirectionType: wx.getStorageSync('bookingSearchKey').placeOfDelivery ? 'Export' : 'Import',
      haulageType: wx.getStorageSync('bookingSearchKey').deliveryHaulage || wx.getStorageSync('bookingSearchKey').receiptHaulage,
      payment: this.data.payment,
      quotationReference: wx.getStorageSync('bookingSearchKey').quotationReference,
      showFreightPayerDelete: true
    })
    this.setPortOfLoading()
    this.setPortOfDischarge()
    this.setPlaceOfReceipt()
    this.setFinalPlaceOfDelivery()
  },

  setPortOfLoading() {
    const bookingSearchKey = wx.getStorageSync('bookingSearchKey')
    this.setData({
      portOfLoading: {
        code: bookingSearchKey.portOfLoading.split(';').pop(),
        name: bookingSearchKey.portOfLoading.split(';')[0],
        countryCode: "",
        countryName: "",
        placeType: ""
      }
    })
    this.getCountryData(this.data.portOfLoading.code, 'portOfLoading')
  },

  setPortOfDischarge() {
    const bookingSearchKey = wx.getStorageSync('bookingSearchKey')
    this.setData({
      portOfDischarge: {
        code: bookingSearchKey.portOfDischarge.split(';').pop(),
        name: bookingSearchKey.portOfDischarge.split(';')[0],
        countryCode: "",
        countryName: "",
        placeType: ""
      }
    })
    this.getCountryData(this.data.portOfDischarge.code, 'portOfDischarge')
  },

  setPlaceOfReceipt() {
    const bookingSearchKey = wx.getStorageSync('bookingSearchKey')
    if (bookingSearchKey.placeOfReceipt) {
      this.setData({
        placeOfReceipt: {
          code: bookingSearchKey.portOfDischarge.split(';').pop(),
          name: bookingSearchKey.portOfDischarge.split(';')[0],
          countryCode: "",
          countryName: "",
          placeType: bookingSearchKey.receiptHaulage
        }
      })
      this.getCountryData(this.data.placeOfReceipt.code, 'placeOfReceipt')
    }
  },

  setFinalPlaceOfDelivery() {
    const bookingSearchKey = wx.getStorageSync('bookingSearchKey')
    if (bookingSearchKey.placeOfDelivery) {
      this.setData({
        finalPlaceOfDelivery: {
          code: bookingSearchKey.placeOfDelivery.split(';').pop(),
          name: bookingSearchKey.placeOfDelivery.split(';')[0],
          countryCode: "",
          countryName: "",
          placeType: bookingSearchKey.deliveryHaulage
        }
      })
      this.getCountryData(this.data.finalPlaceOfDelivery.code, 'finalPlaceOfDelivery')
    }
  },

  modifyHaulage(e) {
    wx.navigateTo({
      url: '/packageBooking/pages/Haulage/index?from=' + e.currentTarget.dataset.type,
    })
  },

  setHaulage(detail, from) {
    console.log(detail)
    if (from === 'Export') {
      detail.haulageLocation = this.data.finalPlaceOfDelivery
      this.setData({
        exportHaulage: detail
      })
    } else if (from === 'Import') {
      detail.haulageLocation = this.data.placeOfReceipt
      this.setData({
        importHaulage: detail
      })
    }
  },

  getCountryData(pointCode, data) {
    fuzzyPointSearch({
      pointCode
    }).then(res => {
      console.log(res)
      this.data[data].countryCode = res.data.country.code
      this.data[data].countryName = res.data.country.name
    }, () => {
      this.getCountryData(pointCode, data)
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
      shippingCompany: this.data.shippingCompany
    }).then(res => {
      this.setData({
        showOffice: false
      })
      if (res.data.length) {
        res.data.forEach(item => {
          item.label = (item.agency.name + ' - ' + item.city.name).toLocaleUpperCase()
        })
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

  changefreightPayer: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showFreightPayerDelete: !!data,
      showFreightPayer: false,
      freightPayerList: []
    })
    if (data.length < 2) {
      return
    }
    this.getFreightPayer(data)
  }, 800),

  getFreightPayer(data) {
    this.setData({
      showFreightPayer: true
    })
    bookOfficeList({
      agencyName: data,
      shippingCompany: this.data.shippingCompany
    }).then(res => {
      this.setData({
        showFreightPayer: false
      })
      if (res.data.length) {
        res.data.forEach(item => {
          item.label = (item.agency.name + ' - ' + item.city.name).toLocaleUpperCase()
        })
        this.setData({
          freightPayerList: res.data || []
        })
      }
    }, () => {
      this.getFreightPayer(data)
    })
  },

  chooseFreightPayer(e) {
    const index = e.currentTarget.dataset.index
    this.data.payment.freightPayerCode = this.data.freightPayerList[index].agency.code
    this.data.payment.freightPayerName = this.data.freightPayerList[index].label
    this.setData({
      freightPayerList: [],
      payment: this.data.payment
    })
  },

  changepaymentLocation: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showPaymentLocationDelete: !!data,
      showPaymentLocation: false,
      paymentLocationList: []
    })
    if (data.length < 2) {
      return
    }
    this.getPaymentLocation(data)
  }, 800),

  getPaymentLocation(data) {
    this.setData({
      showPaymentLocation: true
    })
    paymentLocationLists({
      searchStr: data,
      shippingCompany: this.data.shippingCompany
    }).then(res => {
      this.setData({
        showPaymentLocation: false
      })
      if (res.data.length) {
        this.setData({
          paymentLocationList: res.data || []
        })
      }
    }, () => {
      this.getPaymentLocation(data)
    })
  },

  choosePaymentLocation(e) {
    const index = e.currentTarget.dataset.index
    this.data.payment.paymentLocation.code = this.data.paymentLocationList[index].pointCode
    this.data.payment.paymentLocation.name = this.data.paymentLocationList[index].pointName
    this.setData({
      paymentLocationList: [],
      payment: this.data.payment
    })
    this.getPlaceInfo()
  },

  getPlaceInfo() {
    fuzzyPointSearch({
      pointCode: this.data.payment.paymentLocation.code
    }).then(res => {
      this.data.payment.paymentLocation.countryCode = res.data.country.code
      this.data.payment.paymentLocation.countryName = res.data.country.name
      this.setData({
        payment: this.data.payment
      })
    }, () => {
      this.getPlaceInfo()
    })
  },

  deleteValue2(e) {
    const type = e.currentTarget.dataset.type
    if (type === 'showOfficeDelete') {
      this.setData({
        showOfficeDelete: false,
        preferredBookingOffice: null
      })
    } else if (type === 'showFreightPayerDelete') {
      this.data.payment.freightPayerCode = ''
      this.data.payment.freightPayerName = ''
      this.setData({
        showFreightPayerDelete: false,
        payment: this.data.payment
      })
    } else if (type === 'showPaymentLocationDelete') {
      this.data.payment.paymentLocation = {
        code: "",
        name: "",
        countryCode: "",
        countryName: "",
        placeType: ""
      }
      this.setData({
        showPaymentLocationDelete: false,
        payment: this.data.payment
      })
    }
  },

  toModifyParty() {
    wx.navigateTo({
      url: '/packageBooking/pages/ModifyParty/index',
    })
  },

  reduce() {
    if (this.data.noOfBooking < 2) return
    this.setData({
      noOfBooking: --this.data.noOfBooking
    })
  },

  add() {
    if (this.data.noOfBooking > 98) return
    this.setData({
      noOfBooking: ++this.data.noOfBooking
    })
  },

  setBookingNumberInputValue(e) {
    this.setData({
      noOfBooking: Number(e.detail.value) || 1
    })
  },

  changePaymentType(e) {
    let payment = this.data.payment
    payment.freightPayment = e.currentTarget.dataset.type
    this.setData({
      payment
    })
  },

  setBookingComment(e) {
    this.setData({
      bookingComment: e.detail.value
    })
  },

  setCorgoData(data, index) {
    if (index !== undefined) {
      this.data.cargoes[index] = data
    } else {
      this.data.cargoes.push(data)
    }
    this.setData({
      cargoes: this.data.cargoes
    })
  },

  submitBooking() {
    const params = {
      portOfLoading: this.data.portOfLoading,
      portOfDischarge: this.data.portOfDischarge,
      exportShippingType: 'FCL',
      importShippingType: 'FCL',
      exportMovementType: 'Port',
      importMovementType: 'Port',
      quotationReference: this.data.quotationReference,
      placeOfReceipt: this.data.placeOfReceipt,
      finalPlaceOfDelivery: this.data.finalPlaceOfDelivery,
      exportHaulage: this.data.exportHaulage,
      route: this.data.routeSelected,
      importHaulage: this.data.importHaulage,
      cargoes: this.data.cargoes,
      bookingPartyReference: this.data.partyList[0].bookingPartyReference || '',
      partners: this.data.partyList,
      vasProducts: [],
      payment: this.data.payment,
      preferredBookingOffice: this.data.preferredBookingOffice,
      bookingComment: this.data.bookingComment,
      military: true,
      communicationChannel: 'BKG_INSTANT',
      noOfBooking: this.data.noOfBooking
    }
    console.log(JSON.stringify(params))
  }
})