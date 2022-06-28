// packageMore/pages/usefulTemplateAndLink/index.js
const languageUtils = require('../../../utils/languageUtils')
import {
  categoryList,
  templateList,
  templateSendEmail
} from '../../api/modules/more'
import {
  analysis
} from '../../../api/modules/home';
const config = require('../../../config/config')
const pageSize = 20
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    emptyContent: {},
    language: 'zh',
    keyword: '',
    emailPath: '',
    showEmail: false,
    pageNum: 1,
    loading: true,
    noMore: false,
    noData: false,
    categoryId: 0,
    categoryList: [],
    list: [],
    current: 'template',
    defaultIndex: 0,
    showPopup: false,
    valueKey: '',
    columns: [{
      id: 'template',
      labelCn: '模版',
      labelEn: 'Template'
    }, {
      id: 'link',
      labelCn: '链接',
      labelEn: 'Link'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.useful.title,
    })
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.useful,
      language: languageUtils.languageVersion().lang.page.langue,
      emptyContent: languageUtils.languageVersion().lang.page.empty
    })
    this.setData({
      valueKey: this.data.language === 'zh' ? 'labelCn' : 'labelEn'
    })
    this.getCategoryList()
    this.search()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
    this.search()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.loading || this.data.noMore) return
    this.setData({
      pageNum: ++this.data.pageNum
    })
    this.getTemplateList()
  },

  // 切换类型
  changeType() {
    this.setData({
      defaultIndex: this.data.columns.findIndex(e => e.id === this.data.current) > -1 ? this.data.columns.findIndex(e => e.id === this.data.current) : 0,
      showPopup: true
    })
  },
  onConfirm(e) {
    console.log(e)
    this.setData({
      categoryId: 0,
      current: e.detail.id,
      showPopup: false
    })
    this.getCategoryList()
    this.search()
  },
  onClose() {
    this.setData({
      showPopup: false
    })
  },
  changeTypes(e) {
    this.setData({
      current: e.currentTarget.dataset.type,
      keyword: '',
      list: []
    })
    this.search()
  },

  // 分类列表
  getCategoryList() {
    categoryList({type: this.data.current === 'template' ? 6 : 3}).then(res=>{
      const all = [{
        id: 0,
        category: 'All',
        categoryCn: '全部'
      }]
      this.setData({
        categoryList: all.concat(res.data)
      })
    })
  },

  // 输入框
  setInput(e) {
    this.setData({
      keyword: e.detail.value
    })
  },

  // 删除
  deleteValue() {
    this.setData({
      keyword: ''
    })
    this.search()
  },

  changeCategory(e) {
    this.setData({
      categoryId: e.currentTarget.dataset.id
    })
    this.search()
  },

  // 搜索
  search() {
    this.setData({
      loading: true,
      noMore: false,
      noData: false,
      pageNum: 1,
      list: []
    })
    this.getTemplateList()
  },

  getTemplateList() {
    const params = {
      pageNum: this.data.pageNum,
      pageSize: pageSize,
      keyWord: this.data.keyword,
      categoryId: this.data.categoryId,
      type: this.data.current === 'template' ? 1 : 2
    }
    this.setData({
      loading: true
    })
    templateList(params).then(res => {
      if (params.type === 2) {
        res.data.list.forEach(item => {
          item.document = item.document.split('\n')
        })
      }
      const list = this.data.list.concat(res.data.list)
      if (list.length >= res.data.total) {
        this.setData({
          noMore: true
        })
      }
      this.setData({
        loading: false,
        noData: list.length ? false : true,
        list
      })
    })
  },

  // 发送邮件
  sendEmail(e) {
    this.setData({
      showEmail: true,
      emailPath: e.currentTarget.dataset.item.document
    })
    analysis({
      analysisType: 3,
      operateType: 2,
      statisti: e.currentTarget.dataset.item.id
    })
  },

  sendEmails(e) {
    const language = languageUtils.languageVersion();
    wx.showLoading({
      title: language.lang.page.load.send,
      mask: true
    })
    templateSendEmail({
      fileName: this.data.emailPath.split('wind/')[1],
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
  },

  closeEmail() {
    this.setData({
      showEmail: false
    })
  },

  preview(e) {
    const filePath = config[config.dev_env].fileUrl + e.currentTarget.dataset.item.document
    const fileType = e.currentTarget.dataset.item.document.split('.').pop()
    const imageType = ['png', 'jpg', 'jpeg', 'git']
    const fileTypes = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf']
    analysis({
      analysisType: 3,
      operateType: 1,
      statisti: e.currentTarget.dataset.item.id
    })
    if (imageType.indexOf(fileType) > -1) {
      wx.previewImage({
        urls: [filePath],
        current: 0
      })
    } else if (fileTypes.indexOf(fileType) > -1) {
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
    } else {
      wx.showToast({
        title: '暂不支持此种类型文件的预览',
        icon: 'none'
      })
    }
  },

  // 复制
  copy(e) {
    let url = e.currentTarget.dataset.value
    if (url.indexOf('http') > -1) {
      url = 'http' + e.currentTarget.dataset.value.split('http')[1]
    }
    wx.setClipboardData({
      data: url,
      success() {
        wx.showToast({
          title: languageUtils.languageVersion().lang.page.copyInfo.success,
          icon: 'none'
        })
      }
    })
  }
})