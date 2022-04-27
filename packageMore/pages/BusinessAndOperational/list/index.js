// packageMore/pages/BusinessAndOperational/index.js
import {
  businiessOpentionalList
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
    noData: false,
    pageNum: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: '客户通告',
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
    this.getBusiniessOpentionalList()
  },

  resetList() {
    this.setData({
      loading: true,
      noMore: false,
      noData: false,
      pageNum: 1,
      list: []
    })
    this.getBusiniessOpentionalList()
  },

  getBusiniessOpentionalList() {
    businiessOpentionalList({
      pageNum: this.data.pageNum,
      pageSize: pageSize
    }).then(res => {
      const list = this.data.list.concat(res.data.list)
      if (list.length >= res.data.total) {
        this.setData({
          noMore: true
        })
      }
      this.setData({
        loading: false,
        noData: list.length ? false : true,
        list
      })
    })
  },

  toDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/packageMore/pages/BusinessAndOperational/detail/index?id=${id}`,
    })
  }
})