// pages/ResultDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      detaillist:[],
      podlist:[],
      pollist:[],
      tranforlist:[],
      translist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '详情',
    })
    let detail=wx.getStorageSync('details');
    let arr=detail.routingDetails;
    let arrclone=[...arr];
    let arrtop=arrclone.shift();
    console.log(arr);
    console.log(arrclone);
    this.setData({
      detaillist:detail,
      pollist:detail.routingDetails[0],
      podlist:detail.routingDetails[detail.routingDetails.length-1],
      translist:arrclone
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})