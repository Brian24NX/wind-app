// packageMore/pages/BusinessAndOperational/detail/index.js
import {
  businiessOpentionalDetail,
  sendEmail
} from '../../../api/modules/more';
import {
  analysis
} from '../../../../api/modules/home';
const languageUtil = require('../../../../utils/languageUtils')
const config = require('../../../../config/config')
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
    analysis({
      analysisType: 2,
      operateType: 1,
      statisti: options.id
    })
  },

  getBusiniessOpentionalDetail() {
    businiessOpentionalDetail({
      id: this.data.id
    }).then(res => {
      res.data.formatDate = dayjs(res.data.publishDate).format('YYYY-MM-DD')
      if (res.data.filepath) {
        const name = res.data.filepath.split('wind/')[1]
        const index = name.indexOf('_') > -1 ? name.indexOf('_') : 0
        res.data.fileName = name.substr(index + 1)
        res.data.fileType = res.data.filepath.split('.')[res.data.filepath.split('.').length - 1]
        res.data.filepath = config[config.dev_env].fileUrl + res.data.filepath
        res.data.emailPath = res.data.filepath.split('wind/')[1]
      }
      this.setData({
        businessDetail: res.data
      })
    })
  },

  // 预览
  preview() {
    const imageType = ['png', 'jpg', 'jpeg', 'git']
    const fileTypes = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf']
    if (imageType.indexOf(this.data.businessDetail.fileType) > -1) {
      wx.previewImage({
        urls: [this.data.businessDetail.filepath],
        current: 0
      })
    } else if (fileTypes.indexOf(this.data.businessDetail.fileType) > -1) {
      wx.showLoading({
        title: languageUtil.languageVersion().lang.page.load.loading,
        mask: true
      })
      wx.downloadFile({
        url: this.data.businessDetail.filepath,
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
        title: '暂不支持此种类型文件的预览',
        icon: 'none'
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
    analysis({
      analysisType: 2,
      operateType: 2,
      statisti: this.data.id
    })
  }
})