// packageMore/pages/news/list/index.js
import {
  categoryList,
  newsList
} from '../../../api/modules/more';
import {
  analysis
} from '../../../../api/modules/home'
const pageSize = 20
const languageUtil = require('../../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    emptyContent: {},
    language: 'zh',
    keyword: '',
    categoryId: '',
    categoryList: [],
    pageNum: 1,
    loading: true,
    noMore: false,
    noData: false,
    scrollLeft: 0,
    scrollViewWidth: 0,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.newsCenter.title
    })
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.newsCenter,
      language: languageUtil.languageVersion().lang.page.langue,
      emptyContent: languageUtil.languageVersion().lang.page.empty
    })
    this.getCategoryList()
    this.search()
    analysis({
      analysisType: 6,
      operateType: 1,
      statisti: 2
    })
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

  onShareAppMessage: function () {},

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
      noMore: false,
      noData: false,
      pageNum: 1,
      list: []
    })
    this.getNewsList()
  },

  // 分类列表
  getCategoryList() {
    categoryList({
      type: 1
    }).then(res => {
      const all = [{
        id: '',
        category: 'All',
        categoryCn: '全部'
      }]
      this.setData({
        categoryList: all.concat(res.data)
      })
      console.log(1111,this.data.categoryList)
      if (!this.data.scrollViewWidth) {
        wx.createSelectorQuery().select('.categoryList').boundingClientRect((rect) => {
          this.setData({
            scrollViewWidth: Math.round(rect.width),
          })
        }).exec()
      }
    })
  },

  // 切换分类
  changeCategory(e) {
    const categoryId = e.currentTarget.dataset.id
    this.setData({
      categoryId
    })
    this.search()
    wx.createSelectorQuery().select('#categoryId-' + categoryId).boundingClientRect((rect) => {
      this.setData({
        scrollLeft: e.currentTarget.offsetLeft - this.data.scrollViewWidth / 2 + rect.width / 2
      })
    }).exec()
  },

  // 获取新闻列表
  getNewsList() {
    const params = {
      pageNum: this.data.pageNum,
      pageSize: pageSize,
      categoryIds: this.data.categoryId,
      keyword: this.data.keyword
    }
    this.setData({
      loading: true
    })
    newsList(params).then(res => {
      const list = this.data.list.concat(res.data.list)
      if (list.length >= res.data.total) {
        this.setData({
          noMore: true
        })
      }
      this.setData({
        loading: false,
        noData: !list.length,
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