// packageMore/pages/BusinessAndOperational/detail/index.js
import {
  businiessOpentionalDetail
} from '../../../../api/modules/more';
const languageUtil = require('../../../../utils/languageUtils')
const dayjs = require('dayjs')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    businessDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.homeInfo.valueAddedService
    })
    this.setData({
      id: options.id
    })
    this.getBusiniessOpentionalDetail()
  },

  getBusiniessOpentionalDetail() {
    businiessOpentionalDetail({
      id: this.data.id
    }).then(res => {
      res.data.formatDate = dayjs(res.data.publishDate).format('YYYY-MM-DD')
      this.setData({
        businessDetail: res.data
      })
    })
  },
})