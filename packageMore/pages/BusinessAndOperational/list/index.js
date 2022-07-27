// packageMore/pages/BusinessAndOperational/index.js
import {
  categoryList,
  businiessOpentionalList
} from '../../../api/modules/more';
const languageUtil = require('../../../../utils/languageUtils')
const pageSize = 20;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    emptyContent: {},
    language: 'zh',
    list: [],
    loading: true,
    noMore: false,
    noData: false,
    pageNum: 1,
    keyword: '',
    categoryId: '',
    categoryList: [],
    scrollLeft: 0,
    scrollViewWidth: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initLanguage()
    this.getCategoryList()
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

  onShareAppMessage: function() {},

  initLanguage() {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.homeInfo.valueAddedService
    })
    //获取当前小程序语言版本所对应的字典变量
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.khtg,
      language: languageUtil.languageVersion().lang.page.langue,
      emptyContent: languageUtil.languageVersion().lang.page.empty
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
    this.resetList()
  },

  // 分类列表
  getCategoryList() {
    categoryList({type: 2}).then(res=>{
      const all = [{
        id: '',
        category: 'All',
        categoryCn: '全部'
      }]
      this.setData({
        categoryList: all.concat(res.data)
      })
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
    this.resetList()
    wx.createSelectorQuery().select('#categoryId-' + categoryId).boundingClientRect((rect) => {
      this.setData({
        scrollLeft: e.currentTarget.offsetLeft - this.data.scrollViewWidth / 2 + rect.width / 2
      })
    }).exec()
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
    this.setData({
      loading: true
    })
    businiessOpentionalList({
      pageNum: this.data.pageNum,
      pageSize: pageSize,
      keyword: this.data.keyword,
      categoryId: this.data.categoryId
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