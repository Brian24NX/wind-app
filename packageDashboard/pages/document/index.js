// packageDashboard/pages/document/index.js
const languageUtils = require('../../../utils/languageUtils')
import {
  documentList
} from '../../api/modules/dashboard'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    keyword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initLanguage()
    this.search()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  initLanguage() {
    const language = languageUtils.languageVersion()
    this.setData({
      languageContent: language.lang.page.document
    })
    wx.setNavigationBarTitle({
      title: language.lang.page.document.title,
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
    this.search()
  },

  search() {
    documentList({
      ccgId: 'U08101306',
      bookingReference: ''
    }).then(res=>{
      console.log(res)
    })
  },
})