// pages/OrderDetail/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    wx.setNavigationBarTitle({
      title: '查询',
    })
    this.setData({
      index: options.index,
      routeIndex: options.routeIndex,
      indexs: options.indexs
    })
    this.setOneDetail()
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