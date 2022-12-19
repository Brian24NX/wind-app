// packagePrice/pages/calculatedChargeDetail/index.js
const languageUtils = require('../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    calculatedChargeDetail: null,
    language: 'zh',
    chargeCalculationDate: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const language = languageUtils.languageVersion().lang.page
    wx.setNavigationBarTitle({
      title: language.NewDDChargesResult.title,
    })
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    this.setData({
      languageContent: language.NewDDChargesResult,
      language: language.langue,
      calculatedChargeDetail: data.calculatedChargeList[options.index],
      chargeCalculationDate: data.chargeCalculationDate,
    })
  },
})