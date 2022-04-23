// packageMore/pages/news/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    newsDetail: {
      content: `· Acquisition of nearly 100% of GEFCO, European leader in automotive logistics.

      · With the acquisition, the CMA CGM Group ensures the continuity and long-term stability of GEFCO's business.
      
      · Deal will accelerate GEFCO’s transformation and strengthen its development within CEVA Logistics.`
    }
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
  getNewsDetail() {}
})