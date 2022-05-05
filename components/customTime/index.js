// components/customPicker/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: 'date'
    },
    currentDate: {
      type: Number,
      value: new Date().getTime()
    },
    showPopup: {
      type: Boolean,
      value: false
    },
    formatter: {
      type: String,
      value: 'day'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel() {
      this.triggerEvent('onCancel')
    },
    onConfirm(e) {
      console.log(e)
      this.triggerEvent('onConfirm', e.detail)
    }
  }
})
