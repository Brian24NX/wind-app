// pages/Result/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewactived:false,
    routinglist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '搜索结果',
    })
    let resultlist=wx.getStorageSync("resultlist");
    this.setData({
      routinglist:resultlist.routings
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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