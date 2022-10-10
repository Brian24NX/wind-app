// pages/Orders/No/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    languageContent: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    back() {
      wx.navigateBack()
    }
  }
})