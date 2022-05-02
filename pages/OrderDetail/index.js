// pages/OrderDetail/index.js
var languageUtil = require('../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    index: null,
    routeIndex: null,
    indexs: null,
    detail: {},
    list: [],
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initLanguage()
    this.setData({
      index: options.index,
      routeIndex: options.routeIndex,
      indexs: options.indexs
    })
    this.setOneDetail()
  },

  initLanguage() {
    //获取当前小程序语言版本所对应的字典变量
    var lang = languageUtil.languageVersion()
    lang.lang.page.queryRes.language = lang.lang.page.langue
    wx.setNavigationBarTitle({
      title: lang.lang.page.queryRes.topTitle,
    })
    this.setData({
      languageContent: lang.lang.page.queryRes
    })
  },

  setOneDetail() {
    this.setData({
      loading: true
    })
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    // console.log(data)
    this.setData({
      list: [data.list[this.data.index]],
      detail: data.list[this.data.index].data.routes[this.data.routeIndex].containers[this.data.indexs],
      loading: false
    })
    wx.hideLoading()
  }
})