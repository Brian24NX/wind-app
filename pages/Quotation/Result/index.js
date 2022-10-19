// pages/Quotation/Result/index.js
const languageUtils = require('../../../utils/languageUtils')
import {
  saveQuotationDetail
} from '../../../api/modules/quotation'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    showEmail: false,
    reference: '',
    quotationDetail: {},
    equipmentTypeName: '',
    weight: '',
    containers: '',
    commodityName: '',
    shippingCompany: '',
    fromLabel: '',
    toLabel: '',
    surchargeDetails: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.qutationResult.title
    })
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.qutationResult,
      language: languageUtils.languageVersion().lang.page.langue
    })
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    this.setData({
      reference: options.quotationId,
      quotationDetail: data.quotationDetail,
      equipmentTypeName: data.equipmentTypeName,
      weight: data.weight,
      containers: data.containers,
      commodityName: data.commodityName,
      shippingCompany: data.shippingCompany,
      receiptHaulage: data.receiptHaulage,
      deliveryHaulage: data.deliveryHaulage,
      fromLabel: data.fromLabel,
      toLabel: data.toLabel,
      surchargeDetails: data.quotationDetail.surchargeDetails
    })
    saveQuotationDetail({
      quotationReference: this.data.reference,
      quotationDetail: JSON.stringify(this.data.surchargeDetails),
      weight: this.data.weight
    })
  },

  copyReference() {
    wx.setClipboardData({
      data: this.data.reference,
      success() {
        wx.showToast({
          title: languageUtils.languageVersion().lang.page.copyInfo.success2,
          icon: 'none',
          mask: true,
          duration: 2000
        })
      }
    })
  },

  sendEmail() {
    this.setData({
      showEmail: true
    })
  },

  closeEmail() {
    this.setData({
      showEmail: false
    })
  },

  sendEmails(e) {
    wx.showLoading({
      title: languageUtil.languageVersion().lang.page.load.send,
      mask: true
    })
  },

  toHome() {
    wx.reLaunch({
      url: '/pages/Home/index',
    })
  },

  toBook() {
    wx.showToast({
      title: languageUtils.languageVersion().lang.page.load.functionIsUnderDevelopment,
      icon: 'none',
      mask: true,
      duration: 2000
    })
  },

  toLineDetail() {
    wx.navigateTo({
      url: '/pages/Quotation/LineDetail/index',
    })
  },
})