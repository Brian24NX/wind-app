// packageDashboard/pages/shipment/list/containers/index.js
const languageUtils = require('../../../utils/languageUtils')
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    languageContent: {}
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
        languageContent: languageUtils.languageVersion().lang.page.shipment
      })
    },

    toDetail() {
      wx.navigateTo({
        url: '/pages/OrderDetail/index',
      })
    }
  }
})