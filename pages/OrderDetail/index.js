// pages/OrderDetail/index.js
var languageUtil = require('../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    detail: {},
    loading: true,
    showSearch: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.showSearch) {
      this.setData({
        showSearch: false
      })
    }
    this.initLanguage()
    this.setOneDetail(options.index)
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

  setOneDetail(index) {
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
    this.setData({
      detail: data.list[index],
      loading: false
    })
    wx.hideLoading()
  }
})