// components/customPicker/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    columns: {
      type: Array,
      value: []
    },
    valueKey: {
      type: String,
      value: 'text'
    },
    showPopup: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.triggerEvent('onClose')
    },
    onConfirm(e) {
      this.triggerEvent('onConfirm', e.detail.value)
    }
  }
})
