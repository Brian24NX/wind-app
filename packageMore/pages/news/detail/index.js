// packageMore/pages/news/detail/index.js
import {
  newsDetail
} from '../../../../api/modules/more';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    newsDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: 'News Center',
    })
    this.setData({
      id: options.id
    })
    this.getNewsDetail()
  },

  // 获取新闻详情
  getNewsDetail() {
    newsDetail({id: this.data.id}).then(res=>{
      console.log(res)
      this.setData({
        newsDetail: res.data
      })
    })
  }
})