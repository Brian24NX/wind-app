// pages/Quotation/List/index.js
import {
  quotationSort,
  getQuotationSurchargeDetail,
  fuzzyPointSearch,
  seaEarnPoints,
} from '../../../api/modules/quotation';
const languageUtil = require('../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    seaReward: {},
    language: 'zh',
    isPhoneX: getApp().globalData.isPhoneX,
    transMode: {},
    oldQuoteLineList: [],
    traceId: '',
    containers: 0,
    hasContainers: 0,
    loggedId: '',
    simulationDate: '',
    quoteLineList: [],
    planList: [],
    fromLabel: '',
    toLabel: '',
    fromCode: '',
    toCode: '',
    receiptHaulage: '',
    deliveryHaulage: '',
    currentPlan: null,
    sort: '1',
    plans: [],
    needEarlyFlag: false,
    needDirectFlag: false,
    sortSolutionServices: [],
    isLoading: true,
    showRemind: false,
    currentIndex: null,
    equipmentSize: '',
    shippingCompany: '',
    portOfLoading: '',
    portOfLoadingLabel: '',
    portOfDischarge: '',
    portOfDischargeLabel: '',
    placeOfOrigin: '',
    finalPlaceOfDelivery: '',
    commodityCode: '',
    partnerCode: [],
    isUs: false,
    equiptCode: '',
    shipperOwnedContainer: false,
    rewardsEarned: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.isUs) {
      this.setData({
        isUs: true
      })
    }
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.qutationResult.title
    })
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.qutationResult,
      language: languageUtil.languageVersion().lang.page.langue,
      transMode: wx.getStorageSync('transMode'),
      seaReward: languageUtil.languageVersion().lang.page.seaReward
    })
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    this.setData({
      equiptCode: data.equiptCode,
      partnerCode: data.partnerCode,
      portOfLoading: data.portOfLoading,
      portOfLoadingLabel: data.portOfLoadingLabel,
      portOfDischarge: data.portOfDischarge,
      portOfDischargeLabel: data.portOfDischargeLabel,
      finalPlaceOfDelivery: data.finalPlaceOfDelivery,
      placeOfOrigin: data.placeOfOrigin,
      commodityCode: data.commodityCode,
      containers: data.containers,
      equipmentSize: data.equipmentType,
      shippingCompany: data.shippingCompany,
      simulationDate: data.simulationDate,
      fromLabel: data.placeOfOriginLabel ? data.placeOfOriginLabel.split(';')[0] : data.portOfLoadingLabel.split(';')[0],
      toLabel: data.finalPlaceOfDeliveryLabel ? data.finalPlaceOfDeliveryLabel.split(';')[0] : data.portOfDischargeLabel.split(';')[0],
      fromCode: data.placeOfOriginLabel ? data.placeOfOriginLabel.split(';')[1] : data.portOfLoadingLabel.split(';')[1],
      toCode: data.finalPlaceOfDeliveryLabel ? data.finalPlaceOfDeliveryLabel.split(';')[1] : data.portOfDischargeLabel.split(';')[1],
      receiptHaulage: data.receiptHaulage || '',
      deliveryHaulage: data.deliveryHaulage || '',
      shipperOwnedContainer: data.shipperOwnedContainer
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
      this.sortData(true)
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

  sortData(isFirst) {
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
      if (isFirst) {
        this.setData({
          quoteLineList: res.data.map((item) => {
            return {
              ...item,
              isLoading: true,
              canSelect: true,
              rewardsEarned: null,
            }
          })
        })
        this.setData({
          isLoading: false
        })
        wx.pageScrollTo({
          duration: 500,
          scrollTop: 0
        })
        this.data.quoteLineList.forEach((item, index) => {
          if (item.quoteLines) {
            // 收货地
            if (item.quoteLines[0].origin && item.quoteLines[0].origin !== item.quoteLines[0].portOfLoading) {
              this.getPlacePoint(item.quoteLines[0].origin, item, 'placeOfReceiptLabel')
            } else {
              item.quoteLines[0].origin = ''
            }
            // 起运港
            this.getPlacePoint(item.quoteLines[0].portOfLoading, item, 'placeOfLoadingLabel')
            // 卸货港
            this.getPlacePoint(item.quoteLines[0].portOfDischarge, item, 'placeOfDischargeLabel')
            // 目的地
            if (item.quoteLines[0].destination && item.quoteLines[0].destination !== item.quoteLines[0].portOfDischarge) {
              this.getPlacePoint(item.quoteLines[0].destination, item, 'placeOfDeliveryLabel')
            } else {
              item.quoteLines[0].destination = ''
            }
          }
          if (item.offerId !== "No-Offer-Found" && item.quoteLines && item.quoteLines.length) {
            let params = {}
            if (!item.quoteLines[0].quoteLineId) {
              params = {
                "surchargeFromAqua": {
                  "offerId": item.offerId,
                  "traceId": this.data.traceId,
                  "equipmentSizeType": this.data.equiptCode,
                  "currencyCode": item.quoteLines[0].equipments[0].currencyCode,
                  "loggedId": this.data.loggedId,
                  "oceanFreightRate": item.quoteLines[0].equipments[0].oceanFreightRate,
                  "nextDepartureScheduleNumber": item.scheduleNumber,
                  "nextDepartureSolutionNumber": item.solutionNumber,
                  "inlandExportConstructed": this.data.placeOfOrigin !== '' ? true : false,
                  "inlandImportConstructed": this.data.finalPlaceOfDelivery !== '' ? true : false,
                  "inlandPolicy": "throughRate"
                }
              }
            } else {
              params = {
                "surchargeFromLara": {
                  "quoteLineId": item.quoteLines[0].quoteLineId,
                  "shippingCompany": item.quoteLines[0].shippingCompany,
                  "equipments": item.quoteLines[0].equipments.filter(i => i.code === this.data.equipmentSize),
                  "simulationDate": item.departureDate,
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
              if (!item.surchargeDetails && item.canSelect) {
                this.getQuotationSurchargeDetailFn(item, params, isFirst)
              }
            }, 300 * index);
          } else {
            item.isLoading = false
            item.canSelect = false
            item.surchargeDetails = null
            this.setData({
              quoteLineList: this.data.quoteLineList
            })
          }
        })
      } else {
        this.setData({
          quoteLineList: res.data
        })
      }
    }, () => {
      this.setData({
        quoteLineList: [],
        isLoading: false
      })
    })
  },

  getPlacePoint(pointCode, item, type) {
    fuzzyPointSearch({
      pointCode
    }).then(data => {
      item[type] = data.data.point.name + ', ' + data.data.country.code
      item[type + 'Country'] = data.data.country.name
      this.setData({
        quoteLineList: this.data.quoteLineList
      })
      this.setData({
        oldQuoteLineList: this.data.quoteLineList
      })
    }, () => {
      this.getPlacePoint(pointCode, item, type)
    })
  },

  getQuotationSurchargeDetailFn(item, params, isFirst) {
    getQuotationSurchargeDetail(params, wx.getStorageSync('ccgId')).then(res => {
      item.isLoading = false
      item.noOfContainersAvailable = res.data.allocationDetails ? res.data.allocationDetails.noOfContainersAvailable : 0
      const allocation = res.data.allocationDetails ? res.data.allocationDetails.allocation : true
      if (allocation) {
        if (res.data && res.data.surchargeDetails) {
          item.surchargeDetails = res.data && res.data.surchargeDetails ? res.data.surchargeDetails[0] : null
          item.surchargeDetails.allocation = allocation
          item.canSelect = true
          //新增计算获得积分数量
          setTimeout(() => {
            seaEarnPoints({
              "baseAmount": res.data.surchargeDetails[0].totalCharge.amount,
              "currencyType": res.data.surchargeDetails[0].totalCharge.currency.code,
              "partnerCode": wx.getStorageSync('partnerList')[0].code,
            }).then(res => {
              item.rewardsEarned = res.data ? res.data.simulationResults[0].changeInPointsBalance : null
            })
          }, 300);
        } else {
          item.surchargeDetails = null
          item.canSelect = false
        }
      } else {
        item.surchargeDetails = null
        item.canSelect = false
      }

      this.setData({
        quoteLineList: this.data.quoteLineList
      })
      if (isFirst) {
        this.setData({
          oldQuoteLineList: this.data.quoteLineList
        })
      }
    }, () => {
      this.getQuotationSurchargeDetailFn(item, params, isFirst)
    })
  },

  // 去详情
  toDetail(e) {
    let currentIndex = e.currentTarget.dataset.index;
    this.setData({
      currentIndex
    })
    if (this.data.quoteLineList[currentIndex].isLoading || !this.data.quoteLineList[currentIndex].surchargeDetails) return
    if (this.data.quoteLineList[currentIndex].noOfContainersAvailable) {
      this.setData({
        showRemind: true,
        hasContainers: this.data.quoteLineList[currentIndex].noOfContainersAvailable
      })
    } else {
      wx.navigateTo({
        url: `/pages/Quotation/Detail/index?index=${currentIndex}`,
      })
    }
  },

  onContinue() {
    this.setData({
      showRemind: false
    })
    wx.navigateTo({
      url: `/pages/Quotation/Detail/index?index=${this.data.currentIndex}&containers=${this.data.hasContainers}`,
    })
  },

  onClickHide() {
    this.setData({
      showRemind: false
    })
  }
})