// packageBooking/pages/Contract/List/index.js
const languageUtil = require('../../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromLabel: '',
    fromCode: '',
    toLabel: '',
    toCode: '',
    contractList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.qutationResult.title2
    })
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.qutationResult,
      language: languageUtil.languageVersion().lang.page.langue
    })
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    this.setData({
      fromLabel: data.placeOfOriginLabel ? data.placeOfOriginLabel.split(';')[0] : data.portOfLoadingLabel.split(';')[0],
      fromCode: data.placeOfOriginLabel ? data.placeOfOriginLabel.split(';')[1] : data.portOfLoadingLabel.split(';')[1],
      toLabel: data.finalPlaceOfDeliveryLabel ? data.finalPlaceOfDeliveryLabel.split(';')[0] : data.portOfDischargeLabel.split(';')[0],
      toCode: data.finalPlaceOfDeliveryLabel ? data.finalPlaceOfDeliveryLabel.split(';')[1] : data.portOfDischargeLabel.split(';')[1],
      contractList: data.contractResq.perfectMatches
    })
  },

  toDetail(e) {
    wx.navigateTo({
      url: '/packageBooking/pages/Contract/Detail/index',
    })
  }
})