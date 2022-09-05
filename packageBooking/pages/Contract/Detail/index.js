// packageBooking/pages/Contract/Detail/index.js
const languageUtil = require('../../../../utils/languageUtils')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    isFirst: true,
    surchargeDetails: {},
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
    fromLabel: 'BOSTON, NA',
    fromCode: 'US',
    toLabel: 'SHANGHAI',
    toCode: 'CN',
    quotationDetail: {},
    equipmentTypeName: '',
    weight: '',
    containers: '',
    commodityName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.quotationSurchargeDetails()
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.qutationResult.title2
    })
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.qutationResult,
      language: languageUtil.languageVersion().lang.page.langue
    })
  },

  toOther(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.item.url,
    })
  },

  submit() {
    if (this.data.isFirst) {
      this.setData({
        isFirst: false
      })
    } else {
      wx.navigateTo({
        url: '/pages/Quotation/Result/index',
      })
    }
  },

  quotationSurchargeDetails() {
    getQuotationSurchargeDetails({
      "surchargeFromLara": {
        "quoteLineId": "1304458221",
        "shippingCompany": "0002",
        "equipments": [{
          "code": "40ST",
          "oceanFreightRate": 858.0,
          "currencyCode": "USD",
          "netWeight": 1.0,
          "sizeUnitOfMeasure": "TNE"
        }],
        "simulationDate": "2022-09-08",
        "paymentMethod": null,
        "usContract": false,
        "portOfLoading": "AUMEL",
        "portOfDischarge": "CNSHA",
        "loggedId": "6306d5d58d42b58f3c6bff84",
        "nextDepartureSolutionNumber": 0,
        "nextDepartureScheduleNumber": 0,
        "quoteLineKey": "1304458221-AUMEL-AUMEL-AUMEL-CNSHA-CNSHA-CNSHA-20220824-20221012-1"
      }
    }).then(res => {
      console.log(res)
      this.setData({
        surchargeDetails: res.data.surchargeDetails[0]
      })
    })
  }
})