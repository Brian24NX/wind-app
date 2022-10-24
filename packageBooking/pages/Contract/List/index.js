// packageBooking/pages/Contract/List/index.js
const languageUtil = require('../../../../utils/languageUtils')
import {
  fuzzyPointSearch,
  quotationQuoteLinesSearch,
  getQuotationSurchargeDetail
} from '../../../../api/modules/quotation'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    fromLabel: '',
    fromCode: '',
    toLabel: '',
    toCode: '',
    equipmentType: '',
    simulationDate: '',
    contractList: [],
    loggedId: '',
    isLoading: true,
    portOfLoading: '',
    portOfDischarge: '',
    commonEquipmentType: '',
    placeOfOrigin: '',
    portOfLoadingCode: '',
    portOfDischargeCode: '',
    finalPlaceOfDelivery: '',
    namedAccountCode: '',
    currentType: 0,
    typeList: [{
      label: 'CMA',
      shippingCompany: '0001'
    }, {
      label: 'ANL',
      shippingCompany: '0002'
    }, {
      label: 'CNC',
      shippingCompany: '0011'
    }, {
      label: 'APL',
      shippingCompany: '0015'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.qutationResult.title2
    })
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.qutationResult,
      language: languageUtil.languageVersion().lang.page.langue,
      equipmentType: data.commonEquipmentTypeName,
      simulationDate: data.simulationDate,
      namedAccountCode: data.namedAccountCode,
      portOfLoading: data.portOfLoadingLabel.split(';')[0] + ', ' + data.portOfLoadingLabel.split(';')[1] + ';' + data.portOfLoadingLabel.split(';')[2],
      portOfDischarge: data.portOfDischargeLabel.split(';')[0] + ', ' + data.portOfDischargeLabel.split(';')[1] + ';' + data.portOfDischargeLabel.split(';')[2],
      fromLabel: data.placeOfOriginLabel ? data.placeOfOriginLabel.split(';')[0] : data.portOfLoadingLabel.split(';')[0],
      fromCode: data.placeOfOriginLabel ? data.placeOfOriginLabel.split(';')[1] : data.portOfLoadingLabel.split(';')[1],
      toLabel: data.finalPlaceOfDeliveryLabel ? data.finalPlaceOfDeliveryLabel.split(';')[0] : data.portOfDischargeLabel.split(';')[0],
      toCode: data.finalPlaceOfDeliveryLabel ? data.finalPlaceOfDeliveryLabel.split(';')[1] : data.portOfDischargeLabel.split(';')[1],
      commonEquipmentType: data.commonEquipmentType,
      placeOfOrigin: data.placeOfOrigin,
      portOfLoadingCode: data.portOfLoading,
      portOfDischargeCode: data.portOfDischarge,
      finalPlaceOfDelivery: data.finalPlaceOfDelivery
    })
    this.getContractList()
  },

  changeType(e) {
    this.setData({
      currentType: Number(e.currentTarget.dataset.index)
    })
    this.getContractList()
  },

  getContractList() {
    this.setData({
      isLoading: true
    })
    quotationQuoteLinesSearch({
      "affiliates": [wx.getStorageSync('partnerCode')],
      "equipmentType": this.data.commonEquipmentType,
      "placeOfOrigin": this.data.placeOfOrigin || null,
      "portOfLoading": this.data.portOfLoadingCode,
      "portOfDischarge": this.data.portOfDischargeCode,
      "finalPlaceOfDelivery": this.data.finalPlaceOfDelivery || null,
      "shippingCompany": this.data.typeList[this.data.currentType].shippingCompany,
      "simulationDate": this.data.simulationDate,
      "namedAccount": this.data.namedAccountCode || null
    }).then(res => {
      if (res.data) {
        this.setData({
          contractList: res.data.perfectMatches.length ? res.data.perfectMatches : res.data.partialMatches.length ? res.data.partialMatches : [],
          loggedId: res.data.loggedId,
          isLoading: false
        })
        this.dealData()
      } else {
        this.setData({
          contractList: [],
          loggedId: '',
          isLoading: false
        })
      }
    }, () => {
      this.setData({
        contractList: [],
        loggedId: '',
        isLoading: false
      })
    })
  },

  dealData() {
    this.setData({
      contractList: this.data.contractList.map((item) => {
        return {
          ...item,
          isLoading: true
        }
      })
    })
    this.data.contractList.forEach((item, index) => {
      setTimeout(() => {
        if (!item.surchargeDetails) {
          this.getQuotationDetailFn(item)
          this.getPointData(item)
        }
      }, 300 * index);
    })
  },

  getPointData(item) {
    this.getInitialPortOfLoading(item)
    this.getInitialPortOfDischarge(item)
  },

  getInitialPortOfLoading(item) {
    fuzzyPointSearch({
      pointCode: item.origin || item.portOfLoading
    }).then(data => {
      item.portOfLoadingLabel = data.data.point.name + ', ' + data.data.country.code
      this.setData({
        contractList: this.data.contractList
      })
    }, () => {
      this.getInitialPortOfLoading(item)
    })
  },

  getInitialPortOfDischarge(item) {
    fuzzyPointSearch({
      pointCode: item.portOfDischarge
    }).then(data => {
      item.portOfDischargeLabel = data.data.point.name + ', ' + data.data.country.code
      this.setData({
        contractList: this.data.contractList
      })
    }, () => {
      this.getInitialPortOfDischarge(item)
    })
  },

  getQuotationDetailFn(item) {
    getQuotationSurchargeDetail({
      "surchargeFromLara": {
        "quoteLineId": item.quoteLineId,
        "shippingCompany": item.shippingCompany,
        "equipments": item.equipments,
        "simulationDate": this.data.simulationDate,
        "paymentMethod": null,
        "usContract": false,
        "portOfLoading": item.initialPortOfLoading,
        "portOfDischarge": item.initalPortOfDischarge,
        "loggedId": this.data.loggedId,
        "nextDepartureSolutionNumber": item.solutionNumber,
        "nextDepartureScheduleNumber": item.scheduleNumber,
        "quoteLineKey": item.qlKey
      }
    }, wx.getStorageSync('ccgId')).then(res => {
      item.isLoading = false
      item.noOfContainersAvailable = res.data.allocationDetails ? res.data.allocationDetails.noOfContainersAvailable : 0
      item.surchargeDetails = res.data ? res.data.surchargeDetails[0] : null
      item.surchargeDetails.allocation = res.data.allocationDetails ? res.data.allocationDetails.allocation : true
      this.setData({
        contractList: this.data.contractList
      })
    }, () => {
      this.getQuotationDetailFn(item)
    })
  },

  toDetail(e) {
    wx.navigateTo({
      url: `/packageBooking/pages/Contract/Detail/index?index=${e.currentTarget.dataset.index}`,
    })
  }
})