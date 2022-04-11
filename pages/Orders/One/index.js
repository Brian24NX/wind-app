const dayjs = require("dayjs");
import {
  reportToPDF
} from '../../../api/modules/home';
const utils = require("../../../utils/util")
const config = require("../../../config/config")

// pages/Orders/One/index.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    detail: {
      type: Object
    },
    list: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    originalData: null,
    stepList: [],
    stepCount: 0,
    timeRemaining: 0,
    showEmail: false,
    path: ''
  },

  ready: function () {
    this.setStepList();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setStepList() {
      console.log(this.data.list)
      this.setData({
        stepList: [],
        stepCount: 0,
        originalData: this.data.detail
      })
      const list = this.data.detail.movements.reverse();
      list.forEach((item, index) => {
        item.status.statusLabel = utils.formatHuoYunStatus(item.status.code)
        console.log(item.statusLabel)
        const week = new Date(item.date).getDay()
        switch (week) {
          case 0:
            item.week = '星期日'
            break;
          case 1:
            item.week = '星期一'
            break;
          case 2:
            item.week = '星期二'
            break;
          case 3:
            item.week = '星期三'
            break;
          case 4:
            item.week = '星期四'
            break;
          case 5:
            item.week = '星期五'
            break;
          case 6:
            item.week = '星期六'
            break;
          default:
            break;
        }
        item.time = dayjs(item.date).format('HH:mm')
        item.date = dayjs(item.date).format('YYYY-MM-DD')
        const dayStatus = dayjs(item.date).isBefore(dayjs(), 'date')
        if (dayStatus) {
          item.stepStatus = 'past'
        } else if (dayjs().isSame(dayjs(item.date), 'date')) {
          item.stepStatus = 'being'
        } else {
          if (list[index - 1].stepStatus === 'past') {
            list[index - 1].stepStatus = 'being'
          }
          item.stepStatus = 'coming'
        }
        if (item.stepStatus === 'past' || item.stepStatus === 'being') {
          this.setData({
            stepCount: ++this.data.stepCount
          })
        }
      })
      const date1 = dayjs(dayjs(list[list.length - 1].date).format('YYYY-MM-DD'))
      const date2 = dayjs().format('YYYY-MM-DD')
      const timeRemaining = parseInt(date1.diff(date2) / 1000 / 60 / 60 / 24)
      this.setData({
        stepList: list,
        timeRemaining: timeRemaining < 0 ? 0 : timeRemaining
      })
      // this.getPDFUrl();
    },

    // 获取PDF地址
    getPDFUrl(callback) {
      reportToPDF(this.data.list[0].data).then(res => {
        this.setData({
          path: config[config.dev_env].url + '/api/miniapp/' + res.data
        })
        if (callback) {
          callback()
        }
      })
    },

    // PDF查看
    reportToPDF() {
      const _this = this
      if (this.data.path) {
        wx.downloadFile({
          url: _this.data.path,
          success(filePath) {
            wx.openDocument({
              filePath: filePath.tempFilePath,
              showMenu: true
            })
          }
        })
      } else {
        this.getPDFUrl(() => {
          wx.downloadFile({
            url: _this.data.path,
            success(filePath) {
              wx.openDocument({
                filePath: filePath.tempFilePath,
                showMenu: true
              })
            }
          })
        })
      }
    },
    closeEmail() {
      this.setData({
        showEmail: false
      })
    },
    // 发送邮件
    sendReport() {
      this.setData({
        showEmail: true
      })
    },
    sendEmails(e) {
      console.log(e)
      if (this.data.path) {
        this.sendEmailFn(e.detail)
      } else {
        this.getPDFUrl(() => {
          this.sendEmailFn(e.detail)
        })
      }

    },
    sendEmailFn(receiveMailAccount) {
      wx.showToast({
        title: '发送成功',
      })
      return
      sendEmail({
        path: this.data.path,
        receiveMailAccount: receiveMailAccount
      }).then(() => {
        unixwx.showToast({
          title: '发送成功',
          mask: true
        })
        this.triggerEvent("closeEmail")
      })
    }
  }
})