// packageDashboard/pages/document/index.js
const languageUtils = require('../../../utils/languageUtils')
import {
  documentList
} from '../../api/modules/dashboard'
const utils = require('../../../utils/util')
const pageSize = 20
let allList = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    page: 1,
    keyword: '',
    noData: false,
    loading: true,
    noMore: false,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initLanguage()
    this.search()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
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
      languageContent: language.lang.page.document,
      language: language.lang.page.langue
    })
    wx.setNavigationBarTitle({
      title: language.lang.page.document.title,
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

  search() {
    this.setData({
      loading: true,
      noData: false,
      noMore: false,
      page: 1,
      list: []
    })
    allList = []
    documentList({
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
  },

  dealPaging() {
    setTimeout(() => {
      const pageList = allList.slice((this.data.page - 1) * pageSize, pageSize)
      pageList.forEach(item => {
        item.statusLabel = utils.formatDocumentStatus(item.blStatus, this.data.language)
      })
      this.setData({
        noData: !allList.length ? true : false,
        list: this.data.list.concat(allList.slice((this.data.page - 1) * pageSize, pageSize)),
        loading: false,
      })
      this.setData({
        noMore: this.data.list.length >= allList.length ? true : false
      })
    }, 600);
  }
})