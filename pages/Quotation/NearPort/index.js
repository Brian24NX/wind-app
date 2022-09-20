// pages/Quotation/NearPort/index.js
import {
  fuzzyPointSearch
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
      toCode: data.finalPlaceOfDeliveryLabel ? data.finalPlaceOfDeliveryLabel.split(';')[1] : data.portOfDischargeLabel.split(';')[1]
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
      fuzzyPointSearch({
        pointCode: item.portOfLoading
      }).then(data => {
        item.portOfLoadingLabel = data.data.point.name + ', ' + data.data.country.code
        this.setData({
          nearPortList: list
        })
      })
      fuzzyPointSearch({
        pointCode: item.portOfDischarge
      }).then(data => {
        item.portOfDischargeLabel = data.data.point.name + ', ' + data.data.country.code
        this.setData({
          nearPortList: list
        })
      })
    })
  }
})