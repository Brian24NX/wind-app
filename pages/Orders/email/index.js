// pages/Orders/email/index.js
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
    receiveMailAccount: '',
    showRemind: false
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
      let email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!email.test(this.data.receiveMailAccount)) {
        this.setData({
          showRemind: true
        })
        return
      }
      this.setData({
        showRemind: false
      })
      console.log("发送邮件", this.data.receiveMailAccount)
      this.triggerEvent("sendEmails", this.data.receiveMailAccount)
    }
  }
})