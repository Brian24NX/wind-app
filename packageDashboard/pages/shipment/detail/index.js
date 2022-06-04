// packageDashboard/pages/shipment/detail/index.js
const languageUtils = require('../../../../utils/languageUtils')
import {
  shipmentsDetail
} from '../../../api/modules/dashboard'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    typeList: ['detailContainer', 'info', 'document'],
    current: 'detailContainer',
    bookingReference: '',
    containers: [],
    info: {},
    documents: [],
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initLanguage()
    this.setData({
      bookingReference: options.bookingReference
    })
    this.getShipmentsDetail()
  },

  initLanguage() {
    const language = languageUtils.languageVersion()
    this.setData({
      languageContent: language.lang.page.shipment
    })
    wx.setNavigationBarTitle({
      title: language.lang.page.shipment.detailTitle,
    })
  },

  changeType(e) {
    this.setData({
      current: e.currentTarget.dataset.type
    })
  },

  getShipmentsDetail() {
    shipmentsDetail({
      ccgId: 'U08101306',
      bookingReference: this.data.bookingReference
    }).then(res=>{
      console.log(res)
      this.setData({
        containers: res.data[0].containers,
        documents: res.data[0].documents,
        info: res.data[0].info,
        loading: false
      })
    })
  }
})