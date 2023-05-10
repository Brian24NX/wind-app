// pages/Quotation/Search/index/index.js
const app = getApp();
var languageUtil = require('../../../utils/languageUtils')
const utils = require('../../../utils/util')
const dayjs = require("dayjs");
const config = require('../../../config/config')
import {
  fuzzySearch,
  getPortPlaceInfo,
  getAllNetworkPoint,
  getCommodityLists,
  equitmentSizeListSpotOn
} from '../../../api/modules/home';
import {
  quotationNextDepartures,
  nearByPortNextDeparture,
  namedAccountsSearch
} from '../../../api/modules/quotation';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navTop: app.globalData.navTop,
    navHeight: app.globalData.navHeight,
    languageContent: {}, // 用于保存当前页面所需字典变了
    load: {},
    language: 'zh',
    verifyInfo: {},
    seaReward: {},
    hisListSpot: [],
    hisListQuot: [],
    seaRewardData: {},
    minDate: new Date().getTime(),
    maxDate: new Date().getTime() + 1000 * 60 * 60 * 24 * 30,
    showPol: false,
    showPod: false,
    shipperOwnedContainer: false,
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
    equiptCode: '',
    equiptInsCode: '',
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
    showRemind7: false,
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
    namedAccountLoading: false,
    namedAccountCode: '',
    namedAccountLabel: '',
    namedAccountList: [],
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
    contractResq: null,
    partnerList: [],
    checkPartnerList: [],
    partnerCode: [],
    showPartner: false,
    needLogin: null,
    hasPermission: null,
    showOverlay: false,
    //隐藏下拉框
    showDropdown: {
      poo: false,
      pol: false,
      pod: false,
      podEnd: false,
    },
    podEndWarn: false,
    pooWarn: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.initLanguage();
    this.getEquitmentSizeList()
    this.setData({
      simulationDate: this.getDate(),
      hisListSpot: wx.getStorageSync('spotOnHis'),
      hisListQuot: wx.getStorageSync('quotationHis'),
      seaRewardData: wx.getStorageSync('seaRewardData'),
    })
    wx.removeStorageSync('isSocAgree');
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
    const partnerList = (wx.getStorageSync('partnerList') || []).map(item => {
      return {
        ...item,
        checked: true
      }
    })
    this.setData({
      partnerList: JSON.parse(JSON.stringify(partnerList)),
      checkPartnerList: JSON.parse(JSON.stringify(partnerList)),
      needLogin: !utils.checkAccessToken()
    })
    if (this.data.needLogin === false) {
      this.setData({
        hasPermission: utils.checkPermission('requestQuo')
      })
    }
    setTimeout(() => {
      let reward = wx.getStorageSync('seaRewardData')
      if(reward){
        this.setData({
          seaRewardData: reward,
        })
      }
    },2000)
  },

  isAdsValid(str) {
    let reg = /^([A-z0-9\,\.\-\/\s]+[A-z0-9]+[\;]){2}([A-z0-9]+)$/;
    return reg.test(str);
  },

  onShareAppMessage: function () { },

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
        minDate: new Date().setFullYear(new Date().getFullYear() - 2)
      })
    }
  },

  setBackData() {
    this.setData({
      currentType: 'instation',
      placeOfOrigin: '',
      placeOfOriginLabel: '',
      finalPlaceOfDelivery: '',
      finalPlaceOfDeliveryLabel: '',
      showDelete4: false,
      showPlaceOfReceipt: false,
      placeOfReceiptList: [],
      showPlaceOfDelivery: false,
      showDelete5: false,
      placeOfDeliveryList: []
    })
    this.getCommodityList()
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

  toLogin() {
    if (wx.getStorageSync('allowLegalTerms') && wx.getStorageSync('phone')) {
      if(config.mockLogin){
        wx.navigateTo({
          url: '/pages/LoginCopy/index'
        })
      }else{
        wx.navigateTo({
          url: '/pages/Login/index'
        })
      }
    } else {
      this.setData({
        showLegal: true
      })
      this.getTabBar().setData({
        show: false
      })
    }
  },

  toSeaReward(){
    wx.navigateTo({
      url: '/packageDashboard/pages/seaRewards/index',
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
        if (wx.getStorageSync('allowLegalTerms') && wx.getStorageSync('phone')) {
          if(config.mockLogin){
            wx.navigateTo({
              url: '/pages/LoginCopy/index'
            })
          }else{
            wx.navigateTo({
              url: '/pages/Login/index'
            })
          }
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
    equitmentSizeListSpotOn().then(res => {
      if (res.data.length) {
        this.setData({
          equipmentTypeList: res.data,
          equipmentType: res.data[0].instantCode,
          equiptCode: res.data[0].code,
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
      language: lang.lang.page.langue,
      verifyInfo: lang.lang.page.verifyInfo,
      seaReward: lang.lang.page.seaReward,
      load: lang.lang.page.load
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
      pooWarn: false,
      placeOfReceiptList: []
    })
    if (!data) {
      this.setData({
        receiptHaulage: null,
      })
      return
    }
    if (data.length < 2) {
      this.setData({
        placeOfReceiptList: []
      })
      return
    } else {
      this.getPorData(data)
      this.showDropdown(e[0].currentTarget.id || 'poo')
    }
  }, 800),

  getPorData(data) {
    console.log('*************',data)
    this.setData({
      showPoR: true
    })
    if (this.data.currentType === 'instation') {
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
          console.log('this.data.placeOfReceiptList',this.data.placeOfReceiptList)
        } else {
          this.hideDropdown()
        }
      }, () => {
        this.getPorData(data)
      })
    } else {
      getPortPlaceInfo({
        searchStr: data
      }, true).then(res => {
        this.setData({
          showPoR: false
        })
        let placeOfReceiptList = []
        if (res.data && res.data.length) {
          res.data.forEach(item => {
            if (item.point) {
              placeOfReceiptList.push({
                ActualName: item.point.name + ';' + item.country.code + ';' + item.point.code,
                Code: item.point.code,
                PlaceType: ''
              })
            }
          })
        }
        this.setData({
          placeOfReceiptList
        })
        console.log('placeOfReceiptList',placeOfReceiptList)
      }, () => {
        this.getPorData(data)
      })
    }
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
    } else {
      this.getPolData(data)
      this.showDropdown(e[0].currentTarget.id || 'pol')
    }
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
      } else {
        this.hideDropdown()
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
    } else {
      this.getPodData(data)
      this.showDropdown(e[0].currentTarget.id || 'pod')
    }
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
      } else {
        this.hideDropdown()
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
      podEndWarn: false,
      placeOfDeliveryList: []
    })
    if (!data) {
      this.setData({
        deliveryHaulage: null,
      })
      return
    }
    if (data.length < 2) {
      this.setData({
        placeOfDeliveryList: []
      })
      return
    } else {
      this.getPooData(data)
      this.showDropdown(e[0].currentTarget.id || 'podEnd')
    }
  }, 800),

  getPooData(data) {
    console.log('----------',data)
    this.setData({
      showPoDe: true
    })
    if (this.data.currentType === 'instation') {
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
        } else {
          this.hideDropdown()
        }
      }, () => {
        this.getPorData(data)
      })
    } else {
      getPortPlaceInfo({
        searchStr: data
      }, true).then(res => {
        this.setData({
          showPoDe: false
        })
        let placeOfDeliveryList = []
        if (res.data && res.data.length) {
          res.data.forEach(item => {
            if (item.point) {
              placeOfDeliveryList.push({
                ActualName: item.point.name + ';' + item.country.code + ';' + item.point.code,
                Code: item.point.code,
                PlaceType: ''
              })
            }
          })
        }
        this.setData({
          placeOfDeliveryList
        })
      }, () => {
        this.getPorData(data)
      })
    }
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
    console.log('收货地',e)
    let index = e.currentTarget.dataset.index;
    this.setData({
      placeOfOriginLabel: this.data.placeOfReceiptList[index].ActualName,
      placeOfOrigin: this.data.placeOfReceiptList[index].Code,
      receiptHaulage: this.data.placeOfReceiptList[index].PlaceType,
      placeOfReceiptList: [],
    })
    this.hideDropdown()
  },

  // 起始港选择
  changepolname(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      portOfLoadingLabel: this.data.pollist[index].point,
      portOfLoading: this.data.pollist[index].pointCode,
      pollist: [],
    })
    this.hideDropdown()
    if (this.data.currentType === 'instation') {
      this.getCommodityList()
    } else {
      this.getNamedAccountsSearch()
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
    this.hideDropdown()
    if (this.data.currentType === 'instation') {
      this.getCommodityList()
    } else {
      this.getNamedAccountsSearch()
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
    this.hideDropdown()
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
      console.log(res)
      if (res.data) {
        let commodityList = []
        res.data.forEach(i => {
          if (i.commodityDetails) {
            commodityList = commodityList.concat(i.commodityDetails.map(c => {
              return {
                ...c,
                zh: c.zh || c.en
              }
            }))
          }
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
      } else {
        this.setData({
          commodityList: [],
          commodityCode: 'FAK',
          commodityName: this.data.language === 'en' ? 'Freight All Kinds' : '所有类型的费用',
          pricingGroupSetups: [],
          pricingGroups: [],
          commodityLoading: false
        })
      }
    }, () => {
      setTimeout(() => {
        this.getCommodityList()
      }, 500);
    })
  },

  getNamedAccountsSearch() {
    this.checkAccessToken(() => {
      this.setData({
        namedAccountCode: '',
        namedAccountLabel: '',
        namedAccountList: []
      })
      if (!this.data.portOfLoading || !this.data.portOfDischarge) return
      this.setData({
        namedAccountLoading: true
      })
      namedAccountsSearch({
        portOfLoading: this.data.portOfLoading,
        portOfDischarge: this.data.portOfDischarge,
        affiliates: wx.getStorageSync('partnerList').map(i => i.code)
      }).then(res => {
        let data = []
        if (res.data && res.data.length) {
          data = res.data
          data.unshift({
            code: '',
            name: 'All Named Account'
          })
        }
        this.setData({
          namedAccountList: data,
          namedAccountLoading: false
        })
      }, () => {
        setTimeout(() => {
          this.getNamedAccountsSearch()
        }, 500);
      })
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
      containers: !Number(e.detail.value) ? 1 : (Number(e.detail.value) > 100 ? 100 : Number(e.detail.value))
    })
  },

  openPopup(e) {
    if (e.currentTarget.dataset.type === '3' && (!this.data.commodityList.length || !this.data.pricingGroups.length)) {
      return
    }
    if (e.currentTarget.dataset.type === '5' && !this.data.namedAccountList.length) {
      return
    }
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
    } else if (e.currentTarget.dataset.type === '5') {
      defaultIndex = this.data.namedAccountList.findIndex(i => i.code === this.data.namedAccountCode)
    }
    this.setData({
      popupType: e.currentTarget.dataset.type,
      columns: e.currentTarget.dataset.type === '1' ? this.data.equipmentTypeList : e.currentTarget.dataset.type === '3' ? this.data.commodityList : e.currentTarget.dataset.type === '4' ? this.data.commonEquipmentTypeList : this.data.namedAccountList,
      valueKey: (e.currentTarget.dataset.type === '1' || e.currentTarget.dataset.type === '4') ? (this.data.language === 'zh' ? 'nameCn' : 'nameEn') : e.currentTarget.dataset.type === '3' ? (this.data.language === 'zh' ? 'zh' : 'en') : 'name',
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
        equipmentType: e.detail.instantCode,
        equiptCode: e.detail.code,
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
    } else if (this.data.popupType === '5') {
      this.setData({
        namedAccountCode: e.detail.code,
        namedAccountLabel: e.detail.name
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
      if(config.mockLogin){
        wx.navigateTo({
          url: '/pages/LoginCopy/index'
        })
      }else{
        wx.navigateTo({
          url: '/pages/Login/index'
        })
      }
    }
  },

  choosePartner() {
    this.setData({
      showPartner: !this.data.showPartner,
      showRemind7: false
    })
  },

  choosePartners(e) {
    const index = e.currentTarget.dataset.index
    this.data.partnerList[index].checked = !this.data.partnerList[index].checked
    this.setData({
      partnerList: this.data.partnerList
    })
    const index2 = this.data.checkPartnerList.findIndex(i => i.code === this.data.partnerList[index].code)
    if (index2 === -1) {
      this.data.checkPartnerList.push(this.data.partnerList[index])
    } else {
      this.data.checkPartnerList.splice(index2, 1)
    }
    this.setData({
      checkPartnerList: this.data.checkPartnerList
    })
  },

  deletePartner(e) {
    const index = e.currentTarget.dataset.index
    const index2 = this.data.partnerList.findIndex(i => i.code === this.data.checkPartnerList[index].code)

    this.data.partnerList[index2].checked = false
    this.data.checkPartnerList.splice(index, 1)
    this.setData({
      checkPartnerList: this.data.checkPartnerList,
      partnerList: this.data.partnerList
    })
  },

  // 提交搜索
  submit() {
    wx.removeStorageSync('isSocAgree');
    this.hideDropdown();
    if (this.data.showDelete4) {
      if (!this.isAdsValid(this.data.placeOfOriginLabel)) {
        this.setData({
          pooWarn: true
        })
      } else {
        this.setData({
          pooWarn: false
        })
      }
    }

    if (this.data.showDelete5) {
      if (!this.isAdsValid(this.data.finalPlaceOfDeliveryLabel)) {
        this.setData({
          podEndWarn: true
        })
      } else {
        this.setData({
          podEndWarn: false
        })
      }
    }
    if (this.data.showDelete1) {
      this.setData({
        showRemind1: false
      })
      if (this.data.portOfLoadingLabel) {
        if (!this.isAdsValid(this.data.portOfLoadingLabel)) {
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
        if (!this.isAdsValid(this.data.portOfDischargeLabel)) {
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
    if (this.data.partnerList.length === 1) {
      this.setData({
        partnerCode: [this.data.partnerList[0].code]
      })
    } else {
      if (!this.data.checkPartnerList.length) {
        this.setData({
          showRemind7: true
        })
      } else {
        this.setData({
          showRemind7: false,
          partnerCode: this.data.checkPartnerList.map(i => { return i.code })
        })
      }
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
      if (this.data.showRemind1 || this.data.showRemind2 || this.data.showRemind3 || this.data.showRemind4 || this.data.showRemind5 || this.data.showRemind6 || (this.data.partnerList.length > 1 && this.data.showRemind7)) return
      this.checkAccessToken(() => {
        this.saveHistory()
        if (this.data.pricingGroups.length) {
          if (this.data.commodityCode === "FAK") {
            this.getQuotationNextDepartures2(this.data.pricingGroups[0].shippingCompany, 0)
          } else {
            this.getQuotationNextDepartures()
          }
        } else {
          this.setData({
            resultResq: {}
          })
          wx.navigateTo({
            url: '/pages/Quotation/List/index',
          })
        }
      })
    } else {
      if (this.data.showRemind1 || this.data.showRemind2 || this.data.showRemind3 || this.data.showRemind4 || (this.data.partnerList.length > 1 && this.data.showRemind7)) return
      this.checkAccessToken(() => {
        if (this.data.partnerList.length === 1) {
          this.setData({
            partnerCode: [this.data.partnerList[0].code]
          })
        }
        this.saveHistory()
        wx.navigateTo({
          url: '/packageBooking/pages/Contract/List/index',
        })
      })
    }
  },

  getQuotationNextDepartures() {
    quotationNextDepartures({
      "affiliates": this.data.partnerCode,
      "commodityCode": this.data.commodityCode,
      "deliveryHaulage": this.data.deliveryHaulage || null,
      "equipmentSizeType": this.data.equiptCode,
      "equipmentType": this.data.equiptCode.substr(2),
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
      "weightPerContainer": this.data.weight,
      "shipperOwnedContainer": this.data.shipperOwnedContainer
    }).then(res => {
      if (res.data) {
        if (res.data.hasFmcExcluded === true || res.data.hasFmcExcluded === false) {
          this.setData({
            resultResq: {}
          })
          wx.navigateTo({
            url: '/pages/Quotation/List/index?isUs=1',
          })
        } else {
          if (res.data.nextDepartureQuoteLineAndRoute && res.data.nextDepartureQuoteLineAndRoute.length) {
            this.setData({
              resultResq: res.data,
              shippingCompany: this.data.shippingCompany
            })
            wx.navigateTo({
              url: '/pages/Quotation/List/index',
            })
          } else {
            this.setData({
              resultResq: {}
            })
            this.getNearByPortNextDeparture()
          }
        }
      } else {
        this.setData({
          resultResq: {}
        })
        this.getNearByPortNextDeparture()
      }

    })
  },

  getQuotationNextDepartures2(shippingCompany, index) {
    if (index === this.data.pricingGroups.length) {
      this.setData({
        resultResq: {}
      })
      this.getNearByPortNextDeparture()
    } else {
      quotationNextDepartures({
        "affiliates": this.data.partnerCode,
        "commodityCode": this.data.commodityCode,
        "deliveryHaulage": this.data.deliveryHaulage || null,
        "equipmentSizeType": this.data.equiptCode,
        "equipmentType": this.data.equiptCode.substr(2),
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
        "weightPerContainer": this.data.weight,
        "shipperOwnedContainer": this.data.shipperOwnedContainer
      }).then(res => {
        if (res.data) {
          if (res.data.hasFmcExcluded === true || res.data.hasFmcExcluded === false) {
            this.setData({
              resultResq: {}
            })
            wx.navigateTo({
              url: '/pages/Quotation/List/index?isUs=1',
            })
          } else {
            if (res.data.nextDepartureQuoteLineAndRoute && res.data.nextDepartureQuoteLineAndRoute.length) {
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
          }
        } else {
          index++;
          this.getQuotationNextDepartures2(index === this.data.pricingGroups.length ? '' : this.data.pricingGroups[index].shippingCompany, index)
        }
      })
    }
  },

  getNearByPortNextDeparture() {
    nearByPortNextDeparture({
      "affiliates": this.data.partnerCode,
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

  reset() {
    this.hideDropdown();
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
      deliveryHaulage: '',
      pollist: [],
      podlist: [],
      simulationDate: this.getDate(),
      equipmentType: this.data.equipmentTypeList[0].instantCode,
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
      showRemind7: false,
      showDelete1: false,
      showDelete2: false,
      showDelete3: false,
      showDelete4: false,
      showDelete5: false,
      checkPartnerList: JSON.parse(JSON.stringify(this.data.partnerList)),
      partnerCode: [],
      pooWarn: false,
      podEndWarn: false
    })
  },

  switchOwnedContainer(e) {
    this.setData({
      shipperOwnedContainer: e.detail
    })
  },

  closeSelect() {
    this.setData({
      showPartner: false
    })
  },

  showDropdown(id) {
    var key = 'showDropdown.' + id
    this.setData({
      [key]: true,
      showOverlay: true
    })
  },

  hideDropdown(e) {
    this.setData({
      showDropdown: {
        poo: false,
        pol: false,
        pod: false,
        podEnd: false,
      },
      showOverlay: false
    })
  },

  //保存查询历史
  saveHistory() {
    var searchKey = {
      key: this.data.placeOfOrigin + '-' + this.data.portOfLoading + '-' + this.data.portOfDischarge + '-' + this.data.finalPlaceOfDelivery,
      poo: this.data.placeOfOrigin || '',
      pooLabel: this.data.placeOfOriginLabel || '',
      pol: this.data.portOfLoading,
      polLabel: this.data.portOfLoadingLabel,
      pod: this.data.portOfDischarge,
      podLabel: this.data.portOfDischargeLabel,
      fpod: this.data.finalPlaceOfDelivery || '',
      fpodLabel: this.data.finalPlaceOfDeliveryLabel || '',
      receiptHaulage: this.data.receiptHaulage,
      deliveryHaulage: this.data.deliveryHaulage,
    }
    searchKey.key = searchKey.poo + '-' + searchKey.pol + '-' + searchKey.pod + '-' + searchKey.fpod;
    var history = [];
    if (this.data.currentType === 'instation') {
      history = this.data.hisListSpot || []
    } else {
      history = this.data.hisListQuot || []
    }

    if (history.findIndex(item => item.key === searchKey.key) === -1) {
      if (history.length < 5) {
        history.unshift(searchKey)
      } else {
        history.unshift(searchKey)
        history.splice(history.length - 1, 1)
      }
    }

    if (this.data.currentType === 'instation') {
      this.setData({
        hisListSpot: history
      })
      wx.setStorageSync('spotOnHis', history)
    } else {
      this.setData({
        hisListQuot: history
      })
      wx.setStorageSync('quotationHis', history)
    }
  },

  deleteall() {
    if (this.data.currentType === 'instation') {
      this.setData({
        hisListSpot: []
      })
      wx.removeStorageSync('spotOnHis')
    } else {
      this.setData({
        hisListQuot: []
      })
      wx.removeStorageSync('quotationHis')
    }

  },
  getlocation(e) {
    var idx = e.currentTarget.dataset.index;
    var listData = []
    if (this.data.currentType === 'instation') {
      listData = this.data.hisListSpot
    } else {
      listData = this.data.hisListQuot
    }

    this.setData({
      placeOfOrigin: listData[idx].poo || '',
      portOfLoading: listData[idx].pol,
      portOfDischarge: listData[idx].pod,
      finalPlaceOfDelivery: listData[idx].fpod || '',
      placeOfOriginLabel: listData[idx].pooLabel || '',
      portOfDischargeLabel: listData[idx].podLabel,
      portOfLoadingLabel: listData[idx].polLabel,
      finalPlaceOfDeliveryLabel: listData[idx].fpodLabel || '',
      showPlaceOfReceipt: listData[idx].poo !== '' ? true : false,
      showPlaceOfDelivery: listData[idx].fpod !== '' ? true : false,
      showRemind1: false,
      showRemind2: false,
      showRemind3: false,
      showRemind4: false,
      showDelete1: true,
      showDelete2: true,
      showDelete4: true,
      showDelete5: true,
      deliveryHaulage: listData[idx].deliveryHaulage || '',
      receiptHaulage: listData[idx].receiptHaulage || '',
    }, () => {
      if (this.data.currentType === 'instation') {
        this.getCommodityList()
      } else {
        this.getNamedAccountsSearch()
      }
    })
  },
  deleteOne(e) {
    let curKey = e.currentTarget.dataset.index;
    let rmList = []
    if (this.data.currentType === 'instation') {
      rmList = this.data.hisListSpot
    } else {
      rmList = this.data.hisListQuot
    }
    var idx = rmList.findIndex(item => item.key === curKey)
    rmList.splice(idx, 1)
    if (this.data.currentType === 'instation') {
      this.setData({
        hisListSpot: rmList
      })
      wx.setStorageSync('spotOnHis', rmList);
    } else {
      this.setData({
        hisListQuot: rmList
      })
      wx.setStorageSync('quotationHis', rmList);
    }
  },
})