// packageMore/pages/sanctionCheck/list/index.js
const languageUtils = require('../../../../utils/languageUtils')
import {
  sanctionCommodityList
} from '../../../api/modules/more';
import {
  analysis
} from '../../../../api/modules/home'
const pageSize = 20
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    emptyContent: {},
    language: 'zh',
    keyword: '',
    pageNum: 1,
    loading: true,
    noMore: false,
    noData: false,
    list: [],
    email: 'SHG.SpecialCargoTEAM@cma-cgm.com'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.sanction.title,
    })
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.sanction,
      language: languageUtils.languageVersion().lang.page.langue,
      emptyContent: languageUtils.languageVersion().lang.page.empty
    })
    this.search()
    analysis({
      analysisType: 6,
      operateType: 1,
      statisti: 4
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
    this.getSanctionCommodityList()
  },

  onShareAppMessage: function() {},

  // 输入框
  setInput(e) {
    this.setData({
      keyword: e.detail.value
    })
  },

  // 删除
  deleteValue() {
    this.setData({
      keyword: ''
    })
    this.search()
  },

  // 搜索
  search() {
    this.setData({
      loading: true,
      noMore: false,
      noData: false,
      pageNum: 1,
      list: []
    })
    this.getSanctionCommodityList()
  },

  getSanctionCommodityList() {
    const params = {
      pageNum: this.data.pageNum,
      pageSize: pageSize,
      keyword: this.data.keyword,
      languageType: this.data.language
    }
    this.setData({
      loading: true
    })
    sanctionCommodityList(params).then(res => {
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

  // 详情
  toDetail(e) {
    wx.navigateTo({
      url: `/packageMore/pages/sanctionCheck/detail/index?id=${e.currentTarget.dataset.id}`
    })
  },

  copyEmail() {
    wx.setClipboardData({
      data: this.data.email,
      success() {
        wx.showToast({
          title: languageUtils.languageVersion().lang.page.copyInfo.success2,
          mask: true,
          icon: 'none'
        })
      }
    })
  }
})