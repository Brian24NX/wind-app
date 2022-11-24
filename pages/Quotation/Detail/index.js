// pages/Quotation/Detail/index.js
const languageUtil = require('../../../utils/languageUtils')
import {
  vasLists,
  createQuotationQuotation
} from '../../../api/modules/quotation';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    vasLanguageContent: {},
    language: 'zh',
    baseUrl: '',
    languageCode: '',
    todayDate: '',
    isFirst: false,
    otherList: [{
      icon: '/assets/img/instantQuote/other_1@2x.png',
      label: 'localCharge',
      url: "/pages/Quotation/Others/LocalCharges/index",
      show: true
    }, {
      icon: '/assets/img/instantQuote/other_2@2x.png',
      label: 'DDSM',
      url: "/pages/Quotation/Others/DDCharges/index",
      show: true
    }, {
      icon: '/assets/img/instantQuote/other_3@2x.png',
      label: 'SpotOn',
      url: "/pages/Quotation/Others/SpotOn/index",
      show: true
    }, {
      icon: '/assets/img/instantQuote/other_4@2x.png',
      label: 'addInfo',
      url: "/pages/Quotation/Others/AdditionalInformation/index",
      show: true
    }],
    fromLabel: "",
    fromCode: '',
    toLabel: '',
    toCode: '',
    quotationDetail: {},
    totalChargeAmount: 0,
    equipmentTypeSize: '',
    equipmentTypeName: '',
    weight: '',
    containers: '',
    commodityName: '',
    shippingCompany: '',
    simulationDate: '',
    traceId: '',
    portOfLoading: '',
    portOfLoadingLabel: '',
    portOfDischarge: '',
    portOfDischargeLabel: '',
    placeOfOrigin: '',
    finalPlaceOfDelivery: '',
    partnerCode: [],
    vasList: [],
    subscribedServices: [],
    noSelectVasList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.qutationResult.title2
    })
    // const pages = getCurrentPages()
    // const currentPage = pages[pages.length - 2]
    // const data = currentPage.data
    const languages = languageUtil.languageVersion().lang.page
    this.setData({
      languageContent: languages.qutationResult,
      vasLanguageContent: languages.vas,
      language: languages.langue,
      languageCode: languages.langue === 'zh' ? 'zh_CN' : 'en_US',
      baseUrl: "https://www.cma-cgm.com/static/ecommerce/VASAssets/" + (languages.langue === 'zh' ? 'zh_CN' : 'en_US') + "/",
      // partnerCode: data.partnerCode,
      todayDate: this.getDate(),
      // portOfLoading: data.portOfLoading,
      // portOfLoadingLabel: data.portOfLoadingLabel,
      // portOfDischarge: data.portOfDischarge,
      // portOfDischargeLabel: data.portOfDischargeLabel,
      // placeOfOrigin: data.placeOfOrigin,
      // finalPlaceOfDelivery: data.finalPlaceOfDelivery
    })
    // this.setDefaultInfo(Number(options.index), Number(options.containers))
    this.getVasList()
  },

  setDefaultInfo(index, containers) {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    let quotationDetail = data.quoteLineList[index]
    quotationDetail.surchargeDetails.oceanFreightDetailsLabel = quotationDetail.surchargeDetails.oceanFreightDetails.join(' / ')
    quotationDetail.surchargeDetails.oceanFreight.isChecked = true
    quotationDetail.surchargeDetails.freightCharges.isChecked = true
    quotationDetail.surchargeDetails.prepaidCharges.isChecked = true
    quotationDetail.surchargeDetails.collectCharges.isChecked = true
    this.data.otherList[2].show = quotationDetail.quoteLines[0].spotOffer
    this.setData({
      fromLabel: data.fromLabel,
      fromCode: data.fromCode,
      toLabel: data.toLabel,
      toCode: data.toCode,
      receiptHaulage: data.receiptHaulage,
      deliveryHaulage: data.deliveryHaulage,
      shippingCompany: data.shippingCompany,
      quotationDetail,
      simulationDate: data.simulationDate,
      traceId: data.traceId,
      otherList: this.data.otherList
    })
    this.calculatedCharges()
    const currentPage2 = pages[pages.length - 3]
    const data2 = currentPage2.data
    this.setData({
      equipmentTypeSize: data2.equipmentType,
      equipmentTypeName: data2.equipmentTypeName,
      weight: data2.weight,
      containers: containers || data2.containers,
      commodityName: data2.commodityName
    })
  },

  setSubscribedServices(detail, index) {
    this.data.vasList[index] = detail
    this.setData({
      vasList: this.data.vasList,
      subscribedServices: this.data.vasList.filter(i => i.isProductSelected)
    })
  },

  calculatedCharges() {
    const surchargeDetails = this.data.quotationDetail.surchargeDetails
    let totalChargeAmount = 0
    if (surchargeDetails.oceanFreight.isChecked) {
      totalChargeAmount = totalChargeAmount + surchargeDetails.oceanFreight.price.amount
    }
    if (surchargeDetails.freightCharges.isChecked) {
      totalChargeAmount = totalChargeAmount + surchargeDetails.freightCharges.amount
    }
    if (surchargeDetails.prepaidCharges.isChecked) {
      totalChargeAmount = totalChargeAmount + surchargeDetails.prepaidCharges.amount
    }
    if (surchargeDetails.collectCharges.isChecked) {
      totalChargeAmount = totalChargeAmount + surchargeDetails.collectCharges.amount
    }
    this.setData({
      totalChargeAmount: totalChargeAmount || this.data.quotationDetail.surchargeDetails.totalCharge.amount
    })
  },

  changeCheck(e) {
    this.data.quotationDetail.surchargeDetails[e.currentTarget.dataset.id].isChecked = !this.data.quotationDetail.surchargeDetails[e.currentTarget.dataset.id].isChecked
    this.setData({
      quotationDetail: this.data.quotationDetail
    })
    this.calculatedCharges()
  },

  toOther(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.item.url,
    })
  },

  openAdditionalService() {
    this.selectComponent("#additionalServices").onClickOpen()
  },

  toLineDetail() {
    wx.navigateTo({
      url: '/pages/Quotation/LineDetail/index',
    })
  },

  toRemind() {
    wx.navigateTo({
      url: '/pages/Quotation/Others/Remind/index',
    })
  },

  back() {
    this.setData({
      isFirst: true
    })
    wx.pageScrollTo({
      duration: 300,
      scrollTop: 0
    })
  },

  submit() {
    if (this.data.isFirst) {
      this.setData({
        isFirst: false
      })
      wx.pageScrollTo({
        duration: 300,
        scrollTop: 0
      })
    } else {
      let params = {}
      if (this.data.quotationDetail.quoteLines[0].quoteLineId) {
        params = {
          "createLaraSpecialQuotation": {
            "affiliates": this.data.partnerCode,
            "simulationDate": this.data.simulationDate,
            "equipmentSizeType": this.data.equipmentTypeSize,
            "numberOfContainers": this.data.containers,
            "weightPerContainer": this.data.weight,
            "polCountryCode": this.data.portOfLoading.substring(0, 2),
            "podCountryCode": this.data.portOfDischarge.substring(0, 2),
            "allowSpecialQuotation": this.data.quotationDetail.quoteLines[0].allowSpecialQuotation,
            "spotValidityInDays": this.data.quotationDetail.quoteLines[0].spotValidityInDays,
            "routingComment": this.data.quotationDetail.quoteLines[0].routingComment,
            "voyageRef": this.data.quotationDetail.voyage,
            "arrivalDate": this.data.quotationDetail.arrivalDate,
            "finalPlaceOfDelivery": this.data.finalPlaceOfDelivery || null,
            "placeOfOrigin": this.data.placeOfOrigin || null,
            "quoteLineId": "string",
            "portOfLoading": this.data.portOfLoading,
            "portOfDischarge": this.data.portOfDischarge,
            "initialPortOfLoading": this.data.portOfLoading,
            "initalPortOfDischarge": this.data.portOfDischarge,
            "traceId": this.data.quotationDetail.traceId
          }
        }
      } else {
        params = {
          "createAquaSpecialQuotation": {
            "affiliates": this.data.partnerCode,
            "simulationDate": this.data.simulationDate,
            "numberOfContainers": this.data.containers,
            "weightPerContainer": this.data.weight,
            "equipmentSizeType": this.data.equipmentTypeSize,
            "polCountryCode": this.data.portOfLoading.substring(0, 2),
            "podCountryCode": this.data.portOfDischarge.substring(0, 2),
            "allowSpecialQuotation": this.data.quotationDetail.quoteLines[0].allowSpecialQuotation,
            "spotValidityInDays": this.data.quotationDetail.quoteLines[0].spotValidityInDays,
            "routingComment": this.data.quotationDetail.quoteLines[0].routingComment,
            "arrivalDate": this.data.quotationDetail.arrivalDate,
            "finalPlaceOfDelivery": this.data.finalPlaceOfDelivery || null,
            "placeOfOrigin": this.data.placeOfOrigin || null,
            "voyageRef": this.data.quotationDetail.voyage,
            "offerId": this.data.quotationDetail.offerId,
            "traceId": this.data.traceId,
            "shippingCompany": this.data.shippingCompany
          }
        }
      }
      createQuotationQuotation(params, wx.getStorageSync('ccgId')).then(res => {
        wx.navigateTo({
          url: `/pages/Quotation/Result/index?quotationId=${res.data}`,
        })
      })
    }
  },

  booking() {
    wx.showToast({
      title: languageUtil.languageVersion().lang.page.load.functionIsUnderDevelopment,
      icon: 'none'
    })
  },

  getVasList() {
    vasLists({
      "shippingCompany": "CMACGM",
      "placeReceipt": "",
      "portLoading": "CNSHA",
      "portDischarge": "NLRTM",
      "placeDelivery": "",
      "placeOfPayment": "NLRTM",
      "importMovementType": "PORT",
      "importHaulageMode": "MERCHANT",
      "exportMovementType": "PORT",
      "exportHaulageMode": "MERCHANT",
      "applicationDate": "2022-12-01T17:10:25.054-07:00",
      "locale": this.data.languageCode,
      "channel": "PRI",
      "typeOfBl": "Negotiable",
      "bookingParties": [{
        "partnerCode": "0000000176",
        "bookingParty": true,
        "role": "BKG",
        "name": ""
      }],
      "cargoes": [{
        "cargoNumber": 1,
        "packageCode": "20ST",
        "packageBookedQuantity": 1,
        "commodityCode": "FAK",
        "commodityName": "FAK",
        "totalNetWeight": 1,
        "uomWeight": "TNE",
        "hazardous": false,
        "oversize": false,
        "refrigerated": false,
        "shipperOwned": false
      }],
      "subscribedCharges": []
    }).then(res => {
      res.data.forEach(one => {
        one.minPrice = Math.min.apply(Math, one.chargeDetails.filter(i=>i.levelOfCharge === 'Per Container').map(item => {
          return item.rateFrom
        }))
      })
      this.setData({
        vasList: res.data,
        noSelectVasList: res.data,
        subscribedServices: []
      })
    })
  },
  toSelect(e) {
    wx.navigateTo({
      url: '/pages/VAS/Detail/index?index=' + e.currentTarget.dataset.index,
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
})