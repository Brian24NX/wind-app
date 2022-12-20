// packageBooking/pages/List/index.js
const languageUtils = require('../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    routeDetailContent: {},
    language: 'zh',
    fromLabel: '',
    toLabel: '',
    routings: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.bookingDetail.title,
    })
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.bookingDetail,
      routeDetailContent: languageUtils.languageVersion().lang.page.routeDetails,
      language: languageUtils.languageVersion().lang.page.langue
    })
    this.setRouting()
  },

  setRouting() {
    let routings = wx.getStorageSync('bookingRoutings') || []
    const bookingSearchKey = wx.getStorageSync('bookingSearchKey')
    let fromLabel = bookingSearchKey.portOfLoading.split(';')[0] + ', ' + bookingSearchKey.portOfLoading.split(';')[1]
    if (bookingSearchKey.placeOfReceipt) {
      fromLabel = bookingSearchKey.placeOfReceipt.split(';')[0] + ', ' + bookingSearchKey.placeOfReceipt.split(';')[1]
    }
    let toLabel = bookingSearchKey.portOfDischarge.split(';')[0] + ', ' + bookingSearchKey.portOfDischarge.split(';')[1]
    if (bookingSearchKey.placeOfDelivery) {
      toLabel = bookingSearchKey.placeOfDelivery.split(';')[0] + ', ' + bookingSearchKey.placeOfDelivery.split(';')[1]
    }
    this.setData({
      fromLabel,
      toLabel,
    })
    if (routings.length) {
      routings.forEach(element => {
        element.show = false
        element.zhuanyun = element.journeyLegs.length - 1
        if (bookingSearchKey.placeOfReceipt) {
          element.journeyLegs.unshift({
            departureLocation: {
              name: bookingSearchKey.placeOfReceipt.split(';')[0],
              code: bookingSearchKey.placeOfReceipt.split(';').pop()
            },
            placeType: bookingSearchKey.receiptHaulage
          })
        }
        if (bookingSearchKey.placeOfDelivery) {
          element.journeyLegs.push({
            departureLocation: element.journeyLegs[element.journeyLegs.length - 1],
            arrivalLocation: {
              name: bookingSearchKey.placeOfDelivery.split(';')[0],
              code: bookingSearchKey.placeOfDelivery.split(';').pop()
            },
            placeType: bookingSearchKey.deliveryHaulage
          })
        }
        element.journeyLegs.forEach(item => {
          if (!item.voyageReference && item.vesselName === 'FEEDER') {
            item.voyageReference = item.vesselName
            item.serviceName = item.vesselName
          }
          if (!element.departureDate && (item.departureDate && item.departureDate.utc) && item.voyageReference) {
            element.departureDate = item.departureDate
          }
        })
        if (element.journeyLegs[0].voyageReference) {
          element.specialCutOffDate = (element.journeyLegs[0].specialCutOffDate && element.journeyLegs[0].specialCutOffDate.utc) ? element.journeyLegs[0].specialCutOffDate : null
          element.standardCutOffDate = (element.journeyLegs[0].standardCutOffDate && element.journeyLegs[0].standardCutOffDate.utc) ? element.journeyLegs[0].standardCutOffDate : null
        } else {
          element.specialCutOffDate = (element.journeyLegs[1].specialCutOffDate && element.journeyLegs[1].specialCutOffDate.utc) ? element.journeyLegs[1].specialCutOffDate : null
          element.standardCutOffDate = (element.journeyLegs[1].standardCutOffDate && element.journeyLegs[1].standardCutOffDate.utc) ? element.journeyLegs[1].standardCutOffDate : null
        }
        if (element.journeyLegs[element.journeyLegs.length - 1].arrivalDate) {
          element.arrivalDate = element.journeyLegs[element.journeyLegs.length - 1].arrivalDate
        } else {
          element.arrivalDate = element.journeyLegs[element.journeyLegs.length - 2].arrivalDate
        }
      });
      routings.sort((a, b) => a.departureDate.utc.localeCompare(b.departureDate.utc));
      this.setData({
        routings
      })
    }
  },

  selectLine(e) {
    wx.navigateTo({
      url: '/packageBooking/pages/Detail/index',
    })
    wx.setStorageSync('routeSelected', this.data.routings[e.currentTarget.dataset.index])
  },

  changeShow(e) {
    this.data.routings[e.currentTarget.dataset.index].show = !this.data.routings[e.currentTarget.dataset.index].show
    this.setData({
      routings: this.data.routings
    })
  }
})