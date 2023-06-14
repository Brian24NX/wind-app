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
    polCount:1,
    showPod: false,
    podCount:1,
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
    porCount:1,
    showPoDe: false,
    poDeCount:1,
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
    count:1,
    mainPartnerCode:''
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
      seaRewardData: wx.getStorageSync('seaRewardData'),
      partnerList: JSON.parse(JSON.stringify(partnerList)),
      checkPartnerList: JSON.parse(JSON.stringify(partnerList)),
      needLogin: !utils.checkAccessToken(),
      mainPartnerCode:wx.getStorageSync('partnerCode')
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
      currentType: e.currentTarget.dataset.type,
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
      porCount:1,
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
      if(wx.getStorageSync('partnerList')[0].code == '0002130568'){
        this.setData({
          placeOfReceiptList: [{"Name":"Jiaxing - Nanhu, 33 ; CN ; CN1CQ","ActualName":"JIAXING-NANHU,33;CN;CN1CQ","Code":"CN1CQ","PlaceType":"Door","Country":{},"LocationId":"CDM00000002159"},{"Name":"Jiaxing - Haining, 33 ; CN ; CNHIN","ActualName":"JIAXING-HAINING,33;CN;CNHIN","Code":"CNHIN","PlaceType":"Door","Country":{},"LocationId":"-1932542"},{"Name":"Jiaxing - Haiyan, 33 ; CN ; CNHY1","ActualName":"JIAXING-HAIYAN,33;CN;CNHY1","Code":"CNHY1","PlaceType":"Door","Country":{},"LocationId":"-1931230"},{"Name":"Jiaxing, 33 ; CN ; CNJIX","ActualName":"JIAXING,33;CN;CNJIX","Code":"CNJIX","PlaceType":"Ramp","Country":{},"LocationId":"-1912033"},{"Name":"Jiaxing, 33 ; CN ; CNJIX","ActualName":"JIAXING,33;CN;CNJIX","Code":"CNJIX","PlaceType":"Door","Country":{},"LocationId":"-1912033"},{"Name":"Jiaxing - Jiashan, 33 ; CN ; CNJN2","ActualName":"JIAXING-JIASHAN,33;CN;CNJN2","Code":"CNJN2","PlaceType":"Door","Country":{},"LocationId":"-1930339"},{"Name":"Jiaxing - Pinghu, 33 ; CN ; CNPNU","ActualName":"JIAXING-PINGHU,33;CN;CNPNU","Code":"CNPNU","PlaceType":"Door","Country":{},"LocationId":"-1902106"},{"Name":"Jiaxing - Tongxiang, 33 ; CN ; CNTA1","ActualName":"JIAXING-TONGXIANG,33;CN;CNTA1","Code":"CNTA1","PlaceType":"Door","Country":{},"LocationId":"-1931136"}]
        })
      }else{
        this.getPorData(data)
      }

      this.showDropdown(e[0].currentTarget.id || 'poo')
    }
  }, 800),

  getPorData(data,bal) {
    if(!bal){
      this.setData({
        showPoR: true
      })
    }
    if (this.data.currentType === 'instation') {
      getAllNetworkPoint({
        searchStr: data
      }, true).then(res => {
        this.setData({
          showPoR: false,
          porCount:1,
        })
        if (res.data != ''&&res.data!==undefined) {
          res.data.forEach(item => item.ActualName = item.ActualName.replaceAll(' ', ""))
          this.setData({
            placeOfReceiptList: res.data || []
          })
          // console.log('this.data.placeOfReceiptList',JSON.stringify(this.data.placeOfReceiptList))
        } else {
          this.hideDropdown()
        }
      }, () => {
        this.data.porCount++
        if(this.data.porCount<=3){
          this.getPorData(data,bal)
        }else{
          this.setData({
            showPoR: false,
            porCount:1,
          })
          this.hideDropdown()
        }
      })
    } else {
      getPortPlaceInfo({
        searchStr: data
      }, true).then(res => {
        this.setData({
          showPoR: false,
          porCount:1,
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
        this.data.porCount++
        if(this.data.porCount<=3){
          this.getPorData(data,bal)
        }else{
          this.setData({
            showPoR: false,
            showPoDe:false,
            porCount:1,

          })
          this.hideDropdown()
        }
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
      polCount:1,
      pollist: []
    })
    if (data.length < 2) {
      this.setData({
        pollist: []
      })
      return
    } else {
      if(wx.getStorageSync('partnerList')[0].code == '0002130568'){
        this.setData({
          showPol: true
        })
        this.setData({
          showPol: false,
          pollist:[{"pointCode":"CNSHA","point":"SHANGHAI;CN;CNSHA"}]
        })
      }else{
        this.getPolData(data)
      }
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
      if (res.data != ''&&res.data!==undefined) {
        this.setData({
          pollist: res.data || []
        })

      } else {
        this.hideDropdown()
      }
    }, () => {
      this.data.polCount++
      if(this.data.polCount<=3){
        this.getPolData(data)
      }else{
        this.setData({
          showPol: false
        })
        this.hideDropdown()
      }
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
      podCount:1,
      podlist: []
    })
    if (data.length < 2) {
      this.setData({
        podlist: []
      })
      return
    } else {
      if(wx.getStorageSync('partnerList')[0].code == '0002130568'){
        this.setData({
          showPod: true
        })
        if(data.indexOf('B')!==-1||data.indexOf('b')!==-1){
          this.setData({
            showPod: false,
            podlist:[{"pointCode":"BEANR","point":"ANTWERP;BE;BEANR"}]
          })
        }else{
          this.setData({
            showPod: false,
            podlist:[{"pointCode":"FRLEH","point":"LE HAVRE;FR;FRLEH"}]
          })
        }

      }else{
        this.getPodData(data)
      }
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
      if (res.data != ''&&res.data!==undefined) {
        this.setData({
          podlist: res.data || []
        })
      } else {
        this.hideDropdown()
      }
    }, () => {
      this.data.podCount++
      if(this.data.podCount<=3){
        this.getPodData(data)
      }else{
        this.setData({
          showPod: false
        })
        this.hideDropdown()
      }
    })
  },

  //获取目的地的接口处理
  changePlaceOfDelivery: utils.debounce(function (e) {
    console.log('进这里来了啊')
    const data = e['0'].detail.value
    this.setData({
      showDelete5: !!data,
      showPoDe: false,
      poDeCount:1,
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
      if(wx.getStorageSync('partnerList')[0].code == '0002130568'){
        this.setData({
          placeOfDeliveryList:[{"Name":"Paris, 75 ; FR ; FRPAR","ActualName":"PARIS,75;FR;FRPAR","Code":"FRPAR","PlaceType":"Ramp","Country":{},"LocationId":"-1456928"},{"Name":"Paris, 75 ; FR ; FRPAR","ActualName":"PARIS,75;FR;FRPAR","Code":"FRPAR","PlaceType":"Door","Country":{},"LocationId":"-1456928"}]
        })
      }else{
        this.getPooData(data)
      }
      this.showDropdown(e[0].currentTarget.id || 'podEnd')
    }
  }, 800),

  getPooData(data) {
    this.setData({
      showPoDe: true
    })
    console.log('这里呀判断了',this.data.currentType)
    if (this.data.currentType === 'instation') {
      getAllNetworkPoint({
        searchStr: data
      }, true).then(res => {
        this.setData({
          showPoDe: false,
          poDeCount:0
        })
        if (res.data != ''&&res.data!==undefined) {
          res.data.forEach(item => item.ActualName = item.ActualName.replaceAll(' ', ""))
          this.setData({
            placeOfDeliveryList: res.data || []
          })
          console.log(JSON.stringify(this.data.placeOfDeliveryList))
        } else {
          this.hideDropdown()
        }
      }, () => {
        this.data.poDeCount++
        if(this.data.poDeCount<=3){
          this.getPorData(data)
        }else{
          this.setData({
            showPoDe: false,
            poDeCount:0
          })
          this.hideDropdown()
        }

      })
    } else {
      getPortPlaceInfo({
        searchStr: data
      }, true).then(res => {
        this.setData({
          showPoDe: false,
        })
        if(res.data != ''&&res.data!==undefined){
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
        }
      }, () => {
          this.getPorData(data,true)
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
    if(wx.getStorageSync('partnerList')[0].code == '0002130568'){
      const res ={
        data:[{"iqexcludedPartners":[{"code":"0006603087","name":"NINGBO LET SPOT SUPPLY CHAIN MGT"},{"code":"0004118193","name":"YINGSHIDA INTL LOGISTICS"},{"code":"0006766059","name":"YIXING INTERNATIONAL LOGISTICS CO"},{"code":"0006816376","name":"CHINAPCBONE TECHNOLOGY LIMITED"},{"code":"0006830043","name":"LONGHUNT INTL FORWARDING CO LTD"},{"code":"0006043812","name":"NINGBO WISDOM UNION INTL LOG CO LTD"},{"code":"0001979970","name":"HANGZHOU Y&H INTL FWD AGENCY LTD"},{"code":"0003591816","name":"HANGZHOU YHCARGO SHENZHEN BRANCH"},{"code":"0006813526","name":"EVER TRANSPORT CO LTD"},{"code":"0005339353","name":"HANGZHOU Y&H INT L FWDG AGENCY CO"},{"code":"0007006043","name":"JADEBAY LTD"}],"pricingGroupId":11761,"iQexcludedPartners":[{"code":"0006603087","name":"NINGBO LET SPOT SUPPLY CHAIN MGT"},{"code":"0004118193","name":"YINGSHIDA INTL LOGISTICS"},{"code":"0006766059","name":"YIXING INTERNATIONAL LOGISTICS CO"},{"code":"0006816376","name":"CHINAPCBONE TECHNOLOGY LIMITED"},{"code":"0006830043","name":"LONGHUNT INTL FORWARDING CO LTD"},{"code":"0006043812","name":"NINGBO WISDOM UNION INTL LOG CO LTD"},{"code":"0001979970","name":"HANGZHOU Y&H INTL FWD AGENCY LTD"},{"code":"0003591816","name":"HANGZHOU YHCARGO SHENZHEN BRANCH"},{"code":"0006813526","name":"EVER TRANSPORT CO LTD"},{"code":"0005339353","name":"HANGZHOU Y&H INT L FWDG AGENCY CO"},{"code":"0007006043","name":"JADEBAY LTD"}],"shippingCompany":"0001","spotAccess":"spotContract","commodityDetails":[{"pricingGroup":11761,"code":"1006","en":"HS 1006 - Rice","shipComp":"0001"},{"pricingGroup":11761,"code":"4802","en":"HS 4802 - Paper","shipComp":"0001"},{"pricingGroup":11761,"code":"8541","en":"HS 8541 - Solar Panels","shipComp":"0001"},{"pricingGroup":11761,"code":"7019","en":"HS 7019 - Glass Fibres","shipComp":"0001"},{"pricingGroup":11761,"code":"8429","en":"HS 8429 - Excavators","shipComp":"0001"},{"pricingGroup":11761,"code":"8528","en":"HS 8528 - Monitors","shipComp":"0001"},{"pricingGroup":11761,"code":"8471","en":"HS 8471 - Monitors","shipComp":"0001"},{"pricingGroup":11761,"code":"6104","en":"HS 6104 - Garments","shipComp":"0001"},{"pricingGroup":11761,"code":"6404","en":"HS 6404 - Shoes/ Boots","shipComp":"0001"},{"pricingGroup":11761,"code":"9403","en":"HS 9403 - Furniture","shipComp":"0001"},{"pricingGroup":11761,"code":"2826","en":"HS 2826 - Potassium Fluorotitanate","shipComp":"0001"},{"pricingGroup":11761,"code":"2519","en":"HS 2519 - Magnesite","shipComp":"0001"},{"pricingGroup":11761,"code":"7228","en":"HS 7228 - Alloy Tool Steel","shipComp":"0001"},{"pricingGroup":11761,"code":"2508","en":"HS 2508 - Non-Haz Chemicals","shipComp":"0001"},{"pricingGroup":11761,"code":"7217","en":"HS 7217 - Metal Product","shipComp":"0001"},{"pricingGroup":11761,"code":"9506","en":"HS 9506 - Fitness Equipment","shipComp":"0001"},{"pricingGroup":11761,"code":"8479","en":"HS 8479 - Mixer","shipComp":"0001"},{"pricingGroup":11761,"code":"4015","en":"HS 4015 - Glove","shipComp":"0001"},{"pricingGroup":11761,"code":"3815","en":"HS 3815 - Non-Haz Chemicals","shipComp":"0001"},{"pricingGroup":11761,"code":"2833","en":"HS 2833 - Chemical","shipComp":"0001"},{"pricingGroup":11761,"code":"5806","en":"HS 5806 - Insulation Pipes","shipComp":"0001"},{"pricingGroup":11761,"code":"2309","en":"HS 2309 - Feed Grade","shipComp":"0001"},{"pricingGroup":11761,"code":"1212","en":"HS 1212 - Melon Seeds","shipComp":"0001"},{"pricingGroup":11761,"code":"3812","en":"HS 3812 - Chemical","shipComp":"0001"},{"pricingGroup":11761,"code":"7606","en":"HS 7606 - Aluminum Coil","shipComp":"0001"},{"pricingGroup":11761,"code":"6402","en":"HS 6402 - Garments","shipComp":"0001"},{"pricingGroup":11761,"code":"6815","en":"HS 6815 - Refractory Bricks","shipComp":"0001"},{"pricingGroup":11761,"code":"4412","en":"HS 4412 - Plywood","shipComp":"0001"},{"pricingGroup":11761,"code":"4008","en":"HS 4008 - Plates","shipComp":"0001"},{"pricingGroup":11761,"code":"8502","en":"HS 8502 - Genset","shipComp":"0001"},{"pricingGroup":11761,"code":"7326","en":"HS 7326 - Forged Tow Hook/ Metal Products","shipComp":"0001"},{"pricingGroup":11761,"code":"7600","en":"HS 7600 - Metal Products","shipComp":"0001"},{"pricingGroup":11761,"code":"7306","en":"HS 7306 - Metal Products","shipComp":"0001"},{"pricingGroup":11761,"code":"8466","en":"HS 8466 - Machinery Parts","shipComp":"0001"},{"pricingGroup":11761,"code":"9401","en":"HS 9401 - Household Supplies","shipComp":"0001"},{"pricingGroup":11761,"code":"8511","en":"HS 8511 - Auto Parts","shipComp":"0001"},{"pricingGroup":11761,"code":"4202","en":"HS 4202 - Luggage","shipComp":"0001"},{"pricingGroup":11761,"code":"1704","en":"HS 1704 - Candy","shipComp":"0001"},{"pricingGroup":11761,"code":"9404","en":"HS 9404 - Furniture","shipComp":"0001"},{"pricingGroup":11761,"code":"6202","en":"HS 6202 - Clothes","shipComp":"0001"},{"pricingGroup":11761,"code":"3918","en":"HS 3918 - Floor Tiles","shipComp":"0001"},{"pricingGroup":11761,"code":"4411","en":"HS 4411 - Laminate Flooring","shipComp":"0001"},{"pricingGroup":11761,"code":"4811","en":"HS 4811 - Gift Wrapping Paper","shipComp":"0001"},{"pricingGroup":11761,"code":"2918","en":"HS 2918 - Chemical","shipComp":"0001"},{"pricingGroup":11761,"code":"4011","en":"HS 4011 - Tires","shipComp":"0001"},{"pricingGroup":11761,"code":"6802","en":"HS 6802 - Granite","shipComp":"0001"},{"pricingGroup":11761,"code":"9619","en":"HS 9619 - Baby Diapers","shipComp":"0001"},{"pricingGroup":11761,"code":"1401","en":"HS 1401 - Reed","shipComp":"0001"},{"pricingGroup":11761,"code":"6914","en":"HS 6914 - Ceramics","shipComp":"0001"},{"pricingGroup":11761,"code":"7315","en":"HS 7315 - Machinery","shipComp":"0001"},{"pricingGroup":11761,"code":"4823","en":"HS 4823 - Pottery Decorations","shipComp":"0001"},{"pricingGroup":11761,"code":"2002","en":"HS 2002 - Tomato Paste","shipComp":"0001"},{"pricingGroup":11761,"code":"2507","en":"HS 2507 - Calcined Kaolin","shipComp":"0001"},{"pricingGroup":11761,"code":"4409","en":"HS 4409 - Timber","shipComp":"0001"},{"pricingGroup":11761,"code":"2103","en":"HS 2103 - Sauce","shipComp":"0001"},{"pricingGroup":11761,"code":"3926","en":"HS 3926 - Polyresin & Metal Products","shipComp":"0001"},{"pricingGroup":11761,"code":"3907","en":"HS 3907 - Pet Resin","shipComp":"0001"},{"pricingGroup":11761,"code":"7318","en":"HS 7318 - Metal Product","shipComp":"0001"},{"pricingGroup":11761,"code":"6302","en":"HS 6302 - Bed Linens","shipComp":"0001"},{"pricingGroup":11761,"code":"7307","en":"HS 7307 - Flanges/ Pipe Fittings","shipComp":"0001"},{"pricingGroup":11761,"code":"8903","en":"HS 8903 - Yachts","shipComp":"0001"},{"pricingGroup":11761,"code":"9618","en":"HS 9618 - Fibre Glass Mannequins ","shipComp":"0001"},{"pricingGroup":11761,"code":"6810","en":"HS 6810 - Pots","shipComp":"0001"},{"pricingGroup":11761,"code":"9701","en":"HS 9701 - Wall Decorations","shipComp":"0001"},{"pricingGroup":11761,"code":"8539","en":"HS 8539 - LED Filament Bulbs","shipComp":"0001"},{"pricingGroup":11761,"code":"5402","en":"HS 5402 - Nylon","shipComp":"0001"},{"pricingGroup":11761,"code":"8474","en":"HS 8474- Forming Machine","shipComp":"0001"},{"pricingGroup":11761,"code":"8430","en":"HS 8430 - Parts of valve","shipComp":"0001"},{"pricingGroup":11761,"code":"1109","en":"HS 1109 - Vital Wheat Gluten","shipComp":"0001"},{"pricingGroup":11761,"code":"7007","en":"HS 7007 - Tempered Glass","shipComp":"0001"},{"pricingGroup":11761,"code":"2005","en":"HS 2005 - Canned Lychee","shipComp":"0001"},{"pricingGroup":11761,"code":"8546","en":"HS 8546 - Insulator Body","shipComp":"0001"},{"pricingGroup":11761,"code":"9503","en":"HS 9503 - Household Supplies","shipComp":"0001"},{"pricingGroup":11761,"code":"2922","en":"HS 2922 - Lysine","shipComp":"0001"},{"pricingGroup":11761,"code":"7320","en":"HS 7320 - Plate Spring","shipComp":"0001"},{"pricingGroup":11761,"code":"2849","en":"HS 2849 - Non-Haz Chemical","shipComp":"0001"},{"pricingGroup":11761,"code":"3824","en":"HS 3824 - Modified Thermal Filler","shipComp":"0001"},{"pricingGroup":11761,"code":"8708","en":"HS 8708 - Aluminum Alloy Wheel","shipComp":"0001"},{"pricingGroup":11761,"code":"7312","en":"HS 7312 - Brass Coated Steel Cord","shipComp":"0001"},{"pricingGroup":11761,"code":"6110","en":"HS 6110 - Shoes and Garments","shipComp":"0001"},{"pricingGroup":11761,"code":"8711","en":"HS 8711 - Electric Scooters","shipComp":"0001"},{"pricingGroup":11761,"code":"3905","en":"HS 3905 - Polyvinyl Alcohol","shipComp":"0001"},{"pricingGroup":11761,"code":"4002","en":"HS 4002 - Kraton Polymer ","shipComp":"0001"},{"pricingGroup":11761,"code":"3911","en":"HS 3911 - Hydrogenated Hydrocarbon Resin Luhorez","shipComp":"0001"},{"pricingGroup":11761,"code":"0504","en":"HS 0504 - Salted Sheep Casings","shipComp":"0001"},{"pricingGroup":11761,"code":"6601","en":"HS 6601 - Umbrellas","shipComp":"0001"},{"pricingGroup":11761,"code":"3923","en":"HS 3923 - Plastic Bags","shipComp":"0001"},{"pricingGroup":11761,"code":"2209","en":"HS 2209 - Noodles","shipComp":"0001"},{"pricingGroup":11761,"code":"9405","en":"HS 9405 - Polyresin Lamp","shipComp":"0001"},{"pricingGroup":11761,"code":"7002","en":"HS 7002 - Glass Marbles","shipComp":"0001"},{"pricingGroup":11761,"code":"7219","en":"HS 7219 - Stainless Steel Flat- Roll Products","shipComp":"0001"},{"pricingGroup":11761,"code":"3102","en":"HS 3102 - Non-Haz Chemical","shipComp":"0001"},{"pricingGroup":11761,"code":"2106","en":"HS 2106 - Food Stuff","shipComp":"0001"},{"pricingGroup":11761,"code":"8418","en":"HS 8418 - Water Dispenser","shipComp":"0001"},{"pricingGroup":11761,"code":"2842","en":"HS 2842 - Nickel Cobalt Manganese Hydroxide","shipComp":"0001"},{"pricingGroup":11761,"code":"7304","en":"HS 7304 - Seamless Steel Tube","shipComp":"0001"},{"pricingGroup":11761,"code":"5811","en":"HS 5811 - Quilted Textile Products","shipComp":"0001"},{"pricingGroup":11761,"code":"9406","en":"HS 9406 - Louvered Pergola","shipComp":"0001"},{"pricingGroup":11761,"code":"8482","en":"HS 8482 - High Carbon Chrome Steel Ball Bearings","shipComp":"0001"},{"pricingGroup":11761,"code":"6803","en":"HS 6803 - Roofing Slate","shipComp":"0001"},{"pricingGroup":11761,"code":"7505","en":"HS 7505 - Nickel Alloy Bar","shipComp":"0001"},{"pricingGroup":11761,"code":"0902","en":"HS 0902 - Neptune Tea","shipComp":"0001"},{"pricingGroup":11761,"code":"3901","en":"HS 3901 - Formosa Plastics","shipComp":"0001"},{"pricingGroup":11761,"code":"3912","en":"HS 3912 - Microcrystalline Cellulose","shipComp":"0001"},{"pricingGroup":11761,"code":"8713","en":"HS 8713 - Mobile Scooter without Battery","shipComp":"0001"},{"pricingGroup":11761,"code":"8518","en":"HS 8518 - Loudspeaker","shipComp":"0001"},{"pricingGroup":11761,"code":"8413","en":"HS 8413 - Pumps","shipComp":"0001"},{"pricingGroup":11761,"code":"9402","en":"HS 9402 - Medical Equipment","shipComp":"0001"},{"pricingGroup":11761,"code":"3904","en":"HS 3904 - PVC Resin","shipComp":"0001"},{"pricingGroup":11761,"code":"3921","en":"HS 3921 - PE Foam","shipComp":"0001"},{"pricingGroup":11761,"code":"8461","en":"HS 8461 - Machine and Accessories","shipComp":"0001"},{"pricingGroup":11761,"code":"4817","en":"HS 4817 - Stationary","shipComp":"0001"},{"pricingGroup":11761,"code":"8547","en":"HS 8547 - Metal Fittings","shipComp":"0001"},{"pricingGroup":11761,"code":"1518","en":"HS 1518 - Used Cooking Oil","shipComp":"0001"},{"pricingGroup":11761,"code":"8807","en":"HS 8807 - Aircraft Parts","shipComp":"0001"},{"pricingGroup":11761,"code":"8800","en":"HS 8800 - Aircraft Parts","shipComp":"0001"},{"pricingGroup":11761,"code":"8712","en":"HS 8712 - Bike & Bike Parts","shipComp":"0001"},{"pricingGroup":11761,"code":"8504","en":"HS 8504 - Aluminum Parts","shipComp":"0001"},{"pricingGroup":11761,"code":"8457","en":"HS 8457 - Machinery","shipComp":"0001"},{"pricingGroup":11761,"code":"8714","en":"HS 8714 - Auto Parts","shipComp":"0001"},{"pricingGroup":11761,"code":"8473","en":"HS 8473 - Laptop Stand","shipComp":"0001"},{"pricingGroup":11761,"code":"8456","en":"HS 8456 - Machinery","shipComp":"0001"},{"pricingGroup":11761,"code":"8414","en":"HS 8414 - Fan","shipComp":"0001"},{"pricingGroup":11761,"code":"7210","en":"HS 7210 - Steel Plate","shipComp":"0001"},{"pricingGroup":11761,"code":"5603","en":"HS 5603 - Textiles","shipComp":"0001"},{"pricingGroup":11761,"code":"8422","en":"HS 8422 - Sleeve Labeling Machine","shipComp":"0001"},{"pricingGroup":11761,"code":"4803","en":"HS 4803 - Paper","shipComp":"0001"},{"pricingGroup":11761,"code":"2921","en":"HS 2921 - Taurine","shipComp":"0001"},{"pricingGroup":11761,"code":"7204","en":"HS 7204 - Recycling Iron-Steel Materials","shipComp":"0001"},{"pricingGroup":11761,"code":"8543","en":"HS 8543 - Electrical Machines","shipComp":"0001"},{"pricingGroup":11761,"code":"4407","en":"HS 4407 - Timber ","shipComp":"0001"},{"pricingGroup":11761,"code":"0511","en":"HS 0511 - Animal Foods","shipComp":"0001"},{"pricingGroup":11761,"code":"2917","en":"HS 2917 - Resin-Isophthalic Acid","shipComp":"0001"},{"pricingGroup":11761,"code":"6610","en":"HS 6610 - Garment","shipComp":"0001"},{"pricingGroup":11761,"code":"6801","en":"HS 6801 - Stones","shipComp":"0001"},{"pricingGroup":11761,"code":"7202","en":"HS 7202 - Ferroalloy","shipComp":"0001"},{"pricingGroup":11761,"code":"6307","en":"HS 6307 - Handycraft","shipComp":"0001"},{"pricingGroup":11761,"code":"8512","en":"HS 8512 - Auto Parts","shipComp":"0001"},{"pricingGroup":11761,"code":"7901","en":"HS 7901 - Ingot","shipComp":"0001"},{"pricingGroup":11761,"code":"3806","en":"HS 3806 - Gum Rosin","shipComp":"0001"},{"pricingGroup":11761,"code":"0801","en":"HS 0801 - Desiccated Coconut","shipComp":"0001"},{"pricingGroup":11761,"code":"7607","en":"HS 7607 - Aluminium Fin Stock ","shipComp":"0001"},{"pricingGroup":11761,"code":"8470","en":"HS 8470 - Pos Terminal","shipComp":"0001"},{"pricingGroup":11761,"code":"7310","en":"HS 7310 - Wire Rope","shipComp":"0001"},{"pricingGroup":11761,"code":"7409","en":"HS 7409 - Coil","shipComp":"0001"},{"pricingGroup":11761,"code":"4818","en":"HS 4818 - Toilet Paper","shipComp":"0001"},{"pricingGroup":11761,"code":"0908","en":"HS 0908 - Nutmeg","shipComp":"0001"},{"pricingGroup":11761,"code":"1604","en":"HS 1604 - Canned Fish","shipComp":"0001"},{"pricingGroup":11761,"code":"3902","en":"HS 3902 - YARN","shipComp":"0001"},{"pricingGroup":11761,"code":"5503","en":"HS 5503 - Polyester Staple Fiber","shipComp":"0001"},{"pricingGroup":11761,"code":"8431","en":"HS 8431 - Car & Auto Parts","shipComp":"0001"},{"pricingGroup":11761,"code":"8716","en":"HS 8716 - Hand Truck","shipComp":"0001"},{"pricingGroup":11761,"code":"2304","en":"HS 2304 - Soya Beans","shipComp":"0001"},{"pricingGroup":11761,"code":"1905","en":"HS 1905 - Food Stuff","shipComp":"0001"},{"pricingGroup":11761,"code":"0904","en":"HS 0904 - Foodstuff","shipComp":"0001"},{"pricingGroup":11761,"code":"0712","en":"HS 0712 - Food","shipComp":"0001"},{"pricingGroup":11761,"code":"0901","en":"HS 0901 - Foodstuff","shipComp":"0001"},{"pricingGroup":11761,"code":"2936","en":"HS 2936 - Vitamins","shipComp":"0001"},{"pricingGroup":11761,"code":"4822","en":"HS 4822 - Paper Bobbins","shipComp":"0001"},{"pricingGroup":11761,"code":"8415","en":"HS 8415 - Furniture","shipComp":"0001"},{"pricingGroup":11761,"code":"7220","en":"HS 7220 - Steel Products","shipComp":"0001"},{"pricingGroup":11761,"code":"2712","en":"HS 2712 - Food Wax","shipComp":"0001"},{"pricingGroup":11761,"code":"4418","en":"HS 4418 - Timber","shipComp":"0001"},{"pricingGroup":11761,"code":"2006","en":"HS 2006 - FOOD STUFF","shipComp":"0001"},{"pricingGroup":11761,"code":"8707","en":"HS 8707 - Auto Parts","shipComp":"0001"},{"pricingGroup":11761,"code":"2832","en":"HS 2832 - Sodium Phosphate","shipComp":"0001"},{"pricingGroup":11761,"code":"1902","en":"HS 1902 - Noodle","shipComp":"0001"},{"pricingGroup":11761,"code":"9032","en":"HS 9032 - Electronic Parts","shipComp":"0001"},{"pricingGroup":11761,"code":"7610","en":"HS 7610 - Shower Doors","shipComp":"0001"},{"pricingGroup":11761,"code":"5206","en":"HS 5206 - Yarn","shipComp":"0001"},{"pricingGroup":11761,"code":"2905 ","en":"HS 2905 - Xylitol","shipComp":"0001"},{"pricingGroup":11761,"code":"7223","en":"HS 7223 - Stainless Steel Wire","shipComp":"0001"},{"pricingGroup":11761,"code":"4001","en":"HS 4001 - Natural Rubber","shipComp":"0001"},{"pricingGroup":11761,"code":"5509","en":"HS 5509 - Yarn","shipComp":"0001"},{"pricingGroup":11761,"code":"8477","en":"HS 8477 - Machines","shipComp":"0001"},{"pricingGroup":11761,"code":"8415","en":"HS 8415 -  Air conditioner","shipComp":"0001"},{"pricingGroup":11761,"code":"2009","en":"HS 2009 - Coconut Water","shipComp":"0001"},{"pricingGroup":11761,"code":"6306","en":"HS 6306 - Storage Shelter","shipComp":"0001"},{"pricingGroup":11761,"code":"8536","en":"HS 8536 - Electronic Goods","shipComp":"0001"},{"pricingGroup":11761,"code":"8538","en":"HS 8538 - Electronic Goods","shipComp":"0001"},{"pricingGroup":11761,"code":"8533","en":"HS 8533 - Electronic Goods","shipComp":"0001"},{"pricingGroup":11761,"code":"8529","en":"HS 8529 - LCD/LED TV Parts","shipComp":"0001"},{"pricingGroup":11761,"code":"7009","en":"HS 7009 - Mirrors","shipComp":"0001"},{"pricingGroup":11761,"code":"1604","en":"HS 1604 - Canned Fish","shipComp":"0001"},{"pricingGroup":11761,"code":"8544","en":"HS 8544 - Electric conductors for voltage","shipComp":"0001"},{"pricingGroup":11761,"code":"2101","en":"HS 2101 - Foodstuff","shipComp":"0001"},{"pricingGroup":11761,"code":"2202","en":"HS 2202 - Beverage","shipComp":"0001"},{"pricingGroup":11761,"code":"2102","en":"HS 2102 - Dried yeast","shipComp":"0001"},{"pricingGroup":11761,"code":"0906","en":"HS 0906 - Cinnamon","shipComp":"0001"},{"pricingGroup":11761,"code":"6910","en":"HS 6910 - Ceramic Products","shipComp":"0001"},{"pricingGroup":11761,"code":"4819","en":"HS 4819 - Paper","shipComp":"0001"},{"pricingGroup":11761,"code":"7310 ","en":"HS 7310 - Ferriferous","shipComp":"0001"},{"pricingGroup":11761,"code":"5401","en":"HS 5401 - Textile","shipComp":"0001"},{"pricingGroup":11761,"code":"8501","en":"HS 8501 - Auto Parts","shipComp":"0001"},{"pricingGroup":11761,"code":"9608","en":"HS 9608 - Toys","shipComp":"0001"},{"pricingGroup":11761,"code":"8506","en":"HS 8506 - Battery","shipComp":"0001"},{"pricingGroup":11761,"code":"4819","en":"HS 4819 - Paper","shipComp":"0001"},{"pricingGroup":11761,"code":"3506","en":"HS 3506 - Silicone","shipComp":"0001"},{"pricingGroup":11761,"code":"4706","en":"HS 4706 - Abaca Pulp","shipComp":"0001"},{"pricingGroup":11761,"code":"1513","en":"HS 1513 - Crude Coconut Oil","shipComp":"0001"},{"pricingGroup":11761,"code":"2105","en":"HS 2105 - Ice Pops","shipComp":"0001"},{"pricingGroup":11761,"code":"4410","en":"HS 4410 - Oriental Strain Board","shipComp":"0001"},{"pricingGroup":11761,"code":"3005","en":"HS 3005 - Bandages","shipComp":"0001"},{"pricingGroup":11761,"code":"2401","en":"HS 2401 - Unmanufactured Tobacco","shipComp":"0001"},{"pricingGroup":11761,"code":"4016","en":"HS 4016 - Rubber Rack","shipComp":"0001"},{"pricingGroup":11761,"code":"8545","en":"HS 8545 - Graphite Electrodes","shipComp":"0001"},{"pricingGroup":11761,"code":"8443","en":"HS 8443 - Printer Consumables","shipComp":"0001"},{"pricingGroup":11761,"code":"8110","en":"HS 8110 - Scrap","shipComp":"0001"},{"pricingGroup":11761,"code":"2804","en":"HS 2804 - Silicon","shipComp":"0001"},{"pricingGroup":11761,"code":"7601","en":"HS 7601 - Aluminium Billet","shipComp":"0001"},{"pricingGroup":11761,"code":"9018","en":"HS 9018 - Medical Goods","shipComp":"0001"},{"pricingGroup":11761,"code":"9018","en":"HS 9018 - Medical Goods","shipComp":"0001"},{"pricingGroup":11761,"code":"6103","en":"HS 6103 - Garment","shipComp":"0001"},{"pricingGroup":11761,"code":"8427","en":"HS 8427 - Boom Lifts","shipComp":"0001"},{"pricingGroup":11761,"code":"8508","en":"HS 8508 -  Vacuum Cleaner","shipComp":"0001"},{"pricingGroup":11761,"code":"5703","en":"HS 5703 - Grass Carpets","shipComp":"0001"},{"pricingGroup":11761,"code":"4113","en":"HS 4113 - Leather","shipComp":"0001"},{"pricingGroup":11761,"code":"3401","en":"HS 3401 - Soap","shipComp":"0001"},{"pricingGroup":11761,"code":"5109","en":"HS 5109 - Yarn","shipComp":"0001"},{"pricingGroup":11761,"code":"6305","en":"HS 6305 - Woven Bags","shipComp":"0001"},{"pricingGroup":11761,"code":"2846","en":"HS 2846 - Rare Earth","shipComp":"0001"},{"pricingGroup":11761,"code":"5305","en":"HS 5305 - Coconut","shipComp":"0001"},{"pricingGroup":11761,"code":"7616","en":"HS 7616 - Aluminium","shipComp":"0001"},{"pricingGroup":11761,"code":"5508","en":"HS 5508 - Yarn","shipComp":"0001"},{"pricingGroup":11761,"code":"9603","en":"HS 9603 - Wooden Furniture","shipComp":"0001"},{"pricingGroup":11761,"code":"8302","en":"HS 8302 - Door accessories","shipComp":"0001"},{"pricingGroup":11761,"code":"8703","en":"HS 8703 - MOTOR VEHICLES","shipComp":"0001"},{"pricingGroup":11761,"code":"1901","en":"HS 1901 - Food Stuff Ramen","shipComp":"0001"},{"pricingGroup":11761,"code":"7411","en":"HS 7411 - Cooper Tube","shipComp":"0001"},{"pricingGroup":11761,"code":"8432","en":"HS 8432 - Spreader","shipComp":"0001"},{"pricingGroup":11761,"code":"3924","en":"HS 3924 - Paper Cup","shipComp":"0001"},{"pricingGroup":11761,"code":"1701","en":"HS 1701 - Sugar","shipComp":"0001"},{"pricingGroup":11761,"code":"3404","en":"HS 3404 - POLYETHYLENE GLYCOL","shipComp":"0001"},{"pricingGroup":11761,"code":"4602","en":"HS 4602 - Rattan Handicraft","shipComp":"0001"},{"pricingGroup":11761,"code":"7311","en":"HS 7311 - EMPTY GAS CYLINDER","shipComp":"0001"},{"pricingGroup":11761,"code":"7308","en":"HS 7308 - Racks","shipComp":"0001"},{"pricingGroup":11761,"code":"7010","en":"HS 7010 - Glass Bottles","shipComp":"0001"},{"pricingGroup":11761,"code":"8507","en":"HS 8507 - Lead Acid Battery","shipComp":"0001"},{"pricingGroup":11761,"code":"8307","en":"HS 8307 - Steel Product","shipComp":"0001"},{"pricingGroup":11761,"code":"6211","en":"HS 6211 - Garments","shipComp":"0001"},{"pricingGroup":11761,"code":"6204","en":"HS 6204 - Garments","shipComp":"0001"},{"pricingGroup":11761,"code":"7213","en":"HS 7213 - Hot Rolled Round Bar","shipComp":"0001"},{"pricingGroup":11761,"code":"8419","en":"HS 8419 - Spare Parts","shipComp":"0001"},{"pricingGroup":11761,"code":"4009","en":"HS 4009 - Vulcanised Rubber","shipComp":"0001"},{"pricingGroup":11761,"code":"3920","en":"HS 3920 - Laminating Films","shipComp":"0001"},{"pricingGroup":11761,"code":"4401","en":"HS 4401 - Wood Pellet","shipComp":"0001"},{"pricingGroup":11761,"code":"1206","en":"HS 1206 - Sunflower Seeds","shipComp":"0001"},{"pricingGroup":11761,"code":"3802","en":"HS 3802 -  Clay","shipComp":"0001"},{"pricingGroup":11761,"code":"4421","en":"HS 4421 - Plywood","shipComp":"0001"},{"pricingGroup":11761,"code":"8438","en":"HS 8438 - Machinery","shipComp":"0001"},{"pricingGroup":11761,"code":"7314","en":"HS 7314 - Fencing Parts","shipComp":"0001"},{"pricingGroup":11761,"code":"6911","en":"HS 6911 - Porcelain Tableware","shipComp":"0001"},{"pricingGroup":11761,"code":"8607","en":"HS 8607 - Axles","shipComp":"0001"},{"pricingGroup":11761,"code":"4420","en":"HS 4420 - Wood","shipComp":"0001"},{"pricingGroup":11761,"code":"2008","en":"HS 2008 - Taiwanese Mixed Vegetable Chips ","shipComp":"0001"},{"pricingGroup":11761,"code":"8460","en":"HS 8460 - Lathes","shipComp":"0001"},{"pricingGroup":11761,"code":"8458","en":"HS 8458 - Machine","shipComp":"0001"},{"pricingGroup":11761,"code":"6203","en":"HS 6203 - Garments","shipComp":"0001"},{"pricingGroup":11761,"code":"1604","en":"HS 1604 - Canned Tuna","shipComp":"0001"},{"pricingGroup":11761,"code":"2846","en":"HS 2846 - Rare Earth","shipComp":"0001"},{"pricingGroup":11761,"code":"0302","en":"HS 0302 - Canned Tuna","shipComp":"0001"},{"pricingGroup":11761,"code":"1904","en":"HS 1904 - Munchy Sticks Broccoli","shipComp":"0001"},{"pricingGroup":11761,"code":"8517","en":"HS 8517 - Networking Product","shipComp":"0001"},{"pricingGroup":11761,"code":"6210","en":"HS 6210 - Garments","shipComp":"0001"},{"pricingGroup":11761,"code":"8544","en":"HS 8544 - Virtual Reality Apparatus Accessory","shipComp":"0001"},{"pricingGroup":11761,"code":"3204","en":"HS 3204 - Dye (Non DG)","shipComp":"0001"}],"withoutOfferDisplay":"infoOnly","nextDepartureScheduleLimit":35,"digitalAllocationsCheck":true,"digitalAllocationsDisplay":"infoOnly","inlandPolicy":"throughRate"}]
      }
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
    }else{
      getCommodityLists({
        equipmentType: this.data.equipmentType,
        portOfLoading: this.data.portOfLoading,
        portOfDischarge: this.data.portOfDischarge
      }).then(res => {
        console.log(1111,res.data,JSON.stringify(res.data))
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
        let time = setTimeout(() => {
          this.data.count++
          this.getCommodityList()
        }, 500);
        console.log(this.data.count,this.data.count>3,time)
        if(this.data.count>3){
          clearInterval(time)
          this.setData({
            commodityList: [],
            commodityCode: 'FAK',
            commodityName: this.data.language === 'en' ? 'Freight All Kinds' : '所有类型的费用',
            pricingGroupSetups: [],
            pricingGroups: [],
            commodityLoading: false
          })
          console.log('tiem'.time)
        }
      })
    }

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
    console.log('containers',this.data.containers)
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
          if(wx.getStorageSync('partnerList')[0].code === '0002130568'){
            wx.navigateTo({
              url: '/pages/Quotation/List/index',
            })
          }else{
            if (this.data.commodityCode === "FAK") {
              this.getQuotationNextDepartures2(this.data.pricingGroups[0].shippingCompany, 0)
            } else {
              this.getQuotationNextDepartures()
            }
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

    }).catch((err)=>{
      console.log(111,err)
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
      polCount:1,
      showPod: false,
      podCount:1,
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