// packageBooking/pages/Contract/Detail/index.js
const languageUtil = require('../../../../utils/languageUtils')
import {
  equitmentSizeList
} from '../../../../api/modules/home';
import {
  fuzzyPointSearch,
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
      url: "/pages/Quotation/Others/LocalCharges/index",
      show: true
    }, {
      icon: '/assets/img/instantQuote/other_2@2x.png',
      label: 'DDSM',
      url: "/pages/Quotation/Others/DDCharges/index?from=myContracts",
      show: true
    }, {
      icon: '/assets/img/instantQuote/other_3@2x.png',
      label: 'SpotOn',
      url: "/pages/Quotation/Others/SpotOn/index",
      show: true
    }, {
      icon: '/assets/img/instantQuote/other_4@2x.png',
      label: 'addInfo',
      url: "/pages/Quotation/Others/AdditionalInformation/index",
      show: true
    }],
    fromLabel: '',
    toLabel: '',
    quotationDetail: {},
    currentEquipmentType: 0,
    surchargeDetail: {},
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
      title: languageUtil.languageVersion().lang.page.qutationResult.title4
    })
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    let quotationDetail = JSON.parse(JSON.stringify(data.contractList[Number(options.index)]))
    quotationDetail.equipments = quotationDetail.equipments.filter(i => i.netWeight)
    quotationDetail.namedAccounts = quotationDetail.affiliates.filter(i => i.affiliatesType === 'NAC').map(i => i.name + ', ' + i.city)
    let surchargeDetail = quotationDetail.surchargeDetails[this.data.currentEquipmentType]
    surchargeDetail.oceanFreightDetailsLabel = surchargeDetail.oceanFreightDetails.join(' / ')
    surchargeDetail.oceanFreight.isChecked = true
    surchargeDetail.freightCharges.isChecked = true
    surchargeDetail.prepaidCharges.isChecked = true
    surchargeDetail.collectCharges.isChecked = true
    this.data.otherList[2].show = quotationDetail.spotOffer
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.qutationResult,
      load: languageUtil.languageVersion().lang.page.load,
      language: languageUtil.languageVersion().lang.page.langue,
      portOfLoading: data.portOfLoadingCode,
      portOfLoadingLabel: data.portOfLoading,
      portOfDischarge: data.portOfDischargeCode,
      portOfDischargeLabel: data.portOfDischarge,
      fromLabel: quotationDetail.placeOfReceiptLabel || quotationDetail.portOfLoadingLabel,
      toLabel: quotationDetail.placeOfDeliveryLabel || quotationDetail.portOfDischargeLabel,
      simulationDate: data.simulationDate,
      partnerCode: data.partnerCode,
      quotationDetail,
      otherList: this.data.otherList
    })
    this.setChargeDetail()
    // this.dealEquipmentSize()
    // this.getDDCharges()
    // this.getLocalCharge()
    // if (this.data.quotationDetail.exportInlandPointCode) {
    //   this.getExportInlandPoint()
    // }
    // if (this.data.quotationDetail.importInlandPointCode) {
    //   this.getImportInlandPoint()
    // }
  },

  changeCurrentEquipmentType(e) {
    if (e.currentTarget.dataset.index === this.data.currentEquipmentType) return
    this.setData({
      currentEquipmentType: e.currentTarget.dataset.index
    })
    this.setChargeDetail()
  },

  setChargeDetail() {
    let surchargeDetail = this.data.quotationDetail.surchargeDetails[this.data.currentEquipmentType]
    surchargeDetail.oceanFreightDetailsLabel = surchargeDetail.oceanFreightDetails.join(' / ')
    surchargeDetail.oceanFreight.isChecked = true
    surchargeDetail.freightCharges.isChecked = true
    surchargeDetail.prepaidCharges.isChecked = true
    surchargeDetail.collectCharges.isChecked = true
    this.setData({
      surchargeDetail
    })
    this.calculatedCharges()
  },

  calculatedCharges() {
    const surchargeDetails = this.data.surchargeDetail
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
      "commodity": this.data.quotationDetail.freightOfAllKinds ? 'FAK' : this.data.quotationDetail.commodities[0].code,
      "equipmentSizeTypes": [this.data.quotationDetail.equipments[0].code],
      "simulationDate": this.data.importDate
    }
    this.getExportDDCharge(params)
    this.getImportDDCharge(params)
  },

  getExportDDCharge(params) {
    detentionDemurrages({
      ...params,
      "directions": ["E"]
    }).then(res => {
      if (res.data && res.data.length) {
        this.setData({
          exports: this.unique(res.data)
        })
      }
    }, () => {
      this.getExportDDCharge(params)
    })
  },

  getImportDDCharge(params) {
    detentionDemurrages({
      ...params,
      "directions": ["I"]
    }).then(res => {
      if (res.data && res.data.length) {
        this.setData({
          imports: this.unique(res.data)
        })
      }
    }, () => {
      this.getImportDDCharge(params)
    })
  },

  unique(arr) {
    let map = new Map()
    arr.forEach(item => {
      if (!map.has(item.tariff.tariffCode) && item.tariff.tariffCode !== 'STO') {
        map.set(item.tariff.tariffCode, item)
      }
    })
    return [...map.values()]
  },

  getLocalCharge() {
    this.getExportLocation()
    this.getImportLocation()
  },

  getExportInlandPoint() {
    fuzzyPointSearch({
      pointCode: this.data.quotationDetail.exportInlandPointCode
    }).then(res => {
      this.data.quotationDetail.exportInlandPoint = res.data.point.name.toLocaleUpperCase() + ', ' + res.data.country.code
      this.setData({
        quotationDetail: this.data.quotationDetail
      })
    }, () => {
      this.getExportInlandPoint()
    })
  },

  getExportLocation() {
    fuzzyPointSearch({
      pointCode: this.data.portOfLoading
    }).then(res => {
      this.setData({
        exportLocation: res.data.country.name.toLocaleUpperCase()
      })
    }, () => {
      this.getExportLocation()
    })
  },

  getImportLocation() {
    fuzzyPointSearch({
      pointCode: this.data.portOfDischarge
    }).then(res => {
      this.setData({
        importLocation: res.data.country.name.toLocaleUpperCase()
      })
    }, () => {
      this.getImportLocation()
    })
  },

  getImportInlandPoint() {
    fuzzyPointSearch({
      pointCode: this.data.quotationDetail.importInlandPointCode
    }).then(res => {
      this.data.quotationDetail.importInlandPoint = res.data.point.name.toLocaleUpperCase() + ', ' + res.data.country.code
      this.setData({
        quotationDetail: this.data.quotationDetail
      })
    }, () => {
      this.getImportInlandPoint()
    })
  },

  changeType(e) {
    this.setData({
      currentType: e.currentTarget.dataset.type
    })
  },

  changeCheck(e) {
    this.data.surchargeDetail[e.currentTarget.dataset.id].isChecked = !this.data.surchargeDetail[e.currentTarget.dataset.id].isChecked
    this.setData({
      surchargeDetail: this.data.surchargeDetail
    })
    this.calculatedCharges()
  },

  dealEquipmentSize() {
    equitmentSizeList().then(res => {
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

  toRemind() {
    wx.navigateTo({
      url: '/pages/Quotation/Others/Remind/index',
    })
  },

  submit() {
    wx.showToast({
      title: languageUtil.languageVersion().lang.page.load.functionIsUnderDevelopment,
      icon: 'none'
    })
  },

  closeEmail() {
    this.setData({
      showEmail: false
    })
  },

  sendEmails(e) {
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
    if (!this.data.exportLocation || !this.data.importLocation || !this.data.imports.length || !this.data.exports.length) {
      wx.showToast({
        title: languageUtil.languageVersion().lang.page.load.waitData,
      })
      return
    }
    this.setData({
      showEmail: true
    })
  }
})