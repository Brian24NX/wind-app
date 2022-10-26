// pages/Quotation/Others/LocalCharges/index.js
const languageUtil = require('../../../../utils/languageUtils')
import {
  fuzzyPointSearch
} from '../../../../api/modules/quotation'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    exportLocation: '',
    importLocation: '',
    shippingCompany: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.qutationResult.localCharge,
    })
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.qutationResult,
      shippingCompany: data.quotationDetail.shippingCompany || data.quotationDetail.quoteLines[0].shippingCompany
    })
    this.getLocalCharge(data)
  },

  getLocalCharge(data) {
    this.getExportLocation(data)
    this.getImportLocation(data)
  },

  getExportLocation(data) {
    fuzzyPointSearch({
      pointCode: data.portOfLoading
    }).then(res => {
      this.setData({
        exportLocation: res.data.country.name.toLocaleUpperCase()
      })
    }, () => {
      this.getExportLocation(data)
    })
  },

  getImportLocation(data) {
    fuzzyPointSearch({
      pointCode: data.portOfDischarge
    }).then(res => {
      this.setData({
        importLocation: res.data.country.name.toLocaleUpperCase()
      })
    }, () => {
      this.getImportLocation(data)
    })
  },

  copy() {
    const url = this.data.shippingCompany === '0001' ? 'https://www.cma-cgm.com/local-offices' : this.data.shippingCompany === '0002' ? 'https://www.anl.com.au/local-offices' : this.data.shippingCompany === '0011' ? 'https://www.cnc-line.com/local-offices' : 'https://www.apl.com/latest-news/customer-advisory-rates-tariffs'
    wx.setClipboardData({
      data: url,
      success() {
        wx.showToast({
          title: languageUtil.languageVersion().lang.page.copyInfo.success,
          icon: 'none',
          mask: true,
          duration: 2000
        })
      }
    })
  }
})