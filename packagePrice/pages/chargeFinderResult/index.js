// packagePrice/pages/chargeFinderResult/index.js
const languageUtils = require('../../../utils/languageUtils')
import {
  chargeFinderTariff
} from '../../api/modules/price'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    chargeFinderSearchKey: {},
    typeList: ['main', 'other'],
    current: 'main'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      chargeFinderSearchKey: wx.getStorageSync('chargeFinderSearchKey')
    })
    this.initLanguage()
    this.getChargeFinderTariff()
  },

  initLanguage() {
    const language = languageUtils.languageVersion()
    this.setData({
      languageContent: language.lang.page.chargeFinder,
      language: language.lang.page.langue
    })
    wx.setNavigationBarTitle({
      title: language.lang.page.chargeFinder.detailTitle
    })
  },

  getChargeFinderTariff() {
    chargeFinderTariff({
      portOfLoading: this.data.chargeFinderSearchKey.placeOfLoading,
      portOfDischarge: this.data.chargeFinderSearchKey.placeOfDischarge,
      reefer: this.data.chargeFinderSearchKey.reefer === '1' ? false : true,
      simulationDate: this.data.chargeFinderSearchKey.simulationDate
    })
  },

  changeType(e) {
    this.setData({
      current: e.currentTarget.dataset.type
    })
  }
})