// packagePrice/pages/calculatedChargeResult/index.js
const languageUtils = require('../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    chargeCalculationDate: '',
    language: 'zh',
    calculatedChargeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const language = languageUtils.languageVersion().lang.page
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    console.log(language)
    wx.setNavigationBarTitle({
      title: language.NewDDChargesResult.title,
    })
    this.setData({
      languageContent: language.NewDDChargesResult,
      language: language.langue,
      chargeCalculationDate: data.date,
      calculatedChargeList: wx.getStorageSync('calculatedChargeResult') || []
    })
  },

  toDetail(e) {
    wx.navigateTo({
      url: `/packagePrice/pages/calculatedChargeDetail/index?index=${e.currentTarget.dataset.index}`,
    })
  }
})