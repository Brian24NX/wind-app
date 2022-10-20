// pages/Quotation/Search/index/index.js
const app = getApp();
var languageUtil = require('../../../utils/languageUtils')
const utils = require('../../../utils/util')
const dayjs = require("dayjs");
import {
  fuzzySearch,
  getAllNetworkPoint,
  getCommodityLists,
  equitmentSizeList
} from '../../../api/modules/home';
import {
  quotationNextDepartures,
  nearByPortNextDeparture,
  quotationQuoteLinesSearch
} from '../../../api/modules/quotation';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTop: app.globalData.navTop,
    navHeight: app.globalData.navHeight,
    languageContent: {}, // 用于保存当前页面所需字典变了
    language: 'zh',
    verifyInfo: {},
    minDate: new Date().getTime(),
    maxDate: new Date().getTime() + 1000 * 60 * 60 * 24 * 30,
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
    simulationDate: '',
    equipmentType: '',
    equipmentTypeName: '',
    equipmentTypeList: [],
    weight: null,
    containers: 1,
    commodityCode: '',
    commodityName: '',
    shippingCompany: '',
    commodityList: [],
    showRemind1: false,
    showRemind2: false,
    showRemind3: false,
    showRemind4: false,
    showRemind5: false,
    showRemind6: false,
    showDelete1: false,
    showDelete2: false,
    showDelete3: false,
    showDelete4: false,
    showDelete5: false,
    columns: [],
    valueKey: '',
    showPopup: false,
    popupType: 1,
    defaultIndex: 0,
    showDatePopup: false,
    currentDate: null,
    showLegal: false,
    showPlaceOfReceipt: false,
    showPlaceOfDelivery: false,
    showPoR: false,
    showPoDe: false,
    pricingGroupSetups: [],
    pricingGroups: [],
    resultResq: {},
    nearPort: [],
    commodityLoading: false,
    currentType: 'instation',
    commonEquipmentTypeList: [{
      nameCn: '干柜',
      nameEn: 'Dry',
      code: 'ST'
    }, {
      nameCn: '冷藏柜',
      nameEn: 'Reefer',
      code: 'RF'
    }, {
      nameCn: '特殊柜',
      nameEn: 'Special',
      code: 'SP'
    }],
    commonEquipmentType: '',
    commonEquipmentTypeName: '',
    contractResq: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.initLanguage();
    this.getEquitmentSizeList()
    this.setData({
      simulationDate: this.getDate()
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },

  onShareAppMessage: function () {},

  changeCurrentType(e) {
    this.setData({
      currentType: e.currentTarget.dataset.type
    })
    this.reset()
    if (this.data.currentType === 'instation') {
      this.setData({
        minDate: new Date().getTime()
      })
    } else {
      this.setData({
        minDate: null
      })
    }
  },

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
        if (wx.getStorageSync('allowLegalTerms')) {
          wx.navigateTo({
            url: '/pages/Login/index',
          })
        } else {
          this.setData({
            showLegal: true
          })
          this.getTabBar().setData({
            show: false
          })
        }
      }, 2500)
    } else {
      if (callback) {
        callback()
      }
    }
  },

  getEquitmentSizeList() {
    equitmentSizeList().then(res => {
      if (res.data.length) {
        this.setData({
          equipmentTypeList: res.data,
          equipmentType: res.data[0].code,
          equipmentTypeName: this.data.language === 'en' ? res.data[0].nameEn : res.data[0].nameCn
        })
      }
    })
  },

  //初始化语言
  initLanguage() {
    //获取当前小程序语言版本所对应的字典变量
    var lang = languageUtil.languageVersion()
    this.setData({
      languageContent: lang.lang.page.quotation,
      language: languageUtil.languageVersion().lang.page.langue,
      verifyInfo: languageUtil.languageVersion().lang.page.verifyInfo
    })
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        list: lang.lang.toolbar.list //赋值
      })
    }
  },

  //获取收货地的接口处理
  changePlaceOfReceipt: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showDelete4: !!data,
      showPoR: false,
      placeOfReceiptList: []
    })
    if (data.length < 2) {
      this.setData({
        placeOfReceiptList: []
      })
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
      showDelete1: !!data,
      showRemind1: false,
      showRemind2: false,
      showPol: false,
      pollist: []
    })
    if (data.length < 2) {
      this.setData({
        pollist: []
      })
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
      showDelete2: !!data,
      showRemind3: false,
      showRemind4: false,
      showPod: false,
      podlist: []
    })
    if (data.length < 2) {
      this.setData({
        podlist: []
      })
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
      showDelete5: !!data,
      showPoDe: false,
      placeOfDeliveryList: []
    })
    if (data.length < 2) {
      this.setData({
        placeOfDeliveryList: []
      })
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
      this.getPooData(data)
    })
  },

  deleteValue(e) {
    const type = e.currentTarget.dataset.type
    if (type === '1') {
      this.setData({
        portOfLoadingLabel: '',
        portOfLoading: '',
        pollist: [],
        showDelete1: false,
        showRemind1: false,
        showRemind2: false
      })
    } else if (type === '2') {
      this.setData({
        portOfDischargeLabel: '',
        portOfDischarge: '',
        podlist: [],
        showDelete2: false,
        showRemind3: false,
        showRemind4: false
      })
    } else if (type === '3') {
      this.setData({
        weight: null,
        showRemind5: false
      })
    } else if (type === '4') {
      this.setData({
        placeOfOrigin: null,
        placeOfOriginLabel: '',
        receiptHaulage: null,
        showDelete4: false
      })
    } else if (type === '5') {
      this.setData({
        finalPlaceOfDelivery: null,
        finalPlaceOfDeliveryLabel: '',
        deliveryHaulage: null,
        showDelete5: false
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
    if (this.data.currentType === 'instation') {
      this.getCommodityList()
    }
  },

  // 卸货港
  changepodname(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      portOfDischargeLabel: this.data.podlist[index].point,
      portOfDischarge: this.data.podlist[index].pointCode,
      podlist: []
    })
    if (this.data.currentType === 'instation') {
      this.getCommodityList()
    }
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

  setWeight(e) {
    this.setData({
      weight: Number(e.detail.value),
      showRemind5: false
    })
  },

  // 获取商品
  getCommodityList() {
    this.setData({
      commodityCode: '',
      commodityName: '',
      commodityList: []
    })
    if (!this.data.portOfLoading || !this.data.portOfDischarge || !this.data.equipmentType) return
    this.setData({
      commodityLoading: true
    })
    getCommodityLists({
      equipmentType: this.data.equipmentType,
      portOfLoading: this.data.portOfLoading,
      portOfDischarge: this.data.portOfDischarge
    }).then(res => {
      let commodityList = []
      res.data.forEach(i => {
        commodityList = commodityList.concat(i.commodityDetails.map(c => {
          return {
            ...c,
            zh: c.zh || c.en
          }
        }))
      })
      commodityList = commodityList.filter(i => i.code)
      commodityList.unshift({
        code: 'FAK',
        en: "Freight All Kinds",
        zh: '所有类型的费用'
      })
      res.data.forEach(item => {
        if (item.iQexcludedPartners) {
          item.iQexcludedPartners = item.iQexcludedPartners.map(i => {
            return i.code
          })
        }
        delete item.iqexcludedPartners
      })
      this.setData({
        commodityList: commodityList,
        pricingGroupSetups: res.data,
        pricingGroups: res.data.map(i => {
          return {
            pricingGroupId: i.pricingGroupId,
            shippingCompany: i.shippingCompany
          }
        }),
        commodityLoading: false
      })
    }, () => {
      setTimeout(() => {
        this.getCommodityList()
      }, 500);
    })
  },

  // 货柜减少
  reduce() {
    if (this.data.containers < 2) return
    this.setData({
      containers: --this.data.containers
    })
  },

  add() {
    if (this.data.containers > 99) return
    this.setData({
      containers: ++this.data.containers
    })
  },

  setInputValue(e) {
    this.setData({
      containers: !e.detail.value ? 1 : (Number(e.detail.value) > 100 ? 100 : Number(e.detail.value))
    })
  },

  openPopup(e) {
    this.getTabBar().setData({
      show: false
    })
    if (e.currentTarget.dataset.type === '2') {
      const date = this.data.simulationDate.replaceAll('-', '/')
      this.setData({
        currentDate: new Date(date).getTime(),
        showDatePopup: true
      })
      return
    }
    let defaultIndex = 0
    if (e.currentTarget.dataset.type === '1') {
      defaultIndex = this.data.language === 'zh' ? this.data.equipmentTypeList.findIndex(item => item.nameCn === this.data.equipmentTypeName) : this.data.equipmentTypeList.findIndex(item => item.nameEn === this.data.equipmentTypeName)
    } else if (e.currentTarget.dataset.type === '3') {
      defaultIndex = this.data.commodityList.findIndex(i => i.code === this.data.commodityCode)
    } else if (e.currentTarget.dataset.type === '4') {
      defaultIndex = this.data.commonEquipmentTypeList.findIndex(i => i.code === this.data.commonEquipmentType)
    }
    this.setData({
      popupType: e.currentTarget.dataset.type,
      columns: e.currentTarget.dataset.type === '1' ? this.data.equipmentTypeList : e.currentTarget.dataset.type === '3' ? this.data.commodityList : this.data.commonEquipmentTypeList,
      valueKey: (e.currentTarget.dataset.type === '1' || e.currentTarget.dataset.type === '4') ? (this.data.language === 'zh' ? 'nameCn' : 'nameEn') : (this.data.language === 'zh' ? 'zh' : 'en'),
      defaultIndex: defaultIndex > -1 ? defaultIndex : 0,
      showPopup: true
    })
  },

  onClose() {
    this.setData({
      popupType: '',
      columns: [],
      valueKey: '',
      showPopup: false
    })
    this.getTabBar().setData({
      show: true
    })
  },

  onConfirm(e) {
    if (this.data.popupType === '1') {
      this.setData({
        equipmentType: e.detail.code,
        equipmentTypeName: this.data.language === 'en' ? e.detail.nameEn : e.detail.nameCn
      })
      this.getCommodityList()
    } else if (this.data.popupType === '3') {
      this.setData({
        commodityCode: e.detail.code,
        commodityName: this.data.language === 'en' ? (e.detail.en || e.detail.zh) : e.detail.zh,
        shippingCompany: e.detail.shipComp ? e.detail.shipComp : '0001',
        showRemind6: false
      })
    } else if (this.data.popupType === '4') {
      this.setData({
        commonEquipmentType: e.detail.code,
        commonEquipmentTypeName: this.data.language === 'en' ? e.detail.nameEn : e.detail.nameCn
      })
    }
    this.onClose()
  },

  closeDate() {
    this.setData({
      showDatePopup: false
    })
    this.getTabBar().setData({
      show: true
    })
  },

  confirmDate(e) {
    this.setData({
      simulationDate: dayjs(e.detail).format('YYYY-MM-DD'),
      showDatePopup: false
    })
    this.getTabBar().setData({
      show: true
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

  setRemind(e) {
    this.setData({
      showLegal: false
    })
    this.getTabBar().setData({
      show: true
    })
    if (e.detail) {
      wx.navigateTo({
        url: '/pages/Login/index',
      })
    }
  },

  // 提交搜索
  submit() {
    if (this.data.showDelete1) {
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

    if (this.data.showDelete2) {
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
    if (this.data.currentType === 'instation') {
      if (!this.data.weight) {
        this.setData({
          showRemind5: true
        })
      } else {
        this.setData({
          showRemind5: false
        })
      }
      if (!this.data.commodityCode) {
        this.setData({
          showRemind6: true
        })
      } else {
        this.setData({
          showRemind6: false
        })
      }
      if (this.data.showRemind1 || this.data.showRemind2 || this.data.showRemind3 || this.data.showRemind4 || this.data.showRemind5 || this.data.showRemind6) return
      this.checkAccessToken(() => {
        if (this.data.commodityCode === "FAK") {
          this.getQuotationNextDepartures2(this.data.pricingGroups[0].shippingCompany, 0)
        } else {
          this.getQuotationNextDepartures()
        }
      })
    } else {
      if (this.data.showRemind1 || this.data.showRemind2 || this.data.showRemind3 || this.data.showRemind4) return
      this.checkAccessToken(() => {
        this.getContractList()
      })
    }
  },

  getQuotationNextDepartures() {
    quotationNextDepartures({
      "affiliates": [wx.getStorageSync('partnerCode')],
      "commodityCode": this.data.commodityCode,
      "deliveryHaulage": this.data.deliveryHaulage || null,
      "equipmentSizeType": this.data.equipmentType,
      "equipmentType": this.data.equipmentType.substr(2),
      "finalPlaceOfDelivery": this.data.finalPlaceOfDelivery || null,
      "numberOfContainers": this.data.containers,
      "placeOfOrigin": this.data.placeOfOrigin || null,
      "portOfDischarge": this.data.portOfDischarge,
      "portOfLoading": this.data.portOfLoading,
      "pricingGroupSetups": this.data.pricingGroupSetups.filter(i => i.shippingCompany === this.data.shippingCompany),
      "pricingGroups": this.data.pricingGroups.filter(i => i.shippingCompany === this.data.shippingCompany),
      "receiptHaulage": this.data.receiptHaulage || null,
      "shippingCompany": this.data.shippingCompany,
      "simulationDate": this.data.simulationDate,
      "weightPerContainer": this.data.weight
    }).then(res => {
      console.log(res)
      if (res.data && res.data.nextDepartureQuoteLineAndRoute && res.data.nextDepartureQuoteLineAndRoute.length) {
        this.setData({
          resultResq: res.data,
          shippingCompany: this.data.shippingCompany
        })
        wx.navigateTo({
          url: '/pages/Quotation/List/index',
        })
      } else {
        this.getNearByPortNextDeparture()
      }
    })
  },

  getQuotationNextDepartures2(shippingCompany, index) {
    if (index === this.data.pricingGroups.length) {
      this.getNearByPortNextDeparture()
    } else {
      quotationNextDepartures({
        "affiliates": [wx.getStorageSync('partnerCode')],
        "commodityCode": this.data.commodityCode,
        "deliveryHaulage": this.data.deliveryHaulage || null,
        "equipmentSizeType": this.data.equipmentType,
        "equipmentType": this.data.equipmentType.substr(2),
        "finalPlaceOfDelivery": this.data.finalPlaceOfDelivery || null,
        "numberOfContainers": this.data.containers,
        "placeOfOrigin": this.data.placeOfOrigin || null,
        "portOfDischarge": this.data.portOfDischarge,
        "portOfLoading": this.data.portOfLoading,
        "pricingGroupSetups": this.data.pricingGroupSetups.filter(i => i.shippingCompany === shippingCompany),
        "pricingGroups": this.data.pricingGroups.filter(i => i.shippingCompany === shippingCompany),
        "receiptHaulage": this.data.receiptHaulage || null,
        "shippingCompany": shippingCompany,
        "simulationDate": this.data.simulationDate,
        "weightPerContainer": this.data.weight
      }).then(res => {
        console.log(res)
        if (res.data && res.data.nextDepartureQuoteLineAndRoute && res.data.nextDepartureQuoteLineAndRoute.length) {
          this.setData({
            resultResq: res.data,
            shippingCompany: shippingCompany
          })
          wx.navigateTo({
            url: '/pages/Quotation/List/index',
          })
        } else {
          index++;
          this.getQuotationNextDepartures2(index === this.data.pricingGroups.length ? '' : this.data.pricingGroups[index].shippingCompany, index)
        }
      })
    }
  },

  getNearByPortNextDeparture() {
    nearByPortNextDeparture({
      "affiliates": [wx.getStorageSync('partnerCode')],
      "commodityCode": this.data.commodityCode,
      "deliveryHaulage": this.data.deliveryHaulage || null,
      "equipmentSizeType": this.data.equipmentType,
      "finalPlaceOfDelivery": this.data.finalPlaceOfDelivery || null,
      "hasIQExcluded": false,
      "myPricesContractsExist": false,
      "numberOfContainers": this.data.containers,
      "placeOfOrigin": this.data.placeOfOrigin || null,
      "portOfDischarge": this.data.portOfDischarge,
      "portOfLoading": this.data.portOfLoading,
      "receiptHaulage": this.data.receiptHaulage || null,
      "shippingCompany": this.data.shippingCompany,
      "simulationDate": this.data.simulationDate,
      "weightPerContainer": this.data.weight
    }).then(res => {
      console.log(res)
      if (!res.data || !res.data.length) {
        wx.navigateTo({
          url: '/pages/Quotation/List/index',
        })
      } else {
        this.setData({
          nearPort: res.data
        })
        wx.navigateTo({
          url: '/pages/Quotation/NearPort/index',
        })
      }

    })
  },

  getContractList() {
    quotationQuoteLinesSearch({
      "affiliates": [wx.getStorageSync('partnerCode')],
      "deliveryHaulage": this.data.deliveryHaulage || null,
      "equipmentType": this.data.commonEquipmentType,
      "finalPlaceOfDelivery": this.data.finalPlaceOfDelivery || null,
      "placeOfOrigin": this.data.placeOfOrigin || null,
      "portOfDischarge": this.data.portOfDischarge,
      "portOfLoading": this.data.portOfLoading,
      "receiptHaulage": this.data.receiptHaulage || null,
      "shippingCompany": "0001",
      "simulationDate": this.data.simulationDate
    }).then(res => {
      console.log(res)
      this.setData({
        contractResq: res.data || null
      })
      wx.navigateTo({
        url: '/packageBooking/pages/Contract/List/index',
      })
    })
  },

  reset() {
    this.setData({
      showPlaceOfDelivery: false,
      showPlaceOfReceipt: false,
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
      equipmentType: this.data.equipmentTypeList[0].code,
      equipmentTypeName: this.data.language === 'zh' ? this.data.equipmentTypeList[0].nameCn : this.data.equipmentTypeList[0].nameEn,
      commonEquipmentType: this.data.commonEquipmentTypeList[0].code,
      commonEquipmentTypeName: this.data.language === 'zh' ? this.data.commonEquipmentTypeList[0].nameCn : this.data.commonEquipmentTypeList[0].nameEn,
      weight: null,
      containers: 1,
      commodityCode: '',
      commodityName: '',
      commodityList: [],
      showRemind1: false,
      showRemind2: false,
      showRemind3: false,
      showRemind4: false,
      showRemind5: false,
      showRemind6: false,
      showDelete1: false,
      showDelete2: false,
      showDelete3: false,
      showDelete4: false,
      showDelete5: false,
    })
  }
})