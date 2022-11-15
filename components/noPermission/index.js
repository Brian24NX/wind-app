// components/noPermission/index.js
const languageUtils = require('../../utils/languageUtils')
Component({
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
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.load
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
