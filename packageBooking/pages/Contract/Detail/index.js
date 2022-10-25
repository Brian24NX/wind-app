// packageBooking/pages/Contract/Detail/index.js
const languageUtil = require('../../../../utils/languageUtils')
import {
  equitmentSizeList,
  fuzzyPointSearch
} from '../../../../api/modules/home';
import {
  detentionDemurrages,
  exportPDF
} from '../../../../api/modules/quotation'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    load: {},
    language: 'zh',
    otherList: [{
      icon: '/assets/img/instantQuote/other_1@2x.png',
      label: 'localCharge',
      url: "/pages/Quotation/Others/LocalCharges/index"
    }, {
      icon: '/assets/img/instantQuote/other_2@2x.png',
      label: 'DDSM',
      url: "/pages/Quotation/Others/DDCharges/index?from=myContracts"
    }, {
      icon: '/assets/img/instantQuote/other_3@2x.png',
      label: 'SpotOn',
      url: "/pages/Quotation/Others/SpotOn/index"
    }, {
      icon: '/assets/img/instantQuote/other_4@2x.png',
      label: 'addInfo',
      url: "/pages/Quotation/Others/AdditionalInformation/index"
    }],
    fromLabel: '',
    toLabel: '',
    quotationDetail: {},
    simulationDate: '',
    currentType: 'charge',
    portOfLoading: '',
    portOfLoadingLabel: '',
    portOfDischarge: '',
    portOfDischargeLabel: '',
    partnerCode: [],
    exports: [],
    imports: [],
    exportLocation: '',
    importLocation: '',
    showEmail: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.qutationResult.title2
    })
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    let quotationDetail = data.contractList[Number(options.index)]
    quotationDetail.surchargeDetails.oceanFreight.isChecked = true
    quotationDetail.surchargeDetails.freightCharges.isChecked = true
    quotationDetail.surchargeDetails.prepaidCharges.isChecked = true
    quotationDetail.surchargeDetails.collectCharges.isChecked = true
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.qutationResult,
      load: languageUtil.languageVersion().lang.page.load,
      language: languageUtil.languageVersion().lang.page.langue,
      portOfLoading: data.portOfLoadingCode,
      portOfLoadingLabel: data.portOfLoading,
      portOfDischarge: data.portOfDischargeCode,
      portOfDischargeLabel: data.portOfDischarge,
      fromLabel: data.contractList[Number(options.index)].portOfLoadingLabel,
      toLabel: data.contractList[Number(options.index)].portOfDischargeLabel,
      simulationDate: data.simulationDate,
      quotationDetail: quotationDetail,
      partnerCode: data.partnerCode
    })
    this.calculatedCharges()
    this.dealEquipmentSize()
    this.getDDCharges()
  },

  calculatedCharges() {
    const surchargeDetails = this.data.quotationDetail.surchargeDetails
    let totalChargeAmount = 0
    if (surchargeDetails.oceanFreight.isChecked) {
      totalChargeAmount = totalChargeAmount + surchargeDetails.oceanFreight.price.amount
    }
    if (surchargeDetails.freightCharges.isChecked) {
      totalChargeAmount = totalChargeAmount + surchargeDetails.freightCharges.amount
    }
    if (surchargeDetails.prepaidCharges.isChecked) {
      totalChargeAmount = totalChargeAmount + surchargeDetails.prepaidCharges.amount
    }
    if (surchargeDetails.collectCharges.isChecked) {
      totalChargeAmount = totalChargeAmount + surchargeDetails.collectCharges.amount
    }
    console.log(surchargeDetails)
    this.setData({
      totalChargeAmount: totalChargeAmount || surchargeDetails.totalCharge.amount
    })
  },

  getDDCharges() {
    let params = {
      "portOfLoading": this.data.portOfLoading,
      "portOfDischarge": this.data.portOfDischarge,
      "shippingCompany": this.data.quotationDetail.shippingCompany,
      "tariffCodes": ["DET", "DEM", "MER"],
      "placeOfOrigin": this.data.placeOfOrigin || null,
      "finalPlaceOfDelivery": this.data.finalPlaceOfDelivery || null,
      "commodity": this.data.quotationDetail.freightOfAllKinds ? 'FAK' : data.commodities.code,
      "equipmentSizeTypes": [this.data.quotationDetail.equipments[0].code],
      "simulationDate": this.data.importDate
    }
    detentionDemurrages({
      ...params,
      "directions": ["E"]
    }).then(res => {
      console.log(res)
      if (res.data && res.data.length) {
        this.setData({
          exports: res.data
        })
      }
    })
    detentionDemurrages({
      ...params,
      "directions": ["I"]
    }).then(res => {
      console.log(res)
      if (res.data && res.data.length) {
        this.setData({
          imports: res.data
        })
      }
    })
  },

  getLocalCharge() {
    fuzzyPointSearch({
      pointCode: this.data.portOfLoading
    }).then(res => {
      this.setData({
        exportLocation: res.data.country.name.toLocaleUpperCase()
      })
    })
    fuzzyPointSearch({
      pointCode: this.data.portOfDischarge
    }).then(res => {
      this.setData({
        importLocation: res.data.country.name.toLocaleUpperCase()
      })
    })
  },

  changeType(e) {
    this.setData({
      currentType: e.currentTarget.dataset.type
    })
  },

  changeCheck(e) {
    this.data.quotationDetail.surchargeDetails[e.currentTarget.dataset.id].isChecked = !this.data.quotationDetail.surchargeDetails[e.currentTarget.dataset.id].isChecked
    this.setData({
      quotationDetail: this.data.quotationDetail
    })
    this.calculatedCharges()
  },

  dealEquipmentSize() {
    equitmentSizeList().then(res => {
      console.log(res)
      const index = res.data.findIndex(i => i.code === this.data.quotationDetail.equipments[0].code)
      this.data.quotationDetail.equitmentSizeType = index === -1 ? this.data.quotationDetail.equipments[0].code : (this.data.language === 'en' ? res.data[index].nameEn : res.data[index].nameCn)
      this.setData({
        quotationDetail: this.data.quotationDetail
      })
    })
  },

  copyReference() {
    wx.setClipboardData({
      data: this.data.quotationDetail.quotationReference,
      success() {
        wx.showToast({
          title: languageUtil.languageVersion().lang.page.copyInfo.success2,
          icon: 'none',
          mask: true,
          duration: 2000
        })
      }
    })
  },

  toOther(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.item.url,
    })
  },

  submit() {
    wx.showToast({
      title: this.data.load.functionIsUnderDevelopment,
      icon: 'none'
    })
  },

  closeEmail() {
    this.setData({
      showEmail: false
    })
  },

  sendEmails(e) {
    console.log(e)
    exportPDF({
      "email": e.detail,
      "ddCharges": {
        "exportDate": this.data.simulationDate,
        "exports": this.data.exports,
        "importDate": this.data.simulationDate,
        "imports": this.data.imports
      },
      "localCharges": {
        "exportLocation": this.data.exportLocation,
        "importLocation": this.data.importLocation
      },
      "quotationDetail": this.data.quotationDetail
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: languageUtil.languageVersion().lang.page.load.sendSuccess,
        icon: 'none',
        mask: true
      })
      this.setData({
        showEmail: false
      })
    })
  },

  clickExportPDF() {
    this.setData({
      showEmail: true
    })
  }
})