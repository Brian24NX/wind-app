// packageMore/pages/usefulTemplateAndLink/index.js
const languageUtils = require('../../../utils/languageUtils')
import {
  templateList,
  templateSendEmail
} from '../../api/modules/more'
const pageSize = 10
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    emptyContent: {},
    language: 'zh',
    keyword: '',
    current: 'template',
    typeList: ['template', 'link'],
    emailPath: '',
    showEmail: false,
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
      title: languageUtils.languageVersion().lang.page.useful.title,
    })
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.useful
    })
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
    this.getTemplateList()
  },

  // 切换类型
  changeType(e) {
    this.setData({
      current: e.currentTarget.dataset.type
    })
    this.search()
  },

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
    this.getTemplateList()
  },

  getTemplateList() {
    const params = {
      pageNum: this.data.pageNum,
      pageSize: pageSize,
      keyWord: this.data.keyword,
      type: this.data.current === 'template' ? 1 : 2
    }
    this.setData({
      loading: true
    })
    templateList(params).then(res=>{
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

  // 发送邮件
  sendEmail(e) {
    this.setData({
      showEmail: true,
      emailPath: e.currentTarget.dataset.document
    })
  },

  sendEmails(e) {
    const language = languageUtils.languageVersion();
    wx.showLoading({
      title: language.lang.page.load.send,
      mask: true
    })
    templateSendEmail({
      fileName: this.data.emailPath,
      receiveMailAccount: e.detail
    }).then(() => {
      wx.showToast({
        title: language.lang.page.load.sendSuccess,
        icon: 'none',
        mask: true
      })
      this.setData({
        showEmail: false
      })
    })
  },

  closeEmail() {
    this.setData({
      showEmail: false
    })
  },

  // 复制
  copy(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.value,
      success() {
        wx.showToast({
          title: languageUtils.languageVersion().lang.page.copyInfo.success,
          icon: 'none'
        })
      }
    })
  }
})