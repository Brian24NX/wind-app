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
    vasList: [{
      iconUrl: 'https://wind.cma-cgm.com/images/VAS/VAS_1.png',
      vasTitle: 'ACT with CMA CGM+',
      vasDescEn: 'Reduce and offset your environmental footprint.',
      vasDescCn: '携手ACT with CMA CGM+实现碳中和！现在，您可以减少和抵消您的环境足迹！'
    }, {
      iconUrl: 'https://wind.cma-cgm.com/images/VAS/VAS_2.png',
      vasTitle: 'SERENITY cargo value guarantee',
      vasDescEn: 'Enjoy full compensation in case of cargo damage.',
      vasDescCn: '一旦您的货物受损，将享受完整快捷的赔付'
    }, {
      iconUrl: 'https://wind.cma-cgm.com/images/VAS/VAS_3.png',
      vasTitle: 'SEAPRIORITY go',
      vasDescEn: 'Enjoy a priority status at loading and transloading terminal.',
      vasDescCn: '在起运港和准运港享受优先放柜及装载'
    }, {
      iconUrl: 'https://wind.cma-cgm.com/images/VAS/VAS_4.png',
      vasTitle: 'FREETIME extended (Detention)',
      vasDescEn: 'Extend your Detention freetime at destination.',
      vasDescCn: 'Extend your Detention Free Time at destination'
    }, {
      iconUrl: 'https://wind.cma-cgm.com/images/VAS/VAS_4.png',
      vasTitle: 'FREETIME extended (Demurrage only)',
      vasDescEn: 'Extend your Demurrage freetime at destination.',
      vasDescCn: 'Extend your Demurrage Free Time at destination'
    }, {
      iconUrl: 'https://wind.cma-cgm.com/images/VAS/VAS_5.png',
      vasTitle: 'BARLOCK security device',
      vasDescEn: 'Add extra protection to keep your cargo safe.',
      vasDescCn: '增加额外的保护以确保您的货物安全'
    }, {
      iconUrl: 'https://wind.cma-cgm.com/images/VAS/VAS_6.png',
      vasTitle: 'SERENITY container guarantee (export)',
      vasDescEn: 'Avoid costs in case of damage to our containers.',
      vasDescCn: '避免因集装箱损坏而产生的额外费用-出口'
    }, {
      iconUrl: 'https://wind.cma-cgm.com/images/VAS/VAS_6.png',
      vasTitle: 'SERENITY container guarantee (import)',
      vasDescEn: 'Avoid costs in case of damage to our containers.',
      vasDescCn: '避免因集装箱损坏而产生的额外费用-进口'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.qutationResult.title2
    })
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    let languageContent = languageUtil.languageVersion().lang.page.qutationResult
    this.setData({
      languageContent,
      language: languageUtil.languageVersion().lang.page.langue,
      partnerCode: data.partnerCode,
      todayDate: this.getDate(),
      portOfLoading: data.portOfLoading,
      portOfLoadingLabel: data.portOfLoadingLabel,
      portOfDischarge: data.portOfDischarge,
      portOfDischargeLabel: data.portOfDischargeLabel,
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