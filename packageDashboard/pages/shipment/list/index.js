// packageDashboard/pages/shipment/list/index.js
const languageUtils = require('../../../../utils/languageUtils')
const utils = require('../../../../utils/util')
import {
  shipmentsList,
  shipmentsContainerList
} from '../../../api/modules/dashboard'
let allList = []
const pageSize = 20
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    page: 1,
    keyword: '',
    typeList: ['shipment', 'container'],
    current: 'shipment',
    ownedId: '',
    ownedLabel: '',
    shipmentColumns: [{
      id: 'AllShipment',
      labelCn: '全部船运',
      labelEn: 'All Shipment'
    }, {
      id: 'MyShipment',
      labelCn: '我的船运',
      labelEn: 'My Shipment'
    }],
    containerColumns: [{
      id: 'AllContainer',
      labelCn: '全部货柜',
      labelEn: 'All Container'
    }, {
      id: 'MyContainer',
      labelCn: '我的货柜',
      labelEn: 'My Container'
    }],
    list: [],
    loading: false,
    noMore: false,
    noData: false,
    showPopup: false,
    defaultIndex: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initLanguage()
    this.search()
  },

  onReachBottom() {
    if (this.data.loading || this.data.noMore) return
    this.setData({
      page: ++this.data.page,
      loading: true
    })
    this.dealPaging()
  },

  initLanguage() {
    const language = languageUtils.languageVersion()
    this.setData({
      languageContent: language.lang.page.shipment,
      language: language.lang.page.langue
    })
    wx.setNavigationBarTitle({
      title: language.lang.page.shipment.title,
    })
    this.setData({
      ownedId: this.data.shipmentColumns[0].id,
      ownedLabel: this.data.language === 'zh' ? this.data.shipmentColumns[0].labelCn : this.data.shipmentColumns[0].labelEn
    })
  },

  setInput(e) {
    let value = e.detail.value.toUpperCase()
    let regvalue = value.trim()
    this.setData({
      keyword: regvalue
    })
  },

  deleteValue() {
    this.setData({
      keyword: ''
    })
    this.search()
  },

  changeCategory() {
    this.setData({
      showPopup: true
    })
  },

  onClose() {
    this.setData({
      showPopup: false
    })
  },

  onConfirm(e) {
    this.setData({
      ownedId: e.detail.id,
      ownedLabel: this.data.language === 'zh' ? e.detail.labelCn : e.detail.labelEn,
      showPopup: false
    })
    this.search()
  },

  changeType(e) {
    this.setData({
      current: e.currentTarget.dataset.type,
      noData: false,
      noMore: false,
      keyword: '',
      ownedId: e.currentTarget.dataset.type === 'shipment' ? this.data.shipmentColumns[0].id : this.data.containerColumns[0].id,
      ownedLabel: e.currentTarget.dataset.type === 'shipment' ? (this.data.language === 'zh' ? this.data.shipmentColumns[0].labelCn : this.data.shipmentColumns[0].labelEn) : (this.data.language === 'zh' ? this.data.containerColumns[0].labelCn : this.data.containerColumns[0].labelEn)
    })
    this.search()
  },

  search() {
    this.setData({
      loading: true,
      page: 1,
      list: []
    })
    allList = []
    if (this.data.current === 'shipment') {
      shipmentsList({
        ccgId: wx.getStorageSync('ccgId'),
        owned: this.data.ownedId !== 'AllShipment',
        bookingReference: this.data.keyword
      }).then(res => {
        if (res.data) {
          allList = res.data
          
          allList.forEach(listItem => {
            if(listItem.status === "DraftSI"){
              listItem.status = "SI Saved"
            }
          })
          this.dealPaging()
        } else {
          this.setData({
            loading: false,
            noData: true
          })
        }

      }, () => {
        this.setData({
          loading: false,
          noData: true
        })
      })
    } else {
      shipmentsContainerList({
        ccgId: wx.getStorageSync('ccgId'),
        owned: this.data.ownedId !== 'AllContainer',
        containerOrBookingReference: this.data.keyword
      }).then(res => {
        if (res.data) {
          allList = res.data
          this.dealPaging()
        } else {
          this.setData({
            loading: false,
            noData: true
          })
        }
      }, () => {
        this.setData({
          loading: false,
          noData: true
        })
      })
    }
  },

  dealPaging() {
    setTimeout(() => {
      const list = allList.slice((this.data.page - 1) * pageSize, this.data.page * pageSize)
      list.forEach(item => {
        item.statusLabel = utils.formatHuoYunStatus(item.statusCode, this.data.language)
      })
      this.setData({
        noData: !allList.length,
        list: this.data.list.concat(list),
        loading: false
      })
      this.setData({
        noMore: this.data.list.length >= allList.length
      })
    }, 200);
  }
})