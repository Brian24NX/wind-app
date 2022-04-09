// pages/OrderDetail/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: null,
    detail: {},
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '查询',
    })
    this.setData({
      index: options.index
    })
    this.setOneDetail()
  },
  setOneDetail() {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    this.setData({
      list: [data.list[this.data.index]],
      detail: data.list[this.data.index].data.routes[0].containers[0]
    })
  }
})