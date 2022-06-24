// packageDashboard/pages/shipment/list/index.js
const languageUtils = require('../../../../utils/languageUtils')
const utils = require('../../../../utils/util')
import {
  shipmentsList,
  shipmentsContainerList
} from '../../../api/modules/dashboard'
let allList = []
const pageSize = 20
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    page: 1,
    keyword: '',
    typeList: ['shipment', 'container'],
    current: 'shipment',
    list: [],
    loading: false,
    noMore: false,
    noData: false
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
      page: ++this.data.page,
      loading: true
    })
    this.dealPaging()
  },

  initLanguage() {
    const language = languageUtils.languageVersion()
    this.setData({
      languageContent: language.lang.page.shipment,
      language: language.lang.page.langue
    })
    wx.setNavigationBarTitle({
      title: language.lang.page.shipment.title,
    })
  },

  setInput(e) {
    let value = e.detail.value.toUpperCase()
    let regvalue = value.trim()
    this.setData({
      keyword: regvalue
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
      current: e.currentTarget.dataset.type,
      noData: false,
      noMore: false,
      keyword: ''
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
        ccgId: wx.getStorageSync('ccgId'),
        bookingReference: this.data.keyword
      }).then(res => {
        allList = res.data
        this.dealPaging()
      }, () => {
        this.setData({
          loading: false,
          noData: true
        })
      })
    } else {
      shipmentsContainerList({
        ccgId: wx.getStorageSync('ccgId'),
        containerOrBookingReference: this.data.keyword
      }).then(res => {
        allList = res.data
        this.dealPaging()
      }, () => {
        this.setData({
          loading: false,
          noData: true
        })
      })
    }
  },

  dealPaging() {
    setTimeout(() => {
      const list = allList.slice((this.data.page - 1) * pageSize, this.data.page * pageSize)
      list.forEach(item => {
        item.statusLabel = utils.formatHuoYunStatus(item.statusCode, this.data.language)
      })
      this.setData({
        noData: allList.length ? false : true,
        list: this.data.list.concat(list),
        loading: false
      })
      this.setData({
        noMore: this.data.list.length >= allList.length ? true : false
      })
    }, 200);
  }
})