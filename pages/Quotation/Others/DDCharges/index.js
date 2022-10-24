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
    portOfLoadingLabel: '',
    portOfDischargeLabel: '',
    exports: [],
    imports: []
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
        portOfLoadingLabel: data.portOfLoading.split(';')[0],
        portOfDischargeLabel: data.portOfDischarge.split(';')[0]
      })
      params = {
        "portOfLoading": data.portOfLoading.split(';')[1],
        "portOfDischarge": data.portOfDischarge.split(';')[1],
        "shippingCompany": data.shippingCompany,
        "tariffCodes": ["DET", "DEM", "MER"],
        "placeOfOrigin": data.placeOfOrigin || null,
        "finalPlaceOfDelivery": data.finalPlaceOfDelivery || null,
        "commodity": data.quotationDetail.freightOfAllKinds ? 'FAK' : data.commodities.code,
        "equipmentSizeTypes": [data.quotationDetail.equipments[0].code],
        "businessPartner": wx.getStorageSync('partnerCode'),
        "simulationDate": this.data.importDate,
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
          const data = res.data
          this.setData({
            imports: res.data
          })
        }
      })
    } else {
      this.setData({
        exportDate: data.quotationDetail.departureDate,
        importDate: data.quotationDetail.arrivalDate,
        portOfLoadingLabel: data.portOfLoading.split(';')[0],
        portOfDischargeLabel: data.portOfDischarge.split(';')[0],
      })
      params = {
        "portOfLoading": data.portOfLoading.split(';')[1],
        "portOfDischarge": data.portOfDischarge.split(';')[1],
        "shippingCompany": data.shippingCompany,
        "tariffCodes": ["DET", "DEM", "MER"],
        "placeOfOrigin": data.placeOfOrigin || null,
        "finalPlaceOfDelivery": data.finalPlaceOfDelivery || null,
        "commodity": data.commodityCode,
        "equipmentSizeTypes": [data.equipmentTypeSize],
        "refrigerated": data.quotationDetail.quoteLines[0].refrigerated,
        "hazardous": data.quotationDetail.quoteLines[0].hazardous,
        "oversize": data.quotationDetail.quoteLines[0].oversize,
        "businessPartner": wx.getStorageSync('partnerCode')
      }
      detentionDemurrages({
        ...params,
        "directions": ["E"],
        "simulationDate": data.quotationDetail.departureDate,
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
        "directions": ["I"],
        "simulationDate": data.quotationDetail.arrivalDate,
      }).then(res => {
        console.log(res)
        if (res.data && res.data.length) {
          const data = res.data
          this.setData({
            imports: res.data
          })
        }
      })
    }
  }
})