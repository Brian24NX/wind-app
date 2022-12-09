// packageBooking/pages/Detail/index.js
const languageUtils = require("../../../utils/languageUtils")
const utils = require('../../../utils/util')
const dayjs = require("dayjs");
import {
  bookOfficeList,
  countryList,
  stateList,
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
    commodityList: [],
    partyList: [],
    vasList: [],
    preferredBookingOffice: null,
    noOfBooking: 1,
    currentStep: '',
    haulageDirectionType: '',
    haulageType: '',
    transportModeList: [{
      id: 'Road',
      icon: '/assets/img/booking/mode/truck.png'
    }, {
      id: 'Rail',
      icon: '/assets/img/booking/mode/rail.png'
    }, {
      id: 'RailRoad',
      icon: '/assets/img/booking/mode/railTruck.png'
    }, {
      id: 'Barge',
      icon: '/assets/img/booking/mode/barge.png'
    }, {
      id: 'BargeRoad',
      icon: '/assets/img/booking/mode/brageTruck.png'
    }, {
      id: 'RailBarge',
      icon: '/assets/img/booking/mode/trainBarge.png'
    }],
    appointmentDate: '',
    appointmentTime: '',
    transportMode: '',
    haulageAddress: null,
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
    countryList: [],
    stateList: [],
    timeType: 'date',
    minDate: new Date().getTime(),
    maxDate: new Date().getTime() + 1000 * 60 * 60 * 24 * 30,
    currentDate: new Date().getTime(),
    showDatePopup: false,
    // haulage错误提示开始
    appointmentDateRemind: false,
    appointmentTimeRemind: false,
    transportModeRemind: false,
    companyNameRemind: false,
    cityRemind: false,
    countryRemind: false,
    address2Remind: false,
    contactNameRemind: false,
    phoneNumberRemind: false,
    emailRemind: false,
    // haulage错误提示结束
    bookingSearchKey: null,
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
    this.resetHaulageAddress()
    this.setPortOfLoading()
    this.setPortOfDischarge()
    this.setPlaceOfReceipt()
    this.setFinalPlaceOfDelivery()
    this.getCountryList()
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

  getCountryList() {
    countryList().then(res => {
      this.setData({
        countryList: res.data.sort(this.sortCountryArray)
      })
    })
  },

  sortCountryArray(x, y) {
    return x.countryName.localeCompare(y.countryName);
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

  closeDate() {
    this.setData({
      showDatePopup: false
    })
  },

  chooseDate() {
    const date = this.data.appointmentDate.replaceAll('-', '/')
    this.setData({
      timeType: 'date',
      currentDate: new Date(date).getTime(),
      showDatePopup: true
    })
  },

  chooseTime() {
    this.setData({
      timeType: 'time',
      currentDate: this.data.appointmentTime || dayjs().format('HH:mm'),
      showDatePopup: true
    })
  },

  confirmDate(e) {
    console.log(e)
    if (this.data.timeType === 'date') {
      this.setData({
        appointmentDate: dayjs(e.detail).format('YYYY-MM-DD'),
        appointmentDateRemind: false,
        showDatePopup: false
      })
    } else if (this.data.timeType === 'time') {
      this.setData({
        appointmentTime: e.detail,
        appointmentTimeRemind: false,
        showDatePopup: false
      })
    }
  },

  confirmHaulage() {
    if (this.data.haulageType === 'Door') {
      if (!this.data.appointmentDate) {
        this.setData({
          appointmentDateRemind: true
        })
      }
      if (!this.data.appointmentTime) {
        this.setData({
          appointmentTimeRemind: true
        })
      }
      if (!this.data.haulageAddress.companyName) {
        this.setData({
          companyNameRemind: true
        })
      }
      if (!this.data.haulageAddress.haulageAddress.city) {
        this.setData({
          cityRemind: true
        })
      }
      if (!this.data.haulageAddress.haulageAddress.countryCode) {
        this.setData({
          countryRemind: true
        })
      }
      if (!this.data.haulageAddress.haulageAddress.address2) {
        this.setData({
          address2Remind: true
        })
      }
      if (!this.data.haulageAddress.haulageAddress.contactName) {
        this.setData({
          contactNameRemind: true
        })
      }
      if (!this.data.haulageAddress.haulageAddress.phoneNumber) {
        this.setData({
          phoneNumberRemind: true
        })
      }
      if (!this.data.haulageAddress.haulageAddress.email) {
        this.setData({
          emailRemind: true
        })
      }
    }
    if (!this.data.transportMode) {
      this.setData({
        transportModeRemind: true
      })
    }
    if (this.data.haulageType === 'Door' && !(this.data.appointmentDateRemind || this.data.appointmentTimeRemind || this.data.transportModeRemind || this.data.companyNameRemind || this.data.cityRemind || this.data.countryRemind || this.data.address2Remind || this.data.contactNameRemind || this.data.phoneNumberRemind || this.data.emailRemind)) {
      if (this.data.haulageDirectionType === 'Export' && this.data.placeOfReceipt) {
        let exportHaulage = {
          appointmentInfo: {
            haulageLocation: this.data.finalPlaceOfDelivery,
            appointmentTime: this.data.appointmentTime,
            appointmentDate: {
              local: this.data.appointmentDate,
              utc: this.data.appointmentDate
            },
            transportMode: this.data.transportMode
          },
          haulageAddress: JSON.parse(JSON.stringify(this.data.haulageAddress))
        }
        this.setData({
          haulageDirectionType: 'Import',
          exportHaulage
        })
        this.resetHaulageAddress()
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300
        })
        return
      }
      if (this.data.haulageDirectionType === 'Import') {
        let importHaulage = {
          appointmentInfo: {
            haulageLocation: this.data.finalPlaceOfDelivery,
            appointmentTime: this.data.appointmentTime,
            appointmentDate: {
              local: this.data.appointmentDate,
              utc: this.data.appointmentDate
            },
            transportMode: this.data.transportMode
          },
          haulageAddress: JSON.parse(JSON.stringify(this.data.haulageAddress))
        }
        this.setData({
          haulageDirectionType: 'Import',
          importHaulage,
          currentStep: 'second'
        })



        this.resetHaulageAddress()
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300
        })
        return
      }
    }
    if (this.data.haulageType === 'ramp' && !this.data.transportModeRemind) {
      this.setData({
        currentStep: 'second'
      })
    }
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
      shippingCompany: '0001'
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
      shippingCompany: '0001'
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

  chooseMode(e) {
    this.setData({
      transportMode: e.currentTarget.dataset.id,
      transportModeRemind: false
    })
  },

  setInputValue(e) {
    const value = e.detail.value
    const type = e.currentTarget.dataset.type
    const type2 = e.currentTarget.dataset.type2
    let haulageAddress = this.data.haulageAddress
    if (type2) {
      haulageAddress[type][type2] = value
      this.setData({
        [type2 + 'Remind']: false
      })
    } else {
      haulageAddress[type] = value
      this.setData({
        [type + 'Remind']: false
      })
    }
    this.setData({
      haulageAddress
    })
  },

  deleteValue(e) {
    const type = e.currentTarget.dataset.type
    const type2 = e.currentTarget.dataset.type2
    let haulageAddress = this.data.haulageAddress
    if (type2) {
      haulageAddress[type][type2] = ''
    } else {
      haulageAddress[type] = ''
    }
    this.setData({
      haulageAddress
    })
  },

  openPopup(e) {
    const type = e.currentTarget.dataset.type
    let defaultIndex = 0
    let columns = []
    let valueKey = ''
    if (type === 'country') {
      columns = this.data.countryList
      valueKey = 'countryName'
      const index = this.data.countryList.findIndex(i => i.laraCountry === this.data.haulageAddress.haulageAddress.countryCode)
      defaultIndex = index > -1 ? index : 0
    } else {
      columns = this.data.stateList
      valueKey = 'regionName'
      const index = this.data.stateList.findIndex(i => i.areaCode === this.data.haulageAddress.haulageAddress.stateCode)
      defaultIndex = index > -1 ? index : 0
    }
    this.setData({
      currentPopup: type,
      columns,
      valueKey,
      defaultIndex,
      isShowPicker: true
    })
  },

  onPickerClose() {
    this.setData({
      isShowPicker: false
    })
  },

  onPickerConfirm(e) {
    console.log(e)
    if (this.data.currentPopup === 'country') {
      this.data.haulageAddress.haulageAddress.countryCode = e.detail.laraCountry
      this.data.haulageAddress.haulageAddress.countryName = e.detail.countryName
      this.setData({
        haulageAddress: this.data.haulageAddress,
        countryRemind: false
      })
      this.getStateList()
    } else {
      this.data.haulageAddress.haulageAddress.stateCode = e.detail.areaCode
      this.data.haulageAddress.haulageAddress.stateName = e.detail.regionName
      this.setData({
        haulageAddress: this.data.haulageAddress
      })
    }
    this.setData({
      isShowPicker: false
    })
  },

  getStateList() {
    stateList({
      countryCode: this.data.haulageAddress.haulageAddress.countryCode
    }).then(res => {
      console.log(res)
      this.setData({
        stateList: res.data.sort(this.sortStateArray)
      })
    })
  },

  sortStateArray(x, y) {
    return x.regionName.localeCompare(y.regionName);
  },

  setBookingComment(e) {
    this.setData({
      bookingComment: e.detail.value
    })
  },

  resetHaulageAddress() {
    this.setData({
      appointmentDate: '',
      appointmentTime: '',
      transportMode: '',
      haulageAddress: {
        haulageAddress: {
          contactName: "",
          address1: "",
          address2: "",
          address3: "",
          countryName: "",
          countryCode: "",
          stateCode: "",
          stateName: "",
          city: "",
          zipCode: "",
          email: "",
          phoneNumber: ""
        },
        companyName: "",
        customerReference: "",
        transportComment: ""
      }
    })
  },

  submitBooking() {
    if (!this.data.cargoes.length) {
      // wx.show
    }
    let partners = []
    this.data.partyList.forEach(party => {
      party.roleIds.forEach(role => {
        partners.push({
          ...party,
          role
        })
      })
    })
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
      partners,
      vasProducts: [],
      payment: this.data.payment,
      preferredBookingOffice: this.data.preferredBookingOffice,
      bookingComment: this.data.bookingComment,
      military: true,
      communicationChannel: 'BKG_INSTANT',
      noOfBooking: this.data.noOfBooking
    }
    console.log(params)
  }
})