// pages/Quotation/List/index.js
import {
  quotationSort
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
    currentIndex: null
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
      fromLabel: data.placeOfOriginLabel ? data.placeOfOriginLabel.split(';')[0] : data.portOfLoadingLabel.split(';')[0],
      toLabel: data.finalPlaceOfDeliveryLabel ? data.finalPlaceOfDeliveryLabel.split(';')[0] : data.portOfDischargeLabel.split(';')[0],
      fromCode: data.placeOfOriginLabel ? data.placeOfOriginLabel.split(';')[1] : data.portOfLoadingLabel.split(';')[1],
      toCode: data.finalPlaceOfDeliveryLabel ? data.finalPlaceOfDeliveryLabel.split(';')[1] : data.portOfDischargeLabel.split(';')[1],
      oldQuoteLineList: data.resultResq.nextDepartureQuoteLineAndRoute,
      sortSolutionServices: [...new Set(data.resultResq.nextDepartureQuoteLineAndRoute.map(obj => {
        return obj.scheduleDescription
      }))],
      plans: [...new Set(data.resultResq.nextDepartureQuoteLineAndRoute.map(obj => {
        return obj.scheduleDescription
      }))]
    })
    this.sortData()
  },

  dealData() {
    quotationSort({
      routings: this.data.oldQuoteLineList,
      needDirectFlag: false,
      needEarlyFlag: false,
      sortDateType: 1,
      sortSolutionServices: this.data.plans
    }).then(res => {
      console.log(res)
      this.setData({
        quoteLineList: res.data
      })
    })
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
        quoteLineList: res.data,
        isLoading: false
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