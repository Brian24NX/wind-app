// pages/Quotation/Result/index.js
const languageUtils = require('../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    seaReward: {},
    language: 'zh',
    showEmail: false,
    reference: '',
    quotationDetail: {},
    equipmentTypeName: '',
    weight: '',
    containers: 1,
    commodityName: '',
    shippingCompany: '',
    fromLabel: '',
    toLabel: '',
    surchargeDetails: {},
    subscribedServices: [],
    totalChargeAmount: 0,
    shipperOwnedContainer: false,
    resInfo: false,
    rewardsEarned: 0,
    finalPrice: 0,
    burnRewards: 0,
    useRewards: null,
    code:wx.getStorageSync('partnerList')[0]?.code,
    deliveryHaulage:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.qutationResult.title
    })
    let languageContent = languageUtils.languageVersion().lang.page.qutationResult;
    this.setData({
      languageContent,
      language: languageUtils.languageVersion().lang.page.langue,
      seaReward: languageUtils.languageVersion().lang.page.seaReward
    })
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    console.log(data)
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
      surchargeDetails: data.quotationDetail.surchargeDetails,
      totalChargeAmount: data.totalChargeAmount,
      subscribedServices: data.subscribedServices,
      shipperOwnedContainer: data.shipperOwnedContainer,
      rewardsEarned: data.rewardsEarned,
      finalPrice: data.finalPrice,
      burnRewards: data.burnRewards,
      useRewards: data.useRewards,
      code:wx.getStorageSync('partnerList')[0]?.code
    })
  },

  copyReference() {
    wx.setClipboardData({
      data: this.data.code==='0002130568'?this.data.deliveryHaulage?'QSPOT7829849':'QSPOT8927896':this.data.reference,
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
  onUnload(event){ //多层级跳转之后，监听左上角返回事件，直接退回到spot on
    // wx.setStorageSync('back',true)
    // console.log('返回上一页')
    wx.reLaunch({
      url: '/pages/Home/index',
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

  onResInfo() {
    this.setData({
      resInfo: !this.data.resInfo
    })
  }
})