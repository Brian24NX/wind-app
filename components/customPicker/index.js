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
    languageContent: {},
    value: [],
    showPicker: false
  },

  attached() {
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.popupBtn
    })
  },

  observers: {
    showPopup(newValue) {
      if (newValue) {
        this.setData({
          value: [this.data.defaultIndex],
          showPicker: true
        })
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindChange(e) {
      this.setData({
        value: e.detail.value
      })
    },
    onClose() {
      this.setData({
        showPicker: false
      })
      this.triggerEvent('onClose')
    },
    onConfirm() {
      this.setData({
        showPicker: false
      })
      this.triggerEvent('onConfirm', this.data.columns[this.data.value[0]])
    }
  }
})
