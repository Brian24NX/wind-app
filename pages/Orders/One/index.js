const dayjs = require("dayjs");
import {
  reportToPDF,
  sendEmail
} from '../../../api/modules/home';
const utils = require("../../../utils/util")
const config = require("../../../config/config")
const languageUtils = require('../../../utils/languageUtils')

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
    languageContent: {
      type: Object
    },
    showSearch: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    originalData: null,
    language: 'zh',
    stepList: [],
    stepCount: 0,
    timeRemaining: 0,
    showEmail: false,
    path: '',
    isLoading: true,
    show: false,
    location: ''
  },

  ready: function () {
    this.setData({
      language: languageUtils.languageVersion().lang.page.langue
    })
    this.setStepList();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setStepList() {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      this.setData({
        stepList: [],
        stepCount: 0,
        originalData: this.data.detail,
        isLoading: true
      })
      if (!this.data.detail.data.length) {
        this.setData({
          isLoading: false
        })
        wx.hideLoading()
        return
      }
      const list = this.data.detail.data.reverse();
      list.forEach((item, index) => {
        item.statusLabel = utils.formatHuoYunStatus(item.carrierSpecificData.internalEventCode, this.data.language)
        item.orginDate = item.eventDateTime
        item.eventDateTime = utils.substrTime(item.eventDateTime)
        item.eventDateTime = dayjs(item.eventDateTime).format('YYYY-MM-DD')
        const dayStatus = dayjs(item.eventDateTime).isBefore(dayjs(), 'date')
        if (dayStatus) {
          item.stepStatus = 'past'
        } else if (dayjs().isSame(dayjs(item.eventDateTime), 'date')) {
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
      const date1 = dayjs(dayjs(list[list.length - 1].eventDateTime).format('YYYY-MM-DD HH:mm:ss'))
      const date2 = dayjs().format('YYYY-MM-DD HH:mm:ss')
      const timeRemaining = parseInt(date1.diff(date2) / 1000 / 60 / 60 / 24)
      this.setData({
        stepList: list,
        timeRemaining: timeRemaining < 0 ? 0 : timeRemaining,
        isLoading: false
      })
      console.log(list)
      wx.hideLoading()
    },

    // 获取PDF地址
    getPDFUrl(callback) {
      const params = JSON.parse(JSON.stringify(this.data.detail))
      params.data = params.data.reverse()
      reportToPDF(params).then(res => {
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
      if (this.data.path) {
        this.sendEmailFn(e.detail)
      } else {
        this.getPDFUrl(() => {
          this.sendEmailFn(e.detail)
        })
      }

    },
    sendEmailFn(receiveMailAccount) {
      wx.showLoading({
        title: '发送中',
        mask: true
      })
      sendEmail({
        path: this.data.path,
        shipmentRef: this.data.detail.id,
        receiveMailAccount: receiveMailAccount
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
    },

    lookLocation(e) {
      const item = e.currentTarget.dataset.item
      console.log(item)
      this.setData({
        show: true,
        // location: item.transportCall.
      })
    },

    onClose() {
      this.setData({
        show: false,
        location: ''
      })
    }
  }
})