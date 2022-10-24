// pages/Quotation/NearPort/index.js
import {
  fuzzyPointSearch,
  quotationNextDepartures
} from '../../../api/modules/quotation';
const languageUtil = require('../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromLabel: '',
    toLabel: '',
    fromCode: '',
    toCode: '',
    commodityCode: '',
    deliveryHaulage: '',
    finalPlaceOfDelivery: '',
    receiptHaulage: '',
    containers: 1,
    placeOfOrigin: '',
    pricingGroupSetups: [],
    pricingGroups: [],
    shippingCompany: '',
    simulationDate: '',
    weight: '',
    portOfLoadingLabel: '',
    portOfDischargeLabel: '',
    equipmentTypeName: '',
    commodityName: '',
    nearPortList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setDatas()
  },

  setDatas() {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.qutationResult.title
    })
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.qutationResult,
      language: languageUtil.languageVersion().lang.page.langue
    })
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    this.setData({
      fromLabel: data.placeOfOriginLabel ? data.placeOfOriginLabel.split(';')[0] : data.portOfLoadingLabel.split(';')[0],
      toLabel: data.finalPlaceOfDeliveryLabel ? data.finalPlaceOfDeliveryLabel.split(';')[0] : data.portOfDischargeLabel.split(';')[0],
      fromCode: data.placeOfOriginLabel ? data.placeOfOriginLabel.split(';')[1] : data.portOfLoadingLabel.split(';')[1],
      toCode: data.finalPlaceOfDeliveryLabel ? data.finalPlaceOfDeliveryLabel.split(';')[1] : data.portOfDischargeLabel.split(';')[1],
      commodityCode: data.commodityCode,
      deliveryHaulage: data.deliveryHaulage,
      equipmentType: data.equipmentType,
      finalPlaceOfDelivery: data.finalPlaceOfDelivery,
      containers: data.containers,
      placeOfOrigin: data.placeOfOrigin,
      pricingGroupSetups: data.pricingGroupSetups,
      pricingGroups: data.pricingGroups,
      receiptHaulage: data.receiptHaulage,
      shippingCompany: data.shippingCompany,
      simulationDate: data.simulationDate,
      weight: data.weight,
      equipmentTypeName: data.equipmentTypeName,
      commodityName: data.commodityName
    })
    const res = data.nearPort
    const list = [...new Set(res.map(i => i.portOfLoading + '-' + i.portOfDischarge))].map(i => {
      return {
        portOfLoading: i.split('-')[0],
        portOfDischarge: i.split('-')[1]
      }
    })
    this.setData({
      nearPortList: list
    })
    list.forEach(item => {
      this.getPolData(item)
      this.getPodData(item)
    })
  },

  getPolData(item) {
    fuzzyPointSearch({
      pointCode: item.portOfLoading
    }).then(data => {
      item.portOfLoadingLabel = data.data.point.name + ', ' + data.data.country.code
      item.portOfLoadingLabel2 = data.data.point.name + ';' + data.data.country.code
      this.setData({
        nearPortList: this.data.nearPortList
      })
    }, () => {
      this.getPolData(item)
    })
  },

  getPodData(item) {
    fuzzyPointSearch({
      pointCode: item.portOfDischarge
    }).then(data => {
      item.portOfDischargeLabel = data.data.point.name + ', ' + data.data.country.code
      item.portOfDischargeLabel2 = data.data.point.name + ';' + data.data.country.code
      this.setData({
        nearPortList: this.data.nearPortList
      })
    }, () => {
      this.getPodData(item)
    })
  },

  chooseNearPort(e) {
    const index = e.currentTarget.dataset.index
    if (!this.data.nearPortList[index].portOfLoadingLabel || !this.data.nearPortList[index].portOfDischargeLabel) return
    this.setData({
      portOfLoadingLabel: this.data.nearPortList[index].portOfLoadingLabel2,
      portOfDischargeLabel: this.data.nearPortList[index].portOfDischargeLabel2
    })
    if (this.data.commodityCode === "FAK") {
      this.getQuotationNextDepartures2(this.data.pricingGroups[0].shippingCompany, 0, this.data.nearPortList[index].portOfLoading, this.data.nearPortList[index].portOfDischarge)
    } else {
      this.getQuotationNextDepartures(this.data.nearPortList[index].portOfLoading, this.data.nearPortList[index].portOfDischarge)
    }
  },

  getQuotationNextDepartures2(shippingCompany, index, portOfLoading, portOfDischarge) {
    quotationNextDepartures({
      "affiliates": [wx.getStorageSync('partnerCode')],
      "commodityCode": this.data.commodityCode,
      "deliveryHaulage": this.data.deliveryHaulage || null,
      "equipmentSizeType": this.data.equipmentType,
      "equipmentType": this.data.equipmentType.substr(2),
      "finalPlaceOfDelivery": this.data.finalPlaceOfDelivery || null,
      "numberOfContainers": this.data.containers,
      "placeOfOrigin": this.data.placeOfOrigin || null,
      "portOfDischarge": portOfDischarge,
      "portOfLoading": portOfLoading,
      "pricingGroupSetups": this.data.pricingGroupSetups.filter(i => i.shippingCompany === shippingCompany),
      "pricingGroups": this.data.pricingGroups.filter(i => i.shippingCompany === shippingCompany),
      "receiptHaulage": this.data.receiptHaulage || null,
      "shippingCompany": shippingCompany,
      "simulationDate": this.data.simulationDate,
      "weightPerContainer": this.data.weight
    }).then(res => {
      console.log(res)
      if (res.data && res.data.nextDepartureQuoteLineAndRoute && res.data.nextDepartureQuoteLineAndRoute.length) {
        this.setData({
          resultResq: res.data,
          shippingCompany: shippingCompany
        })
        wx.navigateTo({
          url: '/pages/Quotation/List/index',
        })
      } else {
        index++;
        if (index !== this.data.pricingGroupSetups.length) {
          this.getQuotationNextDepartures2(this.data.pricingGroups[index].shippingCompany, index, portOfLoading, portOfDischarge)
        } else {
          this.setData({
            resultResq: res.data,
            shippingCompany: shippingCompany
          })
          wx.navigateTo({
            url: '/pages/Quotation/List/index',
          })
        }
      }
    })
  },

  getQuotationNextDepartures(portOfLoading, portOfDischarge) {
    quotationNextDepartures({
      "affiliates": [wx.getStorageSync('partnerCode')],
      "commodityCode": this.data.commodityCode,
      "deliveryHaulage": this.data.deliveryHaulage || null,
      "equipmentSizeType": this.data.equipmentType,
      "equipmentType": this.data.equipmentType.substr(2),
      "finalPlaceOfDelivery": this.data.finalPlaceOfDelivery || null,
      "numberOfContainers": this.data.containers,
      "placeOfOrigin": this.data.placeOfOrigin || null,
      "portOfDischarge": portOfDischarge,
      "portOfLoading": portOfLoading,
      "pricingGroupSetups": this.data.pricingGroupSetups.filter(i => i.shippingCompany === this.data.shippingCompany),
      "pricingGroups": this.data.pricingGroups.filter(i => i.shippingCompany === this.data.shippingCompany),
      "receiptHaulage": this.data.receiptHaulage || null,
      "shippingCompany": this.data.shippingCompany,
      "simulationDate": this.data.simulationDate,
      "weightPerContainer": this.data.weight
    }).then(res => {
      this.setData({
        resultResq: res.data || {},
        shippingCompany: this.data.shippingCompany
      })
      wx.navigateTo({
        url: '/pages/Quotation/List/index',
      })
    })
  }
})