// packageBooking/pages/Contract/List/index.js
const languageUtil = require('../../../../utils/languageUtils')
import {
  fuzzyPointSearch
} from '../../../../api/modules/quotation'

import {
  getQuotationDetail
} from '../../../api/modules/booking'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromLabel: '',
    fromCode: '',
    toLabel: '',
    toCode: '',
    equipmentType: '',
    contractList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.qutationResult.title2
    })
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.qutationResult,
      language: languageUtil.languageVersion().lang.page.langue,
      equipmentType: data.commonEquipmentTypeName,
      fromLabel: data.placeOfOriginLabel ? data.placeOfOriginLabel.split(';')[0] : data.portOfLoadingLabel.split(';')[0],
      fromCode: data.placeOfOriginLabel ? data.placeOfOriginLabel.split(';')[1] : data.portOfLoadingLabel.split(';')[1],
      toLabel: data.finalPlaceOfDeliveryLabel ? data.finalPlaceOfDeliveryLabel.split(';')[0] : data.portOfDischargeLabel.split(';')[0],
      toCode: data.finalPlaceOfDeliveryLabel ? data.finalPlaceOfDeliveryLabel.split(';')[1] : data.portOfDischargeLabel.split(';')[1],
      contractList: data.contractResq ? data.contractResq.perfectMatches : []
    })
    this.dealData()
  },

  dealData() {
    this.data.contractList.forEach((item, index) => {
      setTimeout(() => {
        if (!item.surchargeDetails) {
          this.getQuotationDetailFn(item)
          this.getPointData(item)
        }
      }, 300 * index);
    })
  },

  getPointData(item) {
    this.getInitialPortOfLoading(item)
    this.getInitialPortOfDischarge(item)
  },

  getInitialPortOfLoading(item) {
    fuzzyPointSearch({
      pointCode: item.initialPortOfLoading
    }).then(data => {
      item.portOfLoadingLabel = data.data.point.name + ', ' + data.data.country.code
      this.setData({
        contractList: this.data.contractList
      })
    }, () => {
      this.getInitialPortOfLoading(item)
    })
  },

  getInitialPortOfDischarge(item) {
    fuzzyPointSearch({
      pointCode: item.initalPortOfDischarge
    }).then(data => {
      item.portOfDischargeLabel = data.data.point.name + ', ' + data.data.country.code
      this.setData({
        contractList: this.data.contractList
      })
    }, () => {
      this.getInitialPortOfDischarge(item)
    })
  },

  getQuotationDetailFn(item) {
    getQuotationDetail({
      quotationReference: item.quotationReference
    }).then(res => {
      if (res.data) {
        item.weight = res.data.weight
        let surchargeDetails = JSON.parse(res.data.quotationDetail)
        surchargeDetails.oceanFreight.isChecked = true
        surchargeDetails.freightCharges.isChecked = true
        surchargeDetails.prepaidCharges.isChecked = true
        surchargeDetails.collectCharges.isChecked = true
        item.surchargeDetails = surchargeDetails
        this.setData({
          contractList: this.data.contractList
        })
      }
    }, () => {
      this.getQuotationDetail(item)
    })
  },

  toDetail(e) {
    wx.navigateTo({
      url: `/packageBooking/pages/Contract/Detail/index?index=${e.currentTarget.dataset.index}`,
    })
  }
})