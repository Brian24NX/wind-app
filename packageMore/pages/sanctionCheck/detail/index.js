// packageMore/pages/sanctionCheck/detail/index.js
const languageUtils = require('../../../../utils/languageUtils')

import {
  sanctionCommodityDetail
} from '../../../api/modules/more';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    id: '',
    sanctionDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.sanction.title
    })
    this.setData({
      id: options.id,
      languageContent: languageUtils.languageVersion().lang.page.sanction,
      language: languageUtils.languageVersion().lang.page.langue
    })
    this.getSanctionCommodityDetail()
  },

  getSanctionCommodityDetail() {
    sanctionCommodityDetail({
      id: this.data.id
    }).then(res=>{
      if (res.data.remarkCn) {
        res.data.remarkCn = res.data.remarkCn.replace(/\<img/gi, '<img style="max-width: 100%;height: auto;" ').replaceAll('<p>&nbsp;</p>', '</p><br><p>')
      }
      if (res.data.remarkEn) {
        res.data.remarkEn = res.data.remarkEn.replace(/\<img/gi, '<img style="max-width: 100%;height: auto;" ').replaceAll('<p>&nbsp;</p>', '</p><br><p>')
      }
      this.setData({
        sanctionDetail: res.data
      })
    })
  }
})