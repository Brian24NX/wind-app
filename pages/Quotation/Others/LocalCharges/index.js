// pages/Quotation/Others/LocalCharges/index.js
import {
  fuzzyPointSearch
} from '../../../../api/modules/quotation'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exportLocation: '',
    importLocation: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    this.setData({
      exportLocation: data.portOfLoading.split(';')[1],
      importLocation: data.portOfDischarge.split(';')[1],
    })
    fuzzyPointSearch({
      pointCode: data.portOfLoading.split(';')[1]
    }).then(res => {
      this.setData({
        exportLocation: res.data.country.name.toLocaleUpperCase()
      })
    })
    fuzzyPointSearch({
      pointCode: data.portOfDischarge.split(';')[1]
    }).then(res => {
      this.setData({
        importLocation: res.data.country.name.toLocaleUpperCase()
      })
    })
  },

  copy() {}
})