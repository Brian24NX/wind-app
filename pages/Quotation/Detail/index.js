// pages/Quotation/Detail/index.js
const languageUtil = require('../../../utils/languageUtils')
import {
  createQuotationQuotation
} from '../../../api/modules/quotation';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    todayDate: '',
    isFirst: true,
    otherList: [{
      icon: '/assets/img/instantQuote/other_1@2x.png',
      label: 'Local Charges',
      url: "/pages/Quotation/Others/LocalCharges/index"
    }, {
      icon: '/assets/img/instantQuote/other_2@2x.png',
      label: 'D&D',
      url: "/pages/Quotation/Others/DDCharges/index"
    }, {
      icon: '/assets/img/instantQuote/other_3@2x.png',
      label: 'SpotOn',
      url: "/pages/Quotation/Others/SpotOn/index"
    }, {
      icon: '/assets/img/instantQuote/other_4@2x.png',
      label: 'Add Info',
      url: "/pages/Quotation/Others/AdditionalInformation/index"
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
    portOfDischarge: '',
    placeOfOrigin: '',
    finalPlaceOfDelivery: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.qutationResult.title
    })
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.qutationResult,
      language: languageUtil.languageVersion().lang.page.langue,
      todayDate: this.getDate(),
      portOfLoading: data.portOfLoading,
      portOfDischarge: data.portOfDischarge,
      placeOfOrigin: data.placeOfOrigin,
      finalPlaceOfDelivery: data.finalPlaceOfDelivery
    })
    this.setDefaultInfo(Number(options.index), Number(options.containers))
  },

  setDefaultInfo(index, containers) {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    let quotationDetail = data.quoteLineList[index]
    quotationDetail.surchargeDetails.oceanFreight.isChecked = true
    quotationDetail.surchargeDetails.freightCharges.isChecked = true
    quotationDetail.surchargeDetails.prepaidCharges.isChecked = true
    quotationDetail.surchargeDetails.collectCharges.isChecked = true
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
      traceId: data.traceId
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
      totalChargeAmount: totalChargeAmount || this.quotationDetail.surchargeDetails.totalCharge.amount
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

  submit() {
    // if (this.data.isFirst) {
    // this.setData({
    // isFirst: false
    // })
    // } else {
    let params = {}
    if (this.data.quotationDetail.quoteLines[0].quoteLineId) {

    } else {
      params = {
        "createAquaSpecialQuotation": {
          "affiliates": [wx.getStorageSync('partnerCode')],
          "simulationDate": this.data.simulationDate,
          "numberOfContainers": this.data.containers,
          "weightPerContainer": this.data.weight,
          "equipmentSizeType": this.data.equipmentTypeSize,
          "polCountryCode": this.data.portOfLoading.split(';')[1].substring(0, 2),
          "podCountryCode": this.data.portOfDischarge.split(';')[1].substring(0, 2),
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
    // }
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