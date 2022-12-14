// packageBooking/pages/Detail/index.js
const languageUtils = require("../../../utils/languageUtils")
const dayjs = require("dayjs");
const utils = require('../../../utils/util')
import {
  countryList,
  stateList,
  bookPartyList,
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
    routeSelected: null,
    partyList: [],
    exportData: {
      appointmentDate: '',
      appointmentTime: '',
      transportMode: '',
      companyName: "",
      address1: "",
      address2: "",
      address3: "",
      city: "",
      zipCode: "",
      countryCode: "",
      countryName: "",
      stateCode: "",
      stateName: "",
      contactName: "",
      phoneNumber: "",
      email: "",
      customerReference: '',
      transportComment: ""
    },
    importData: {
      appointmentDate: '',
      appointmentTime: '',
      transportMode: '',
      companyName: "",
      address1: "",
      address2: "",
      address3: "",
      city: "",
      zipCode: "",
      countryCode: "",
      countryName: "",
      stateCode: "",
      stateName: "",
      contactName: "",
      phoneNumber: "",
      email: "",
      customerReference: '',
      transportComment: ""
    },
    roleList: ['SHP', 'FOR', 'CEE', 'NOT', 'NO2', 'DCD', 'NAC', '3BA', 'CUS'],
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
    showFreightPayer: false,
    freightPayerList: [],
    showFreightPayerDelete: false,
    showPaymentLocation: false,
    paymentLocationList: [],
    showPaymentLocationDelete: false,
    vasList: [],
    preferredBookingOffice: null,
    showOffice: false,
    officeList: [],
    showOfficeDelete: false,
    bookingComment: '',
    noOfBooking: 1,
    currentPopup: '',
    popupTo: '',
    columns: [],
    valueKey: '',
    defaultIndex: null,
    isShowPicker: false,
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
    // =================请求数据start=================
    portOfLoading: null,
    portOfDischarge: null,
    placeOfReceipt: null,
    finalPlaceOfDelivery: null,
    quotationReference: '',
    exportHaulage: null,
    importHaulage: null,
    cargoes: [],
    // =================请求数据end=================
    // =================折叠start=================
    routeSelectedShow: false,
    receiptHaulageShow: false,
    deliveryHaulageShow: false,
    cargoShow: false,
    partiesShow: false,
    paymentShow: false,
    bookingOfficeShow: false,
    freeCommentsShow: false,
    // =================折叠end=================
    // 日期组件
    currentHaulage: 'Export',
    timeType: 'date',
    minDate: '',
    maxDate: '',
    showDatePopup: false,
    currentDate: null,
    countryList: [],
    exportDataStateList: [],
    importDataStateList: [],
    partnerList: wx.getStorageSync('partnerList'),
    otherRoleList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.bookingDetail.bookingDetail,
    })
    this.data.payment.freightPayerCode = this.data.partnerList[0].code
    this.data.payment.freightPayerName = this.data.partnerList[0].name
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.bookingDetail,
      verifyInfo: languageUtils.languageVersion().lang.page.verifyInfo,
      routeSelected: wx.getStorageSync('routeSelected'),
      bookingSearchKey: wx.getStorageSync('bookingSearchKey'),
      payment: this.data.payment,
      quotationReference: wx.getStorageSync('bookingSearchKey').quotationReference,
      showFreightPayerDelete: true
    })
    this.setPortOfLoading()
    this.setPortOfDischarge()
    this.setPlaceOfReceipt()
    this.setFinalPlaceOfDelivery()
    this.setParties()
    this.getCountryList()
  },

  setParties() {
    this.setData({
      partyList: [{
        code: wx.getStorageSync('partnerList')[0].code,
        name: wx.getStorageSync('partnerList')[0].name,
        address: wx.getStorageSync('partnerList')[0].address,
        bookingPartyReference: '',
        roleIds: []
      }]
    })
  },

  // 折叠
  zhedie(e) {
    this.setData({
      [e.currentTarget.dataset.type + 'Show']: !this.data[e.currentTarget.dataset.type + 'Show']
    })
  },

  // =========== 设置Route Selected ================
  // 设置POL
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

  // 设置POD
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

  // 设置POR
  setPlaceOfReceipt() {
    const bookingSearchKey = wx.getStorageSync('bookingSearchKey')
    if (bookingSearchKey.placeOfReceipt) {
      this.setData({
        placeOfReceipt: {
          code: bookingSearchKey.placeOfReceipt.split(';').pop(),
          name: bookingSearchKey.placeOfReceipt.split(';')[0],
          countryCode: "",
          countryName: "",
          placeType: bookingSearchKey.receiptHaulage
        }
      })
      this.getCountryData(this.data.placeOfReceipt.code, 'placeOfReceipt')
    }
  },

  // 设置PDR
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

  // =================export=================
  chooseDate(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      currentHaulage: type
    })
    if (type === 'exportData') {
      this.setData({
        minDate: new Date().getTime(),
        maxDate: new Date().setDate(new Date(this.data.routeSelected.departureDate.utc).getDate() - 1),
      })
    } else {
      this.setData({
        minDate: new Date(this.data.routeSelected.arrivalDate.utc).getTime(),
        maxDate: new Date().setFullYear(new Date(this.data.routeSelected.arrivalDate.utc).getFullYear() + 20)
      })
    }
    const date = this.data[type].appointmentDate.replaceAll('-', '/')
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
      this.data[this.data.currentHaulage].appointmentDate = dayjs(e.detail).format('YYYY-MM-DD')
      this.setData({
        [this.data.currentHaulage]: this.data[this.data.currentHaulage],
        appointmentDateRemind: false,
        showDatePopup: false
      })
    } else if (this.data.timeType === 'time') {
      this.data[this.data.currentHaulage].appointmentTime = e.detail
      this.setData({
        [this.data.currentHaulage]: this.data[this.data.currentHaulage],
        appointmentTimeRemind: false,
        showDatePopup: false
      })
    }
  },

  closeDate() {
    this.setData({
      showDatePopup: false
    })
  },

  chooseMode(e) {
    console.log(e)
    this.data[e.currentTarget.dataset.type].transportMode = e.currentTarget.dataset.id
    this.setData({
      [e.currentTarget.dataset.type]: this.data[e.currentTarget.dataset.type],
      transportModeRemind: false
    })
  },

  setHaulageInputValue(e) {
    const value = e.detail.value
    const type = e.currentTarget.dataset.type
    const type2 = e.currentTarget.dataset.type2
    this.data[type][type2] = value
    this.setData({
      [type]: this.data[type]
    })
  },

  deleteHaulageValue(e) {
    const type = e.currentTarget.dataset.type
    const type2 = e.currentTarget.dataset.type2
    this.data[type][type2] = ''
    this.setData({
      [type]: this.data[type]
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

  // =============== 商品start ============================
  // 添加商品
  addCommodity() {
    wx.navigateTo({
      url: '/packageBooking/pages/Commodity/index',
    })
  },

  // 设置商品
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

  // 编辑商品
  editCargo(e) {
    wx.navigateTo({
      url: '/packageBooking/pages/Commodity/index?index=' + e.currentTarget.dataset.index,
    })
  },

  // 删除商品
  deleteCargo(e) {
    this.data.cargoes.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      cargoes: this.data.cargoes
    })
  },
  // =============== 商品end ============================

  // =============== parties start ============================
  addParty() {
    const lastData = this.data.partyList[this.data.partyList.length - 1]
    if (!lastData.code || !lastData.roleIds.length) return
    this.data.partyList.push({
      code: '',
      name: '',
      address: {},
      roleIds: [],
      showPartyDelete: false,
      showParty: false,
      partyList: [],
    })
    this.setData({
      partyList: this.data.partyList
    })
    this.setOtherParty()
  },

  chooseRole(e) {
    console.log(e)
    const index = e.currentTarget.dataset.index
    const roleId = e.currentTarget.dataset.roleid
    const indexs = this.data.partyList[index].roleIds.indexOf(roleId)
    if (indexs > -1) {
      this.data.partyList[index].roleIds.splice(indexs, 1)
    } else {
      this.data.partyList[index].roleIds.push(roleId)
    }
    if (!index && indexs === -1) {
      for (let i = 1; i < this.data.partyList.length; i++) {
        const element = this.data.partyList[i];
        const j = element.roleIds.indexOf(roleId)
        if (j > -1) {
          element.roleIds.splice(j, 1)
        }
      }
    }
    this.data.partyList[index].required2 = false
    this.setData({
      partyList: this.data.partyList
    })
    this.setOtherParty()
  },

  setOtherParty() {
    const roleIds = this.data.partyList[0].roleIds
    const otherRoleList = this.data.roleList.filter(i => roleIds.indexOf(i) === -1 || i === 'NO2' || i === 'CUS')
    this.setData({
      otherRoleList
    })
  },

  editParty(e) {
    const index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/packageBooking/pages/ModifyParty/index?from=party&index=' + index,
    })
  },

  setPartyData(detail, index) {
    this.data.partyList[index].address = detail
    this.setData({
      partyList: this.data.partyList
    })
  },

  deleteParty(e) {
    this.data.partyList.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      partyList: this.data.partyList
    })
  },

  enterParty: utils.debounce(function (e) {
    const data = e[0].detail.value
    const index = e[0].currentTarget.dataset.index
    this.data.partyList[index].showPartyDelete = !!data
    this.data.partyList[index].showParty = false
    this.data.partyList[index].partyList = []
    this.data.partyList[index].name = data
    this.data.partyList[index].required1 = false
    this.setData({
      partyList: this.data.partyList
    })
    if (data.length < 2) {
      return
    }
    this.getPartyList(data, index)
  }, 800),

  getPartyList(data, index) {
    this.data.partyList[index].showParty = true
    this.setData({
      partyList: this.data.partyList
    })
    bookPartyList({
      shippingCompany: this.data.bookingSearchKey.shippingCompany,
      searchCriteria: data
    }).then(res => {
      this.data.partyList[index].showParty = false
      this.data.partyList[index].partyList = res.data || []
      this.setData({
        partyList: this.data.partyList
      })
    }, () => {
      this.getPartyList(data, index)
    })
  },

  chooseParty(e) {
    const index = e.currentTarget.dataset.index
    const item = e.currentTarget.dataset.item
    this.data.partyList[index].code = item.code
    this.data.partyList[index].name = item.text
    this.data.partyList[index].partyList = []
    this.setData({
      partyList: this.data.partyList
    })
    // this.getPartnerAddress(index)
  },

  getPartnerAddress(index) {
    customerPartners({
      partners: [this.data.partiesList[index].code],
      token: wx.getStorageSync('access_token')
    }).then(res => {
      console.log(res)
      let partnerDetails = res.data[0].partnerDetails
      partnerDetails.address1 = partnerDetails.addressLine1
      partnerDetails.address2 = partnerDetails.addressLine2
      partnerDetails.address3 = partnerDetails.addressLine3
      delete partnerDetails.addressLine1
      delete partnerDetails.addressLine2
      delete partnerDetails.addressLine3
      this.data.partiesList[index].address = partnerDetails
      this.setData({
        partiesList: this.data.partiesList
      })
    })
  },

  // =============== 办事处start ============================
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
      shippingCompany: this.data.bookingSearchKey.shippingCompany
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
  // =============== 商品end ============================

  // =============== Parties start ============================
  setReference(e) {
    let partiesList = this.data.partyList
    partiesList[0].bookingPartyReference = e.detail.value
    this.setData({
      partyList: this.data.partyList
    })
  },

  deleteBookingPartyReferenceValue() {
    this.data.partyList[0].bookingPartyReference = ''
    this.setData({
      partyList: this.data.partyList
    })
  },
  // =============== Parties end ============================

  // =============== 付款start ============================
  changePaymentType(e) {
    let payment = this.data.payment
    payment.freightPayment = e.currentTarget.dataset.type
    this.setData({
      payment
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
      shippingCompany: this.data.bookingSearchKey.shippingCompany
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
      shippingCompany: this.data.bookingSearchKey.shippingCompany
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
  // =============== 商品end ============================

  // 清空输入框内容
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

  // 修改party
  toModifyParty() {
    wx.navigateTo({
      url: '/packageBooking/pages/ModifyParty/index',
    })
  },

  // 减少数量
  reduce() {
    if (this.data.noOfBooking < 2) return
    this.setData({
      noOfBooking: --this.data.noOfBooking
    })
  },

  // 增加数量
  add() {
    if (this.data.noOfBooking > 98) return
    this.setData({
      noOfBooking: ++this.data.noOfBooking
    })
  },

  // 设置数量
  setBookingNumberInputValue(e) {
    this.setData({
      noOfBooking: Number(e.detail.value) || 1
    })
  },

  // 设置BookingComment
  setBookingComment(e) {
    this.setData({
      bookingComment: e.detail.value
    })
  },

  // ============= 单选框 ====================
  openPopup(e) {
    const type = e.currentTarget.dataset.type
    const popupTo = e.currentTarget.dataset.to
    let defaultIndex = 0
    let columns = []
    let valueKey = ''
    if (type === 'country') {
      columns = this.data.countryList
      valueKey = 'countryName'
      const index = this.data.countryList.findIndex(i => i.laraCountry === this.data.exportData.countryCode)
      defaultIndex = index > -1 ? index : 0
    } else if (type === 'state') {
      columns = this.data[this.data.popupTo + 'StateList']
      valueKey = 'regionName'
      const index = this.data[popupTo + 'StateList'].findIndex(i => i.areaCode === this.data[popupTo].stateCode)
      defaultIndex = index > -1 ? index : 0
    } else if (type === 'party') {
      columns = this.data.partnerList
      valueKey = 'name'
      const index = this.data.partyList.findIndex(i => i.code === this.data.partyList[0].code)
      defaultIndex = index > -1 ? index : 0
    }
    this.setData({
      currentPopup: type,
      popupTo: popupTo,
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

  // 通用单选框完成
  onPickerConfirm(e) {
    console.log(e)
    const popupTo = this.data.popupTo
    if (this.data.currentPopup === 'country') {
      this.data[popupTo].countryCode = e.detail.laraCountry
      this.data[popupTo].countryName = e.detail.countryName
      this.setData({
        [popupTo]: this.data[popupTo]
      })
      this.getStateList()
    } else if (this.data.currentPopup === 'state') {
      this.data[popupTo].stateCode = e.detail.areaCode
      this.data[popupTo].stateName = e.detail.regionName
      this.setData({
        [popupTo]: this.data[popupTo]
      })
    } else if (this.data.currentPopup === 'party') {
      this.data.partyList[0].code = e.detail.code
      this.data.partyList[0].name = e.detail.name
      this.data.partyList[0].address = e.detail.address
    }
    this.setData({
      isShowPicker: false
    })
  },

  getStateList() {
    stateList({
      countryCode: this.data[this.data.popupTo].countryCode
    }).then(res => {
      console.log(res)
      this.setData({
        [this.data.popupTo + 'StateList']: res.data.sort(this.sortStateArray)
      })
    })
  },

  sortStateArray(x, y) {
    return x.regionName.localeCompare(y.regionName);
  },

  submitBooking() {
    // 提交数据时清除缓存数据的key
    let cargoesOld = JSON.parse(JSON.stringify(this.data.cargoes));
    let cargoes = [];
    if (cargoesOld && cargoesOld.length > 0) {
      cargoes = cargoesOld.map( v => {
        if (v?.cacheData) {
          delete(v['cacheData']);
        }

        return v
      })
    };

    console.log('cargoes', cargoes)

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
      cargoes: cargoes,
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