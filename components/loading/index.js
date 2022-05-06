// components/loading/index.js
const languageUtil = require('../../utils/languageUtils')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    loading: {
      type: Boolean,
      value: true
    },
    noMore: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    loadContent: languageUtil.languageVersion().lang.page.load
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
