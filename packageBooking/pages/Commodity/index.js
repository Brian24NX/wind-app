// packageBooking/pages/Commodity/index.js
const languageUtils = require("../../../utils/languageUtils")
const utils = require('../../../utils/util')
import {
  bookCommodityList
} from '../../api/modules/booking';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    verifyInfo: {},
    showCommodity: false,
    showCommodityDelete: false,
    commodityList: [],
    commodity: null,
    equipmentType: '',
    equipmentTypeName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.bookingDetail.bookingDetail,
    })
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.bookingDetail,
      verifyInfo: languageUtils.languageVersion().lang.page.verifyInfo,
    })
  },

  enterCommodity: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showCommodityDelete: !!data,
      showCommodity: false,
      commodityList: []
    })
    if (data.length < 2) {
      return
    }
    this.getCommodities(data)
  }, 800),

  getCommodities(data) {
    this.setData({
      showCommodity: true
    })
    bookCommodityList({
      agreementReference: 'QHOF287175',
      keyword: data
    }).then(res => {
      console.log(res)
      this.setData({
        showCommodity: false
      })
      if (res.data.length) {
        this.setData({
          commodityList: res.data || []
        })
      }
    }, () => {
      this.getCommodities(data)
    })
  },

  chooseCommodity(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      commodity: {
        commodityCode: this.data.commodityList[index].commodityCode,
        commodityName: this.data.commodityList[index].description + ' - ' + this.data.commodityList[index].commodityCode
      },
      commodityList: []
    })
  },

  addUNNumber() {
    wx.navigateTo({
      url: '/packageBooking/pages/UNNumber/index',
    })
  }
})