// packageMore/pages/BusinessAndOperational/detail/index.js
import {
  businiessOpentionalDetail,
  sendEmail
} from '../../../api/modules/more';
const languageUtil = require('../../../../utils/languageUtils')
const dayjs = require('dayjs')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    languageContent: {},
    language: 'zh',
    businessDetail: {},
    showEmail: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.homeInfo.valueAddedService
    })
    this.setData({
      id: options.id,
      language: languageUtil.languageVersion().lang.page.langue,
      languageContent: languageUtil.languageVersion().lang.page.khtg
    })
    this.getBusiniessOpentionalDetail()
  },

  getBusiniessOpentionalDetail() {
    businiessOpentionalDetail({
      id: this.data.id
    }).then(res => {
      res.data.formatDate = dayjs(res.data.publishDate).format('YYYY-MM-DD')
      if (res.data.filepath) {
        const name = res.data.filepath.split('/')[res.data.filepath.split('/').length - 1]
        const index = name.indexOf('_') > -1 ? name.indexOf('_') : 0
        res.data.fileName = name.substr(index + 1)
        res.data.fileType = res.data.filepath.split('.')[res.data.filepath.split('.').length - 1]
      }
      this.setData({
        businessDetail: res.data
      })
    })
  },

  // 预览
  preview() {
    if (this.data.businessDetail.fileType === 'png' || this.data.businessDetail.fileType === 'jpg' || this.data.businessDetail.fileType === 'jpeg' || this.data.businessDetail.fileType === 'gif') {
      wx.previewImage({
        urls: [this.data.businessDetail.filepath],
        current: 0
      })
    } else {
      wx.downloadFile({
        url: this.data.businessDetail.filepath,
        success(filePath) {
          wx.openDocument({
            filePath: filePath.tempFilePath,
            showMenu: true
          })
        }
      })
    }
  },

  // 下载
  download() {
    this.setData({
      showEmail: true
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
      path: this.data.businessDetail.filepath,
      // shipmentRef: this.data.detail.id,
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
})