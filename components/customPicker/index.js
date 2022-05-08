// components/customPicker/index.js
const languageUtil = require('../../utils/languageUtils')
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
    },
    defaultIndex: {
      type: Number,
      value: 0
    }
  },

  data: {
    languageContent: languageUtil.languageVersion().lang.page.popupBtn
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
