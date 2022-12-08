// components/customPicker/index.js
const languageUtil = require('../../utils/languageUtils')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: 'date'
    },
    currentDate: {},
    showPopup: {
      type: Boolean,
      value: false
    },
    formatter: {
      type: String,
      value: 'day'
    },
    minDate: {
      type: Number,
      value: new Date((new Date().getFullYear() - 5), 1, 1).getTime(),
    },
    maxDate: {
      type: Number,
      value: new Date((new Date().getFullYear() + 5), 11, 31).getTime(),
    }
  },

  data: {
    languageContent: {}
  },

  attached() {
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.popupBtn
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel() {
      this.triggerEvent('onCancel')
    },
    onConfirm(e) {
      this.triggerEvent('onConfirm', e.detail)
    }
  }
})