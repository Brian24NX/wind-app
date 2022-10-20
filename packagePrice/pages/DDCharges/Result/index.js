// packagePrice/pages/DDCharges/Result/index.js
const languageUtils = require('../../../../utils/languageUtils')
import {
  ddChargeFinder
} from '../../../api/modules/price'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    chargeFinderSearchKey: {},
    typeList: ['export', 'import'],
    current: 'export',
    tariffDesc: '',
    loading: true,
    imports: [],
    exports: [],
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      chargeFinderSearchKey: wx.getStorageSync('ddChargeSearchKey')
    })
    this.initLanguage()
    this.getChargeFinderTariff()
  },

  initLanguage() {
    const language = languageUtils.languageVersion()
    this.setData({
      languageContent: language.lang.page.DDCharges,
      language: language.lang.page.langue
    })
    wx.setNavigationBarTitle({
      title: language.lang.page.DDCharges.detailTitle
    })
  },

  getChargeFinderTariff() {
    let params = {
      portOfLoading: this.data.chargeFinderSearchKey.placeOfLoading,
      portOfDischarge: this.data.chargeFinderSearchKey.placeOfDischarge,
      equipmentSizeType: [this.data.chargeFinderSearchKey.equipmentSize],
      partnerCode: 'partnerCode'
    }
    if (this.data.chargeFinderSearchKey.specialCargo) {
      params.specialCargo = this.data.chargeFinderSearchKey.specialCargo
    }
    ddChargeFinder(params).then(res => {
      if (res.data && res.data.length) {
        const data = res.data
        const imports = data.filter(i => (i.direction.code === 'I'))
        const exports = data.filter(i => (i.direction.code === 'E'))
        this.setData({
          imports,
          exports,
          list: exports,
          loading: false
        })
      } else {
        this.setData({
          imports: [],
          exports: [],
          list: [],
          loading: false
        })
      }
    }, () => {
      this.setData({
        imports: [],
        exports: [],
        list: [],
        loading: false
      })
    })
  },

  changeType(e) {
    this.setData({
      current: e.currentTarget.dataset.type,
      list: e.currentTarget.dataset.type === 'import' ? this.data.imports : this.data.exports
    })
  }
})