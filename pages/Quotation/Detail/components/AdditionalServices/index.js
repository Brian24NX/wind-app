// pages/Quotation/Detail/components/AdditionalServices/index.js
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
    showAdditionalService: false,
    showLegalTerm: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    prevent() {
      return
    },
    onClickHide() {
      this.setData({
        showAdditionalService: false
      })
    },

    onClickOpen() {
      this.setData({
        showAdditionalService: true
      })
    },

    onOpen() {
      this.setData({
        showLegalTerm: true
      })
    },

    onClose() {
      this.setData({
        showLegalTerm: false
      })
    }
  }
})