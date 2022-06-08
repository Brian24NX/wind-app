// packageDashboard/pages/shipment/list/components/shipments/index.js
const languageUtils = require('../../../utils/languageUtils')
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
    loading: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh'
  },

  attached() {
    this.initLanguage()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initLanguage() {
      this.setData({
        languageContent: languageUtils.languageVersion().lang.page.shipment,
        language: languageUtils.languageVersion().lang.page.langue
      })
    },

    toShipmentDetail(e) {
      wx.navigateTo({
        url: `/packageDashboard/pages/shipment/detail/index?bookingReference=${e.currentTarget.dataset.bookingreference}`,
      })
    },
  }
})
