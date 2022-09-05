// pages/Quotation/List/comments/Remind/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    containers: {
      type: Number
    },
    hasContainers: {
      type: Number
    },
    show: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    continue() {
      this.triggerEvent('continue')
    },
    onClickHide() {
      this.triggerEvent('hide')
    }
  }
})
