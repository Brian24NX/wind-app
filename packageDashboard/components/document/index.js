// packageDashboard/components/document/index.js
const languageUtils = require('../../../utils/languageUtils')
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
    loading: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    documentContent: {},
    showEmail: false,
    sendInfo: {}
  },
  attached() {
    this.initLanguage()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initLanguage() {
      this.setData({
        documentContent: languageUtils.languageVersion().lang.page.document
      })
    },

    sendEmail(e) {
      this.setData({
        showEmail: true,
        sendInfo: e.currentTarget.dataset.item
      })
    },

    closeEmail() {
      this.setData({
        showEmail: false
      })
    },

    sendEmails(e) {
      wx.showLoading({
        title: languageUtil.languageVersion().lang.page.load.send,
        mask: true
      })
      sendEmail({
        fileName: this.data.businessDetail.emailPath,
        receiveMailAccount: e.detail
      }).then(() => {
        wx.showToast({
          title: languageUtil.languageVersion().lang.page.load.sendSuccess,
          icon: 'none',
          mask: true
        })
        this.setData({
          showEmail: false
        })
      })
    }
  }
})