// pages/Quotation/List/index.js
import {
  quotationSort,
  getQuotationSurchargeDetail
} from '../../../api/modules/quotation';
const languageUtil = require('../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    isPhoneX: getApp().globalData.isPhoneX,
    oldQuoteLineList: [],
    traceId: '',
    loggedId: '',
    simulationDate: '',
    quoteLineList: [],
    planList: [],
    fromLabel: '',
    toLabel: '',
    fromCode: '',
    toCode: '',
    currentPlan: null,
    sort: '1',
    plans: [],
    needEarlyFlag: false,
    needDirectFlag: false,
    sortSolutionServices: [],
    isLoading: true,
    showRemind: false,
    currentIndex: null,
    equipmentSize: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.qutationResult.title
    })
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.qutationResult,
      language: languageUtil.languageVersion().lang.page.langue
    })
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    this.setData({
      equipmentSize: data.equipmentType,
      simulationDate: data.simulationDate,
      fromLabel: data.placeOfOriginLabel ? data.placeOfOriginLabel.split(';')[0] : data.portOfLoadingLabel.split(';')[0],
      toLabel: data.finalPlaceOfDeliveryLabel ? data.finalPlaceOfDeliveryLabel.split(';')[0] : data.portOfDischargeLabel.split(';')[0],
      fromCode: data.placeOfOriginLabel ? data.placeOfOriginLabel.split(';')[1] : data.portOfLoadingLabel.split(';')[1],
      toCode: data.finalPlaceOfDeliveryLabel ? data.finalPlaceOfDeliveryLabel.split(';')[1] : data.portOfDischargeLabel.split(';')[1]
    })
    if (data.resultResq.traceId) {
      this.setData({
        oldQuoteLineList: data.resultResq.nextDepartureQuoteLineAndRoute,
        traceId: data.resultResq.traceId,
        loggedId: data.resultResq.loggedId,
        sortSolutionServices: [...new Set(data.resultResq.nextDepartureQuoteLineAndRoute.map(obj => {
          return obj.scheduleDescription
        }))],
        plans: [...new Set(data.resultResq.nextDepartureQuoteLineAndRoute.map(obj => {
          return obj.scheduleDescription
        }))]
      })
      this.sortData()
    } else {
      this.setData({
        isLoading: false
      })
    }
  },

  // 筛选
  onTabbarChange(e) {
    if (e.detail.actived === 1) {
      this.setData({
        sort: e.detail.result
      })
    }
    if (e.detail.actived === 2) {
      this.setData({
        plans: e.detail.result
      })
    }
    if (e.detail.actived === 3) {
      this.setData({
        needEarlyFlag: e.detail.result
      })
    }
    if (e.detail.actived === 4) {
      this.setData({
        needDirectFlag: e.detail.result
      })
    }
    this.sortData()
  },

  sortData() {
    let params = {
      routings: this.data.oldQuoteLineList,
      sortDateType: Number(this.data.sort),
      sortSolutionServices: this.data.plans
    }
    if (this.data.needEarlyFlag) {
      params.needEarlyFlag = true
    }
    if (this.data.needDirectFlag) {
      params.needDirectFlag = true
    }
    quotationSort(params).then(res => {
      this.setData({
        quoteLineList: res.data.map((item) => {
          return {
            ...item,
            isLoading: true,
            canSelect: false
          }
        }),
        isLoading: false
      })
      this.data.quoteLineList.forEach((item, index) => {
        if (item.offerId !== "No-Offer-Found" && item.quoteLines && item.quoteLines.length) {
          let params = {}
          if (!item.quoteLines[0].quoteLineId) {
            params = {
              "surchargeFromAqua": {
                "offerId": item.offerId,
                "traceId": this.data.traceId,
                "equipmentSizeType": this.data.equipmentType,
                "currencyCode": item.quoteLines[0].equipments[0].currencyCode,
                "oceanFreightRate": item.quoteLines[0].equipments[0].oceanFreightRate
              }
            }
          } else {
            params = {
              "surchargeFromLara": {
                "quoteLineId": item.quoteLines[0].quoteLineId,
                "shippingCompany": item.quoteLines[0].shippingCompany,
                "equipments": item.quoteLines[0].equipments.filter(i => i.code === this.data.equipmentSize),
                "simulationDate": this.data.simulationDate,
                "paymentMethod": null,
                "usContract": false,
                "portOfLoading": item.quoteLines[0].portOfLoading,
                "portOfDischarge": item.quoteLines[0].portOfDischarge,
                "loggedId": this.data.loggedId,
                "nextDepartureSolutionNumber": item.solutionNumber,
                "nextDepartureScheduleNumber": item.scheduleNumber,
                "quoteLineKey": item.quoteLines[0].qlKey
              }
            }
          }
          setTimeout(() => {
            getQuotationSurchargeDetail(params).then(res => {
              item.isLoading = false
              item.surchargeDetails = res.data ? res.data.surchargeDetails[0] : {}
              this.setData({
                quoteLineList: this.data.quoteLineList
              })
            }, () => {
              item.isLoading = false
              item.surchargeDetails = {}
              this.setData({
                quoteLineList: this.data.quoteLineList
              })
            })
          }, 300 * index);
        } else {
          item.isLoading = false
          item.canSelect = false
          item.surchargeDetails = {}
          this.setData({
            quoteLineList: this.data.quoteLineList
          })
        }
      })
    }, () => {
      this.setData({
        quoteLineList: [],
        isLoading: false
      })
    })
  },

  // 去详情
  toDetail(e) {
    let currentIndex = e.currentTarget.dataset.index;
    this.setData({
      currentIndex
    })
    if (!this.data.quoteLineList[currentIndex].needRemind) {
      this.setData({
        showRemind: true
      })
    } else {
      wx.navigateTo({
        url: `/pages/Quotation/Detail/index?index=${currentIndex}`,
      })
    }
  },

  onContinue() {
    wx.navigateTo({
      url: `/pages/Quotation/Detail/index?index=${this.data.currentIndex}`,
    })
  },

  onClickHide() {
    this.setData({
      showRemind: false
    })
  }
})