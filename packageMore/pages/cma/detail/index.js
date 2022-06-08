// packageMore/pages/cma/detail/index.js
import {
  cmaNewsDetail,
  newsLike
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
  // 获取详情
  getDetail() {
    cmaNewsDetail({
      id: this.data.id
    }).then(res => {
      if (res.data.content) {
        res.data.content = res.data.content.replace(/\<img/gi, '<img style="max-width: 100%;height: auto;" ').replaceAll('</p>\n<p>', '</p><br><p>')
      }
      this.setData({
        newsDetail: res.data
      })
    })
  },

  // 赞
  zan() {
    if (this.data.zanStatus) return
    newsLike({
      id: this.data.id
    }).then(res => {
      this.setData({
        zanStatus: true
      })
    })
  }
})