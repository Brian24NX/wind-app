// packageMore/pages/news/detail/index.js
import {
  newsDetail,
  newsLike
} from '../../../api/modules/more';
import languageUtils from '../../../../utils/languageUtils';
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
      language: languageUtils.languageVersion().lang.page.langue
    })
    this.getNewsDetail()
  },

  // 获取新闻详情
  getNewsDetail() {
    newsDetail({id: this.data.id}).then(res=>{
      // console.log(res)
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