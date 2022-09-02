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
      // const res = {"code":"200","message":"操作成功","data":[{"direction":{"code":"E","name":"Export"},"tariff":{"code":"G","name":"Merged","origin":{"code":"GEN","name":"General tariff"},"validityDateFrom":"2022-04-05T00:00:00.000+00:00"},"conditionsByEquipment":[{"equipmentGroupIsoCode":"20GP","equipmentSizeType":"20ST","freeDays":{"number":3,"type":"Calendar"},"afterFreeDaysCharges":[{"type":"Calendar","dayFrom":4,"rate":11.0,"currency":"EUR"}]}]},{"direction":{"code":"I","name":"Import"},"tariff":{"code":"M","name":"Demurrage","origin":{"code":"GEN","name":"General tariff"},"validityDateFrom":"2021-03-04T00:00:00.000+00:00"},"conditionsByEquipment":[{"equipmentGroupIsoCode":"20GP","equipmentSizeType":"20ST","freeDays":{"number":3,"type":"Working"},"afterFreeDaysCharges":[{"type":"Calendar","dayFrom":4,"dayTo":6,"rate":160.0,"currency":"USD"},{"type":"Calendar","dayFrom":7,"dayTo":9,"rate":210.0,"currency":"USD"},{"type":"Calendar","dayFrom":10,"rate":260.0,"currency":"USD"}]}]},{"direction":{"code":"I","name":"Import"},"tariff":{"code":"T","name":"Detention","origin":{"code":"GEN","name":"General tariff"},"validityDateFrom":"2021-03-04T00:00:00.000+00:00"},"conditionsByEquipment":[{"equipmentGroupIsoCode":"20GP","equipmentSizeType":"20ST","freeDays":{"number":4,"type":"Working"},"afterFreeDaysCharges":[{"type":"Calendar","dayFrom":5,"dayTo":7,"rate":160.0,"currency":"USD"},{"type":"Calendar","dayFrom":8,"dayTo":10,"rate":210.0,"currency":"USD"},{"type":"Calendar","dayFrom":11,"rate":260.0,"currency":"USD"}]}]},{"direction":{"code":"I","name":"Import"},"tariff":{"code":"S","name":"Storage","origin":{"code":"CNT","name":"Country level tariff"},"validityDateFrom":"2006-01-01T00:00:00.000+00:00"},"conditionsByEquipment":[{"equipmentGroupIsoCode":"20GP","equipmentSizeType":"20ST","freeDays":{"number":10,"type":"Calendar"},"afterFreeDaysCharges":[{"type":"Calendar","dayFrom":11,"dayTo":14,"rate":130.0,"currency":"USD"},{"type":"Calendar","dayFrom":15,"dayTo":19,"rate":175.0,"currency":"USD"},{"type":"Calendar","dayFrom":20,"rate":330.0,"currency":"USD"}]}]}],"success":true}
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