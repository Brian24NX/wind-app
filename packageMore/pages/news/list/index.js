// packageMore/pages/news/list/index.js
import {
  categoryList,
  newsList
} from '../../../../api/modules/more';
const pageSize = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    categoryId: '',
    categoryList: [],
    pageNum: 1,
    loading: true,
    noMore: false,
    noData: false,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: '新闻中心'
    })
    this.getCategoryList()
    this.search()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
    this.search()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.loading || this.data.noMore) return
    this.setData({
      pageNum: ++this.data.pageNum
    })
    this.getNewsList()
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
  },

  search() {
    this.setData({
      loading: true,
      noMore: false,
      noData: false,
      pageNum: 1,
      list: []
    })
    this.getNewsList()
  },

  // 分类列表
  getCategoryList() {
    categoryList({type: 1}).then(res=>{
      console.log(res)
      const all = [{
        id: '',
        category: 'all'
      }]
      this.setData({
        categoryList: all.concat(res.data)
      })
    })
  },

  // 切换分类
  changeCategory(e) {
    const categoryId = e.currentTarget.dataset.id
    this.setData({
      categoryId
    })
    this.search()
  },

  // 获取新闻列表
  getNewsList() {
    const params = {
      pageNum: this.data.pageNum,
      pageSize: pageSize,
      categoryIds: this.data.categoryId,
      keyword: this.data.keyword
    }
    newsList(params).then(res=>{
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
  
  // 新闻详情
  toDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/packageMore/pages/news/detail/index?id=${id}`,
    })
  }
})