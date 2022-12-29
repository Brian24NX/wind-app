// pages/Quotation/LineDetail/index.js
const languageUtil = require('../../../utils/languageUtils')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    detail: {},
    shippingCompany: '',
    totalCO2: 0,
    timeDetail: null,
    routingDetails: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.routeDetails.title,
    })
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.routeDetails,
      language: languageUtil.languageVersion().lang.page.langue
    })
    this.dealData()
  },

  dealData() {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    this.setData({
      detail: {
        pointfrom: data.fromLabel,
        pointto: data.toLabel,
        transitTime: Number(data.quotationDetail.transitTime),
        transhipment: data.quotationDetail.tranShipment.length,
        receiptHaulage: data.receiptHaulage.toLocaleUpperCase(),
        deliveryHaulage: data.deliveryHaulage.toLocaleUpperCase()
      },
      shippingCompany: data.shippingCompany,
      totalCO2: data.quotationDetail.totalCO2,
      routingDetails: data.quotationDetail.routingLegs
    })
    const timeDetail = this.data.routingDetails.filter(i => i.cutOffDate)
    this.setData({
      timeDetail: timeDetail.length ? timeDetail[0] : null
    })
  }
})