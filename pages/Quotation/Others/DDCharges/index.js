// pages/Quotation/Others/D&D/index.js
const languageUtil = require('../../../../utils/languageUtils')
import {
  detentionDemurrages
} from '../../../../api/modules/quotation'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    exportDate: '',
    importDate: '',
    portOfLoading: '',
    portOfLoadingLabel: '',
    portOfDischarge: '',
    portOfDischargeLabel: '',
    exports: [],
    imports: [],
    partnerCode: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.qutationResult,
      language: languageUtil.languageVersion().lang.page.langue
    })
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    let params = {}
    if (options.from === 'myContracts') {
      this.setData({
        exportDate: data.simulationDate,
        importDate: data.simulationDate,
        portOfLoadingLabel: data.portOfLoadingLabel.split(';')[0] + ', ' + data.portOfLoadingLabel.split(';')[1],
        portOfDischargeLabel: data.portOfDischargeLabel.split(';')[0] + ', ' + data.portOfDischargeLabel.split(';')[1]
      })
      params = {
        "portOfLoading": data.portOfLoading,
        "portOfDischarge": data.portOfDischarge,
        "shippingCompany": data.quotationDetail.shippingCompany,
        "tariffCodes": ["DET", "DEM", "MER"],
        "placeOfOrigin": data.placeOfOrigin || null,
        "finalPlaceOfDelivery": data.finalPlaceOfDelivery || null,
        "commodity": data.quotationDetail.freightOfAllKinds ? 'FAK' : data.commodities.code,
        "equipmentSizeTypes": [data.quotationDetail.equipments[0].code],
        "simulationDate": this.data.importDate,
      }
      this.getExportDDCharge(params)
      this.getImportDDCharge(params)
    } else {
      this.setData({
        exportDate: data.quotationDetail.departureDate,
        importDate: data.quotationDetail.arrivalDate,
        portOfLoadingLabel: data.portOfLoadingLabel.split(';')[0] + ', ' + data.portOfLoadingLabel.split(';')[1],
        portOfDischargeLabel: data.portOfDischargeLabel.split(';')[0] + ', ' + data.portOfDischargeLabel.split(';')[1],
      })
      params = {
        "portOfLoading": data.portOfLoading,
        "portOfDischarge": data.portOfDischarge,
        "shippingCompany": data.shippingCompany,
        "tariffCodes": ["DET", "DEM", "MER"],
        "placeOfOrigin": data.placeOfOrigin || null,
        "finalPlaceOfDelivery": data.finalPlaceOfDelivery || null,
        "commodity": data.commodityCode,
        "equipmentSizeTypes": [data.equipmentTypeSize],
        "refrigerated": data.quotationDetail.quoteLines[0].refrigerated,
        "hazardous": data.quotationDetail.quoteLines[0].hazardous,
        "oversize": data.quotationDetail.quoteLines[0].oversize
      }
      this.getExportDDCharge(params)
      this.getImportDDCharge(params)
    }
  },

  getExportDDCharge(params) {
    detentionDemurrages({
      ...params,
      "directions": ["E"]
    }).then(res => {
      if (res.data && res.data.length) {
        this.setData({
          exports: res.data
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
          imports: res.data
        })
      }
    }, () => {
      this.getImportDDCharge(params)
    })
  }
})