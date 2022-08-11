// packageMore/pages/cma/detail/index.js
import {
  cmaNewsDetail
} from '../../../api/modules/more'
import {
  analysis
} from '../../../../api/modules/home';
const languageUtil = require('../../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    language: 'zh',
    zanStatus: false,
    newsDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id,
      language: languageUtil.languageVersion().lang.page.langue
    })
    this.getDetail()
    analysis({
      analysisType: 5,
      operateType: 1,
      statisti: options.id
    })
  },

  onShareAppMessage: function() {
    return {
      path: '/packageMore/pages/cma/detail/index?id=' + this.data.id
    }
  },
  
  // 获取详情
  getDetail() {
    cmaNewsDetail({
      id: this.data.id
    }).then(res => {
      this.setData({
        newsDetail: res.data
      })
    })
  },

  // 赞
  zan() {
    if (this.data.zanStatus) return
    analysis({
      analysisType: 5,
      operateType: 3,
      statisti: this.data.id
    }).then(() => {
      this.setData({
        zanStatus: true
      })
    })
  }
})