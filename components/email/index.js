// pages/Orders/email/index.js
const languageUtil = require('../../utils/languageUtils')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    path: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    languageContent: {},
    receiveMailAccount: '',
    showRemind: false
  },

  attached() {
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.email
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setEmail(e) {
      this.setData({
        receiveMailAccount: e.detail.value
      })
    },
    closeEmail() {
      this.triggerEvent("closeEmail")
    },
    sendEmail() {
      let email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (!email.test(this.data.receiveMailAccount)) {
        this.setData({
          showRemind: true
        })
        return
      }
      this.setData({
        showRemind: false
      })
      this.triggerEvent("sendEmails", this.data.receiveMailAccount)
    }
  }
})
