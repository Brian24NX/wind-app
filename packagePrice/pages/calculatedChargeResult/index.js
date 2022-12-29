// packagePrice/pages/calculatedChargeResult/index.js
const languageUtils = require('../../../utils/languageUtils')
import {
  dndFuzzySearch
} from '../../api/modules/price';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    chargeCalculationDate: '',
    language: 'zh',
    calculatedChargeList: [],
    calculatedChargeLists: [],
    payCountry: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const language = languageUtils.languageVersion().lang.page
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    wx.setNavigationBarTitle({
      title: language.NewDDChargesResult.title,
    })
    this.setData({
      languageContent: language.NewDDChargesResult,
      language: language.langue,
      chargeCalculationDate: data.date,
      calculatedChargeList: wx.getStorageSync('calculatedChargeResult') || [],
      // payCountry: options.payCountry
    })
    // this.setResList()
  },

  onUnload() {
    // wx.removeStorageSync('calculatedChargeResult')
  },

  copyUrl() {
    wx.setClipboardData({
      data: 'https://www.cma-cgm.com/ebusiness/invoice',
      success() {
        wx.showToast({
          title: languageUtils.languageVersion().lang.page.copyInfo.success,
          icon: 'none'
        })
      }
    })
  },

  setResList() {
    this.data.calculatedChargeList.forEach(item => {
      dndFuzzySearch({
        searchStr: item.paymentlocation.internalCode
      }).then(res => {
        console.log(res)
        const data = res.data.filter(i => i.point.split(';')[0] === item.paymentlocation.internalCode)
        console.log(data[0])
        if (data.length && data[0].pointCode.substr(0, 2) === this.data.payCountry) {
          this.data.calculatedChargeLists.push(item)
          this.setData({
            calculatedChargeLists: this.data.calculatedChargeLists
          })
        }
      })
    })
  },

  toDetail(e) {
    wx.navigateTo({
      url: `/packagePrice/pages/calculatedChargeDetail/index?index=${e.currentTarget.dataset.index}`,
    })
  }
})