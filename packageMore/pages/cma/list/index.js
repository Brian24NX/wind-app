// packageMore/pages/cma/list/index.js
import {
  cmaNewsList
} from '../../../../api/modules/more';
const pageSize = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    loading: true,
    noMore: false,
    pageNum: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: 'CMA CGM+'
    })
    this.resetList()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
    this.resetList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.loading || this.data.noMore) return
    this.setData({
      pageNum: ++this.data.pageNum
    })
    this.getCmaNewsList()
  },

  resetList() {
    this.setData({
      loading: true,
      noMore: false,
      pageNum: 1,
      list: []
    })
    this.getCmaNewsList()
  },

  // 获取cma列表
  getCmaNewsList() {
    this.setData({
      loading: true
    })
    cmaNewsList({
      pageNum: this.data.pageNum,
      pageSize: pageSize,
      keyword: ''
    }).then(res => {
      const list = this.data.list.concat(res.data.list)
      if (list.length >= res.data.total) {
        this.setData({
          noMore: true
        })
      }
      this.setData({
        loading: false,
        list
      })
    })
  },

  // 详情
  toDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/packageMore/pages/cma/detail/index?id=${id}`,
    })
  }
})