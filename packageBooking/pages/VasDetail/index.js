// packageBooking/pages/VasDetail/index.js
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
    baseUrl: '',
    equipmentTypeSize: '',
    cargo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // const pages = getCurrentPages()
    // const currentPage = pages[pages.length - 2]
    // const data = currentPage.data
    // let vasDetail = data.vasLists.find(i => i.productName === decodeURIComponent(options.productId))
    // // console.log(vasDetail)
    // if (vasDetail.seletcedProduct) {
    //   this.setData({
    //     isAgree: true,
    //     checkIndex: vasDetail.chargeDetails.findIndex(i => i.chargeCode === vasDetail.seletcedProduct.chargeCode),
    //     amount: vasDetail.seletcedProduct.inputAmount || '',
    //     calculteResult: vasDetail.seletcedProduct.amount || '',
    //   })
    // }
    // const languages = languageUtil.languageVersion().lang.page
    // this.setData({
    //   vasDetail: vasDetail,
    //   languageContent: languages.vas,
    //   baseUrl: "https://www.cma-cgm.com/static/ecommerce/VASAssets/" + (languages.langue === 'zh' ? 'zh_CN' : 'en_US') + "/",
    //   equipmentTypeSize: data.equipmentTypeSize,
    //   cargo: data.cargoes
    // })
    // wx.setNavigationBarTitle({
    //   title: vasDetail.productName,
    // })
    this.setData({
      "amount": "",
      "baseUrl": "https://www.cma-cgm.com/static/ecommerce/VASAssets/zh_CN/",
      "calculteResult": "",
      "cargo": [
        {
          "cacheData": {
            "addReeft": null,
            "commodityCode": "22042180",
            "commodityName": "Grape wine, other than \"Marsala\", not sparkling or effervesc - 22042180",
            "isAddReeft": false,
            "isIncludeHazardous": false,
            "isUserContainer": false,
            "pickerChooseReault": {
              "1": {
                "code": "20ST",
                "index": 0,
                "text": "20' Dry Standard",
                "value": "20ST"
              },
              "2": {
                "index": 0,
                "text": "KGM (Kilogram)",
                "value": "KGM"
              }
            },
            "quantityValue": "2",
            "totalWeightValue": 4,
            "unList": [],
            "weightValue": "2"
          },
          "commodity": {
            "commodityCode": "22042180",
            "commodityName": "Grape wine, other than \"Marsala\", not sparkling or effervesc - 22042180"
          },
          "hazardous": false,
          "hazardousDetails": [],
          "netWeight": "2",
          "netWeightUom": "KGM",
          "numberOfContainer": "2",
          "reefer": false,
          "shipperOwnedContainer": false,
          "sizeTypeCode": "20ST",
          "sizeTypeName": "20' Dry Standard",
          "totalWeightValue": 4
        }
      ],
      "checkIndex": null,
      "isAgree": false,
      "languageContent": {
        "additionalServices": "增值服务",
        "additionalServicesChoosed": "已订阅的服务",
        "additionalServicesDesc": "保护您的货物 · 拓展业务 · 争取实现碳中和",
        "agree": "我同意",
        "calculate": "计算",
        "containers": "柜号",
        "inputAmount": "请输入金额并计算",
        "needProduct": "请选择产品",
        "noChoosedAdditionalServices": "尚未选购增值服务，请选择下列适配您的报价的增值服务.",
        "perBL": "提单",
        "required": "您必须接受条款",
        "send": "发送至邮箱",
        "subscribe": "订阅",
        "terms": "条件与条款",
        "value": "值",
        "warningRemind": "订舱提交后须经代理确认"
      },
      "showEmail": false,
      "showRemind": false,
      "vasDetail": {
        "bestSeller": true,
        "chargeDetails": [
          {
            "calculationType": "UNI",
            "cargoLines": [
              {
                "cargoLineNumber": 1,
                "cargoRate": 15,
                "commodityName": "Grape wine, other than \"Marsala\", not sparkling or effervesc - 22042180",
                "currency": "USD",
                "isHazardous": false,
                "isOOG": false,
                "isShipperOwned": false,
                "levelOfCharge": "Per Container",
                "maxNoOfContainer": 2
              }
            ],
            "chargeCode": "DTC03",
            "chargeName": "SERENITY Standard Container for Shipper",
            "conversionRate": 0,
            "currency": "USD",
            "levelOfCharge": "Per Container",
            "maximumChargeableAmount": "0",
            "minimumChargeableAmount": "0",
            "rateFrom": 15,
            "subscriptionMode": "cargoline"
          },
          {
            "calculationType": "UNI",
            "cargoLines": [
              {
                "cargoLineNumber": 1,
                "cargoRate": 39,
                "commodityName": "Grape wine, other than \"Marsala\", not sparkling or effervesc - 22042180",
                "currency": "USD",
                "isHazardous": false,
                "isOOG": false,
                "isShipperOwned": false,
                "levelOfCharge": "Per Container",
                "maxNoOfContainer": 2
              }
            ],
            "chargeCode": "DTC07",
            "chargeName": "SERENITY Premium Container for Shipper",
            "conversionRate": 0,
            "currency": "USD",
            "levelOfCharge": "Per Container",
            "maximumChargeableAmount": "0",
            "minimumChargeableAmount": "0",
            "rateFrom": 39,
            "subscriptionMode": "cargoline"
          }
        ],
        "confirmationNeeded": false,
        "currency": "USD",
        "featuredProduct": false,
        "isExistingVas": false,
        "isInclude": false,
        "isProductSelected": false,
        "isSelected": false,
        "isTandCRequired": true,
        "levelOfCharge": "Per Container",
        "minPrice": 15,
        "parentProductId": "SERENITY container guarantee (export)",
        "productDescription": "意外事故可能会导致在您责任范围内的集装箱损坏。有了SERENITY Container Guarantee，您可以大幅度的减免相关的维修费用。",
        "productFamily": "DTC01",
        "productMainImage": "CMA_CGM_VAS_DTC.jpg",
        "productName": "SERENITY container guarantee (export)",
        "productSheet": "SERENITY container guarantee - Flyer.pdf",
        "productShortDescription": "避免因集装箱损坏而产生的额外费用-出口",
        "subscriptionAvailable": true,
        "taxRate": 0,
        "termsandConditions": "TC SERENITY container guarantee - 12th version ENG.pdf"
      }
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
      let calculteResult = ''
      if (this.data.vasDetail.chargeDetails[this.data.checkIndex].conversionRate) {
        calculteResult = Math.round(this.data.vasDetail.chargeDetails[this.data.checkIndex].rateFrom * this.data.vasDetail.chargeDetails[this.data.checkIndex].conversionRate)
      } else {
        calculteResult = this.data.vasDetail.chargeDetails[this.data.checkIndex].rateFrom
      }
      this.setData({
        calculteResult
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
      if (vasDetail.seletcedProduct.conversionRate) {
        vasDetail.seletcedProduct.amount = Math.round(vasDetail.seletcedProduct.rateFrom * vasDetail.seletcedProduct.conversionRate)
      } else {
        vasDetail.seletcedProduct.amount = vasDetail.seletcedProduct.rateFrom
      }
    }
    vasDetail.seletcedProduct.cargoLines.forEach(i => {
      i.equipmentSize = this.data.equipmentTypeSize
      i.convertedRate = vasDetail.seletcedProduct.amount
    })
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