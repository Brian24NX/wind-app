// pages/Quotation/Detail/index.js
const languageUtil = require('../../../utils/languageUtils')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    isFirst: true,
    otherList: [{
      icon: '/assets/img/instantQuote/other_1@2x.png',
      label: 'Local Charges',
      url: "/pages/Quotation/Others/LocalCharges/index"
    }, {
      icon: '/assets/img/instantQuote/other_2@2x.png',
      label: 'D&D',
      url: "/pages/Quotation/Others/DDCharges/index"
    }, {
      icon: '/assets/img/instantQuote/other_3@2x.png',
      label: 'SpotOn',
      url: "/pages/Quotation/Others/SpotOn/index"
    }, {
      icon: '/assets/img/instantQuote/other_4@2x.png',
      label: 'Add Info',
      url: "/pages/Quotation/Others/AdditionalInformation/index"
    }],
    fromLabel: "",
    fromCode: '',
    toLabel: '',
    toCode: '',
    quotationDetail: {},
    equipmentTypeName: '',
    weight: '',
    containers: '',
    commodityName: '',
    shippingCompany: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.qutationResult.title
    })
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.qutationResult,
      language: languageUtil.languageVersion().lang.page.langue
    })
    this.setDefaultInfo(Number(options.index))
  },

  setDefaultInfo(index) {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    this.setData({
      fromLabel: data.fromLabel,
      fromCode: data.fromCode,
      toLabel: data.toLabel,
      toCode: data.toCode,
      shippingCompany: data.shippingCompany,
      quotationDetail: data.quoteLineList[index]
    })
    const currentPage2 = pages[pages.length - 3]
    const data2 = currentPage2.data
    this.setData({
      equipmentTypeName: data2.equipmentTypeName,
      weight: data2.weight,
      containers: data2.containers,
      commodityName: data2.commodityName
    })


  },

  toOther(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.item.url,
    })
  },

  openAdditionalService() {
    this.selectComponent("#additionalServices").onClickOpen()
  },

  toLineDetail() {
    wx.navigateTo({
      url: '/pages/Quotation/LineDetail/index',
    })
  },

  submit() {
    if (this.data.isFirst) {
      this.setData({
        isFirst: false
      })
    } else {
      wx.navigateTo({
        url: '/pages/Quotation/Result/index',
      })
    }
  }
})