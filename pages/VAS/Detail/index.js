// pages/VAS/Detail/index.js
const languageUtil = require('../../../utils/languageUtils')
import {
  vasFileDetail,
  vasFileSendEmail
} from '../../../api/modules/quotation'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    vasDetail: {},
    checkIndex: null,
    showEmail: false,
    isAgree: false,
    showRemind: false,
    amount: '',
    calculteResult: '',
    baseUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    let vasDetail = data.vasList.find(i => i.productName === decodeURIComponent(options.productId))
    // console.log(vasDetail)
    if (vasDetail.seletcedProduct) {
      this.setData({
        isAgree: true,
        checkIndex: vasDetail.chargeDetails.findIndex(i => i.chargeCode === vasDetail.seletcedProduct.chargeCode),
        amount: vasDetail.seletcedProduct.inputAmount || '',
        calculteResult: vasDetail.seletcedProduct.amount || ''
      })
    }
    const languages = languageUtil.languageVersion().lang.page
    this.setData({
      vasDetail: vasDetail,
      languageContent: languages.vas,
      baseUrl: "https://www.cma-cgm.com/static/ecommerce/VASAssets/" + (languages.langue === 'zh' ? 'zh_CN' : 'en_US') + "/",
    })
    wx.setNavigationBarTitle({
      title: vasDetail.productName,
    })
  },

  chooseCharge(e) {
    this.setData({
      checkIndex: e.currentTarget.dataset.index,
      amount: '',
    })
    if (this.data.vasDetail.chargeDetails[this.data.checkIndex].levelOfCharge === 'Per BL' && this.data.vasDetail.chargeDetails[this.data.checkIndex].calculationType !== 'FIX') {
      this.setData({
        calculteResult: ''
      })
    } else {
      // vasDetail.seletcedProduct.amount = Math.round(vasDetail.seletcedProduct.rateFrom * vasDetail.seletcedProduct.conversionRate)
      this.setData({
        calculteResult: this.data.vasDetail.chargeDetails[this.data.checkIndex].rateFrom
      })
    }
  },

  setAmount(e) {
    this.setData({
      amount: e.detail.value,
      calculteResult: ''
    })
  },

  calculte() {
    let res = Number(this.data.amount) * this.data.vasDetail.chargeDetails[this.data.checkIndex].rateFrom / 100
    let calculteResult = res
    if (Number(this.data.vasDetail.chargeDetails[this.data.checkIndex].minimumChargeableAmount) !== 0 && res < Number(this.data.vasDetail.chargeDetails[this.data.checkIndex].minimumChargeableAmount)) {
      calculteResult = Number(this.data.vasDetail.chargeDetails[this.data.checkIndex].minimumChargeableAmount)
    }
    if (Number(this.data.vasDetail.chargeDetails[this.data.checkIndex].maximumChargeableAmount) !== 0 && res > Number(this.data.vasDetail.chargeDetails[this.data.checkIndex].maximumChargeableAmount)) {
      calculteResult = Number(this.data.vasDetail.chargeDetails[this.data.checkIndex].maximumChargeableAmount)
    }
    this.setData({
      calculteResult: Math.round(calculteResult)
    })
  },

  clickAgree() {
    this.setData({
      isAgree: !this.data.isAgree,
      showRemind: false
    })
  },

  subscribeSubmit() {
    let vasDetail = this.data.vasDetail
    if (this.data.checkIndex === null) {
      wx.showToast({
        title: this.data.languageContent.needProduct,
        icon: 'none'
      })
      return
    }
    if ((vasDetail.chargeDetails[this.data.checkIndex].levelOfCharge === 'Per BL' && vasDetail.chargeDetails[this.data.checkIndex].calculationType !== 'FIX' && (!this.data.amount || this.data.calculteResult === ''))) {
      wx.showToast({
        title: this.data.languageContent.inputAmount,
        icon: 'none'
      })
      return
    }
    if (vasDetail.termsandConditions && !this.data.isAgree) {
      this.setData({
        showRemind: true
      })
      return
    }
    vasDetail.isProductSelected = true
    vasDetail.selectProductIndex = this.data.checkIndex
    vasDetail.seletcedProduct = vasDetail.chargeDetails[this.data.checkIndex]
    if (vasDetail.seletcedProduct.levelOfCharge === 'Per BL' && vasDetail.seletcedProduct.calculationType !== 'FIX') {
      vasDetail.seletcedProduct.amount = Math.round(this.data.calculteResult)
      vasDetail.seletcedProduct.inputAmount = this.data.amount
    } else {
      // vasDetail.seletcedProduct.amount = Math.round(vasDetail.seletcedProduct.rateFrom * vasDetail.seletcedProduct.conversionRate)
      vasDetail.seletcedProduct.amount = vasDetail.seletcedProduct.rateFrom
    }
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    currentPage.setSubscribedServices(vasDetail)
    wx.navigateBack()
  },

  preview() {
    if (this.data.vasDetail.productSheetByWind) {
      this.previewFile(this.data.vasDetail.productSheetByWind)
      return
    }
    vasFileDetail({
      url: this.data.baseUrl + this.data.vasDetail.productSheet
    }).then(res => {
      this.data.vasDetail.productSheetByWind = res.data
      this.setData({
        vasDetail: this.data.vasDetail
      })
      this.previewFile(this.data.vasDetail.productSheetByWind)
    })
  },

  previewTeams() {
    if (this.data.vasDetail.termsandConditionsByWind) {
      this.previewFile(this.data.vasDetail.termsandConditionsByWind)
      return
    }
    vasFileDetail({
      url: this.data.baseUrl + this.data.vasDetail.termsandConditions
    }).then(res => {
      this.data.vasDetail.termsandConditionsByWind = res.data
      this.setData({
        vasDetail: this.data.vasDetail
      })
      this.previewFile(this.data.vasDetail.termsandConditionsByWind)
    })
  },

  previewFile(filePath) {
    // console.log(filePath)
    const fileType = filePath.split('.').pop()
    const imageType = ['png', 'jpg', 'jpeg', 'gif']
    const fileTypes = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf']
    if (imageType.indexOf(fileType) > -1) {
      wx.previewImage({
        urls: [filePath],
        current: 0
      })
    } else if (fileTypes.indexOf(fileType) > -1) {
      wx.showLoading({
        title: languageUtil.languageVersion().lang.page.load.loading,
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
        title: languageUtil.languageVersion().lang.page.preview.disPreview,
        icon: 'none'
      })
    }
  },

  // 发送邮件
  sendEmail() {
    this.setData({
      showEmail: true
    })
  },

  sendEmails(e) {
    if (this.data.vasDetail.productSheetByWind) {
      this.sends(e)
    } else {
      vasFileDetail({
        url: this.data.baseUrl + this.data.vasDetail.productSheet
      }).then(res => {
        this.data.vasDetail.productSheetByWind = res.data
        this.setData({
          vasDetail: this.data.vasDetail
        })
        this.sends(e)
      })
    }
  },

  sends(e) {
    const language = languageUtil.languageVersion();
    wx.showLoading({
      title: language.lang.page.load.send,
      mask: true
    })
    vasFileSendEmail({
      fileName: this.data.vasDetail.productSheetByWind.split('/').pop(),
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
})