// packageBooking/pages/ModifyParty/index.js
const languageUtils = require("../../../utils/languageUtils")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    verifyInfo: {},
    from: '',
    index: 0,
    contractDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const language = languageUtils.languageVersion().lang.page
    wx.setNavigationBarTitle({
      title: language.bookingDetail.bookingDetail,
    })
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    this.setData({
      languageContent: language.modifyParty,
      verifyInfo: language.verifyInfo,
      from: options.from,
      index: options.index,
      contractDetail: data.partyList[options.index].address
    })
  },

  setInputValue(e) {
    this.data.contractDetail[e.currentTarget.dataset.type] = e.detail.value
    this.setData({
      contractDetail: this.data.contractDetail
    })
  },

  deleteValue(e) {
    this.data.contractDetail[e.currentTarget.dataset.type] = ''
    this.setData({
      contractDetail: this.data.contractDetail
    })
  },

  save() {
    const pages = getCurrentPages()
    pages[pages.length - 2].setPartyData(this.data.contractDetail, this.data.index)
    wx.navigateBack()
  }
})