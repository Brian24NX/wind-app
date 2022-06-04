// packageDashboard/components/info/index.js
const languageUtils = require('../../../utils/languageUtils')
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    language: 'zh',
    languageContent: {},
  },

  attached() {
    this.initLanguage()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initLanguage() {
      const language = languageUtils.languageVersion()
      this.setData({
        languageContent: language.lang.page.shipment,
        language: language.lang.page.langue
      })
    }
  }
})
