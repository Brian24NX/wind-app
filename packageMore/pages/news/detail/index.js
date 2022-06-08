// packageMore/pages/news/detail/index.js
import {
  newsDetail,
  newsLike
} from '../../../api/modules/more';
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
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.homeInfo.news
    })
    this.setData({
      id: options.id,
      language: languageUtil.languageVersion().lang.page.langue
    })
    this.getNewsDetail()
    analysis({
      analysisType: 4,
      operateType: 1,
      statisti: options.id
    })
  },

  // 获取新闻详情
  getNewsDetail() {
    newsDetail({id: this.data.id}).then(res=>{
      // console.log(res)
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
    newsLike({id: this.data.id}).then(res=>{
      this.setData({
        zanStatus: true
      })
    })
  }
})