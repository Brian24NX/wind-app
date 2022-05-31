// packagePrice/pages/guizufeilv/index.js
const languageUtils = require('../../../utils/languageUtils')
import {
  demurragePdfList,
  demurrageSendEmail
} from '../../api/modules/price'
const config = require('../../../config/config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    emptyContent: {},
    verifyInfo: {},
    language: 'zh',
    country: '',
    area: 'All',
    activeNames: 0,
    defaultIndex: 0,
    showPopup: false,
    showEmail: false,
    sendInfo: {},
    lists: [],
    allLists: [],
    areaList: [],
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.interLanguage()
    this.getDemurragePdfList()
  },

  interLanguage() {
    const language = languageUtils.languageVersion()
    this.setData({
      languageContent: language.lang.page.guizufeilv,
      language: language.lang.page.langue,
      emptyContent: language.lang.page.empty,
      verifyInfo: language.lang.page.verifyInfo
    })
    wx.setNavigationBarTitle({
      title: language.lang.page.guizufeilv.navBarTitle,
    })
  },

  getDemurragePdfList() {
    this.setData({
      loading: true
    })
    demurragePdfList().then(res => {
      this.dealData(res.data)
    })
  },

  dealData(list) {
    wx.showLoading({
      title: languageUtils.languageVersion().lang.page.load.loading,
      mask: true
    })
    const lists = []
    const areaList = [{
      id: 'All',
      label: 'All'
    }]
    list.forEach(item => {
      const area = item.split('/')[0]
      const index = lists.findIndex(o => o.area === area)
      if (index === -1) {
        lists.push({
          area: area,
          files: [{
            fileName: item.split('/')[1],
            filePath: config[config.dev_env].url + '/api/miniapp/' + item
          }]
        })
        areaList.push({
          id: area,
          label: area
        })
      } else {
        lists[index].files.push({
          fileName: item.split('/')[1],
          filePath: config[config.dev_env].url + '/api/miniapp/' + item
        })
      }
    })
    this.setData({
      allLists: lists,
      loading: false,
      lists,
      areaList
    })
    wx.hideLoading()
  },

  // 切换展开数据
  onChange(e) {
    this.setData({
      activeNames: e.detail
    })
  },

  openPopup() {
    this.setData({
      showPopup: true
    })
  },

  onConfirm(e) {
    console.log(e)
    if (e.detail.id === 'All') {
      this.setData({
        lists: this.data.allLists
      })
    } else {
      this.setData({
        lists: [this.data.allLists.find(item => item.area === e.detail.id)]
      })
      setTimeout(() => {
        this.setData({
          activeNames: 0
        })
      }, 300)
    }
    this.setData({
      showPopup: false,
      area: e.detail.label,
      defaultIndex: this.data.areaList.findIndex(item => item.id === e.detail.id)
    })
  },

  onClose() {
    this.setData({
      showPopup: false
    })
  },

  // 预览
  preview(e) {
    const filePath = e.currentTarget.dataset.filepath
    wx.showLoading({
      title: languageUtils.languageVersion().lang.page.load.loading,
      mask: true
    })
    wx.downloadFile({
      url: filePath,
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
  },

  // 下载
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
    const language = languageUtils.languageVersion();
    wx.showLoading({
      title: language.lang.page.load.send,
      mask: true
    })
    demurrageSendEmail({
      path: this.data.sendInfo.filePath,
      receiveMailAccount: e.detail
    }).then(() => {
      wx.showToast({
        title: language.lang.page.load.sendSuccess,
        icon: 'none',
        mask: true
      })
      this.setData({
        showEmail: false
      })
    })
  }
})