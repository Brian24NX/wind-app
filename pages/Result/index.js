// pages/Result/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewactived:false,
    routinglist:[],
    planList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '搜索结果',
    })
    this.dealData()
  },

  dealData() {
    let resultlist=wx.getStorageSync("resultlist");
    this.setData({
      routinglist:resultlist.routings
    })
    if (!resultlist.anl && !resultlist.anl && !resultlist.cnc) {
      this.setData({
        planList: []
      })
    }
  },

  // 去详情
  toDetail(e) {
    console.log(this.data.resultlist);
    let index= e.currentTarget.dataset.id;
    let resultlist=wx.getStorageSync("resultlist")
    console.log(resultlist)
    let details= resultlist.routings[index];
    wx.setStorageSync('details', details);
    wx.navigateTo({
      url: '/pages/ResultDetail/index',
    })
  }
})