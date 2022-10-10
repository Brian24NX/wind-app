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
    current: 'main',
    tariffDesc: '',
    loading: true,
    mainCharge: [],
    otherCharge: [],
    list: [],
    additionalInformation: []
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
    }).then(res => {
      if (res.data.length) {
        const data = res.data[0]
        const tariffDesc = data.tariffDesc
        const mainCharge = data.tarrifInformation.filter(i => (i.chargeClass === 'MAIC' && i.packageTariffs[0].fixedCharge.amount))
        const otherCharge = data.tarrifInformation.filter(i => (i.chargeClass === 'N' && i.packageTariffs[0].fixedCharge.amount))
        const additionalInformation = data.tarrifInformation.filter(i => i.packageTariffs[0].fixedCharge.amount === 0)
        this.setData({
          tariffDesc,
          mainCharge,
          otherCharge,
          additionalInformation,
          list: mainCharge
        })
      }
      this.setData({
        loading: false
      })
    })
  },

  changeType(e) {
    this.setData({
      current: e.currentTarget.dataset.type,
      list: e.currentTarget.dataset.type === 'main' ? this.data.mainCharge : this.data.otherCharge
    })
  }
})