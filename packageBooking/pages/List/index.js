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
    fromLabel: 'SHANGHAI, CN',
    toLabel: 'SINGAPORE, SG',
    routings: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
    let routings = wx.getStorageSync('bookingRoutings')
    routings.forEach(element => {
      element.journeyLegs.unshift({
        departureLocation: {
          name: 'KEMI',
          code: 'FIKEM'
        },
        placeType: 'Door'
      })
      element.journeyLegs.push({
        departureLocation: element.journeyLegs[element.journeyLegs.length - 1],
        arrivalLocation: {
          name: 'ALEXANDRIA',
          code: 'EGALY'
        },
        placeType: 'Door'
      })
      element.journeyLegs.forEach(item=>{
        if (!item.voyageReference && item.vesselName === 'FEEDER') {
          item.voyageReference = item.vesselName
          item.serviceName = item.vesselName
        }
      })
    });
    this.setData({
      routings
    })
  },

  selectLine(e) {
    wx.navigateTo({
      url: '/packageBooking/pages/Detail/index?index=' + e.currentTarget.dataset.index,
    })
  }
})