// packageDashboard/components/document/index.js
const languageUtils = require('../../../utils/languageUtils')
import {
  documentDetail,
  documentSendEmail
} from '../../api/modules/dashboard'
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
    language: 'zh',
    showEmail: false,
    documentId: '',
    documentRef: ''
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
        documentContent: languageUtils.languageVersion().lang.page.document,
        language: languageUtils.languageVersion().lang.page.langue
      })
    },

    sendEmail(e) {
      this.setData({
        showEmail: true,
        documentId: e.currentTarget.dataset.documentid,
        documentRef: e.currentTarget.dataset.documentref
      })
    },

    closeEmail() {
      this.setData({
        showEmail: false
      })
    },

    sendEmails(e) {
      documentDetail({
        ccgId: wx.getStorageSync('ccgId'),
        documentId: this.data.documentId
      }).then(res => {
        wx.showLoading({
          title: languageUtils.languageVersion().lang.page.load.send,
          mask: true
        })
        documentSendEmail({
          fileName: this.data.documentRef + '.pdf',
          documentId: this.data.documentId,
          receiveMailAccount: e.detail
        }).then(() => {
          wx.showToast({
            title: languageUtils.languageVersion().lang.page.load.sendSuccess,
            icon: 'none',
            mask: true
          })
          this.setData({
            showEmail: false
          })
        })
      })
    },

    preview(e) {
      documentDetail({
        ccgId: wx.getStorageSync('ccgId'),
        documentId: e.currentTarget.dataset.documentid
      }).then(res => {
        if (res.data) {
          wx.showLoading({
            title: languageUtils.languageVersion().lang.page.load.loading,
            mask: true
          })
          wx.downloadFile({
            url: res.data.fileUrl,
            success(filePath) {
              wx.hideLoading()
              wx.openDocument({
                filePath: filePath.tempFilePath,
                showMenu: true
              })
            },
            fail(err) {
              wx.hideLoading()
              wx.showToast({
                title: err.errMsg,
                icon: 'none',
                duration: 3000
              })
            }
          })
        } else {
          wx.showToast({
            title: languageUtils.languageVersion().lang.page.load.notFound,
            icon: 'none'
          })
        }

      })
    }
  }
})