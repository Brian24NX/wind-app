// packageDashboard/pages/shipment/list/index.js
const languageUtils = require('../../../../utils/languageUtils')
import {
  shipmentsList,
  shipmentsContainerList
} from '../../../api/modules/dashboard'
let allList = []
const size = 10
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    page: 1,
    keyword: '',
    typeList: ['shipment', 'container'],
    current: 'shipment',
    list: [],
    loading: false,
    noMore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initLanguage()
    this.search()
  },

  onReachBottom() {
    if (this.data.loading || this.data.noMore) return
    this.setData({
      page: this.data.page++,
      loading: true
    })
    this.dealPaging()
  },

  initLanguage() {
    const language = languageUtils.languageVersion()
    this.setData({
      languageContent: language.lang.page.shipment
    })
    wx.setNavigationBarTitle({
      title: language.lang.page.shipment.title,
    })
  },

  setInput(e) {
    this.setData({
      keyword: e.detail.value
    })
  },

  deleteValue() {
    this.setData({
      keyword: ''
    })
    this.search()
  },

  changeType(e) {
    this.setData({
      current: e.currentTarget.dataset.type
    })
    this.search()
  },

  search() {
    this.setData({
      loading: true,
      page: 1,
      list: []
    })
    allList = []
    if (this.data.current === 'shipment') {
      shipmentsList({
        ccgId: 'U08101306',
        bookingReference: ''
      }).then(res => {
        console.log(res)
        allList = res.data
        this.dealPaging()
      })
    } else {
      shipmentsContainerList({
        ccgId: 'U08101306',
        containerOrBookingReference: ''
      }).then(res => {
        console.log(res)
        allList = res.data
        this.dealPaging()
      })
    }
  },

  dealPaging() {
    setTimeout(() => {
      this.setData({
        list: this.data.list.concat(allList.slice((this.data.page - 1) * size, size)),
        loading: false
      })
    }, 200);
  }
})